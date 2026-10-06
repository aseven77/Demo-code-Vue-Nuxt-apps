<template>
  <article>
    <div class="mb-8">
      <h3 class="onboarding-title">
        {{ t('onboarding.name') }}
      </h3>
      <p class="font-medium text-base leading-5 text-[var(--ds-color-primitive-grey-700)]">
        {{ t('onboarding.nameHint') }}
      </p>
    </div>
    <SharedInputText
      v-model="name"
      :placeholder="t('onboarding.name')"
      name="name"
      variant="primary"
      color="primary"
      :max-counter="stepOne.maxInputLength"
      is-counting
    />
    <SharedHintList
      :content="hintList.content"
      :error="hintIsError"
      class="pl-5 pt-2 mb-2"
    />
  </article>
</template>

<script setup lang="ts">
import type { ISharedHintListProps } from '~/types/components/shared-hint-list.types'
import SharedInputText from '~/components/shared/inputs/SharedInputText.vue'
import type { OnboardingStepOneState } from '~/types/composable/use-onboarding.types'
import { useI18n } from '#imports'

const { t } = useI18n()
interface Props {
  stepOne: OnboardingStepOneState
}

const props = defineProps<Props>()

const { stepOne } = toRefs(props)

const name = defineModel<string>('name', { default: '' })

const hintIsError = computed(() => (name.value?.length) > stepOne.value.maxInputLength)

const hintList: ISharedHintListProps = {
  content: [
    {
      text: t('profile.maxLength', { max: stepOne.value.maxInputLength }),
      state: computed(() => {
        if (name.value?.length === 0) {
          return 'base'
        }
        return (name.value?.length >= stepOne.value.minInputLength) && (name.value?.length < stepOne.value.maxInputLength + 1) ? 'valid' : 'invalid'
      }),
    },
  ],
}
</script>
