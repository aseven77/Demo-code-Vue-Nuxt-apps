<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

const modules = [Autoplay]
const { swiperSlides } = useLanding()

const sectionEl = ref<HTMLElement>()
defineExpose({ sectionEl })
</script>

<template>
  <section
    id="generate"
    ref="sectionEl"
    class="section-generate mb-16 md:mb-12 lg:mb-16 xl:mb-[160px]"
  >
    <div class="container-fluid">
      <div class="flex justify-center">
        <div
          class="flex items-center justify-center text-[14px] md:text-[16px] h-[32px] md:h-[38px] font-medium mb-[9px] px-[12px] text-(--ds-color-primitive-brand-500) rounded-[21px] bg-(--ds-color-primitive-brand-50) gap-[6px]"
        >
          <svg class="icon">
            <use xlink:href="/images/sprite.svg#chart" />
          </svg>
          <span>{{ $t('landing.simpleCustomization') }}</span>
        </div>
      </div>
      <h2
        class="text-4xl lg:text-[64px] lg:mb-12 md:text-[52px] font-semibold leading-none mb-5 text-center tracking-[-2.56px]"
      >
        {{ $t('landing.generateLinks') }}
      </h2>
      <div
        class="grid max-w-[1028px] mx-auto grid-cols-1 gap-4 md:grid-cols-2 md:gap-3"
      >
        <!-- Card 1 -->

        <div
          class="p-6 rounded-3xl bg-white md:px-8 md:pt-9 md:rounded-[32px] lg:pb-0 lg:p-x-10 lg:pt-9 lg:rounded-[50px] md:col-span-2"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="order-2 md:order-1">
              <h3
                class="font-sans text-lg font-semibold mb-2 -tracking-[0.5px] lg:text-xl"
              >
                {{ $t('landing.customizeLook') }}
              </h3>
              <div
                class="text-sm max-w-[375px] tracking-[-0.12px] text-[#9fa3b3] mb-[25px] lg:text-base"
              >
                {{ $t('landing.chooseDesign') }}
              </div>
              <NuxtLink
                class="landing-cta font-semibold relative inline-flex w-full md:w-[137px] h-[50px] px-[14px] text-white border-0 rounded-full bg-(--ds-color-primitive-brand-500) items-center justify-center hover:bg-(--ds-color-brand-hover) hover:text-white active:bg-(--ds-color-brand-active) after:absolute after:top-[10%] after:right-1 after:left-1 after:h-[80%] after:content-[''] after:transition-all after:duration-300 after:opacity-0 after:border-2 after:border-solid after:rounded-full"
                to="/auth/register"
              >{{ $t('landing.getStarted') }}
              </NuxtLink>
            </div>
            <div
              class="w-[calc(100%-30px)] mx-[15px] mb-[9px] p-0 md:w-[350px] md:pt-[37px] md:pr-[20px] md:m-0 lg:w-auto lg:pt-[10px] lg:pr-[29px] xl:pr-[67px] order-1 md:order-2"
            >
              <div
                class="generate-slider-wrapper"
              >
                <div
                  class="absolute top-[58px] right-[-32px] w-[73px] h-[73px] bg-[url('/images/ticket-slider.webp')] bg-cover md:top-[77px] md:right-[-46px]"
                />
                <div class="generate-slider-main">
                  <strong>{{ $t('landing.selectTemplate') }}</strong>
                  <span>{{ $t('landing.pickStyle') }}</span>
                </div>
                <client-only>
                  <swiper
                    :slides-per-view="'auto'"
                    :speed="400"
                    :loop="true"
                    :space-between="6"
                    :autoplay="{ delay: 2000 }"
                    :modules="modules"
                  >
                    <swiper-slide
                      v-for="(slide, index) in swiperSlides"
                      :key="index"
                    >
                      <img
                        :src="slide.image"
                        alt=""
                      >
                    </swiper-slide>
                  </swiper>
                </client-only>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 2 -->

        <div
          class="p-6 rounded-3xl bg-white md:px-8 md:pt-9 md:rounded-[32px] lg:p-x-10 lg:pt-9 lg:rounded-[50px]"
        >
          <div
            class="text-[9px] leading-[1.4] max-w-[272px] h-[305px] mx-auto mb-[11px] pt-[65px] pl-[22px] text-[#6b6f7c] bg-[url('/images/iphone-2.webp')] bg-no-repeat bg-center bg-cover md:[zoom:1] [zoom:0.8]"
          >
            <div class="max-w-[215px]">
              <div
                class="font-roober text-[16px] font-[600] mb-[6px] tracking-[-0.04em] text-black"
              >
                {{ $t('landing.whichPlatforms') }}
              </div>
              <p>
                {{ $t('landing.pickUpToFive') }}
              </p>
            </div>
          </div>
          <h3
            class="font-sans text-lg font-semibold mb-2 -tracking-[0.5px] lg:text-xl"
          >
            {{ $t('landing.linkSocialMedia') }}
          </h3>
          <div
            class="text-sm max-w-[270px] tracking-[-0.12px] text-[#9fa3b3] lg:text-base"
          >
            {{ $t('landing.selectSocialNetwork') }}
          </div>
        </div>
        <!-- Card 3 -->

        <div
          class="p-6 rounded-3xl bg-white md:px-8 md:pt-9 md:rounded-[32px] lg:p-x-10 lg:pt-9 lg:rounded-[50px]"
        >
          <div
            class="text-[9px] leading-[1.4] max-w-[272px] h-[305px] mx-auto mb-[11px] pt-[53px] pl-[22px] text-[#6b6f7c] bg-[url('/images/iphone-3.webp')] bg-no-repeat bg-center bg-cover md:[zoom:1] [zoom:0.8]"
          >
            <div class="max-w-[215px]">
              <div
                class="font-roober text-[16px] font-[600] mb-[6px] tracking-[-0.04em] text-black"
              >
                {{ $t('landing.syReady') }}
              </div>
              <p>
                {{ $t('landing.shareWithWorld') }}
                <NuxtLink to="#">test.ee/v.ivanova</NuxtLink>
              </p>
            </div>
          </div>
          <h3
            class="font-sans text-lg font-semibold mb-2 -tracking-[0.5px] lg:text-xl"
          >
            {{ $t('landing.letOthersSee') }}
          </h3>
          <div
            class="text-sm  tracking-[-0.12px] text-[#9fa3b3] lg:text-base"
          >
            {{ $t('landing.shareWhenReady') }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.generate-slider-wrapper {
  position: relative;
  width: 332px;
  height: 506px;
  margin-left: auto;
  padding: 109px 36px 0;
  background-image: url('/images/bg-iphone-slider.webp');
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
}

.generate-slider-wrapper :deep(.swiper) {
  position: absolute;
  right: 9px;
  bottom: 37px;
  width: 694px;
}

.generate-slider-wrapper :deep(.swiper)::after {
  position: absolute;
  z-index: 5;
  top: 0;
  left: 0;
  width: 74px;
  height: 100%;
  content: "";
  background: linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, #fff 100%);
}

.generate-slider-wrapper :deep(.swiper-slide) {
  max-width: 130px;
}

.generate-slider-main {
  max-width: 246px;
}

.generate-slider-main strong {
  font-family: "Roobert", sans-serif;
  font-size: 20px;
  font-weight: 600;
  display: block;
  margin-bottom: 5px;
  letter-spacing: -0.05em;
}

.generate-slider-main span {
  font-size: 12px;
  line-height: 1.4;
  color: #6b6f7c;
}

.ticket-user__avatar {
  width: 48px;
  margin: 0 auto 4px;
}

.ticket-user__avatar img {
  border: 1px solid #fff;
  border-radius: 48px;
}

.iphone a {
  color: #1e8eff;
}

@media (max-width: 1024px) {
  .section-generate :deep(.container-fluid) {
    padding: 0 56px;
  }
}

@media (max-width: 992px) {
  .section-generate :deep(.container-fluid) {
    padding: 0 32px;
  }

  .generate-slider-wrapper {
    width: 285px;
    height: 435px;
    padding: 92px 30px 0;
  }

  .generate-slider-wrapper :deep(.swiper) {
    zoom: 0.82;
  }

  .generate-slider-main strong {
    font-size: 17px;
  }

  .generate-slider-main span {
    font-size: 10px;
  }
}

@media (max-width: 767px) {
  .section-generate :deep(.container-fluid) {
    padding: 0 8px;
  }

  .generate-slider-wrapper {
    zoom: .8;
    width: 282px;
    height: 310px;
    margin: 0 auto;
  }

  .generate-slider-wrapper :deep(.swiper) {
    position: static;
    height: 193px;
    width: 100%;
  }

  .generate-slider-wrapper :deep(.swiper)::after {
    top: auto;
    bottom: -11px;
    width: 100%;
    height: 47px;
    background: linear-gradient(
        360deg,
        #fff 0%,
        rgba(255, 255, 255, 0.7) 49.89%,
        rgba(255, 255, 255, 0) 100%
    );
  }

  .generate-slider-main {
    zoom: 0.8;
    margin-bottom: 14px;
  }
}
</style>
