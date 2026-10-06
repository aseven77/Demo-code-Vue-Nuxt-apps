<script setup lang="ts">
import type { User } from '~/generatedApi'
import CustomThemePage from '~/components/themes/CustomThemePage.vue'
import { Navigations } from '~/navigations'

function safeClone<T>(value: T): T {
  try {
    return structuredClone(value)
  }
  catch {
    try {
      return JSON.parse(JSON.stringify(value)) as T
    }
    catch {
      return value as T
    }
  }
}

const user = useCookie<User>('onboarding-state')
const initialUserSnapshot = safeClone<User>(user.value)

const onBackClick = () => {
  user.value = initialUserSnapshot
  navigateTo('/onboarding')
}

const onSaveSuccess = () => {
  navigateTo('/onboarding')
}
</script>

<template>
  <CustomThemePage
    :user="user"
    :back-route="Navigations.ONBOARDING"
    :use-cookie-mode="true"
    :on-save-success="onSaveSuccess"
    :on-back-click="onBackClick"
  />
</template>
