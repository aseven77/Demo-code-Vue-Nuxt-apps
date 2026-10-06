import type { LoginResponse } from '~/generatedApi'

type SetTokenPayload = Pick<LoginResponse, 'access_token' | 'refresh_token'>

interface UseAuthCallbackOptions {
  onSuccess?: () => void
}

export async function useAuthCallback(
  key: string,
  fetchFn: () => Promise<SetTokenPayload>,
  options?: UseAuthCallbackOptions,
) {
  const authStore = useAuthStore()
  const { navigateAfterAuth } = useHelpers()

  const { data, error } = await useAsyncData(key, fetchFn, {
    getCachedData: (cacheKey) => {
      const nuxtApp = useNuxtApp()
      return nuxtApp.payload.data[cacheKey] || nuxtApp.static.data[cacheKey]
    },
  })

  if (data.value && !error.value) {
    authStore.setToken(data.value)
    options?.onSuccess?.()
    navigateAfterAuth()
  }
  else if (error.value) {
    console.error(error.value)
  }

  return { data, error }
}
