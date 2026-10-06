// Плагин для межвкладочной синхронизации авторизации через localStorage + событие "storage"

export default defineNuxtPlugin(() => {
  if (import.meta.server) {
    return
  }

  // ========= Colored logger for broadcast flow =========
  // const LOG_TAG_STYLE = 'background:#6E56CF;color:#fff;padding:2px 6px;border-radius:4px;font-weight:600;'
  const log = (..._args: unknown[]) => {} // console.log('%cAUTH:BROADCAST', LOG_TAG_STYLE, ...args)
  const warn = (..._args: unknown[]) => {} // console.warn('%cAUTH:BROADCAST', LOG_TAG_STYLE, ...args)
  const error = (..._args: unknown[]) => {} // console.error('%cAUTH:BROADCAST', LOG_TAG_STYLE, ...args)

  const maskToken = (t: string | null | undefined) => {
    if (!t) return t
    const start = t.slice(0, 4)
    const end = t.slice(-3)
    return `${start}…${end} (len:${t.length})`
  }

  const BROADCAST_KEY = 'auth:broadcast'
  const tabId = `${Date.now()}-${Math.random().toString(36).slice(2)}`

  const authStore = useAuthStore()

  type TokenMessage = { type: 'token', access_token: string | null, refresh_token?: string }
  type LogoutMessage = { type: 'logout' }
  type BroadcastMessage = TokenMessage | LogoutMessage
  type BroadcastEnvelope = BroadcastMessage & { from: string, ts: number }

  const isTokenMessage = (msg: BroadcastMessage | BroadcastEnvelope): msg is TokenMessage => msg.type === 'token'

  let suppressBroadcast = false

  const broadcast = (msg: BroadcastMessage) => {
    if (suppressBroadcast) {
      log('broadcast suppressed, skip sending', { type: msg.type })
      return
    }
    try {
      const envelope: BroadcastEnvelope = { ...msg, from: tabId, ts: Date.now() }
      // Do not expose sensitive values in logs
      if (isTokenMessage(envelope)) {
        const safe = {
          ...envelope,
          access_token: maskToken(envelope.access_token),
          refresh_token: maskToken(envelope.refresh_token),
        }
        log('send → storage', safe)
      }
      else {
        log('send → storage', envelope)
      }
      localStorage.setItem(BROADCAST_KEY, JSON.stringify(envelope))
      // Удаляем ключ сразу после setItem, чтобы одинаковые сообщения могли повторно триггерить событие storage
      localStorage.removeItem(BROADCAST_KEY)
    }
    catch (e) {
      error('failed to broadcast message', e)
    }
  }

  const cleanAll = async () => {
    try {
      log('cleanAll: resetting stores and clearing storage/cookies')
      const { logout } = useLogout()
      await logout('user')
      log('cleanAll: completed')
    }
    catch (e) {
      error('cleanAll: failed', e)
    }
  }

  // Принимаем события от других вкладок
  window.addEventListener('storage', async (e: StorageEvent) => {
    if (e.key !== BROADCAST_KEY || !e.newValue) return

    try {
      log('storage event captured, raw:', e.newValue)
      const data = JSON.parse(e.newValue) as BroadcastEnvelope
      if (!data || data.from === tabId) return

      const loggedData = isTokenMessage(data)
        ? { ...data, access_token: maskToken(data.access_token), refresh_token: maskToken(data.refresh_token) }
        : data
      log('receive ← storage', loggedData)

      if (data.type === 'logout') {
        log('action: logout → cleanAll')
        suppressBroadcast = true
        log('suppressBroadcast = true')
        await cleanAll()
        suppressBroadcast = false
        log('suppressBroadcast = false')
      }
      else if (data.type === 'token') {
        log('action: token update')
        suppressBroadcast = true
        log('suppressBroadcast = true')
        if (data.access_token) {
          log('setting token from broadcast', { access: !!data.access_token, refresh: !!data.refresh_token, access_preview: maskToken(data.access_token), refresh_preview: maskToken(data.refresh_token) })
          authStore.setToken({
            access_token: data.access_token,
            refresh_token: data.refresh_token,
          })
        }
        else {
          warn('received empty access_token in token message → cleanAll')
          await cleanAll()
        }
        suppressBroadcast = false
        log('suppressBroadcast = false')
      }
    }
    catch (e) {
      error('storage event handling failed', e)
    }
  })

  // Следим за изменениями токенов и рассылаем широковещательно
  let prevAccess: string | null = authStore.access_token
  let prevRefresh: string | undefined = authStore.refresh_token

  authStore.$subscribe((_mutation, state) => {
    if (suppressBroadcast) {
      log('$subscribe: suppressed — skip diff/broadcast')
      return
    }

    const nextAccess = (state as typeof authStore.$state).access_token
    const nextRefresh = (state as typeof authStore.$state).refresh_token

    const accessChanged = nextAccess !== prevAccess
    const refreshChanged = nextRefresh !== prevRefresh

    if (accessChanged || refreshChanged) {
      log('$subscribe: tokens changed', {
        accessChanged,
        refreshChanged,
        prev: { access: !!prevAccess, refresh: !!prevRefresh, access_preview: maskToken(prevAccess || undefined), refresh_preview: maskToken(prevRefresh) },
        next: { access: !!nextAccess, refresh: !!nextRefresh, access_preview: maskToken(nextAccess || undefined), refresh_preview: maskToken(nextRefresh) },
      })
      if (!nextAccess) {
        log('decision: broadcast logout')
        broadcast({ type: 'logout' })
      }
      else {
        log('decision: broadcast token')
        broadcast({ type: 'token', access_token: nextAccess, refresh_token: nextRefresh })
      }
      prevAccess = nextAccess
      prevRefresh = nextRefresh
    }
  })

  log('plugin initialized', { tabId, BROADCAST_KEY })
})
