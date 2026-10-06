<template>
  <UApp>
    <LoaderOld :is-loading="isLoaded" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
import LoaderOld from '~/components/shared/loader/LoaderOld.vue'
import { useBreakpointsMedia } from '~/composables/useBreakpointsMedia'
import { useEmailNotifications, type EmailVerificationResult } from '~/composables/useEmailNotifications'
import type { ToastProps } from '#ui/components/Toast.vue'

const { EMAIL_VERIFICATION_RESULT_STATE_KEY } = useEmailNotifications()
const nuxtApp = useNuxtApp()
const toast = useToast()
const verificationResultCookie = useCookie<EmailVerificationResult | null>(EMAIL_VERIFICATION_RESULT_STATE_KEY)

const isLoaded = ref(true)

await useGeo()

nuxtApp.hook('page:finish', () => {
  isLoaded.value = false
})

useBreakpointsMedia()

onMounted(() => {
  if (verificationResultCookie.value) {
    toast.add({
      title: verificationResultCookie.value.status,
      description: verificationResultCookie.value.text,
      color: verificationResultCookie.value.status.toLowerCase() as ToastProps['color'],
    })

    verificationResultCookie.value = null
  }
})
</script>
