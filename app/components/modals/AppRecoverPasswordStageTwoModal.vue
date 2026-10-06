<script setup lang="ts">
import ModalBase from '~/components/ModalBase.vue'

import { useI18n } from '#imports'

const { t } = useI18n()

const emit = defineEmits<{ close: [result: boolean] }>()

defineProps<{
  description: string
}>()

const isOpen = defineModel<boolean>('open')
</script>

<template>
  <ModalBase
    v-model:open="isOpen"
    :title="t('auth.passwordRecovery')"
    :description="description"
  >
    <template #footer>
      <UButton
        :label="t('auth.close')"
        variant="secondary"
        block
        @click="emit('close', true)"
      />
    </template>
  </ModalBase>
</template>
