<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import ModalBase from '~/components/ModalBase.vue'
import SharedInputEmail from '~/components/shared/inputs/SharedInputEmail.vue'

import { useRecoverPassword } from '~/composables/useRecoverPassword'
import { useI18n } from '#imports'

const { t } = useI18n()
const isOpen = defineModel<boolean>('open')
const authStore = useAuthStore()
const userStore = useUserStore()
const { notifyError } = useNotify()

const {
  state,
  schema,
  isLoading,
  isDisabledButton,
  stageTwoModal,
} = useRecoverPassword()

const formRef = ref()
useFormLocaleSync(formRef)
const globalError = ref('')

interface RecoverData {
  email: string
}

const recoverPassword = async (event: FormSubmitEvent<RecoverData>) => {
  globalError.value = ''
  isLoading.value = true

  userStore.$patch({ user: { email: event.data.email } })

  const { data, error } = await useAsyncData('send-recover-password', () =>
    authStore.sendRestorePasswordInvite({ email: event.data.email }),
  )

  isLoading.value = false

  if (data.value) {
    stageTwoModal.open({
      description: t('auth.recoverySuccess', [event.data.email]),
    })
    isOpen.value = false
    return
  }

  if (error.value) {
    const err = error.value
    if ('statusCode' in err && err.statusCode === 429) {
      notifyError(t('settings.emailConfirmationLimit'))
    }
    else {
      notifyError((err).cause?.body?.message ?? t('auth.recoveryError'))
    }

    globalError.value = t('auth.recoveryError')
  }
}
</script>

<template>
  <ModalBase
    v-model:open="isOpen"
    :title="t('auth.passwordRecovery')"
    :description="t('auth.recoveryInstructions')"
  >
    <template #body>
      <UForm
        ref="formRef"
        :schema="schema"
        :state="state"
        novalidate
        @submit="recoverPassword"
      >
        <div class="mb-5">
          <UFormField name="email">
            <SharedInputEmail
              v-model="state.email"
              :placeholder="t('auth.email')"
            />
          </UFormField>
          <p
            v-if="globalError"
            class="
              pl-5
              mt-2
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
          :label="t('auth.recover')"
        />
      </UForm>
    </template>
    <template #footer>
      <UButton
        :label="t('auth.close')"
        variant="secondary"
        block
        @click="isOpen = false"
      />
    </template>
  </ModalBase>
</template>
