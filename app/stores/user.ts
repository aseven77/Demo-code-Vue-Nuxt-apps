import { defineStore } from 'pinia'
import type {
  GetUserBySlug,
  UserState,
} from '~/stores/types/user/user.types'
import type { Background, UpdateUserRequest, UploadImageRequest, User } from '~/generatedApi'
import type { EmailConfirmationParams } from '~/composables/useEmailNotifications'

// In-flight dedup для getUser: WeakMap по store instance → per-request в SSR, singleton на клиенте
const _pendingGetUser = new WeakMap<object, Promise<User>>()

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user: null,
    themes: null,
    isLoadedUser: false,
  }),

  actions: {
    async getUser(): Promise<User> {
      const pending = _pendingGetUser.get(this)
      if (pending) return pending

      const promise = useServices().user.getCurrentUser()
      _pendingGetUser.set(this, promise)

      try {
        return await promise
      }
      finally {
        _pendingGetUser.delete(this)
      }
    },

    async getUserBySlug(params: GetUserBySlug): Promise<User> {
      const { slug, clientOs, clientRegion, clientDeviceType } = params
      return useServices().user.getUserBySlug(slug, clientRegion, clientDeviceType, clientOs)
    },

    async updateUserData(params: UpdateUserRequest): Promise<User> {
      return useServices().user.updateUser(params)
    },

    async updateUserImage(payload: UploadImageRequest): Promise<User> {
      return useServices().user.uploadUserProfileImage(payload)
    },

    async getThemes(): Promise<Background[]> {
      return useServices().user.getUserBackgrounds()
    },

    async createUserBackground(payload: {
      name: string
      description?: string | null
      /**
       * Custom fill image (jpeg,png,jpg,webp,avif,heic,heif, 10KB-20MB)
       */
      fill_custom_image?: Blob
      /**
       * Custom background image (jpeg,png,jpg,webp,avif,heic,heif, 10KB-20MB)
       */
      background_custom_image?: Blob
      /**
       * Pattern view image (jpeg,png,jpg,webp,avif,heic,heif, 10KB-20MB)
       */
      pattern_view_image?: Blob
      /**
       * Pattern preview image (jpeg,png,jpg,webp,avif,heic,heif, 10KB-20MB)
       */
      pattern_preview_image?: Blob
      fill?: {
        gradient?: string | null
        color?: string | null
        custom?: string | null
      } | null
      background?: {
        gradient?: string | null
        color?: string | null
        custom?: string | null
      } | null
      user_image?: {
        border?: string | null
        fill?: string | null
        icon?: string | null
      } | null
      typography?: {
        text?: string | null
      } | null
      border?: {
        width?: string | null
        style?: string | null
        color?: string | null
      } | null
      link?: {
        border?: {
          default?: string | null
          hover?: string | null
          active?: string | null
        } | null
        background?: {
          default?: string | null
          hover?: string | null
          active?: string | null
        } | null
        text?: {
          default?: string | null
          hover?: string | null
          active?: string | null
        } | null
        leading?: {
          default?: string | null
          hover?: string | null
          active?: string | null
        } | null
        trailing?: {
          default?: string | null
          hover?: string | null
          active?: string | null
        } | null
      } | null
      action_button?: {
        background?: {
          default?: string | null
          hover?: string | null
          active?: string | null
        } | null
        text?: {
          default?: string | null
          hover?: string | null
          active?: string | null
        } | null
      } | null
      pattern?: {
        /**
         * Pattern view identifier
         */
        view?: string | null
        /**
         * Pattern preview identifier
         */
        preview?: string | null
        position?: {
          /**
           * Horizontal position
           */
          x?: string | null
          /**
           * Vertical position
           */
          y?: string | null
        } | null
      } | null
      preview?: {
        social_links_type?: 'default' | 'inversion' | null
      } | null
    }): Promise<Background> {
      return useServices().user.createUserBackground(payload)
    },

    async checkUserSlug(slug: string) {
      return useServices().user.checkSlugAvailability(slug)
    },

    async resendEmailVerification() {
      return useServices().auth.resendEmailVerification()
    },

    async verifyRegistrationEmail(token: string) {
      return useServices().auth.verifyEmail(token)
    },

    async updateEmail(email: string) {
      return useServices().user.meChangeEmail({
        email: email,
      })
    },

    async verifyChangingEmail(token: EmailConfirmationParams['token']) {
      return useServices().user.confirmEmailChange(token)
    },

    async cancelChangingEmail(token: EmailConfirmationParams['token']) {
      return useServices().user.cancelEmailChange(token)
    },

    async deleteAccountRequest() {
      return useServices().user.deleteAuthenticatedUser()
    },

    async confirmDeleteAccount(token: string) {
      return useServices().user.confirmAccountDeletion(token)
    },

    async cancelAccountDeleteAuthed() {
      return useServices().user.cancelAccountDeletionAuth()
    },

    async cancelAccountDeleteEmail(token: string) {
      return useServices().user.cancelAccountDeletionViaLink(token)
    },

    async restoreAccount(email: string) {
      return useServices().user.requestAccountRestore({ email })
    },

    async restoreAccountConfirm(token: string) {
      return useServices().user.confirmAccountRestore(token)
    },
  },

  getters: {
    links: (state: UserState) => state.user?.links ?? [],
    currentThemeID: (state: UserState) => {
      if (state.user && state.user.background) {
        return state.user.background.id
      }
      return undefined
    },
  },

  persist: true,
})
