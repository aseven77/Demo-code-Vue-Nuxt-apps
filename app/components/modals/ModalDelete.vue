<template>
  <ModalBase
    v-model:open="isOpen"
    :title="title"
    :description="t('settings.cannotBeUndone')"
  >
    <template #footer>
      <div class="space-y-3">
        <UButton
          block
          :loading="props.loading"
          :disabled="props.loading"
          class="bg-[var(--ds-color-primitive-red-600)] hover:bg-[var(--ds-color-primitive-red-700)] active:bg-[var(--ds-color-primitive-red-800)] text-white border-[var(--ds-color-primitive-red-600)]"
          @click="handleDelete"
        >
          <UIcon
            v-if="!props.loading"
            name="i-heroicons-trash"
          />
          {{ $t('profile.delete') }}
        </UButton>
        <UButton
          block
          color="primary"
          variant="secondary"
          @click="handleCancel"
        >
          {{ $t('profile.cancel') }}
        </UButton>
      </div>
    </template>
  </ModalBase>
</template>

<script setup lang="ts">
import ModalBase from '~/components/ModalBase.vue'

import { useI18n } from '#imports'

const { t } = useI18n()
const props = defineProps<{
  title: string
  loading?: boolean
}>()

const emit = defineEmits<{
  delete: []
}>()

const isOpen = defineModel<boolean>('open')

const handleDelete = () => {
  emit('delete')
  // Модалка закроется автоматически когда loading станет false
}

const handleCancel = () => {
  isOpen.value = false
}

// Закрываем модалку когда загрузка завершается
watch(() => props.loading, (newLoading, oldLoading) => {
  if (oldLoading === true && newLoading === false) {
    // Загрузка завершилась, закрываем модалку
    isOpen.value = false
  }
})
</script>
