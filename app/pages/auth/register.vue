<template>
  <NuxtLayout name="auth-layout">
    <div>
      <h1
        class="
      text-center
      tracking-[-2px]
      font-(--ds-typography-heading-h2-font-weight)
      [font-size:var(--ds-typography-heading-h3-font-size)]
      text-(--ds-color-fg-primary)

      lg:[font-size:var(--ds-typography-heading-h2-font-size)]
      "
      >
        {{ $t('auth.registration') }}
      </h1>

      <UForm
        ref="formRef"
        :schema="schema"
        :state="state"
        class="mt-10 mb-6"
        novalidate
        @submit="register"
      >
        <UFormField
          name="email"
          class="mb-2"
        >
          <SharedInputEmail
            v-model="state.email"
            :placeholder="t('auth.email')"
          />
        </UFormField>

        <div class="mb-6">
          <UFormField name="password">
            <SharedInputPassword
              v-model="state.password"
              :placeholder="t('auth.password')"
              is-counting
              class="relative"
            />
          </UFormField>

          <SharedHintList
            :content="passwordHintList.content"
            class="pl-5 pt-2 mb-2"
          />

          <UFormField name="password_confirmation">
            <SharedInputPassword
              v-model="state.password_confirmation"
              :placeholder="t('auth.confirmPassword')"
            />
          </UFormField>

          <p
            v-if="globalError"
            class="
              mt-2
              pl-5
              text-(--ds-color-primitive-red-700)
              text-xs
              leading-(--ds-typography-caption-s-line-height)
              font-(--ds-typography-caption-s-regular-font-weight)
              tracking-(--ds-typography-caption-s-letter-spacing)
              "
          >
            {{ globalError }}
          </p>
        </div>

        <div class="flex flex-col gap-2 mb-5.5">
          <label class="flex items-center gap-2 py-2">
            <UCheckbox v-model="state.userAgreement" />
            <span :class="classPolicyTexts">
              {{ $t('auth.iAccept') }}  <button
                :class="classPolicyLink"
                @click="isVisibleContractOffer = true"
              >{{ $t('auth.acceptUserAgreement') }} </button> {{ $t('auth.and') }}
              <button
                :class="classPolicyLink"
                @click="isVisiblePrivacyPolicy = true"
              >{{ $t('auth.acceptPrivacyPolicy') }}</button> 
            </span>
          </label>
        </div>

        <UButton
          type="submit"
          :loading="isLoading"
          :disabled="isDisabledButton"
          block
          :label="t('auth.register')"
        />
      </UForm>

      <AppToggleAuthPage
        page="register"
        class="mb-5"
      />

      <!-- <SharedLoginFrom class="mb-4" /> -->

      <SharedAuthSocial />

      <ModalLegalDocument
        v-model:open="isVisiblePrivacyPolicy"
        document="privacy-policy"
        title-key="legal.privacyPolicy.title"
        error-title-key="legal.errorTitle"
        error-text-key="legal.errorText"
      />

      <ModalLegalDocument
        v-model:open="isVisibleContractOffer"
        document="contract-offer"
        title-key="legal.contractOffer.title"
        error-title-key="legal.errorTitle"
        error-text-key="legal.errorText"
      />
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui'
import AppToggleAuthPage from '~/components/AppToggleAuthPage.vue'
import SharedAuthSocial from '~/components/shared/SharedAuthSocial.vue'
import SharedInputEmail from '~/components/shared/inputs/SharedInputEmail.vue'
import SharedInputPassword from '~/components/shared/inputs/SharedInputPassword.vue'
import ModalLegalDocument from '~/components/modals/ModalLegalDocument.vue'

import { useHelpers } from '~/composables/useHelpers'
import { useI18n } from '#imports'
import { ApiError } from '~/generatedApi'

const { t } = useI18n()
const authStore = useAuthStore()

const isVisiblePrivacyPolicy = ref<boolean>(false)
const isVisibleContractOffer = ref<boolean>(false)
const isLoading = ref<boolean>(false)
const globalError = ref('')

const { state, schema, isDisabledButton, passwordHintList } = useRegistration()

const formRef = ref()
useFormLocaleSync(formRef)

const UCheckbox = resolveComponent('UCheckbox')
const { navigateAfterAuth } = useHelpers()

const classPolicyTexts = 'text-base text-(--ds-color-fg-primary) cursor-pointer'
const classPolicyLink = 'text-(--ds-color-primitive-brand-500) hover:text-[var(--ds-color-control-primary-hover)] cursor-pointer bg-transparent border-0'
interface RegistrationData {
  email: string
  password: string
  password_confirmation: string
}

const register = (event: FormSubmitEvent<RegistrationData>) => {
  globalError.value = ''
  isLoading.value = true

  authStore.registerUser({ ...event.data, userAgreement: state.userAgreement })
    .then((res) => {
      authStore.setToken(res)
      navigateAfterAuth()
    })
    .catch((error: unknown) => {
      if (error instanceof ApiError) {
        globalError.value = error.body?.error_code === 'EMAIL_ALREADY_EXISTS'
          ? t('auth.emailAlreadyExists')
          : t('auth.registrationError')
      }
    })
    .finally(() => { isLoading.value = false })
}
</script>
