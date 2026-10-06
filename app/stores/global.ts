import { defineStore } from 'pinia'
import type { GlobalState } from '~/stores/types/global/state.types'

export const useGlobalStore = defineStore('global', {
  state: (): GlobalState => ({
    matchMedia: {
      isSM: false,
      isMD: false,
      isLG: false,
      isXL: false,
      isXXL: false,
    },
    isPreviewOverlay: false,
    addLinkOverlay: false,
    backgrounds: [],
  }),

  actions: {
    async sendFeedback(requestBody: {
      email: string
      topic: string
      message: string
    }) {
      return useServices().feedback.feedback(requestBody)
    },
  },

  getters: {
    isSmallMobile(state: GlobalState): boolean {
      return state.matchMedia.isSM
    },

    isMobile(state: GlobalState): boolean {
      return state.matchMedia.isSM || state.matchMedia.isMD
    },

    isDesktop(state: GlobalState): boolean {
      return state.matchMedia.isXL || state.matchMedia.isXXL
    },
  },

  persist: true,
})
