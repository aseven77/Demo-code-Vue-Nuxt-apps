<script setup lang="ts">
import SharedUploaderPhoto from '~/components/shared/photo/SharedUploaderPhoto.vue'

interface Props {
  userImage: string | null
}

interface Emits {
  crop: [Blob]
  removeUserImage: []
}

const props = defineProps<Props>()
const { userImage } = toRefs(props)
const emit = defineEmits<Emits>()

const onCrop = (image: Blob) => {
  emit('crop', image)
}

const onRemoveUserImage = () => {
  emit('removeUserImage')
}
</script>

<template>
  <section class="flex flex-col gap-10">
    <div class="flex flex-col gap-3">
      <h3 class="text-(--ds-color-fg-primary) font-bold text-[42px] leading-[42px]">
        {{ $t('onboarding.photo') }}
      </h3>
      <p class="text-(--ds-color-fg-tertiary) font-medium text-base">
        {{ $t('onboarding.photoHint') }}
      </p>
    </div>

    <SharedUploaderPhoto
      :user-image="userImage"
      @crop="onCrop"
      @remove-user-image="onRemoveUserImage"
    />

    <div class="flex sm:justify-center md:justify-start items-center gap-2">
      <icon
        size="16"
        name="custom:notice"
        class="shrink-0 text-(--ds-color-brand-light)"
      />

      <p class="flex text-(--ds-color-fg-secondary) text-(length:--ds-typography-body-p2-font-size) leading-[18px] font-medium">
        {{ $t('onboarding.photoFormats') }}
      </p>
    </div>
  </section>
</template>
