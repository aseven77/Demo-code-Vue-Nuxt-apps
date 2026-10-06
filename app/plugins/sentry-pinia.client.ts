import * as Sentry from '@sentry/nuxt'

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = nuxtApp.$pinia

  if (pinia && Sentry.piniaIntegration) {
    try {
      Sentry.addIntegration(Sentry.piniaIntegration(pinia))
    }
    catch (error) {
      console.warn('Failed to initialize Sentry Pinia integration:', error)
    }
  }
})
