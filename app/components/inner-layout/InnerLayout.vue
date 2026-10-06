<script setup lang="ts">
interface Emits {
  onSaveClick: []
  onBackClick: []
}

const emits = defineEmits<Emits>()

const onBackClick = (): void => emits('onBackClick')
</script>

<template>
  <div class="h-full max-w-156 mx-auto lg:py-9">
    <div class="flex items-center gap-4 mb-2 relative">
      <UButton
        variant="secondary"
        size="md"
        class="lg:absolute -left-14"
        square
        @click="onBackClick"
      >
        <UIcon
          name="custom:arrow-left"
          size="16"
        />
      </UButton>
      <h2 class="text-xl lg:text-2xl text-grey-900 font-bold leading-7 tracking-0">
        <slot name="title" />
      </h2>
    </div>
    <div class="lg:py-1 lg:px-3">
      <slot />
    </div>

    <div class="flex justify-center items-center sticky bottom-5 mt-auto gap-3">
      <slot name="footer" />
    </div>
  </div>
</template>
