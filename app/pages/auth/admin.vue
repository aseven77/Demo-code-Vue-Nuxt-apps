<template>
  <NuxtLayout name="auth-layout">
    <div class="mt-10">
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
        {{ $t('auth.login') }}
      </h1>

      <UForm
        ref="formRef"
        :schema="schema"
        :state="state"
        class="mt-10 mb-6"
        novalidate
        @submit="login"
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

        <UFormField
          name="password"
          class="mb-2"
        >
          <SharedInputPassword
            v-model="state.password"
            :placeholder="t('auth.password')"
            class="relative"
          />
        </UFormField>

        <p
          v-if="globalError"
          class="
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

        <ULink
          color="secondary"
          class="mx-auto block mb-4 cursor-pointer py-2"
          variant="subtle"
          size="md"
          @click="isVisibleRecoverPassword = true"
        >
          {{ $t('auth.forgotPassword') }}
        </ULink>

        <UButton
          type="submit"
          color="primary"
          variant="primary"
          :label="t('auth.logIn')"
          block
          :loading="isLoading"
          :disabled="isDisabledButton"
        />
      </UForm>
    </div>

    <AppRecoverPasswordModal v-model:open="isVisibleRecoverPassword" />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui'
import AppRecoverPasswordModal from '~/components/modals/AppRecoverPasswordModal.vue'
import SharedInputPassword from '~/components/shared/inputs/SharedInputPassword.vue'
import SharedInputEmail from '~/components/shared/inputs/SharedInputEmail.vue'
import { useAdminStore, useI18n } from '#imports'
import { useAdminAuth } from '~/composables/useAdminAuth'

const { t } = useI18n()
const adminStore = useAdminStore()

const {
  state,
  schema,
  isLoading,
  isVisibleRecoverPassword,
  isDisabledButton,
} = useLogin()

const { navigateAdminAfterAuth } = useAdminAuth()

const formRef = ref()
useFormLocaleSync(formRef)
const globalError = ref('')

const login = (event: FormSubmitEvent<{ email: string, password: string }>) => {
  globalError.value = ''
  isLoading.value = true

  adminStore.loginAdmin(event.data)
    .then(({ access_token, refresh_token }) => {
      adminStore.$patch({ access_token, refresh_token })
      navigateAdminAfterAuth()
    })
    .catch(() => {
      globalError.value = t('auth.incorrectCredentials')
    })
    .finally(() => { isLoading.value = false })
}
</script>
