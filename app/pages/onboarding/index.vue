<template>
  <NuxtLayout
    name="onboarding-layout"
    :disabled-button="isDisabledButton"
    :disabled-skip-all="hasBioLinks"
    :progress-value="currentStep"
    :user="_user"
    @on-prev-step-click="onPrevStepClick"
    @on-skip-all-the-steps="onSkipAllTheSteps"
    @on-the-next-step="onTheNextStep"
  >
    <component
      :is="currentView"
      v-model:name="_user.name"
      v-model:nickname="_user.slug"
      v-model:about-self="_user.bio"
      :user-image="_user.image"
      :step-one="stepOneState"
      :step-two="stepTwoState"
      :step-two-hint-list="stepTwoHintList"
      :step-three="stepThreeState"
      :selected-theme-id="_user.background?.id ?? null"
      @crop="onCrop"
      @remove-user-image="onRemoveUserImage"
      @select-theme="onSelectTheme"
      @has-bio-links="(val: boolean) => hasBioLinks = val"
    />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import OnboardingStepOne from '~/components/onboarding/OnboardingStepOne.vue'
import OnboardingStepTwo from '~/components/onboarding/OnboardingStepTwo.vue'
import OnboardingStepThree from '~/components/onboarding/OnboardingStepThree.vue'
import OnboardingStepFive from '~/components/onboarding/OnboardingStepFive.vue'
import OnboardingStepSix from '~/components/onboarding/OnboardingStepSix.vue'
import OnboardingFinal from '~/components/onboarding/OnboardingFinal.vue'
import { useOnboarding } from '~/composables/useOnboarding'
import type { ISharedHintListProps } from '~/types/components/shared-hint-list.types'
import { useUserStore } from '~/stores/user'
import OnboardingUploaderPhoto from '~/components/onboarding/OnboardingUploaderPhoto.vue'
import type { Background, User } from '~/generatedApi'
import { useI18n } from '#imports'
import { Navigations } from '~/navigations'

const { t } = useI18n()
const { stepOneState, stepTwoState, stepThreeState } = useOnboarding()
const userStore = useUserStore()
const { user, themes } = storeToRefs(userStore)

const { error, data } = await useAsyncData('get-user', () => userStore.getUser())

if (error.value) {
  await navigateTo(Navigations.LOGIN)
}
else {
  userStore.$patch({
    user: data.value,
  })
}

if (!user.value) {
  await navigateTo(Navigations.LOGIN)
}

// Запрет доступа к онбордингу, если он уже пройден
if (user.value?.is_onboarding_passed) {
  await navigateTo('/profile')
}

/* todo: проверить утечку памяти */
const _user = useCookie<User>('onboarding-state', {
  default: (): User => ({
    id: user.value?.id,
    background: user.value?.background,
    theme_image: user.value?.theme_image,
    link_theme_id: user.value?.link_theme_id,
    iso_country_code_id: user.value?.iso_country_code_id,
    name: user.value?.name ?? '',
    slug: user.value?.slug ?? '',
    email: user.value?.email ?? '',
    bio: user.value?.bio ?? '',
    image: user.value?.image ?? '',
    qr_code: user.value?.qr_code,
    links: user.value?.links ?? [],
  }), watch: true,
})

const currentStep = useCookie<number>('onboarding-step', { default: (): number => 0, watch: 'shallow' })

const stepTwoValidateConditions = reactive({

  isValidLength: computed((): boolean => {
    if (_user.value.slug) {
      return _user.value.slug.length >= stepTwoState.minInputLength
        && _user.value.slug.length <= stepTwoState.maxInputLength
    }
    return false
  },
  ),
  isValidSymbols: computed((): boolean => {
    if (_user.value.slug) {
      return stepTwoState.regexpHasNumbersAndLatin.test(_user.value.slug)
    }
    return false
  }),
  isValidNickname: computed((): boolean => stepTwoState.isUniqueNickname),
})

const hasBioLinks = ref(false)

const isDisabledButton = computed(() => {
  const name = _user.value?.name ?? ''
  const bio = _user.value?.bio ?? ''

  if (currentStep.value === 0) {
    return name.length < stepOneState.minInputLength || name.length > stepOneState.maxInputLength
  }
  else if (currentStep.value === 1) {
    return !(stepTwoValidateConditions.isValidLength && stepTwoValidateConditions.isValidSymbols && stepTwoValidateConditions.isValidNickname)
  }
  else if (currentStep.value === 2) {
    return bio.length > stepThreeState.maxInputLength || hasBioLinks.value
  }
  return false
})

const clampStep = (value: number) => Math.min(Math.max(value, 0), STEP_COMPONENTS.length - 1)
const onPrevStepClick = () => currentStep.value = clampStep(currentStep.value - 1)
const onSkipAllTheSteps = () => currentStep.value = STEP_COMPONENTS.length - 1
const onTheNextStep = () => currentStep.value = clampStep(currentStep.value + 1)

// либо можно не использовать useAsyncData, тут клиентский запрос
const onCrop = async (image: Blob) => {
  try {
    const userStore = useUserStore()
    const updatedUser = await userStore.updateUserImage({ image })
    _user.value.image = updatedUser.image
  }
  catch (error) {
    console.error('Ошибка при загрузке изображения:', error)
    const { notifyError } = useNotify()
    notifyError('Не удалось загрузить изображение')
  }
}
const onRemoveUserImage = () => _user.value.image = ''
const onSelectTheme = (theme: Background) => _user.value.background = theme

const STEP_COMPONENTS = [
  OnboardingStepOne,
  OnboardingStepTwo,
  OnboardingStepThree,
  OnboardingUploaderPhoto,
  OnboardingStepFive,
  OnboardingStepSix,
  OnboardingFinal,
] as const

const LAST_STEP_INDEX = STEP_COMPONENTS.length - 1
const currentView = computed(() => STEP_COMPONENTS[Math.min(Math.max(currentStep.value, 0), LAST_STEP_INDEX)])

const stepTwoHintList: ISharedHintListProps = {
  content: [
    {
      text: t('profile.lengthRange', { min: stepTwoState.minInputLength, max: stepTwoState.maxInputLength }),
      state: computed(() => {
        const slug = _user.value?.slug ?? ''
        if (slug.length <= 0) {
          return 'base'
        }
        return stepTwoValidateConditions.isValidLength ? 'valid' : 'invalid'
      }),
    },
    {
      text: t('onboarding.usernameFormat'),
      state: computed(() => {
        const slug = _user.value?.slug ?? ''
        if (slug.length <= 0) {
          return 'base'
        }
        return stepTwoValidateConditions.isValidSymbols ? 'valid' : 'invalid'
      }),
    },
    {
      text: t('onboarding.usernameUnique'),
      state: computed(() => {
        const slug = _user.value?.slug ?? ''
        if (slug.length <= 0) {
          return 'base'
        }
        return stepTwoValidateConditions.isValidNickname ? 'valid' : 'invalid'
      }),
    },
  ],
}

watchDebounced(
  () => _user.value.slug,
  async (newVal) => {
    if (newVal) {
      try {
        const slug = (newVal ?? '').toLowerCase()
        if (newVal !== slug) {
          _user.value.slug = slug
        }
        if (!slug) {
          stepTwoState.isUniqueNickname = false
          return
        }
        const response = await userStore.checkUserSlug(slug)
        if ('is_available' in response) {
          stepTwoState.isUniqueNickname = response.is_available ?? false
        }
        else {
          console.error(response)
        }
      }
      catch (e) {
        console.error(e)
        stepTwoState.isUniqueNickname = false
      }
    }
  },
  { debounce: 300, immediate: true },
)

const DEFAULT_THEME_ID = 9

watch(() => currentStep.value, async (newVal) => {
  if (newVal >= 3 && !themes.value) {
    try {
      const result = await userStore.getThemes()
      userStore.$patch({
        themes: result,
      })

      if (!_user.value.background) {
        const defaultTheme = result.find(t => t.id === DEFAULT_THEME_ID)
        if (defaultTheme) {
          _user.value.background = defaultTheme
        }
      }
    }
    catch (e) {
      console.error(e)
    }
  }
}, {
  immediate: true,
})
</script>
