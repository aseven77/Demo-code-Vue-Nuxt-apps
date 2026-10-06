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
              text-red-700
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
          :loading="isAuthLoading"
          :disabled="isDisabledButton"
        />
      </UForm>

      <AppToggleAuthPage
        page="login"
        class="mb-5"
      />

      <!-- <SharedLoginFrom class="mb-4" /> -->

      <SharedAuthSocial />
    </div>

    <AppRecoverPasswordModal v-model:open="isVisibleRecoverPassword" />

    <ModalBase
      v-model:open="isModalRestoreAccountVisible"
      :title="t('settings.accountRestore')"
      :description="currentAccountRestoreModalDescription"
      @close="resetRestoreAccountState"
    >
      <template #body>
        <div class="space-y-3">
          <UButton
            block
            color="primary"
            :loading="isRestoreAccountModalLoading"
            @click="handleClickRestoreAccountButton"
          >
            <UIcon
              v-if="isEmailRestoreAccountSent"
              name="custom:reload"
              size="20"
            />
            {{ currentAccountRestoreMainButtonLabel }}
          </UButton>
          <UButton
            block
            variant="secondary"
            :loading="isRestoreAccountModalLoading"
            @click="resetRestoreAccountState"
          >
            {{ $t('auth.close') }}
          </UButton>
        </div>
      </template>
    </ModalBase>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui'
import AppRecoverPasswordModal from '~/components/modals/AppRecoverPasswordModal.vue'
import AppToggleAuthPage from '~/components/AppToggleAuthPage.vue'
import ModalBase from '~/components/ModalBase.vue'
import SharedAuthSocial from '~/components/shared/SharedAuthSocial.vue'
import SharedInputPassword from '~/components/shared/inputs/SharedInputPassword.vue'
import SharedInputEmail from '~/components/shared/inputs/SharedInputEmail.vue'

import { useAuthStore } from '~/stores/auth'

import { useHelpers } from '~/composables/useHelpers'
import { useI18n } from '#imports'
import { ApiError } from '~/generatedApi'
import { getDate } from '~/helpers/get-date'

const AUTH_ERROR_CODES = ['USER_NOT_FOUND', 'WRONG_PASSWORD']

const { t } = useI18n()
const authStore = useAuthStore()
const userStore = useUserStore()
const { notifyError } = useNotify()

const {
  state,
  schema,
  isLoading: isAuthLoading,
  isVisibleRecoverPassword,
  isDisabledButton,
} = useLogin()

const { navigateAfterAuth } = useHelpers()

const formRef = ref()
useFormLocaleSync(formRef)
const globalError = ref('')

const isModalRestoreAccountVisible = ref(false)
const isEmailRestoreAccountSent = ref(false)
const accountDeletionGracePeriod = ref('')
const isRestoreAccountModalLoading = ref(false)

const currentAccountRestoreModalDescription = computed(() => isEmailRestoreAccountSent.value ? t('settings.accountRestoreSendLink', { email: state.email }) : t('settings.accountRestoreGracePeriod', { grace_period: accountDeletionGracePeriod.value }))
const currentAccountRestoreMainButtonLabel = computed(() => isEmailRestoreAccountSent.value ? t('settings.accountRestoreResend') : t('settings.accountRestore'))

const login = (event: FormSubmitEvent<{ email: string, password: string }>) => {
  globalError.value = ''
  isAuthLoading.value = true

  authStore.login(event.data)
    .then((response) => {
      authStore.setToken(response)
      navigateAfterAuth()
    })
    .catch((error: unknown) => {
      if (error instanceof ApiError) {
        if (error.body.error_code && AUTH_ERROR_CODES.some(code => code === error.body.error_code)) {
          globalError.value = t('auth.incorrectCredentials')
        }

        if (error.body.pending_deletion) {
          isModalRestoreAccountVisible.value = true
          accountDeletionGracePeriod.value = getDate(error.body.grace_period_ends_at)
        }
      }
    })
    .finally(() => { isAuthLoading.value = false })
}

const handleClickRestoreAccountButton = () => {
  isRestoreAccountModalLoading.value = true

  userStore.restoreAccount(state.email)
    .then(() => {
      isEmailRestoreAccountSent.value = true
    })
    .catch((error: unknown) => {
      notifyError(error)
    })
    .finally(() => {
      isRestoreAccountModalLoading.value = false
    })
}

const resetRestoreAccountState = () => {
  isModalRestoreAccountVisible.value = false
  isEmailRestoreAccountSent.value = false
}
</script>
