<script setup lang="ts">
import LanguagePicker from '~/components/LanguagePicker.vue'
import { Navigations } from '~/navigations'

const props = defineProps<{
  activeSection: string
}>()

const emit = defineEmits<{
  navClick: [sectionId: string]
}>()

const isMenuActive = ref(false)

const toggleMenu = () => {
  isMenuActive.value = !isMenuActive.value
}

if (import.meta.client) {
  watch(isMenuActive, (newValue) => {
    if (newValue) {
      document.body.classList.add('active-menu')
    }
    else {
      document.body.classList.remove('active-menu')
    }
  }, { immediate: false })

  onBeforeUnmount(() => {
    document.body.classList.remove('active-menu')
  })
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const handleNavClick = (sectionId: string) => {
  emit('navClick', sectionId)
}

const handleMobileNavClick = (sectionId: string) => {
  isMenuActive.value = false
  nextTick(() => {
    emit('navClick', sectionId)
  })
}

const navLinkClass = (sectionId: string) => [
  'relative min-w-[132px] p-2.5 text-center tracking-[-0.12px] rounded-full transition-all duration-300',
  'after:absolute after:top-[10%] after:left-[3%] after:w-[94%] after:h-[80%] after:content-[\'\'] after:transition-all after:duration-300 after:opacity-0 after:border-2 after:rounded-full',
  props.activeSection === sectionId
    ? 'text-white bg-black'
    : 'text-[#6e7382] hover:text-white hover:bg-black focus:text-white focus:bg-black active:text-white active:bg-[#1c1c1c] focus:after:opacity-20',
]
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-[70] p-2 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
    <div class="max-w-[1920px] mx-auto relative">
      <div
        class="flex relative items-center pl-1 lg:pl-4 lg:pr-1 justify-between"
      >
        <NuxtLink
          to="#"
          class="logo"
          @click.prevent="scrollToTop"
        >
          <svg class="icon icon-logo">
            <use xlink:href="/images/sprite.svg#logo" />
          </svg>
        </NuxtLink>
        <nav
          class="absolute left-1/2 hidden xl:flex p-0.5 -translate-x-1/2 rounded-full bg-gray-100 items-center gap-0.5"
        >
          <NuxtLink
            to="#generate"
            :class="navLinkClass('generate')"
            @click.prevent="handleNavClick('generate')"
          >
            {{ $t('landing.customization') }}
          </NuxtLink>
          <NuxtLink
            to="#analytics"
            :class="navLinkClass('analytics')"
            @click.prevent="handleNavClick('analytics')"
          >
            {{ $t('landing.analytics') }}
          </NuxtLink>
          <NuxtLink
            to="#contacts"
            :class="navLinkClass('contacts')"
            @click.prevent="handleNavClick('contacts')"
          >
            {{ $t('landing.contactUs') }}
          </NuxtLink>
        </nav>
        <div class="ml-auto mr-2 lg:mr-4">
          <LanguagePicker size="big" />
        </div>
        <div
          class="hidden xl:inline-flex xl:items-center xl:justify-center xl:gap-2"
        >
          <NuxtLink
            class="button button--primary"
            to="/auth/register"
          >{{ $t('landing.signUp') }}
          </NuxtLink>
          <NuxtLink
            class="button"
            :to="Navigations.LOGIN"
          >{{ $t('landing.logIn') }}</NuxtLink>
        </div>
        <button
          class="open-menu"
          @click="toggleMenu"
        >
          <span />
        </button>
      </div>
    </div>
  </header>

  <!-- Mobile Menu -->
  <div class="mobile-header-menu">
    <nav
      class="header-menu flex flex-col mb-[33px] translate-x-0 bg-transparent gap-[9px]"
    >
      <NuxtLink
        to="#generate"
        :class="navLinkClass('generate')"
        @click.prevent="handleMobileNavClick('generate')"
      >
        {{ $t('landing.customization') }}
      </NuxtLink>
      <NuxtLink
        to="#analytics"
        :class="navLinkClass('analytics')"
        @click.prevent="handleMobileNavClick('analytics')"
      >
        {{ $t('landing.analytics') }}
      </NuxtLink>
      <NuxtLink
        to="#contacts"
        :class="navLinkClass('contacts')"
        @click.prevent="handleMobileNavClick('contacts')"
      >
        {{ $t('landing.contactUs') }}
      </NuxtLink>
    </nav>
    <div
      class="flex flex-col w-full mx-auto items-center justify-center gap-2 max-w-[240px]"
    >
      <NuxtLink
        class="button w-100"
        to="auth/register"
      >{{ $t('landing.signUp') }}</NuxtLink>
      <NuxtLink
        class="button w-100 button--primary"
        to="auth/login"
      >{{ $t('landing.logIn') }}</NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.open-menu {
  position: relative;
  display: none;
  width: 40px;
  height: 40px;
  transition: 0.3s;
  border: 0;
  border-radius: 50%;
  background-color: #f5f5fa;
}

.open-menu span {
  position: relative;
  display: block;
  width: 18px;
  height: 1.71px;
  transition: 0.3s;
  border-radius: 5.14286px;
  background-color: #000;
  flex: 0 0 auto;
}

.open-menu span:before {
  position: absolute;
  top: -6px;
  left: 0;
  width: 100%;
  height: 2px;
  content: "";
  transition: 0.3s;
  background-color: #000;
}

.open-menu span:after {
  position: absolute;
  top: 6px;
  left: 0;
  width: 100%;
  height: 2px;
  content: "";
  transition: 0.3s;
  background-color: #000;
}

.mobile-header-menu {
  position: fixed;
  z-index: 60;
  top: 0;
  left: 0;
  display: none;
  width: 100%;
  height: 437px;
  padding-top: 96px;
  border-radius: 0 0 24px 24px;
  background: linear-gradient(171.94deg, #915eff 13.58%, #fff 100.67%);
}

.mobile-header-menu .header-menu a {
  color: #fff;
}

.header-main .button--primary {
  --bg-color: #f6f7f8;
}

.header-main .button--primary:hover {
  --bg-color: #000;
}

.header-main .button--primary:active {
  --bg-color: #1c1c1c;
}

.header-main .button--primary:focus {
  --bg-color: #000;
}

@media (max-width: 1280px) {
  .open-menu {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mobile-header-menu {
    display: flex;
    flex-direction: column;
    transition: 0.3s;
    transform: translateY(-100%);
    align-items: center;
  }
}

@media (max-width: 992px) {
  .header-main .header-menu {
    display: none;
  }
}
</style>
