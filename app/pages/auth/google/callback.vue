<script setup lang="ts">
const authStore = useAuthStore()
const { searchParams } = useRequestURL()

const code = searchParams.get('code') ?? ''

if (code) {
  await useAuthCallback('google-auth', () => authStore.sendExchangeCode({ code }))
}
</script>

<template>
  <div />
</template>
