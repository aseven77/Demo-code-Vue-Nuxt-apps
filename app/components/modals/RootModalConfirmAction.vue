<script setup lang="ts">
import ModalBase from '~/components/ModalBase.vue'

import { useI18n } from '#imports'

const props = withDefaults(defineProps<{
  title: string
  confirmLabel: string
  confirmIcon?: string
  confirmColor?: 'primary' | 'error'
  cancelLabel?: string
  cancelColor?: 'primary' | 'secondary'
  cancelVariant?: 'primary' | 'secondary'
}>(), {
  confirmColor: 'primary',
  cancelVariant: 'secondary',
})

const emit = defineEmits<{
  close: [value?: boolean]
}>()

const { t } = useI18n()
const isOpenModel = defineModel<boolean>('open')

const actions = computed(() => [
  {
    label: props.confirmLabel,
    leadingIcon: props.confirmIcon,
    color: props.confirmColor,
    onClick: () => emit('close', true),
  },
  {
    label: props.cancelLabel ?? t('analytics.cancel'),
    color: props.cancelColor,
    variant: props.cancelVariant,
    onClick: () => emit('close'),
  },
])
</script>

<template>
  <ModalBase
    v-model:open="isOpenModel"
    :title="title"
    :aria-describedby="title"
    :aria-description="title"
  >
    <template #footer>
      <ul class="flex flex-col gap-3 w-full">
        <li
          v-for="{ leadingIcon, color, label, onClick, variant } in actions"
          :key="label"
          class="flex-1"
        >
          <UButton
            :color="color"
            :variant="variant"
            :leading-icon="leadingIcon"
            :label="label"
            block
            @click="onClick"
          />
        </li>
      </ul>
    </template>
  </ModalBase>
</template>
