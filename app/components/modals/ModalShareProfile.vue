<template>
  <ModalBase
    v-model:open="isOpen"
    :title="t('profile.shareProfile')"
  >
    <template #body>
      <div class="p-1">
        <div class="rounded-3xl p-8 text-center bg-[url('/images/modal-share-s.svg')] bg-cover bg-center mb-4 relative">
          <img
            :src="user.image || ''"
            alt=""
            class="max-w-[90px] h-[90px] rounded-full border-1 border-white m-auto mb-4 object-cover relative z-3"
          >
          <p class="text-base leading-tight text-white relative z-3">
            {{ user.slug }}
          </p>
        </div>
        <div
          ref="swiperElement"
          class="swiper"
        >
          <ul class="swiper-wrapper">
            <!--            <li class="swiper-slide max-w-14"> -->
            <!--              <NuxtLink -->
            <!--                to="/" -->
            <!--                class="h-14 rounded-full border-1 border-[var(&#45;&#45;ds-color-primitive-grey-100)] flex items-center justify-center" -->
            <!--              > -->
            <!--                <UIcon -->
            <!--                  name="custom:instagram" -->
            <!--                  class="text-[var(&#45;&#45;ds-color-primitive-grey-800)]" -->
            <!--                  size="20" -->
            <!--                /> -->
            <!--              </NuxtLink> -->
            <!--            </li> -->
          </ul>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex flex-col gap-3">
        <UButton
          icon="custom:qr"
          variant="tertiary"
          color="text"
          block
          :disabled="isShareQRButtonDisabled"
          @click="onShareQR"
        >
          {{ $t('profile.shareQrCode') }}
        </UButton>
        <UButton
          icon="custom:copy"
          block
          @click="onCopy({
            resource: copyResource,
            error: t('profile.copyError'),
            success: t('profile.linkCopiedSuccess'),
          })"
        >
          {{ $t('profile.copyLink') }}
        </UButton>
      </div>
    </template>
  </ModalBase>
</template>

<script setup lang="ts">
import ModalBase from '~/components/ModalBase.vue'

import type { SwiperOptions } from 'swiper/types'
import { Swiper } from 'swiper'
import { useCopyBufferImage, useI18n } from '#imports'
import type { User } from '~/generatedApi'

const { t } = useI18n()
const requestURL = useRequestURL()

interface Props {
  user: User
}

const props = defineProps<Props>()
const { user } = toRefs(props)

const { onCopy } = useCopy()

const { notifyError } = useNotify()

const { generateQrCode } = useQR()

const { bufferCopy, isImageCopying: isQRCopying } = useCopyBufferImage()

if (!user.value) {
  throw new Error('User must be provided')
}

const QR = ref<File | null>(null)

const swiperElement = ref<HTMLDivElement | null>(null)
let swiper: Swiper | null = null

const isOpen = defineModel<boolean>('open')

const initSwiper = (): void => {
  if (!swiperElement.value) return

  if (swiper) {
    swiper.destroy(true, true)
    swiper = null
  }

  const options: SwiperOptions = {
    spaceBetween: 12,
    slidesPerView: 'auto',
    loop: true,
    allowTouchMove: true,
  }

  swiper = new Swiper(swiperElement.value, options)
}

const isShareQRButtonDisabled = computed(() => isQRCopying.value || !QR.value)

const QROptions = computed(() => ({ url: [requestURL.origin, '/', user.value.slug].join(''), gradient: user.value.qr_code }))

onMounted(async () => {
  QR.value = await generateQrCode(QROptions.value)
  // нужно для того, чтобы Safari не терял "связь" при вызове функции onShareQR. То есть на клик должен выполняться конкретный код для копирования изображения
})

const copyResource = computed(() => `${requestURL.origin}/${user.value.slug}`)

const onShareQR = async (): Promise<void> => {
  try {
    if (QR.value) {
      await bufferCopy(QR.value)
    }
  }
  catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message === 'Share canceled') return
      notifyError(error.message ?? t('profile.shareError'))
    }
  }
}

watch(isOpen, (newValue) => {
  if (newValue) {
    nextTick(() => {
      initSwiper()
    })
  }
})

onMounted(() => {
  if (isOpen.value) {
    nextTick(() => {
      initSwiper()
    })
  }
})
</script>
