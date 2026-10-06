<script setup lang="ts">
import type { TelegramAuthResponse } from '~/stores/types/auth/telegram-auth.types'

onMounted(async () => {
  const { navigateAfterAuth } = useHelpers()
  const authStore = useAuthStore()

  const { hash } = useRequestURL()

  const hashToken = hash.substring(1)

  const tgAuthResult = new URLSearchParams(hashToken).get('tgAuthResult')
  console.log(tgAuthResult, 'tgAuthResult')
  if (tgAuthResult) {
    const response = await authStore.telegramAuth({ tgAuthResult })
    if ('access_token' in response) {
      authStore.setToken(response as TelegramAuthResponse)
      return navigateAfterAuth()
    }
    throw response
  }
})
</script>

<template>
  <div />
</template>
