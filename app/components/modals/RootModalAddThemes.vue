<script setup lang="ts">
import ModalBase from '~/components/ModalBase.vue'

import { useI18n } from '#imports'
import { rootModalAddThemes } from '~/modal-control'

const { t } = useI18n()
const isOpenModel = defineModel<boolean>('open')

const actions = computed(() => [
  {
    label: t('analytics.provide1winThemes'),
    leadingIcon: 'custom:lock',
    color: 'primary' as const,
    onClick: () => {
      rootModalAddThemes.close(true)
    },
  },
  {
    label: t('analytics.cancel'),
    color: 'secondary' as const,
    variant: 'primary' as const,
    onClick: () => {
      rootModalAddThemes.close()
    },
  },
])
</script>

<template>
  <ModalBase
    v-model:open="isOpenModel"
    :title="t('analytics.assign1winThemes')"
    :aria-describedby="t('analytics.assign1winThemes')"
    :aria-description="t('analytics.assign1winThemes')"
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
