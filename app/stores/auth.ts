import type { AuthState } from '~/stores/types/auth/state.types'
import type { LoginResponse } from '~/generatedApi/models/LoginResponse'
import type { EmailConfirmationParams } from '~/composables/useEmailNotifications'
import { createTokenState, createTokenPersistConfig, type SetTokenPayload } from '~/stores/shared/token'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    ...createTokenState(),
  }),

  actions: {
    async refreshToken(requestBody: { refresh_token?: string }): Promise<LoginResponse> {
      return useServices().auth.refreshToken(requestBody)
    },

    setToken({ access_token, refresh_token }: SetTokenPayload): void {
      this.access_token = access_token
      this.refresh_token = refresh_token
    },

    async login(requestBody: { email: string, password: string }): Promise<LoginResponse> {
      return useServices().auth.temporaryUserLogin(requestBody)
    },

    async registerUser(requestBody: {
      email: string
      password: string
      password_confirmation: string
    }) {
      return useServices().auth.registerUser(requestBody)
    },

    async sendRestorePasswordInvite(requestBody: { email: string }) {
      return useServices().auth.postForgotPassword(requestBody)
    },

    async cancelResetPassword(token: EmailConfirmationParams['token']) {
      return useServices().auth.getCancelPasswordReset(token)
    },

    async restorePassword(requestBody: {
      token: string
      password: string
      password_confirmation: string
    }) {
      return useServices().auth.postResetPassword(requestBody)
    },

    async sendExchangeCode(requestBody: { code: string }) {
      return useServices().auth.exchangeAuthCode(requestBody)
    },

    async telegramAuth(requestBody: { tgAuthResult: string }) {
      return useServices().auth.registerTelegram(requestBody)
    },

    async vkAuth(requestBody: { code: string, state: string, code_verifier: string, device_id?: string }) {
      return useServices().auth.registerVk(requestBody)
    },

    async appleAuth(requestBody: { code: string }) {
      return useServices().auth.registerApple(requestBody)
    },

    async changePassword(currentPassword: string, newPassword: string, confirmPassword: string) {
      return useServices().user.changePassword({
        current_password: currentPassword,
        password: newPassword,
        password_confirmation: confirmPassword,
      })
    },

    async logoutUser() {
      return useServices().auth.logoutUser({ refresh_token: this.refresh_token })
    },
  },

  getters: {
    isAuthenticated(state): boolean {
      return !!state.access_token
    },
  },

  persist: createTokenPersistConfig(),
})
