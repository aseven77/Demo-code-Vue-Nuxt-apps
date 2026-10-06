<script setup lang="ts">
import { useI18n } from '#imports'
import { Navigations } from '~/navigations'

const { t } = useI18n()

interface Props {
  page: 'login' | 'register'
}

/* todo: Надо сделать nuxt link component */

const props = defineProps<Props>()
const { page } = toRefs(props)

const content = computed(() => {
  if (page.value === 'login') {
    return {
      question: t('auth.noAccount'),
      goal: t('auth.register'),
      link: '/auth/register',
    }
  }

  return {
    question: t('auth.haveAccount'),
    goal: t('auth.logIn'),
    link: Navigations.LOGIN,
  }
})
</script>

<template>
  <div class="text-center flex gap-2 justify-center items-center">
    <p
      class="
     [color:var(--ds-color-fg-tertiary)]
     [font-size:var(--ds-typography-body-p1-font-size)]
     [font-weight:var(--ds-typography-body-p1-regular-font-weight]
     [line-height:var(--ds-typography-body-p1-line-height]
     [letter-spacing:var(--ds-typography-body-p1-letter-spacing]
  "
    >
      {{ content.question }}
    </p>
    <!--
            [color:var(--ds-color-fg-tertiary)]
        [font-size:var(--ds-typography-body-p1-font-size)]
        [font-weight:var(--ds-typography-body-p1-regular-font-weight]
        [line-height:var(--ds-typography-body-p1-line-height]
        [letter-spacing:var(--ds-typography-body-p1-letter-spacing]
        -->
    <ULink :to="content.link">{{ content.goal }}</ULink>
  </div>
</template>

<style scoped>

</style>
