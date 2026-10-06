<script setup lang="ts">
</script>

<template>
  <section
    class="mb-[129px] md:pb-[0] lg:mb-0 xl:mb-[47px] lg:pb-0 mt-24"
  >
    <div class="max-w-[1920px] mx-auto px-[15px] relative">
      <div class="relative z-[2] max-w-[455px] mx-auto text-center">
        <h1
          class="text-4xl lg:text-[64px] md:text-[52px] font-semibold leading-none sm:mb-[14px] mb-[6px] text-center tracking-[-2.56px]"
        >
          {{ $t('landing.oneLinkInfiniteOptions') }}
        </h1>
        <p
          class="sm:text-base text-sm font-normal mb-[18px] tracking-[-0.12px] text-gray-500"
        >
          {{ $t('landing.createSinglePage') }}
        </p>
        <NuxtLink
          class="landing-cta font-semibold relative inline-flex md:w-[137px] h-[50px] px-[14px] text-white border-0 rounded-full bg-(--ds-color-primitive-brand-500) items-center justify-center hover:bg-(--ds-color-brand-hover) hover:text-white active:bg-(--ds-color-brand-active) after:absolute after:top-[10%] after:right-1 after:left-1 after:h-[80%] after:content-[''] after:transition-all after:duration-300 after:opacity-0 after:border-2 after:border-solid after:rounded-full"
          to="/auth/register"
        >{{ $t('landing.getStarted') }}
        </NuxtLink>
      </div>
      <div class="main-section-wrapper">
        <!-- Left Phone -->

        <div
          class="hidden z-[2]
          md:max-w-[305px] md:absolute md:block md:top-0 md:-left-[64px]
          lg:top-[238px] lg:-left-[66px ] lg:max-w-[550px] lg:[zoom:0.75]
          xl:[zoom:1] xl:top-[177px] xl:left-[-7px]

"
        >
          <div
            class="absolute text-[10px]
            font-medium leading-none top-[46px] right-[98px]
            w-[183px] h-[72px] pt-[16px] pl-[15px]
            bg-[url('/images/left-dialog.webp')] bg-no-repeat bg-center bg-cover
            md:[zoom:0.75]
            lg:[zoom:1]
            lg:text-sm lg:top-[64px] lg:right-[114px] lg:w-[274px] lg:h-[94px] lg:pt-[18px] lg:pl-[30px]"
          >
            <span class="flex items-center gap-1">
              {{ $t('landing.wowSubscribers') }}
            </span>
          </div>
          <img
            src="/images/phone-left.webp"
            alt=""
          >
          <div
            class="absolute flex flex-col items-center justify-center gap-px text-xs font-medium
            w-[72px] h-[59px] py-2 right-[66px] bottom-[-30px] rounded-[18.1px]
             bg-white shadow-[0_4.525px_10.5583px_rgba(112,144,176,0.12)]
             md:[zoom:0.75]
             lg:[zoom:1]
             lg:text-sm lg:w-[97px] lg:h-[75px] lg:py-[9px] lg:right-[88px] lg:bottom-[-40px] lg:rounded-2xl
             lg:shadow-(--ds-shadow-custom-card)"
          >
            <img
              class="max-w-[26px] lg:max-w-[33px]"
              src="/images/bell.webp"
              alt=""
            >
            <span>+2,457</span>
          </div>
        </div>

        <!-- Main Section Girl -->

        <div class="-mx-4 relative z-[1] ">
          <div
            class="max-w-[592px] h-[544px]
             mx-auto pt-[23px] bg-[url('/images/girl-model.webp')] bg-no-repeat bg-center bg-cover [zoom:0.65]
             md:[zoom:0.6] md:top-5
             lg:[zoom:0.75]
             xl:[zoom:1]
"
          >
            <div
              class="flex flex-col w-[284px] h-[584px] mx-auto pb-8 bg-[url('/images/phone-model.webp')] bg-no-repeat bg-center bg-cover justify-end items-center"
            >
              <div class="mb-[24px]">
                <NuxtLink
                  class="mb-2 flex w-[222px] h-[39.65px] p-[9px_11px] border border-white/6 rounded-full bg-white/28 items-center gap-[10px] backdrop-blur-[3.82578px]"
                  to="#"
                >
                  <span class="w-5 h-5">
                    <img
                      src="/images/social-icon/inst.svg"
                      alt=""
                    >
                  </span>
                  <span class="social-user__name social-user__name--placeholder">Наименование</span>
                </NuxtLink>
                <NuxtLink
                  class="mb-2 flex w-[222px] h-[39.65px] p-[9px_11px] border border-white/6 rounded-full bg-white/28 items-center gap-[10px] backdrop-blur-[3.82578px]"
                  to="#"
                >
                  <span class="w-5 h-5">
                    <img
                      src="/images/social-icon/only.svg"
                      alt=""
                    >
                  </span>
                  <span class="social-user__name social-user__name--placeholder">Ссылка</span>
                </NuxtLink>
                <NuxtLink
                  class="flex w-[222px] h-[39.65px] p-[9px_11px] border border-white/6 rounded-full bg-white/28 items-center gap-[10px] backdrop-blur-[3.82578px]"
                  to="#"
                >
                  <span class="w-5 h-5">
                    <img
                      src="/images/social-icon/tiktok.svg"
                      alt=""
                    >
                  </span>
                  <span class="social-user__name social-user__name--placeholder">Наименование</span>
                </NuxtLink>
              </div>
              <NuxtLink
                class="social-subscribe"
                to="#"
              >{{ $t('landing.subscribe') }}</NuxtLink>
            </div>
          </div>
        </div>

        <!-- Right Phone -->

        <div class="right-phone">
          <div class="right-phone__dialog">
            <span>
              {{ $t('landing.newPhotos') }}
            </span>
          </div>
          <img
            class="right-phone__picture"
            src="/images/phone-right.webp"
            alt=""
          >
          <div
            class="absolute right-[62px] bottom-[-80px] max-w-[148px] lg:right-[84px] lg:bottom-[-110px] lg:max-w-[195px]"
          >
            <img
              src="/images/diagramm.webp"
              alt=""
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.main-section-wrapper {
  position: relative;
  z-index: 1;
  top: -140px;
  max-width: 1440px;
  margin: 0 auto;
  padding-top: 175px;
}

.main-section-wrapper::before {
  position: absolute;
  top: 204.39px;
  left: 407.76px;
  width: 382.26px;
  height: 454.6px;
  content: "";
  transform: matrix(0.93, 0.37, -0.25, 0.97, 0, 0);
  background: linear-gradient(0deg, #d3b7ff, #d3b7ff), #dcc5ff;
  filter: blur(106.912px);
}

.main-section-wrapper::after {
  position: absolute;
  top: 92.21px;
  left: 684.89px;
  width: 474.88px;
  height: 564.74px;
  content: "";
  transform: matrix(0.93, 0.37, -0.25, 0.97, 0, 0);
  background: #ffbbef;
  filter: blur(106.912px);
}

.social-user__name {
  position: relative;
  display: inline-flex;
  width: auto;
}

.social-user__name--placeholder {
  overflow: hidden;
  white-space: nowrap;
  text-indent: 100%;
}

.social-user__name--placeholder::after {
  position: absolute;
  top: 50%;
  left: 0;
  display: inline-block;
  width: 100%;
  height: 6px;
  content: "";
  transform: translateY(-50%);
  vertical-align: middle;
  opacity: 0.32;
  border-radius: 10px;
  background-color: white;
}

.social-subscribe {
  font-size: 13px;
  font-weight: 600;
  display: flex;
  width: 222px;
  height: 39px;
  color: #8e8688;
  border-radius: 999px;
  background: #fff4fd;
  align-items: center;
  justify-content: center;
}

.right-phone {
  position: absolute;
  z-index: 2;
  top: 133px;
  right: 23px;
  max-width: 564px;
}

.right-phone__dialog {
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  position: absolute;
  top: 90px;
  right: 114px;
  width: 241px;
  height: 94px;
  padding: 18px 16px 0 33px;
  background-image: url("/images/right-dialog.webp");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.right-phone__dialog span {
  display: flex;
  align-items: center;
  gap: 3px;
}

.right-phone__dialog img {
  max-width: 17px;
}

@media (max-width: 1024px) {
  .main-section-wrapper::before {
    top: 153.7px;
    left: 276.52px;
    width: 288.29px;
    height: 342.85px;
    filter: blur(80.6293px);
  }

  .main-section-wrapper::after {
    top: 69.09px;
    left: 485.52px;
    width: 358.14px;
    height: 425.91px;
    filter: blur(80.6293px);
  }

  .left-phone__dialog img {
    max-width: 13px;
  }

  .card_1 img {
    max-width: 26px;
  }

  .right-phone {
    top: 140px;
    right: -29px;
    max-width: 425px;
  }

  .right-phone__dialog {
    font-size: 11px;
    top: 68px;
    right: 84px;
    width: 183px;
    height: 72px;
    padding: 17px 0 0 25px;
  }

  .right-phone__dialog img {
    max-width: 13px;
  }
}

@media (max-width: 992px) {
  .main-section-wrapper {
    top: 0;
    margin-top: 46px;
    padding-top: 0;
  }

  .main-section-wrapper::before {
    top: 115.65px;
    left: 207.39px;
    width: 216.22px;
    height: 257.13px;
    filter: blur(60.472px);
  }

  .main-section-wrapper::after {
    position: absolute;
    top: 52.19px;
    left: 364.14px;
    width: 268.6px;
    height: 319.43px;
    background: #ffbbef;
    filter: blur(60.472px);
  }

  .right-phone {
    top: -35px;
    right: -66px;
    zoom: 0.75;
  }
}

@media (max-width: 767px) {
  .main-section-wrapper {
    margin-top: 27px;
  }

  .main-section-wrapper::before {
    top: 108.68px;
    left: 7.73px;
    width: 259.43px;
    height: 259.43px;
    transform: rotate(17.58deg);
    background: linear-gradient(0deg, #c7a3ff, #c7a3ff), #dcc5ff;
    filter: blur(65.3254px);
  }

  .main-section-wrapper::after {
    top: 28.71px;
    left: 133.27px;
    width: 322.29px;
    height: 322.29px;
    transform: rotate(17.58deg);
    background: #fac4ed;
    filter: blur(65.3254px);
  }

  .right-phone {
    display: none;
  }
}
</style>
