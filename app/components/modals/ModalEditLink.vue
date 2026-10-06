<script setup lang="ts">
import type { Link } from '~/generatedApi'
import type { StyleLinkPartial } from '~/types/link-style.types'
import { URL_INPUT_MAX_LENGTH } from '~/constants/links'
import { useLinkStyleState } from '~/composables/useLinkStyleState'
import { useDraftLink } from '~/composables/useDraftLink'
import { useLinkSave } from '~/composables/useLinkSave'

import ModalBase from '~/components/ModalBase.vue'
import LoaderOld from '~/components/shared/loader/LoaderOld.vue'
import SharedInputTextLinkIcon from '~/components/shared/inputs/SharedInputTextLinkIcon.vue'
import LinkStyleTab from '~/components/links/LinkStyleTab.vue'
import LinkLayoutSelector from '~/components/links/LinkLayoutSelector.vue'
import { useI18n } from '#imports'
import { getClearLink } from '~/helpers/get-valid-link-url'

const { t } = useI18n()
const { save: saveLinkData } = useLinkSave()

interface Props {
  data: Link | null
}

const props = defineProps<Props>()

const emit = defineEmits<{ close: [], delete: [] }>()

const isOpen = defineModel<boolean>('open')
const { activeLink: linkType, username: url, initFromUrl } = useLinkEditor()
const linkTitle = ref<string>(props.data?.title || '')
const isLoading = ref<boolean>(false)

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

// Обновляем draft-ссылку для превью при изменении данных в форме
watchEffect(() => {
  if (!url.value?.trim() || !props.data?.id) {
    clearDraft()
    return
  }

  setDraft({
    id: props.data.id,
    url: linkType.value ? `${linkType.value.link}/${getClearLink(url.value)}` : url.value,
    title: props.data.title,
    is_archive: false,
    layout: linkLayout.value,
    style_config: linkStyleConfig.value,
    background_image: pendingDeleteBackground.value ? null : (pendingBackgroundPreview.value ?? props.data?.background_image ?? null),
    thumbnail: pendingDeleteThumbnail.value ? null : (pendingThumbnailPreview.value ?? props.data?.thumbnail ?? null),
    sort_order: props.data.sort_order,
  })
})

// Очищаем draft при закрытии модала
watch(isOpen, (value) => {
  if (!value) clearDraft()
})

onMounted(() => {
  if (props.data?.url) {
    initFromUrl(props.data.url)
  }
})

const isDisableSave = computed(() => !url.value?.trim())

// Create a reactive link object for LinkStyleTab
const styleLink = computed<StyleLinkPartial>(() => ({
  id: props.data?.id,
  layout: linkLayout.value,
  style_config: linkStyleConfig.value,
  background_image: pendingDeleteBackground.value ? null : (pendingBackgroundPreview.value ?? props.data?.background_image ?? null),
  thumbnail: pendingDeleteThumbnail.value ? null : (pendingThumbnailPreview.value ?? props.data?.thumbnail ?? null),
}))

const activeTab = ref(0)

const tabItems = computed(() => [
  { label: t('linkStyle.tabBasicInfo') },
  { label: t('linkStyle.tabButtonStyle') },
])

const save = async () => {
  if (!props.data?.id) {
    console.error('Missing link ID')
    return
  }

  isLoading.value = true

  const success = await saveLinkData({
    linkId: props.data.id,
    url: url.value,
    title: linkTitle.value,
    activeLink: linkType.value,
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
  <ModalBase
    v-model:open="isOpen"
    size="desktop-640"
    :title="t('profile.editLink')"
  >
    <template #body>
      <LoaderOld
        :is-loading="isLoading"
        :is-show-logo="false"
      />

      <div class="md:-ml-8">
        <div class="hidden md:block border-t border-gray-200 h-1 mb-2" />

        <UTabs
          :items="tabItems"
          :model-value="activeTab"
          variant="link"
          class="mb-4 md:pl-8"
          data-testid="modal-edit-link-tabs"
          @update:model-value="activeTab = Number($event)"
        />

        <!-- Tab: Basic Info -->
        <div
          v-show="activeTab === 0"
          class="flex flex-col gap-4 pt-1 lg:pb-20"
        >
          <div class="md:pl-8">
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
          </div>
          <div class="md:pl-8">
            <SharedInputTextLinkIcon
              v-model="url"
              name="link"
              :placeholder="t('profile.link')"
              input-type="text"
              input-name="link"
              :maxlength="URL_INPUT_MAX_LENGTH"
              icon="i-lucide-search"
              :is-show-icon="$slots.leading"
            >
              <template #leading>
                <UIcon
                  :name="linkType?.inputIcon ? linkType.inputIcon : 'custom:web'"
                  size="24"
                />
              </template>
            </SharedInputTextLinkIcon>
          </div>
          <div class="md:pl-8 md:pr-5">
            <LinkLayoutSelector
              :layout="linkLayout"
              @update:layout="linkLayout = $event"
            />
          </div>
        </div>

        <!-- Tab: Button Style -->
        <div
          v-show="activeTab === 1"
          class="md:pl-8 md:pr-5 lg:pb-20"
        >
          <LinkStyleTab
            :link="styleLink"
            @update:link="onStyleUpdate"
          />
        </div>

        <div class="absolute px-8 w-full bottom-8 left-0">
          <div class="flex gap-3">
            <UButton
              variant="outline"
              color="error"
              class="h-14"
              data-testid="modal-edit-link-delete"
              @click="emit('delete')"
            >
              {{ $t('linkStyle.delete') }}
            </UButton>
            <UButton
              class="flex-1 h-14"
              :disabled="isDisableSave"
              data-testid="modal-edit-link-save"
              @click="save"
            >
              {{ $t('linkStyle.save') }}
            </UButton>
          </div>
        </div>
      </div>
    </template>
  </ModalBase>
</template>
