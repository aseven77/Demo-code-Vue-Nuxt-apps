import { OpenAPI } from '~/generatedApi/core/OpenAPI'
import { AuthService } from '~/generatedApi/services/AuthService'
import { LinksService } from '~/generatedApi/services/LinksService'
import { UserService } from '~/generatedApi/services/UserService'
import { AnalyticsService } from '~/generatedApi/services/AnalyticsService'
import { FeedbackService } from '~/generatedApi/services/FeedbackService'
import { ReferenceService } from '~/generatedApi/services/ReferenceService'
import { InviteTokensService } from '~/generatedApi/services/InviteTokensService'
import { AdminAnalyticsService } from '~/generatedApi/services/AdminAnalyticsService'
import { AdminAuthService } from '~/generatedApi/services/AdminAuthService'
import { AdminBackgroundsService } from '~/generatedApi/services/AdminBackgroundsService'
import { AdminUserListsService } from '~/generatedApi/services/AdminUserListsService'
import { AdminUsersService } from '~/generatedApi/services/AdminUsersService'
import { Navigations } from '~/navigations'

// ============================================================================
// ТИПЫ ДЛЯ API СЕРВИСОВ
// ============================================================================
// ⚠️ ВАЖНО: При регенерации API обновите:
// 1. Импорты сервисов выше
// 2. Объект services в конце файла
// ============================================================================

declare global {
  var __original_fetch: ((input: RequestInfo | URL, init?: RequestInit) => Promise<Response>) | undefined
  var __fetch_interceptor_installed: boolean | undefined
}

// Сохраняем оригинальный fetch один раз при загрузке модуля
if (!globalThis.__original_fetch) {
  globalThis.__original_fetch = globalThis.fetch.bind(globalThis)
}

// --- Утилиты для fetch-перехватчика (SSR-safe: не хранят per-request state) ---

type Role = 'admin' | 'user'
const REFRESH_TIMEOUT_MS = 15000

const detectRole = (url: string): Role | null => {
  // Админские эндпоинты находятся под /api/admin
  if (url.includes('/api/admin')) return 'admin'
  // Обычные пользовательские эндпоинты — остальные под /api
  if (url.includes('/api/')) return 'user'
  return null
}

// Per-request refresh state хранится на NuxtApp, чтобы не разделять между SSR-запросами
interface RefreshState {
  admin: Promise<void> | null
  user: Promise<void> | null
}

function getRefreshState(app: ReturnType<typeof useNuxtApp>): RefreshState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const a = app as any
  if (!a._apiRefreshState) {
    a._apiRefreshState = { admin: null, user: null }
  }
  return a._apiRefreshState
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getTokenForRole(role: Role | null, pinia: any): string {
  if (role === 'admin') return useAdminStore(pinia).access_token || ''
  if (role === 'user') return useAuthStore(pinia).access_token || ''
  return ''
}

/* eslint-disable @typescript-eslint/no-explicit-any */
interface RoleConfig {
  getRefreshToken: (pinia: any) => string | null
  refresh: (pinia: any, rt: string) => Promise<any>
  setToken: (pinia: any, res: any) => void
}
/* eslint-enable @typescript-eslint/no-explicit-any */

const roleConfigs: Record<Role, RoleConfig> = {
  admin: {
    getRefreshToken: pinia => useAdminStore(pinia).refresh_token as string | null,
    refresh: (pinia, rt) => useAdminStore(pinia).refreshAdminToken({ refresh_token: rt }),
    setToken: (pinia, res) => useAdminStore(pinia).setToken(res),
  },
  user: {
    getRefreshToken: pinia => useAuthStore(pinia).refresh_token as string | null,
    refresh: (pinia, rt) => useAuthStore(pinia).refreshToken({ refresh_token: rt }),
    setToken: (pinia, res) => useAuthStore(pinia).setToken(res),
  },
}

async function refreshAccessTokenFor(role: Role, app: ReturnType<typeof useNuxtApp>): Promise<void> {
  const state = getRefreshState(app)
  const existing = role === 'admin' ? state.admin : state.user
  if (existing) return existing

  const pinia = app.$pinia
  const config = roleConfigs[role]

  let timedOut = false
  const realRefresh = (async () => {
    const rt = config.getRefreshToken(pinia)
    if (!rt) throw new Error(`No ${role} refresh token`)
    const res = await config.refresh(pinia, rt)
    if (timedOut) throw new Error('Refresh finished after timeout')
    config.setToken(pinia, res)
  })()

  const timeoutPromise = new Promise<void>((_, reject) => {
    setTimeout(() => {
      timedOut = true
      reject(new Error('Refresh timeout'))
    }, REFRESH_TIMEOUT_MS)
  })

  const combined = Promise.race([realRefresh, timeoutPromise]).finally(() => {
    if (role === 'admin') state.admin = null
    else state.user = null
  }) as Promise<void>

  if (role === 'admin') state.admin = combined
  else state.user = combined
  return combined
}

// Точечная очистка только выбранной роли, без тотального сброса кук/стора другой роли
async function doCleanAuth(role: Role, app: ReturnType<typeof useNuxtApp>): Promise<void> {
  const pinia = app.$pinia
  if (role === 'admin') useAdminStore(pinia).$reset()
  else useAuthStore(pinia).$reset()
  const { redirectTo } = useStorageCookieUpdate()
  await redirectTo(role === 'admin' ? Navigations.ROOT_LOGIN : Navigations.LOGIN)
}

async function doCleanAll(app: ReturnType<typeof useNuxtApp>): Promise<void> {
  const pinia = app.$pinia
  const wasAdmin = !!useAdminStore(pinia).access_token || !!useAdminStore(pinia).refresh_token
  const { resetStores } = useLogout(pinia)
  resetStores('user')
  resetStores('admin')
  const { clearAll: clearStorage } = useStorageCookieUpdate()
  await clearStorage(wasAdmin ? Navigations.ROOT_LOGIN : Navigations.LOGIN)
}

export default defineNuxtPlugin((nuxtApp) => {
  // Базовый URL для API
  OpenAPI.BASE = nuxtApp.$config.public.urlApi as string
  // Разрешает отправку cookies с запросами
  OpenAPI.WITH_CREDENTIALS = true
  // Включает отправку cookies с запросами
  OpenAPI.CREDENTIALS = 'include'

  // TOKEN resolver — динамически получает stores из текущего SSR-контекста,
  // а не из замыкания первого запроса
  OpenAPI.TOKEN = () => {
    const app = tryUseNuxtApp()
    if (!app) return Promise.resolve('')
    const authStore = useAuthStore(app.$pinia)
    const adminStore = useAdminStore(app.$pinia)
    const hasUser = !!authStore.access_token
    const hasAdmin = !!adminStore.access_token
    if (hasUser && !hasAdmin) return Promise.resolve(authStore.access_token || '')
    if (!hasUser && hasAdmin) return Promise.resolve(adminStore.access_token || '')
    return Promise.resolve('')
  }

  // Устанавливаем fetch-перехватчик один раз за процесс (НЕ per-request).
  // Внутри обёртки все stores/state получаются из текущего NuxtApp через tryUseNuxtApp(),
  // что гарантирует изоляцию между параллельными SSR-запросами.
  // При HMR в dev-режиме требуется перезапуск сервера для обновления логики перехватчика.
  if (!globalThis.__fetch_interceptor_installed) {
    globalThis.__fetch_interceptor_installed = true
    const originalFetch = globalThis.__original_fetch!

    globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
      const app = tryUseNuxtApp()
      // Вне контекста Nuxt — прокидываем как есть
      if (!app) return originalFetch(input, init)

      const pinia = app.$pinia
      const apiBase = app.$config.public.urlApi as string

      try {
        const originalReq = input instanceof Request ? input : new Request(input, init)
        const url = originalReq.url

        const isApiCall = typeof apiBase === 'string' && url.startsWith(apiBase)
        const isRefreshCall
          = url.includes('/api/token/refresh') || url.includes('/api/admin/token/refresh')

        // Добавляем/обновляем Authorization в исходном API-запросе (кроме refresh)
        let reqToSend = originalReq
        let roleForRequest: Role | null = null
        if (isApiCall && !isRefreshCall) {
          roleForRequest = detectRole(url)
          const token = getTokenForRole(roleForRequest, pinia)
          const headers = new Headers(originalReq.headers)
          if (token) headers.set('Authorization', `Bearer ${token}`)
          reqToSend = new Request(originalReq, {
            headers,
            credentials: originalReq.credentials,
          })
        }
        // Клонируем первый запрос, чтобы безопасно переиспользовать тело при ретрае
        const firstReqClone = reqToSend.clone()
        const res = await originalFetch(reqToSend)

        if (!isApiCall || isRefreshCall || res.status !== 401) {
          return res
        }

        try {
          const role = roleForRequest ?? detectRole(url)
          if (!role) return res
          await refreshAccessTokenFor(role, app)
          // Готовим повторный запрос с новым токеном
          const retryHeaders = new Headers(firstReqClone.headers)
          const newToken = getTokenForRole(role, pinia)
          if (newToken) retryHeaders.set('Authorization', `Bearer ${newToken}`)

          const retryReq = new Request(firstReqClone, {
            headers: retryHeaders,
            credentials: firstReqClone.credentials,
          })

          const retryRes = await originalFetch(retryReq)
          if (retryRes.status === 401) {
            await doCleanAuth(role, app)
          }
          return retryRes
        }
        catch {
          const role = roleForRequest ?? detectRole(url)
          if (role) await doCleanAuth(role, app)
          else await doCleanAll(app)
          return res
        }
      }
      catch {
        // На случай ошибок в нашей обёртке — выполняем исходный fetch
        return await originalFetch(input, init)
      }
    }
  }

  // Сгенерированные сервисы
  const services = {
    auth: AuthService,
    links: LinksService,
    user: UserService,
    analytics: AnalyticsService,
    feedback: FeedbackService,
    reference: ReferenceService,
    inviteTokens: InviteTokensService,
    admin: {
      analytics: AdminAnalyticsService,
      auth: AdminAuthService,
      backgrounds: AdminBackgroundsService,
      userLists: AdminUserListsService,
      users: AdminUsersService,
    },
  }

  return {
    provide: { services },
  }
})
