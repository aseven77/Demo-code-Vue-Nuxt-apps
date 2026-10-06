export enum ROOT_ANALYTICS_TAB {
  GRAPH = 'graph',
  USERS = 'users',
  MODELS = 'models',
}

export const ADMIN_PREFIX_ROUTE = '/root'

export const ROOT_USER_ANALYTICS = `${ADMIN_PREFIX_ROUTE}/analytics/user-`

export const Navigations = {
  /* Root */
  ROOT_ANALYTICS: `${ADMIN_PREFIX_ROUTE}/analytics`,
  ROOT_SETTINGS: `${ADMIN_PREFIX_ROUTE}/settings`,
  ROOT_LOGIN: '/auth/admin',
  /* Auth */
  LOGIN: '/auth/login',
  /* Analytics */
  ANALYTICS: '/analytics',
  /* Settings */
  SETTINGS: '/settings',
  /* Profile */
  PROFILE: '/profile',
  PROFILE_PREVIEW: '/profile/preview',
  PROFILE_EDIT: '/profile/edit',
  /* Onboarding */
  ONBOARDING: '/onboarding',
  ONBOARDING_PREVIEW: '/onboarding/preview',
  /* Other */
  CHANGE_EMAIL: '/settings/email/change',
  LANDING: '/',
} as const

export type NavigationsType = ValueOf<typeof Navigations>
