<script setup lang="ts">
import { profileFirstLinks, providerToProfileLinkKey } from '~/constants/links'
import { useUserLinks } from '~/stores/user-links'

import type { Link } from '~/generatedApi'
import type { StyleLinkPartial } from '~/types/link-style.types'
import { useLinkStyleState } from '~/composables/useLinkStyleState'
import { useDraftLink, DRAFT_LINK_ID } from '~/composables/useDraftLink'
import { useLinkSave } from '~/composables/useLinkSave'

import LoaderOld from '~/components/shared/loader/LoaderOld.vue'
import SharedInputTextLinkIcon from '~/components/shared/inputs/SharedInputTextLinkIcon.vue'
import ModalBase from '~/components/ModalBase.vue'
import LinkStyleTab from '~/components/links/LinkStyleTab.vue'
import LinkLayoutSelector from '~/components/links/LinkLayoutSelector.vue'

import { storeToRefs } from 'pinia'
import type { DropDownMenuProps } from '~/types/dropdown-menu.types'
import { useUserStore } from '~/stores/user'
import { useI18n } from '#imports'
import socialParser from '~/utils/socialParser'

const ModalPreviewPhoneBlock = defineAsyncComponent(() => import('~/components/modals/ModalPreviewPhoneBlock.vue'))

const { t, locale } = useI18n()
const storeUserLinks = useUserLinks()
const { notifyError } = useNotify()
const { save: saveLinkData } = useLinkSave()

interface Props {
  data: Link | null
  inline?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  inline: false,
})

const emit = defineEmits<{ close: [] }>()

const { activeLink, username: url, initFromUrl } = useLinkEditor()

const isOpen = defineModel<boolean>('open')
const isLoading = ref<boolean>(false)
const linkTitle = ref<string>(props.data?.title || '')

const {
  linkLayout,
  linkStyleConfig,
  pendingBackgroundFile,
  pendingDeleteBackground,
  pendingThumbnailFile,
  pendingDeleteThumbnail,
  pendingBackgroundPreview,
  pendingThumbnailPreview,
  onStyleUpdate,
} = useLinkStyleState(props.data)

const { setDraft, clearDraft } = useDraftLink()

url.value = props.data?.url || ''

// Инициализируем activeLink при редактировании существующей ссылки
onMounted(() => {
  if (props.data?.url) {
    initFromUrl(props.data.url)
  }
})

const isDisableSave = computed(() => !url.value?.trim())

// Обновляем draft-ссылку для превью при изменении данных в форме
watchEffect(() => {
  if (!url.value?.trim()) {
    clearDraft()
    return
  }

  setDraft({
    id: props.data?.id ?? DRAFT_LINK_ID,
    url: url.value,
    title: linkTitle.value || null,
    is_archive: false,
    layout: linkLayout.value,
    style_config: linkStyleConfig.value,
    background_image: pendingDeleteBackground.value ? null : (pendingBackgroundPreview.value ?? props.data?.background_image ?? null),
    thumbnail: pendingDeleteThumbnail.value ? null : (pendingThumbnailPreview.value ?? props.data?.thumbnail ?? null),
    sort_order: props.data?.sort_order,
  })
})

// Create a reactive link object for LinkStyleTab
const styleLink = computed<StyleLinkPartial>(() => ({
  id: props.data?.id,
  title: linkTitle.value,
  url: url.value,
  layout: linkLayout.value,
  style_config: linkStyleConfig.value,
  background_image: pendingDeleteBackground.value ? null : (pendingBackgroundPreview.value ?? props.data?.background_image ?? null),
  thumbnail: pendingDeleteThumbnail.value ? null : (pendingThumbnailPreview.value ?? props.data?.thumbnail ?? null),
}))

// Автоопределение провайдера при вводе URL
watch(url, (newUrl) => {
  if (!newUrl || newUrl.trim() === '') {
    // Если поле пустое, сбрасываем выбор
    activeLink.value = null
    return
  }

  // Пропускаем, если это просто username (начинается с @)
  if (newUrl.trim().startsWith('@') && !newUrl.includes('http') && !newUrl.includes('.')) {
    return
  }

  // Пытаемся определить провайдера
  const detected = socialParser.detectProvider(newUrl)

  if (detected.provider) {
    // Нашли провайдера, ищем соответствующий profileLink
    const profileLinkKey = providerToProfileLinkKey[detected.provider]

    if (profileLinkKey) {
      const foundLink = profileFirstLinks[profileLinkKey]
      if (foundLink && activeLink.value?.key !== foundLink.key) {
        activeLink.value = foundLink
      }
    }
  }
  else if (newUrl.includes('http') || newUrl.includes('.')) {
    // Это URL, но не социальная сеть - сбрасываем выбор
    activeLink.value = null
  }
})

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const activeTab = ref('0')
const isPreviewOpen = ref(false)
const styleDrilled = ref(false)

watch(activeTab, () => {
  styleDrilled.value = false
})

// Очищаем draft при закрытии модала через оверлей или v-model
watch(isOpen, (value) => {
  if (!value) clearDraft()
})

const handleClose = () => {
  clearDraft()
  isOpen.value = false
  emit('close')
}

const inlineMenuItems = computed<DropDownMenuProps[][]>(() => [[
  { label: t('linkStyle.close'), icon: 'i-lucide-x', color: 'primary', onSelect: handleClose },
]])

const tabItems = computed(() => [
  { label: t('linkStyle.tabBasicInfo') },
  { label: t('linkStyle.tabButtonStyle') },
])

const save = async () => {
  if (!storeUserLinks.isAddingLinkAvailable) {
    notifyError(t('profile.maxLimitActiveLinks'))
    return
  }

  isLoading.value = true

  const success = await saveLinkData({
    linkId: props.data?.id,
    url: url.value,
    title: linkTitle.value,
    activeLink: activeLink.value,
    layout: linkLayout.value,
    styleConfig: linkStyleConfig.value,
    pendingBackgroundFile: pendingBackgroundFile.value,
    pendingDeleteBackground: pendingDeleteBackground.value,
    pendingThumbnailFile: pendingThumbnailFile.value,
    pendingDeleteThumbnail: pendingDeleteThumbnail.value,
    existingBackgroundImage: props.data?.background_image ?? null,
    existingThumbnail: props.data?.thumbnail ?? null,
  })

  isLoading.value = false

  if (success) {
    clearDraft()
    isOpen.value = false
    emit('close')
  }
}
</script>

<template>
  <!-- INLINE MODE (Desktop) -->
  <div
    v-if="inline"
    class="relative border border-(--ds-color-border-tertiary) rounded-[40px] p-5 flex flex-col gap-3 overflow-clip max-h-[calc(100vh-200px)]"
    data-testid="inline-link-card"
  >
    <LoaderOld
      :is-loading="isLoading"
      :is-show-logo="false"
    />

    <!-- Header -->
    <div class="flex items-center justify-between">
      <h3 class="text-base font-bold">
        {{ t('linkStyle.linkSettings') }}
      </h3>
      <div class="flex items-center gap-3">
        <span
          v-if="data?.created_at"
          class="text-xs text-(--ds-color-fg-tertiary)"
        >
          {{ t('profile.addedOn', { date: new Date(data.created_at).toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: '2-digit' }) }) }}
        </span>
        <UDropdownMenu :items="inlineMenuItems">
          <UButton
            icon="custom:more-vertical"
            variant="ghost"
            size="sm"
            class="rounded-full border-grey-100 border p-0 w-8 h-8 items-center justify-center hover:bg-light-500"
            data-testid="inline-link-menu"
          />
        </UDropdownMenu>
      </div>
    </div>

    <!-- Tabs -->
    <UTabs
      :items="tabItems"
      :model-value="activeTab"
      variant="link"
      data-testid="modal-link-tabs"
      @update:model-value="activeTab = String($event)"
    />

    <!-- Scrollable content -->
    <div class="flex-1 overflow-y-auto min-h-0">
      <!-- Tab: Basic Info -->
      <div
        v-show="activeTab === '0'"
        class="flex flex-col gap-4"
      >
        <!-- Image placeholder + inputs row -->
        <div class="flex gap-4 items-start">
          <div class="flex-1 flex flex-col gap-3">
            <SharedInputTextLinkIcon
              v-model="linkTitle"
              name="linkTitle"
              :placeholder="t('linkStyle.linkName')"
            >
              <template #leading>
                <UIcon
                  name="i-lucide-file-text"
                  size="24"
                />
              </template>
            </SharedInputTextLinkIcon>

            <SharedInputTextLinkIcon
              v-model="url"
              name="link"
              :placeholder="t('profile.link')"
            >
              <template #leading>
                <UIcon
                  :name="activeLink?.inputIcon ? activeLink.inputIcon : 'custom:web'"
                  size="24"
                />
              </template>
            </SharedInputTextLinkIcon>
          </div>
        </div>

        <!-- Layout selector -->
        <LinkLayoutSelector
          :layout="linkLayout"
          @update:layout="linkLayout = $event"
        />
      </div>

      <!-- Tab: Button Style -->
      <div
        v-show="activeTab === '1'"
      >
        <LinkStyleTab
          :link="styleLink"
          @update:link="onStyleUpdate"
          @close="handleClose"
        />
      </div>
    </div>

    <!-- Footer with gradient bg (sticky) -->
    <div class="sticky bottom-0 z-10 -mx-5 -mb-5 px-5 py-4 bg-linear-to-t from-white via-white to-transparent">
      <UButton
        :block="true"
        class="h-14"
        :disabled="isDisableSave"
        data-testid="modal-link-save"
        @click="save"
      >
        {{ data?.id ? $t('linkStyle.save') : $t('profile.addLink') }}
      </UButton>
    </div>
  </div>

  <!-- MODAL MODE (Mobile / default) -->
  <ModalBase
    v-else
    v-model:open="isOpen"
    size="desktop-640"
    :title="styleDrilled ? '' : t('linkStyle.linkSettings')"
    :description="styleDrilled ? '' : t('analytics.addSocialLink')"
    :closable="!styleDrilled"
  >
    <template #body>
      <LoaderOld
        :is-loading="isLoading"
        :is-show-logo="false"
      />
      <div class="md:-ml-8">
        <div class="hidden md:block border-t border-gray-200 h-1 mb-2" />
        <UTabs
          v-show="!styleDrilled"
          :items="tabItems"
          :model-value="activeTab"
          variant="link"
          class="mb-4 md:pl-8"
          data-testid="modal-link-tabs"
          @update:model-value="activeTab = String($event)"
        />

        <!-- Tab: Basic Info -->
        <div
          v-show="activeTab === '0'"
          class="flex flex-col gap-4 pt-1 lg:pb-20 md:pl-8"
        >
          <SharedInputTextLinkIcon
            v-model="linkTitle"
            name="linkTitle"
            :placeholder="t('linkStyle.linkName')"
          >
            <template #leading>
              <UIcon
                name="i-lucide-file-text"
                size="24"
              />
            </template>
          </SharedInputTextLinkIcon>
          <SharedInputTextLinkIcon
            v-model="url"
            name="link"
            :placeholder="t('profile.link')"
            input-type="text"
            input-name="link"
            :maxlength="urlMaxLength"
            icon="i-lucide-search"
            :is-show-icon="$slots.leading"
          >
            <template #leading>
              <UIcon
                :name="activeLink?.inputIcon ? activeLink.inputIcon : 'custom:web'"
                size="24"
              />
            </template>
          </SharedInputTextLinkIcon>

          <div class="lg:pl-8 lg:pr-5 pb-20 md:pb-0">
            <LinkLayoutSelector
              :layout="linkLayout"
              @update:layout="linkLayout = $event"
            />
          </div>
        </div>

        <!-- Tab: Button Style -->
        <div
          v-show="activeTab === '1'"
          class="md:pl-8 md:pr-5 lg:pb-20"
        >
          <LinkStyleTab
            :link="styleLink"
            @update:link="onStyleUpdate"
            @update:drilled="styleDrilled = $event"
            @close="handleClose"
          />
        </div>

        <div class="absolute px-8 w-full bottom-8 left-0 flex items-center gap-3">
          <UButton
            variant="outline"
            square
            class="h-14 w-14 shrink-0 rounded-full"
            data-testid="modal-link-preview"
            @click="isPreviewOpen = true"
          >
            <UIcon
              name="custom:eye"
              size="20"
            />
          </UButton>
          <UButton
            :block="true"
            class="h-14 flex-1"
            :disabled="isDisableSave"
            data-testid="modal-link-save"
            @click="save"
          >
            {{ data?.id ? $t('linkStyle.save') : $t('profile.addLink') }}
          </UButton>
        </div>

        <ModalPreviewPhoneBlock
          v-model:open="isPreviewOpen"
          :user="user"
          mode="preview"
        />
      </div>
    </template>
  </ModalBase>
</template>
