<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import CustomThemePage from '~/components/themes/CustomThemePage.vue'
import { Navigations } from '~/navigations'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

if (!user.value) {
  await navigateTo(Navigations.LOGIN)
}
</script>

<template>
  <CustomThemePage
    v-if="user"
    :user="user"
    :back-route="Navigations.PROFILE_EDIT"
  />
</template>
