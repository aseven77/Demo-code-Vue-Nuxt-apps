<script setup lang="ts">
import LandingHeader from '~/components/landing/LandingHeader.vue'
import LandingHero from '~/components/landing/LandingHero.vue'
import LandingGenerate from '~/components/landing/LandingGenerate.vue'
import LandingBoost from '~/components/landing/LandingBoost.vue'
import LandingAnalytics from '~/components/landing/LandingAnalytics.vue'
import LandingContacts from '~/components/landing/LandingContacts.vue'
import LandingFooter from '~/components/landing/LandingFooter.vue'

// Активная секция для навигации
const activeSection = ref<string>('')

// Component refs для секций
const generateComp = ref<InstanceType<typeof LandingGenerate>>()
const analyticsComp = ref<InstanceType<typeof LandingAnalytics>>()
const contactsComp = ref<InstanceType<typeof LandingContacts>>()

// Плавный скролл к секции с учетом отступа для хедера
const scrollToSection = (el: HTMLElement | undefined) => {
  if (el) {
    const headerOffset = 80
    const elementPosition = el.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.scrollY - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
}

// Мапинг ID секций на component refs
const getSectionEl = (sectionId: string): HTMLElement | undefined => {
  const map: Record<string, Ref<{ sectionEl?: HTMLElement } | undefined>> = {
    generate: generateComp,
    analytics: analyticsComp,
    contacts: contactsComp,
  }
  return map[sectionId]?.value?.sectionEl
}

// Обработчик клика по навигации
const handleNavClick = (sectionId: string) => {
  scrollToSection(getSectionEl(sectionId))
}

// IntersectionObserver для отслеживания активной секции
onMounted(() => {
  const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.target.id) {
        activeSection.value = entry.target.id
      }
    })
  }, observerOptions)

  const sectionEls = ['generate', 'analytics', 'contacts']
    .map(id => getSectionEl(id))
    .filter((el): el is HTMLElement => !!el)

  sectionEls.forEach(el => observer.observe(el))

  onBeforeUnmount(() => {
    observer.disconnect()
  })
})
</script>

<template>
  <div class="w-full body_main overflow-x-hidden md:overflow-visible pt-[72px]">
    <LandingHeader
      :active-section="activeSection"
      @nav-click="handleNavClick"
    />
    <LandingHero />
    <LandingGenerate ref="generateComp" />
    <LandingBoost />
    <LandingAnalytics ref="analyticsComp" />
    <LandingContacts ref="contactsComp" />
    <LandingFooter />
  </div>
</template>

<style>
.body_main {
  font-family: "Inter", sans-serif;
  font-size: 16px;
  line-height: 1.375;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
  color: #000;
  border: 0;
  background: linear-gradient(
      180deg,
      #fff 0%,
      #fdfefe 22.95%,
      #f9fafb 24.41%,
      #f6f7f8 34.66%,
      #fafafb 44.35%,
      #fff 61.87%,
      #f8f8f9 66.52%,
      #f6f7f8 80.86%,
      #fefefe 96.07%
  );
}

.body_main .container-fluid {
  position: relative;
  max-width: 1920px;
  margin: 0 auto;
  padding: 0 15px;
}

.body_main a {
  transition: 0.3s;
  text-decoration: none;
}

.body_main a:hover {
  text-decoration: none;
}

.body_main input,
.body_main textarea {
  border-radius: 0;
}

.body_main input:focus,
.body_main textarea:focus {
  outline: 0;
}

.body_main p {
  margin-bottom: 0;
}

.body_main p:not(:last-child) {
  margin-bottom: 20px;
}

.body_main svg {
  fill: currentColor;
}

.body_main .w-100 {
  width: 100%;
  max-width: none !important;
}

.body_main ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.body_main input[type="number"] {
  -moz-appearance: textfield;
}

.body_main .button {
  font-weight: 600;
  position: relative;
  display: inline-flex;
  min-width: 103px;
  padding: 12px;
  color: var(--color);
  border: 0;
  border-radius: 999px;
  background-color: var(--bg-color);
  --color: #fff;
  --bg-color: #000;
  align-items: center;
  justify-content: center;
}

.body_main .button::after {
  position: absolute;
  top: 10%;
  right: 4px;
  left: 4px;
  height: 80%;
  content: "";
  transition: 0.3s;
  opacity: 0;
  border: 2px solid;
  border-radius: 999px;
}

.body_main .button:hover {
  --bg-color: #fff;
  --color: #000;
}

.body_main .button:active {
  --bg-color: #eee7ff;
  --color: #000;
}

.body_main .button:focus {
  --bg-color: #fff;
  --color: #000;
}

.body_main .button:focus::after {
  opacity: 1;
}

.body_main .button:disabled {
  opacity: 0.5;
}

.body_main .button--primary {
  --bg-color: #f6f7f8;
  --color: #000;
}

.body_main .button--primary:hover {
  --color: #fff;
  --bg-color: #000;
}

.body_main .button--primary:active {
  --bg-color: #1c1c1c;
  --color: #fff;
}

.body_main .button--primary:focus {
  --bg-color: #000;
  --color: #fff;
}

.body_main .icon {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentColor;
}

.body_main .icon-logo {
  width: 102px;
  height: 36px;
  transition: 0.3s;
  fill: #000;
  stroke: none;
}

.body_main .logo:hover .icon-logo {
  opacity: 0.7;
}

/* active-menu styles (applied to body, affect header/mobile-menu) */
.active-menu {
  position: relative;
  overflow: hidden;
}

.active-menu::after {
  position: fixed;
  z-index: 55;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  content: "";
  background-color: rgba(0, 0, 0, 0.32);
}

.active-menu .mobile-header-menu {
  transform: translateY(0);
}

.active-menu .icon-logo {
  fill: #fff;
}

.active-menu .open-menu {
  background: rgba(245, 245, 250, 0.16);
}

.active-menu .open-menu span {
  background-color: transparent;
}

.active-menu .open-menu span::before {
  top: 0;
  transform: rotate(45deg);
  background-color: #fff;
}

.active-menu .open-menu span::after {
  top: 0;
  transform: rotate(-45deg);
  background-color: #fff;
}

@media (max-width: 992px) {
  .body_main .icon-logo {
    width: 88px;
  }
}

@media (max-width: 767px) {
  .body_main .icon {
    width: 16px;
    height: 16px;
  }

  .body_main .icon-logo {
    width: 88px;
    height: 36px;
  }
}
</style>
