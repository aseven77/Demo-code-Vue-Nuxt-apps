import { Navigations } from '~/navigations'

export const useAdminAuth = () => {
  const navigateAdminAfterAuth = () => {
    return navigateTo(Navigations.ROOT_ANALYTICS)
  }

  return { navigateAdminAfterAuth }
}
