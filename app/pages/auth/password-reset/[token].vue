<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import SharedInputPassword from '~/components/shared/inputs/SharedInputPassword.vue'
import { usePasswordResetPage } from '~/composables/usePasswordResetPage'
import { useI18n } from '#imports'
import { Navigations } from '~/navigations'

const authStore = useAuthStore()
const route = useRoute()
const { notifyError, notifySuccess } = useNotify()
const params = route.params
const isLoading = ref(false)
const globalError = ref('')
const { t } = useI18n()

const { state, schema, isDisabledButton, passwordHintList } = usePasswordResetPage()

const formRef = ref()
useFormLocaleSync(formRef)

interface PasswordResetData {
  password: string
  password_confirmation: string
}

const submit = async (event: FormSubmitEvent<PasswordResetData>) => {
  globalError.value = ''

  if (!('token' in params)) return

  isLoading.value = true

  const { data, error } = await useAsyncData(`password-reset-${params.token}`, () =>
    authStore.restorePassword({
      token: params.token,
      password: event.data.password,
      password_confirmation: event.data.password_confirmation,
    }),
  )

  isLoading.value = false

  if (data.value) {
    notifySuccess(t('auth.passwordChanged'))
    navigateTo(Navigations.LOGIN)
    return
  }

  if (error.value) {
    notifyError((error.value).cause?.body?.message ?? t('auth.recoveryError'))
    globalError.value = t('auth.recoveryError')
  }
}
</script>

<template>
  <NuxtLayout name="auth-layout">
    <div>
      <h1
        class="
      text-center
      mb-6

      [font-weight:var(--ds-typography-heading-h2-font-weight)]
      [font-size:var(--ds-typography-heading-h3-font-size)]
      [color:var(--ds-color-fg-primary)]

      lg:[font-size:var(--ds-typography-heading-h2-font-size)]
      "
      >
        {{ t('auth.passwordChange') }}
      </h1>

      <UForm
        ref="formRef"
        :schema="schema"
        :state="state"
        class="mb-6"
        novalidate
        @submit="submit"
      >
        <div class="mb-8">
          <UFormField name="password">
            <SharedInputPassword
              v-model="state.password"
              :placeholder="t('auth.newPassword')"
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
              font-size(--ds-typography-caption-s-font-size)
              leading-(--ds-typography-caption-s-line-height)
              font-(--ds-typography-caption-s-regular-font-weight)
              tracking-(--ds-typography-caption-s-letter-spacing)
              "
          >
            {{ globalError }}
          </p>
        </div>

        <UButton
          type="submit"
          :loading="isLoading"
          :disabled="isDisabledButton"
          block
          :label="t('auth.change')"
        />
      </UForm>
    </div>
  </NuxtLayout>
</template>
