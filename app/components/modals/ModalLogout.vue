<template>
  <ModalBase
    v-model:open="isOpen"
    :title="t('settings.logOutConfirm')"
    :description="t('settings.canLogInAnytime')"
  >
    <template #footer>
      <div class="space-y-3">
        <UButton
          block
          color="tertiary"
          @click="handleLogout"
        >
          {{ $t('settings.logOut') }}
        </UButton>
        <UButton
          block
          color="primary"
          variant="primary"
          @click="handleStay"
        >
          {{ $t('settings.stayLoggedIn') }}
        </UButton>
      </div>
    </template>
  </ModalBase>
</template>

<script setup lang="ts">
import ModalBase from '~/components/ModalBase.vue'

import { useI18n } from '#imports'

const { t } = useI18n()
const emit = defineEmits<{
  logout: []
}>()

const isOpen = defineModel<boolean>('open')

const handleLogout = () => {
  emit('logout')
  isOpen.value = false
}

const handleStay = () => {
  isOpen.value = false
}
</script>
