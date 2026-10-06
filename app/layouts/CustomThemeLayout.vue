<script setup lang="ts">
import type { User } from '~/generatedApi'

interface Props {
  user: User
}

const props = defineProps<Props>()
const { user } = toRefs(props)
const { isMobile } = storeToRefs(useGlobalStore())
</script>

<template>
  <UContainer class="flex flex-col h-full py-10">
    <div v-if="!isMobile" class="flex items-center lg:mb-6 gap-4">
      <img
        src="/images/logo.svg"
        alt="Link3"
      >
    </div>

    <div class="flex grow justify-between gap-4">
      <div class="flex-1 lg:border lg:border-light-500 lg:rounded-3xl">
        <slot />
      </div>

      <SharedPreviewPhone
        mode="preview"
        :user="user"
      />
    </div>
  </UContainer>
</template>
