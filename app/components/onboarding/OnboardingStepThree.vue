<template>
  <article>
    <div class="mb-8">
      <h3 class="onboarding-title">
        {{ $t('onboarding.about') }}
      </h3>
      <p class="font-medium text-base leading-5 text-[var(--ds-color-primitive-grey-700)]">
        {{ $t('onboarding.aboutHint') }}
      </p>
    </div>
    <SharedTextarea
      v-model="aboutSelf"
      :placeholder="t('onboarding.bio')"
      :rows="5"
      :max-counter="stepThree.maxInputLength"
      variant="outline"
      color="primary"
      class="mb-2"
    />
    <SharedHintList
      :content="hintList.content"
      class="px-5 pt-2 mb-2"
    />
  </article>
</template>

<script setup lang="ts">
import type { OnboardingStepThreeState } from '~/types/composable/use-onboarding.types'
import type { ISharedHintListProps } from '~/types/components/shared-hint-list.types'
import SharedTextarea from '~/components/shared/inputs/SharedTextarea.vue'
import { useBioLinkValidation } from '~/composables/useBioLinkValidation'
import { useI18n } from '#imports'

const { t } = useI18n()
interface Props {
  stepThree: OnboardingStepThreeState
}

interface Emits {
  hasBioLinks: [value: boolean]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { stepThree } = toRefs(props)

const aboutSelf = defineModel<string>('aboutSelf', { default: '' })

const { hasLinks, linkHintItem } = useBioLinkValidation(aboutSelf)

watch(hasLinks, val => emit('hasBioLinks', val), { immediate: true })

const hintList = computed<ISharedHintListProps>(() => ({
  content: [
    {
      text: t('profile.maxLength', { max: stepThree.value.maxInputLength }),
      state: computed(() => {
        if (aboutSelf.value?.length === 0) {
          return 'base'
        }
        return (aboutSelf.value?.length > stepThree.value.minInputLength) && (aboutSelf.value?.length < stepThree.value.maxInputLength + 1) ? 'valid' : 'invalid'
      }),
    },
    linkHintItem,
  ],
}))
</script>
