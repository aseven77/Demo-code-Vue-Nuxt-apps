<template>
  <ModalBase
    v-model:open="isOpen"
    :title="t('settings.deleteAccount')"
    :description="currentDescription"
  >
    <template #footer>
      <div
        v-if="currentStep === 'first'"
        class="space-y-3"
      >
        <UButton
          block
          color="error"
          :loading="isLoading"
          @click="handleDeleteAccount"
        >
          <UIcon name="i-heroicons-trash" />
          {{ $t('settings.delete') }}
        </UButton>
        <UButton
          block
          color="primary"
          :loading="isLoading"
          @click="handleCancel"
        >
          {{ $t('settings.cancel') }}
        </UButton>
      </div>

      <div
        v-else
        class="space-y-3"
      >
        <UButton
          block
          :loading="isLoading"
          @click="handleClickDontDeleteButton"
        >
          {{ $t('settings.dontDelete') }}
        </UButton>
        <UButton
          block
          variant="secondary"
          :loading="isLoading"
          @click="handleCancel"
        >
          {{ $t('auth.close') }}
        </UButton>
      </div>
    </template>
  </ModalBase>
</template>

<script setup lang="ts">
import ModalBase from '~/components/ModalBase.vue'

import { useI18n } from '#imports'
import { getDateDifferenceInDays } from '~/helpers/get-date-difference-in-days'

const { t } = useI18n()

const userStore = useUserStore()
const { notifyError, notifySuccess } = useNotify()

const isLoading = ref(false)
const currentStep = ref<'first' | 'second'>('first')

const isOpen = defineModel<boolean>('open')

const accountDeletePendingTimestamp = computed(() => userStore.user?.deletion_grace_period_ends_at)

const currentDescription = computed(() => {
  if (accountDeletePendingTimestamp.value && currentStep.value === 'second' && accountDeletePendingTimestamp.value) {
    return t('settings.accountDeleteGracePeriod', getDateDifferenceInDays(accountDeletePendingTimestamp.value))
  }
  else {
    return t('settings.cannotBeUndone')
  }
})

const resetState = () => {
  setTimeout(() => {
    currentStep.value = 'first'
  }, 500)
}

const handleDeleteAccount = async () => {
  try {
    isLoading.value = true

    await userStore.deleteAccountRequest()

    notifySuccess(t('settings.accountDeleteVerificationSent', { email: userStore.user?.email }))

    hideModal()
  }
  catch (error) {
    notifyError(error instanceof Error ? error : t('common.somethingWentWrong'))
  }
  finally {
    isLoading.value = false
  }
}

const handleClickDontDeleteButton = async () => {
  try {
    isLoading.value = true

    await userStore.cancelAccountDeleteAuthed()
    userStore.$patch({ user: await userStore.getUser() })

    notifySuccess(t('settings.accountDeleteCancel'))

    hideModal()

    resetState()
  }
  catch (error) {
    notifyError(error instanceof Error ? error : t('common.somethingWentWrong'))
  }
  finally {
    isLoading.value = false

    handleCancel()
  }
}

const hideModal = () => isOpen.value = false

const handleCancel = () => {
  hideModal()
}

onMounted(() => {
  if (accountDeletePendingTimestamp.value) {
    currentStep.value = 'second'
  }
})
</script>
