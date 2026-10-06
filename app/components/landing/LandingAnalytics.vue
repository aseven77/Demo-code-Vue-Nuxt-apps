<script setup lang="ts">
const sectionEl = ref<HTMLElement>()
defineExpose({ sectionEl })
</script>

<template>
  <section
    id="analytics"
    ref="sectionEl"
    class="analytics"
  >
    <div class="container-fluid">
      <div class="flex justify-center">
        <div
          class="flex items-center justify-center text-[14px] md:text-[16px] h-[32px] md:h-[38px] font-medium mb-[9px] px-[12px] text-(--ds-color-primitive-brand-500) rounded-[21px] bg-(--ds-color-primitive-brand-50) gap-[6px]"
        >
          <svg class="icon">
            <use xlink:href="/images/sprite.svg#graph" />
          </svg>
          <span>{{ $t('landing.fullAnalytics') }}</span>
        </div>
      </div>
      <h2
        class="md:text-[64px] sm:text-[52px] text-4xl font-semibold leading-none sm:mb-5 mb-[6px] text-center tracking-[-2.56px]"
      >
        {{ $t('landing.learnAboutFollowers') }}
      </h2>
      <div
        class="analytics-grid grid max-w-[450px] mx-auto gap-[10px] md:max-w-[1028px] md:grid-cols-[37.5%_auto]"
      >
        <div
          class="relative overflow-hidden h-[290px] p-[34px] text-center rounded-[32px] bg-gradient-to-t from-[#ffb7e1] from-[0.37%] to-[#ff5fb6] to-[99.67%] md:h-[275px] lg:h-[329px] lg:p-[38px] lg:rounded-[50px]"
        >
          <div
            class="absolute bottom-0 left-0 w-full h-[275px] bg-[url('/images/media-after.svg)]"
          />
          <div
            class="font-roober text-[22px] leading-[1.2] mb-[32px] text-white"
          >
            {{ $t('landing.trackStats') }}
          </div>
          <img
            class="block max-w-[75%] mx-auto md:absolute md:bottom-0 md:left-1/2 md:-translate-x-1/2 md:mx-[initial]"
            src="/images/iphone-4.webp"
            alt=""
          >
        </div>
        <div
          class="relative flex flex-col-reverse md:block p-6 rounded-3xl bg-white md:px-8 md:pt-9 md:rounded-[32px] lg:pb-0 lg:p-x-10 lg:pt-9 lg:rounded-[50px]"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div
                class="font-sans text-lg font-semibold mb-2 -tracking-[0.5px] lg:text-xl"
              >
                {{ $t('landing.monitorMetrics') }}
              </div>
              <div
                class="text-sm max-w-[250px] tracking-[-0.12px] text-[#9fa3b3] mb-[25px] lg:text-base"
              >
                {{ $t('landing.keepEyeOnStats') }}
              </div>
            </div>
          </div>
          <img
            class="block max-w-[88%] mx-auto mb-[36px] md:absolute md:right-[20px] md:bottom-0 md:max-w-[56%] md:mb-[initial] md:mx-[initial]"
            src="/images/iphone-5.webp"
            alt=""
          >
        </div>
        <div
          class="p-6 rounded-3xl bg-white
          md:px-8 md:pt-9 md:rounded-[32px] md:col-[1_/_3]
          lg:pb-0 lg:p-x-10 lg:pt-9 lg:rounded-[50px] generate-card generate-card--review"
        >
          <div
            class="flex flex-col-reverse grid-cols-1 md:grid-cols-2 gap-4 md:mx-[-12px] w-full"
          >
            <div class="block md:px-[12px]">
              <div
                class="font-sans text-lg font-semibold mb-2 -tracking-[0.5px] lg:text-xl"
              >
                {{ $t('landing.reviewProfileViews') }}
              </div>
              <div
                class="text-sm max-w-[375px] tracking-[-0.12px] text-[#9fa3b3] mb-3 lg:text-base"
              >
                {{ $t('landing.evaluateAudience') }}
              </div>
              <div class="mb-3">
                <NuxtLink
                  class="inline-flex px-[2px] text-[#ff50af] rounded-[2px] items-center gap-[3px] hover:text-[#ff9cd2] active:text-[#ff81c6] active:outline active:outline-1 active:outline-[#ff9cd2]"
                  to="#"
                >
                  {{ $t('landing.setupToday') }}

                  <img
                    class="max-w-[20px]"
                    src="/images/like.webp"
                    alt=""
                  >
                </NuxtLink>
              </div>
              <NuxtLink
                class="landing-cta font-semibold relative inline-flex w-full md:w-[137px] h-[50px] px-[14px] text-white border-0 rounded-full bg-(--ds-color-primitive-brand-500) items-center justify-center hover:bg-(--ds-color-brand-hover) hover:text-white active:bg-(--ds-color-brand-active)"
                to="/auth/register"
              >
                {{ $t('landing.getStarted') }}
              </NuxtLink>
            </div>
            <div
              class="generate-card-review_img md:px-[12px]"
            >
              <div
                class="absolute bottom-0 left-0 w-full h-[75.26px] bg-gradient-to-t from-white via-white/70 to-transparent"
              />
              <img
                class="img"
                src="/images/iphone-6.webp"
                alt=""
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.analytics {
  margin-bottom: 120px;
}

.analytics-grid .generate-card {
  padding-bottom: 0;
}

.analytics-grid .generate-card:nth-child(3) {
  padding-right: 85px;
  grid-column: 1/3;
}

.link-green img {
  max-width: 20px;
}

.generate-card--review {
  position: relative;
  height: 435px;
}

.generate-card-review_img {
  position: absolute;
  right: 72px;
  bottom: 0;
  max-width: 414px;
  text-align: center;
}

@media (max-width: 1024px) {
  .analytics {
    margin-bottom: 61px;
  }

  .analytics :deep(.container-fluid) {
    padding: 0 56px;
  }

  .analytics-grid .generate-card:nth-child(3) {
    padding-right: 40px;
    padding-bottom: 0;
  }

  .generate-card-review_img {
    right: 27px;
  }
}

@media (max-width: 992px) {
  .analytics {
    margin-bottom: 60px;
  }

  .analytics :deep(.container-fluid) {
    padding: 0 32px;
  }

  .generate-card--review {
    height: 355px;
  }

  .generate-card-review_img {
    max-width: 350px;
  }
}

@media (max-width: 767px) {
  .analytics :deep(.container-fluid) {
    padding: 0 8px;
  }

  .analytics-grid .generate-card {
    padding-bottom: 24px;
  }

  .analytics-grid .generate-card:nth-child(3) {
    padding: 24px;
    grid-column: 1/2;
  }

  .generate-card--review {
    display: flex;
    height: auto;
  }

  .generate-card--review .row {
    flex-direction: column-reverse;
  }

  .generate-card-review_img {
    position: relative;
    z-index: 3;
    right: auto;
    overflow: hidden;
    height: 252px;
    margin: 0 auto;

    img {
      position: relative;
      left: -15px;
      z-index: -1;
    }
  }
}
</style>
