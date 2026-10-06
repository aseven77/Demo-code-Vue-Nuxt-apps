import { useStorageCookieUpdate } from '~/composables/useStorageCookieUpdate'
import type { EmailConfirmationParams, EmailNotificationsVariantsValue } from '~/composables/useEmailNotifications'
import { EMAIL_CONFIRMATION_ERROR_STATUS } from '~/constants/email-confirmation-error-status'

const EMAIL_CONFIRMATION_ERROR_STATUSES: Set<string> = new Set(Object.values(EMAIL_CONFIRMATION_ERROR_STATUS))

export const actionsWithEmailConfirmationMap: Record<EmailNotificationsVariantsValue, (token: EmailConfirmationParams['token']) => Promise<void> | void> = {
  registrationVerifyEmail: async (token) => { await useUserStore().verifyRegistrationEmail(token) },
  verifyChangeEmail: async (token) => {
    const data = await useUserStore().verifyChangingEmail(token)
    if (data.status && EMAIL_CONFIRMATION_ERROR_STATUSES.has(data.status)) {
      throw new Error()
    }
  },
  verifyChangeEmailCancel: async (token) => { await useUserStore().cancelChangingEmail(token) },
  passwordReset: () => {},
  passwordResetCancel: () => {
    const { clearAuthCookies } = useStorageCookieUpdate()
    clearAuthCookies()
  },
  deleteAccount: token => useUserStore().confirmDeleteAccount(token),
  deleteAccountCancel: token => useUserStore().cancelAccountDeleteEmail(token),
  accountRestore: token => useUserStore().restoreAccountConfirm(token),
}
