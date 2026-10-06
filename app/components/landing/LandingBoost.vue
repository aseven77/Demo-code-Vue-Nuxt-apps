<script setup lang="ts">
</script>

<template>
  <section
    class="boost relative overflow-hidden
    w-[calc(100%-16px)] h-[370px]
    my-[60px] rounded-3xl bg-[url('/images/boost-bg.jpg')] bg-no-repeat bg-center bg-cover
    md:h-[585px] mx-auto md:my-[48px] md:rounded-[60px] md:w-[calc(100%-32px)]
    lg:h-[785px] lg:mx-auto lg:my-[60px]
    xl:max-w-[1376px] xl:w-full xl:mb-30"
  >
    <div class="relative h-full transition-all duration-500">
      <div
        class="absolute hidden lg:flex flex-col items-center justify-center gap-px text-xs font-medium w-[72px] h-[59px]
        py-2 right-[66px] bottom-[-30px] rounded-[18.1px] bg-white shadow-[0_4.525px_10.5583px_rgba(112,144,176,0.12)]
        md:[zoom-0.6]
        lg:text-sm lg:w-[97px] lg:h-[75px] lg:py-[9px] lg:right-[88px] lg:bottom-[-40px] lg:rounded-2xl
        lg:shadow-(--ds-shadow-custom-card)
        lg:left-[154px] lg:top-[60px]
        xl:left-[258px] xl:top-[66px]
      "
      >
        <img
          class="max-w-[26px] lg:max-w-[33px]"
          src="/images/star-struck.webp"
          alt=""
        >
        <span>{{ $t('landing.plus5kClicks') }} </span>
      </div>
      <div
        class="absolute top-[2%] right-[1%] max-w-[148px] [zoom:0.8]
        md:right-[12px] md:top-[46px] md:[zoom:1.4]
        lg:bottom-auto  lg:max-w-[195px] lg:[zoom:1]
        lg:top-[28%] lg:left-[4%] lg:right-auto xl:[zoom:1]"
      >
        <img
          src="/images/viewers.webp"
          alt=""
        >
      </div>
      <div
        class="text-sm font-medium absolute top-[12%] left-[3%] flex flex-col w-[109px]
        h-[90px] py-[9px] text-center rounded-[24px] bg-white shadow-(--ds-shadow-custom-card)
        items-center gap-px [zoom:0.6]
        md:top-[17%] md:left-[4%] md:right-auto md:[zoom:1]
        lg:top-[238px] lg:right-[7%]
        xl:top-[33%] lg:left-auto"
      >
        <img
          class="max-w-[26px] lg:max-w-[33px]"
          src="/images/rocket.webp"
          alt=""
        >
        <span>{{ $t('landing.plus1076Subscribers') }} </span>
      </div>
      <div
        class="hidden text-sm font-medium leading-none absolute w-[346px] h-[100px]
        pt-[21px] pl-[27px] pr-5 bg-[url('/images/dialog_1.webp')] bg-no-repeat bg-center bg-cover lg:block lg:top-[6.5%] lg:right-[5%]"
      >
        <span class="flex items-center gap-[3px]">
          {{ $t('landing.wholeStory') }}

        </span>
      </div>
      <div
        class="text-sm font-medium leading-none absolute bottom-[37%] left-0 w-[272px] h-[99px] pt-[25px] pl-[37px] bg-[url('/images/dialog_2.webp')] bg-no-repeat bg-center bg-cover [zoom:0.7] md:bottom-[29%] md:left-[1%] md:[zoom:1] xl:bottom-[23%] xl:left-[9%]"
      >
        <span class="flex items-center gap-[9px]">
          {{ $t('landing.oneClickToSuccess') }}
        </span>
      </div>
    </div>
    <div
      class="absolute bottom-6 left-1/2 w-full max-w-[500px] -translate-x-1/2 text-center text-white px-6 md:bottom-8 md:px-0 lg:bottom-15"
    >
      <div
        class="font-roobert text-2xl font-semibold leading-none
        mb-[18px] tracking-[-1.04px] md:text-[44px] md:mb-[25px] md:tracking-[-1.76px]"
      >
        {{ $t('landing.boostReach') }}
      </div>
      <NuxtLink
        class="landing-cta font-semibold relative inline-flex w-full md:w-auto h-[50px] px-[24px] text-white border-0 rounded-full bg-(--ds-color-primitive-brand-500) items-center justify-center hover:bg-(--ds-color-brand-hover) hover:text-white active:bg-(--ds-color-brand-active)"
        to="/auth/register"
      >{{ $t('landing.getStarted') }}
      </NuxtLink>
    </div>
  </section>
</template>
