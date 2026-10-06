<script setup lang="ts">
import type { User } from '~/generatedApi'

interface Props {
  user: User
  mode: 'preview' | 'preview-analytics' | 'production' | 'preview-custom-theme'
}

const isOpen = defineModel<boolean>('open')

defineProps<Props>()
</script>

<template>
  <ModalBase
    v-model:open="isOpen"
    title="Preview Phone Block"
    description="Preview Phone Block"
    size="desktop-480"
    :closable="true"
  >
    <template #body>
      <PreviewBlock
        :mode="mode"
        :user="user"
      />
    </template>
  </ModalBase>
</template>
