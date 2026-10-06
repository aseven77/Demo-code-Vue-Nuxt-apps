<template>
  <article>
    <div class="mb-8">
      <h3 class="onboarding-title">
        {{ t('onboarding.username') }}
      </h3>
      <p class="font-medium text-base leading-5 text-[var(--ds-color-primitive-grey-700)]">
        {{ t('onboarding.usernameHint') }}
      </p>
    </div>

    <SharedInputText
      v-model="nickname"
      :placeholder="t('onboarding.username')"
      name="nickname"
      :max-counter="stepTwo.maxInputLength"
    />

    <SharedHintList
      :content="stepTwoHintList.content"
      class="pl-5 pt-2 mb-2"
    />
  </article>
</template>

<script setup lang="ts">
import type { ISharedHintListProps } from '~/types/components/shared-hint-list.types'
import SharedInputText from '~/components/shared/inputs/SharedInputText.vue'
import type { OnboardingStepTwoState } from '~/types/composable/use-onboarding.types'
import { useI18n } from '#imports'

const { t } = useI18n()
interface Props {
  stepTwo: OnboardingStepTwoState
  stepTwoHintList: ISharedHintListProps
}

const props = defineProps<Props>()

const { stepTwo } = toRefs(props)

const nickname = defineModel<string>('nickname', { default: '' })
</script>
