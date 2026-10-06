<script setup lang="ts">
const appleResponse = useCookie('apple_code')

if (!appleResponse.value) {
  throw new Error('apple_code could not be found.')
}

const authStore = useAuthStore()
await useAuthCallback('apple-auth', () => authStore.appleAuth({ code: appleResponse.value ?? '' }))
</script>

<template>
  <div />
</template>
