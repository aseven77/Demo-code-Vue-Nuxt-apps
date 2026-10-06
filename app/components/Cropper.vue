<script lang="ts" setup>
import { CircleStencil, Cropper, type ImageSize, RectangleStencil, type SizeRestrictions } from 'vue-advanced-cropper'
import { useI18n } from '#imports'
import { getPreferredImageOutput } from '~/utils/imageOutput'
import { thumbnailCropRatios } from '~/constants/link-layouts'
import 'vue-advanced-cropper/dist/style.css'

const { t } = useI18n()

interface Props {
  src: string
  mode?: 'default' | 'background' | 'thumbnail'
}

interface Emits {
  crop: [Blob]
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'default',
})
const { src, mode } = toRefs(props)

const isOpenCropper = defineModel<boolean>('isOpenCropper', { default: false })

const emits = defineEmits<Emits>()

const cropperRef = ref<InstanceType<typeof Cropper> | null>(null)
const cropperZoom = ref(0)

// Thumbnail mode: switchable aspect ratio
const selectedThumbnailRatio = ref(thumbnailCropRatios[0].value)
const thumbnailAspectRatio = computed(() => selectedThumbnailRatio.value)

const iconsClasses = 'text-(--ds-color-fg-quartenary)'

const onClose = () => {
  isOpenCropper.value = false
}

const onCrop = () => {
  const { mime: toFormat, quality } = getPreferredImageOutput()

  if (!cropperRef.value) {
    throw new Error('Cropper ref is not defined')
  }

  const { canvas } = cropperRef.value.getResult()
  if (!canvas) {
    throw new Error('Canvas is not defined')
  }

  canvas.toBlob((blob) => {
    if (blob) {
      emits('crop', blob)
    }

    isOpenCropper.value = false
  }, toFormat, quality)
}

watch(cropperZoom, (value, prevValue) => {
  const cropper = cropperRef.value

  if (!cropper || !cropper.imageSize || !cropper.sizeRestrictions) {
    // console.warn('Cropper ref is not ready, skipping zoom.')
    return
  }

  const imageSize = cropper.imageSize as ImageSize
  const sizeRestrictions = cropper.sizeRestrictions as SizeRestrictions

  const minHeight = sizeRestrictions.minHeight || 1
  const minWidth = sizeRestrictions.minWidth || 1

  const imageHeight = imageSize.height
  const imageWidth = imageSize.width

  if (imageHeight < imageWidth) {
    const prevAbsHeight = (imageHeight - prevValue * (imageHeight - minHeight))
    const newAbsHeight = (imageHeight - value * (imageHeight - minHeight))

    const factor = prevAbsHeight / newAbsHeight
    cropper.zoom(factor)
  }
  else {
    const prevAbsWidth = (imageWidth - prevValue * (imageWidth - minWidth))
    const newAbsWidth = (imageWidth - value * (imageWidth - minWidth))

    const factor = prevAbsWidth / newAbsWidth
    cropper.zoom(factor)
  }
})
</script>

<template>
  <UModal
    v-model:open="isOpenCropper"
    :title="t('onboarding.photoEditing')"
  >
    <template #body>
      <Cropper
        v-if="mode === 'background'"
        ref="cropperRef"
        class="object-cover mb-3 _cropper-background-mode"
        :src="src"
        :stencil-component="RectangleStencil"
        :stencil-props="{
          aspectRatio: 9 / 20,
          movable: true,
          resizable: true,
        }"
      />
      <Cropper
        v-else-if="mode === 'default'"
        ref="cropperRef"
        class="object-cover mb-3"
        :src="src"
        :stencil-component="CircleStencil"
        :stencil-props="{
          aspectRatio: 1,
          movable: true,
          resizable: true,
        }"
      />
      <Cropper
        v-else-if="mode === 'thumbnail'"
        ref="cropperRef"
        class="object-cover mb-3 _cropper-background-mode"
        :src="src"
        :stencil-component="RectangleStencil"
        :stencil-props="{
          aspectRatio: thumbnailAspectRatio,
          movable: true,
          resizable: true,
        }"
      />
      <div
        v-if="mode === 'thumbnail'"
        class="flex gap-2 mb-3"
      >
        <button
          v-for="ratio in thumbnailCropRatios"
          :key="ratio.label"
          :data-testid="`cropper-ratio-${ratio.label}`"
          class="px-3 py-1 text-xs rounded-full border cursor-pointer transition-all"
          :class="[
            selectedThumbnailRatio === ratio.value
              ? 'bg-brand-500 text-white border-brand-500'
              : 'border-gray-200 hover:border-gray-300',
          ]"
          @click="selectedThumbnailRatio = ratio.value"
        >
          {{ ratio.label }}
        </button>
      </div>
      <div class="flex items-center gap-2">
        <UIcon
          :class="iconsClasses"
          name="custom:img"
          size="16"
        />
        <USlider
          v-model="cropperZoom"
          :min="0"
          :step="0.1"
          :max="0.9"
        />
        <UIcon
          :class="iconsClasses"
          name="custom:img"
          size="20"
        />
      </div>
    </template>
    <template #footer>
      <div class="flex flex-col gap-3 w-full">
        <UButton
          block
          color="primary"
          :label="t('onboarding.save')"
          @click="onCrop"
        />
        <UButton
          block
          color="neutral"
          :label="t('onboarding.cancel')"
          @click="onClose"
        />
      </div>
    </template>
  </UModal>
</template>

<style scoped>
._cropper-background-mode {
  max-height: 500px;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
}
</style>
