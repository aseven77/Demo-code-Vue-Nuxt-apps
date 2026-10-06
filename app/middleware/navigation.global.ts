import { actionsWithEmailConfirmationMap } from '~/constants/actions-with-email-confirmation-map'
import {
  type EmailConfirmationParams,
  EmailNotificationVariantsMap,
  type EmailVerificationResult,
  useEmailNotifications,
} from '~/composables/useEmailNotifications'
import { Navigations, ROOT_ANALYTICS_TAB } from '~/navigations'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { toRoute } = useRouterMiddlewareNavigation()
  const redirect = toRoute(to)
  if (redirect) return navigateTo(redirect)
  const { clearAuthCookies } = useStorageCookieUpdate()
  const authStore = useAuthStore()
  const userStore = useUserStore()
  const { EmailNotificationsSuccessMessages, EmailNotificationsSuccessRedirect, EmailNotificationsErrorRedirect, EMAIL_VERIFICATION_RESULT_STATE_KEY } = useEmailNotifications()

  // Проверка текущего URL на признак того, что пользователь перешёл в приложение по ссылке с почты
  const { eventType, token }: Partial<EmailConfirmationParams> = to.query

  if (eventType && token) {
    const verificationResultCookie = useCookie<Nullable<EmailVerificationResult>>(EMAIL_VERIFICATION_RESULT_STATE_KEY)

    if (eventType === EmailNotificationVariantsMap.passwordReset) {
      return navigateTo({ name: 'auth-password-reset-token', query: {}, params: { token } }) // используется именованный роут, чтобы прокинуть params
    }

    try {
      await actionsWithEmailConfirmationMap[eventType](token)

      const text = EmailNotificationsSuccessMessages[eventType]

      if (eventType !== EmailNotificationVariantsMap.passwordResetCancel && text) {
        verificationResultCookie.value = {
          eventType,
          status: 'Success',
          text,
        }
      }

      if (eventType === EmailNotificationVariantsMap.verifyChangeEmail || eventType === EmailNotificationVariantsMap.accountRestore) {
        clearAuthCookies() // разлогин на сервере, чтобы стор не подхватывал куки
      }
      else {
        userStore.user = await userStore.getUser()
      }

      return navigateTo(EmailNotificationsSuccessRedirect[eventType], { external: true })
    }
    catch (error) {
      if (error instanceof Error && error.message) {
        verificationResultCookie.value = {
          eventType,
          status: 'Error',
          text: error.message,
        }
      }

      return navigateTo(EmailNotificationsErrorRedirect[eventType], { external: true })
    }
  }

  // Глобальный стейт, чтобы иметь возможность на клиенте проверять, откуда пользователь перешёл на страницу
  const previousRoute = useState<Nullable<string>>('prev-route', () => null)
  if (from.path) {
    previousRoute.value = from.path
  }

  const publicRoots = ['/auth', '/user']
  const publicExact = ['/', '/index']
  let isPublic = publicExact.includes(to.path) || publicRoots.some(r => to.path.startsWith(r)) || ('slug' in to.params && to.params.slug)

  const adminStore = useAdminStore()
  const isAdmin = !!adminStore.access_token
  // Если админ уже авторизован и пытается зайти на /auth/admin — редиректим на /root/analytics
  if (isAdmin && to.path === Navigations.ROOT_LOGIN) {
    return navigateTo({ path: Navigations.ROOT_ANALYTICS, replace: true, query: { tab: ROOT_ANALYTICS_TAB.GRAPH } })
  }

  // Любая попытка попасть на /root/** пользователем, который не админ — редирект на /auth/admin
  if (to.path.startsWith('/root') && !isAdmin) {
    return navigateTo({ path: Navigations.ROOT_LOGIN, replace: true })
  }

  const isAdminAllowedRoute
    = isAdmin
      && (
        to.path.startsWith('/analytics')
        || to.path.startsWith('/settings')
        || to.path.startsWith('/root')
      )
  if (isAdminAllowedRoute) {
    isPublic = true
  }

  if (authStore.isAuthenticated && !isPublic) {
    // Получаем актуальные данные пользователя через composable с кешированием,
    // чтобы страница/layout не делали повторный запрос
    if (!userStore.user) {
      userStore.user = await userStore.getUser()
    }

    // Проверяем статус онбординга на основе данных с бэкенда
    if (!userStore.user?.is_onboarding_passed && !to.path.startsWith('/onboarding')) {
      return navigateTo({ path: '/onboarding', replace: true })
    }
    // Если онбординг уже пройден — доступ к /onboarding запрещен
    if (userStore.user?.is_onboarding_passed && to.path.startsWith('/onboarding')) {
      return navigateTo({ path: '/profile', replace: true })
    }
  }

  if (!authStore.isAuthenticated && !isPublic) {
    return navigateTo({ path: Navigations.LOGIN, replace: true })
  }
})
