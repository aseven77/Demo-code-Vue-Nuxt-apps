<script setup lang="ts">
import ModalLegalDocument from '~/components/modals/ModalLegalDocument.vue'

const isVisiblePrivacyPolicy = ref<boolean>(false)
const isVisibleContractOffer = ref<boolean>(false)

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <footer class="mb-[32px]">
    <div class="relative max-w-[1920px] mx-auto px-[15px]">
      <div class="flex flex-col  mx-auto items-center">
        <NuxtLink
          to="#"
          class="logo mb-5"
          @click.prevent="scrollToTop"
        >
          <svg class="icon icon-logo">
            <use xlink:href="/images/sprite.svg#logo" />
          </svg>
        </NuxtLink>
        <div class="block md:flex w-full mb-6 justify-center gap-5 text-center">
          <button
            class="text-[#6E7281] hover:text-[#A4AABE] cursor-pointer block mb-2 md:mb-0 bg-transparent border-0"
            @click="isVisiblePrivacyPolicy = true"
          >
            {{ $t('landing.privacyPolicy') }}
          </button>
          <button
            class="text-[#6E7281] hover:text-[#A4AABE] cursor-pointer block bg-transparent border-0"
            @click="isVisibleContractOffer = true"
          >
            {{ $t('landing.contractOffer') }}
          </button>
        </div>

        <div class="text-[14px] tracking-[-0.12px] text-[#6e7382]">
          &copy;&nbsp;2025 
        </div>
      </div>
    </div>
  </footer>
  <ModalLegalDocument
    v-model:open="isVisiblePrivacyPolicy"
    document="privacy-policy"
    title-key="legal.privacyPolicy.title"
  />

  <ModalLegalDocument
    v-model:open="isVisibleContractOffer"
    document="contract-offer"
    title-key="legal.contractOffer.title"
  />
</template>

<style scoped>
.footer {
  margin-bottom: 32px;
}

.footer-main {
  display: flex;
  flex-direction: column;
  max-width: 230px;
  margin: 0 auto;
  align-items: center;
}

.footer-main .logo {
  margin-bottom: 20px;
}

.footer-main .logo svg {
  width: 124px;
  height: 43px;
}

.social-item svg {
  width: 16px;
  height: 16px;
  fill: currentColor;
  stroke: none;
}

.footer-link a {
  letter-spacing: -0.12px;
  color: #6e7382;
}
</style>
