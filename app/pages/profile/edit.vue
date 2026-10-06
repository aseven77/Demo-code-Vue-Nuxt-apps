<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { watchDebounced } from '@vueuse/core'
import { useUserStore } from '~/stores/user'
import type { TabsItem } from '#ui/components/Tabs.vue'
import ProfileEditLayout from '~/components/profile/edit/ProfileEditLayout.vue'
import { useI18n } from '#imports'
import type { User } from '~/generatedApi'
import { Navigations } from '~/navigations'

const { t } = useI18n()
const userStore = useUserStore()

onMounted(async () => {
  const response = await userStore.getThemes()
  if (response) {
    userStore.$patch({
      themes: response,
    })
  }
})

onUnmounted(() => {
  if (_user.value?.image?.startsWith('blob:')) {
    URL.revokeObjectURL(_user.value.image)
  }
  updatedImageBlob.value = null
})

const { user, themes } = storeToRefs(userStore)

const isSendingData = ref<boolean>(false)
const updatedImageBlob = ref<Nullable<Blob>>(null)

if (!user.value) {
  // console.warn('Пользователь не найден. Перенаправление на страницу логина.')
  await navigateTo({ path: Navigations.LOGIN, replace: true })
}

/* todo: Доделать: 1. Связать валидацию данных из data с валидации кнопки «сохранить» */
/* todo: При смене темы подставлять данные в объект */
/* todo: Смену фона QR и сохранять сам QR в API */

const _user = ref<Nullable<User>>(user.value ? JSON.parse(JSON.stringify(user.value)) : null)

function deepEqual(a: unknown, b: unknown) {
  try {
    return JSON.stringify(a) === JSON.stringify(b)
  }
  catch {
    return false
  }
}

const hasBioLinks = ref(false)
const isSaveDisabled = ref(true)

const compareUsers = () => isSaveDisabled.value = (!!user.value && deepEqual(_user.value, user.value)) || hasBioLinks.value

if (_user.value) {
  watchDebounced(_user.value, () => compareUsers(), { debounce: 1000, deep: true, immediate: true })
}

const tabs = ref<TabsItem[]>([
  {
    label: t('profile.data'),
    value: 'data',
    component: markRaw(defineAsyncComponent({
      loader: () => import(('~/components/profile/edit/ProfileEditData.vue')),
    })),
  },
  {
    label: t('profile.appearance'),
    value: 'theme',
    component: markRaw(defineAsyncComponent({
      loader: () => import(('~/components/profile/edit/ProfileEditTheme.vue')),
    })),
  },
  {
    label: t('profile.qrCode'),
    value: 'qr',
    component: markRaw(defineAsyncComponent({
      loader: () => import(('~/components/profile/edit/ProfileEditQr.vue')),
    })),
  },
])

const currentTab = ref<TabsItem['value']>('data')

// Обработчики для обновления темы
const handleBackgroundUpdate = (background: User['background']) => {
  if (_user.value) {
    _user.value.background = background
  }
}

const handleLinkThemeUpdate = (themeId: number | null | undefined) => {
  if (_user.value) {
    _user.value.link_theme_id = themeId
  }
}

const getCurrentComponentTab = (): TabsItem['component'] | undefined => {
  return tabs.value.find(tab => tab.value === currentTab.value)?.component
}

// Обработчики для загрузки изображения
const onCrop = async (image: Blob) => {
  updatedImageBlob.value = image
}

const onRemoveUserImage = () => {
  if (_user.value) {
    if (_user.value.image?.startsWith('blob:')) {
      URL.revokeObjectURL(_user.value.image)
    }
    _user.value.image = ''
    updatedImageBlob.value = null
  }
}

const onSaveClick = async () => {
  if (!_user.value) return
  const requests = []

  const updateImage = () => {
    return userStore.updateUserImage({ image: updatedImageBlob.value as Blob })
  }

  const updateUser = () => {
    const updateData = {
      name: _user.value?.name,
      slug: _user.value?.slug || '',
      bio: _user.value?.bio,
      background_id: _user.value?.background?.id || null,
      link_theme_id: _user.value?.link_theme_id,
      qr_code: _user.value?.qr_code,
      is_onboarding_passed: true,
    }
    return userStore.updateUserData(updateData)
  }

  if (updatedImageBlob.value) {
    requests.push(updateImage)
  }
  requests.push(updateUser)

  try {
    isSendingData.value = true
    const response = await Promise.all(requests.map(request => request()))
    userStore.$patch({
      user: response.at(-1),
    })

    await navigateTo('/profile')
  }
  catch (error: unknown) {
    const { notifyError } = useNotify()
    notifyError(error instanceof Error ? error : 'Не удалось сохранить данные')
  }
  finally {
    isSendingData.value = false
  }
}

watch(() => updatedImageBlob.value, (newValue) => {
  if (_user.value && user.value) {
    if (_user.value.image?.startsWith('blob:')) {
      URL.revokeObjectURL(_user.value.image)
    }

    if (newValue instanceof Blob) {
      _user.value.image = URL.createObjectURL(newValue)
    }
    else {
      _user.value.image = user.value.image
    }
  }
})
</script>

<template>
  <NuxtLayout
    v-if="_user"
    :user="_user"
    name="profile-layout"
    :is-edit-mode="true"
  >
    <ProfileEditLayout
      :is-loading="isSendingData"
      :is-disabled-button="isSaveDisabled"
      @on-save-click="onSaveClick"
    >
      <template #header>
        <UTabs
          v-model="currentTab"
          :items="tabs"
          variant="link"
          class="gap-4 w-full"
        />
      </template>

      <keep-alive>
        <component
          :is="getCurrentComponentTab()"
          v-model:name="_user.name"
          v-model:slug="_user.slug"
          v-model:bio="_user.bio"
          v-model:qr-code="_user.qr_code"
          :themes="themes"
          :user="_user"
          :user-image="_user.image"
          @update:background="handleBackgroundUpdate"
          @update:link-theme-id="handleLinkThemeUpdate"
          @crop="onCrop"
          @remove-user-image="onRemoveUserImage"
          @has-bio-links="(val: boolean) => { hasBioLinks = val; compareUsers() }"
        />
      </keep-alive>
    </ProfileEditLayout>
  </NuxtLayout>
</template>
