<script lang="ts" setup>
import { imageMimeFormats } from '~/constants/image-mime'

interface CloseEventEmit {
  close: [form: FormData | undefined]
}

const emit = defineEmits<CloseEventEmit>()

const isOpen = defineModel<boolean>('open')

const onClose = () => {
  if (cropperResult.value && file.value) {
    cropperResult.value.append('image', file.value, file.value.name)
  }

  emit('close', cropperResult.value)
}

const {
  file,
  cropperResult,
  fileHTMLElement,
  onUploadFile,
  onChangeInput,
} = useCropperModal()
</script>

<template>
  <ModalBase
    v-model:open="isOpen"
    title="Pick image"
  >
    <template #body>
      <UInput
        ref="fileHTMLElement"
        :accept="imageMimeFormats"
        class="hidden"
        type="file"
        @change="onChangeInput"
      />

      <UButton
        block
        :color="'primary'"
        :variant="'solid'"
        label="Upload image"
        @click="onUploadFile"
      />
    </template>
    <template #footer>
      <UButton
        :block="true"
        color="neutral"
        label="Cansel"
        @click="onClose"
      />
    </template>
  </ModalBase>
</template>
