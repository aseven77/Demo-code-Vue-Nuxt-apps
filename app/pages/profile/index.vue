<template>
  <NuxtLayout
    v-if="user"
    name="profile-layout"
    :user="user"
  >
    <div class="text-center">
      <UserAvatar :image="user.image" />
      <p class="text-center text-2xl mb-2 font-bold text-grey-900">
        {{ user?.name || '' }}
      </p>

      <SharedSlugBadge
        v-if="user.slug"
        :slug="user.slug"
      />

      <p class="text-grey-800 text-base mb-5 md:mb-8 wrap-break-word max-w-90 mx-auto leading-5.5">
        {{ user?.bio || '' }}
      </p>
    </div>
    <ul class="mb-6 flex justify-center gap-2">
      <li>
        <UButton
          icon="custom:share"
          variant="tertiary"
          color="text"
          size="xl"
          class="xl:px-6"

          @click="isVisibleShareProfile = true"
        >
          <p class="hidden xl:block">
            {{ $t('profile.share') }}
          </p>
        </UButton>
      </li>
      <li>
        <UButton
          icon="custom:show"
          variant="tertiary"
          color="text"
          size="xl"
          class="xl:px-6"

          href="/profile/preview"
          target="_blank"
        >
          <p class="hidden xl:block">
            {{ $t('profile.preview') }}
          </p>
        </UButton>
      </li>
      <li>
        <UButton
          href="/profile/edit"
          icon="custom:edit"
          variant="tertiary"
          color="text"
          size="xl"
          class="px-6"
        >
          <span class="hidden xl:block">
            {{ $t('profile.edit') }}
          </span>
        </UButton>
      </li>
    </ul>
    <UButton
      icon="custom:plus"
      variant="dashed"
      :block="true"
      class="mb-3"
      @click="showModalLink"
    >
      {{ $t('profile.addLink') }}
    </UButton>
    <ModalLink
      v-if="isModalLinkOpen"
      v-model:open="isVisibleModalLink"
      :data="activeLink"
      :inline="!globalStore.isMobile"
      class="mb-2
"
      @close="onModalLinkClose"
    />
    <ul
      ref="el"
      :class="socialLinksClasses"
    >
      <SharedProfileSocialLink
        v-for="link in links"
        :key="link.id"
        :link="link"
        :loading-action="loadingAction"
        @edit="handleActionLink(link, 'edit')"
        @delete="handleActionLink(link, 'delete')"
        @archive="handleActionLink(link, 'archive')"
        @unarchive="handleActionLink(link, 'unarchive')"
      />
    </ul>
    <ModalShareProfile
      v-model:open="isVisibleShareProfile"
      :user="user"
    />
    <ModalEditLink
      v-if="isModalEditLinkOpen"
      v-model:open="isVisibleModalLink"
      :data="activeLink"
      @close="onModalLinkClose"
      @delete="onEditLinkDelete"
    />
    <ModalDelete
      v-if="isVisibleModalDelete"
      v-model:open="isVisibleModalDelete"
      :title="$t('profile.deleteLink')"
      :data="activeLink"
      :loading="loadingAction === 'delete'"
      @delete="acceptDelete"
    />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSortable } from '@vueuse/integrations/useSortable'
import type { SortableEvent } from 'sortablejs'
import { useUserLinks } from '~/stores/user-links'
import type { Link, CreateLinkRequest } from '~/generatedApi'
import ModalShareProfile from '~/components/modals/ModalShareProfile.vue'
import ModalLink from '~/components/modals/ModalLink.vue'
import ModalEditLink from '~/components/modals/ModalEditLink.vue'
import ModalDelete from '~/components/modals/ModalDelete.vue'
import SharedProfileSocialLink from '~/components/shared/SharedProfileSocialLink.vue'
import SharedSlugBadge from '~/components/SharedSlugBadge.vue'
import { useI18n } from '#imports'

const { user } = storeToRefs(useUserStore())
const globalStore = useGlobalStore()
const { notifyError } = useNotify()
const { t } = useI18n()

if (!user.value) {
  throw Error(`user required`)
}

const isVisibleShareProfile = ref<boolean>(false)
const isVisibleModalLink = ref<boolean>(false)
const isVisibleModalDelete = ref<boolean>(false)
const isReorderingLinks = ref<boolean>(false)

const activeLink = ref<Link | null>(null)
const loadingAction = ref<string | null>(null)

const el = ref<HTMLElement | null>(null)

const isModalEditLinkOpen = computed(() => isVisibleModalLink.value && activeLink.value)
const isModalLinkOpen = computed(() => isVisibleModalLink.value && !activeLink.value)

const storeUserLinks = useUserLinks()

const links = computed(() => {
  return storeUserLinks.listLinks
})

const socialLinksClasses = computed(() => ({ 'opacity-50 pointer-events-none': isReorderingLinks.value }))

useSortable(el, links.value, {
  handle: '.drag-handle',
  animation: 200,
  onUpdate: async (e: SortableEvent) => {
    if (typeof e.oldIndex === 'number' && typeof e.newIndex === 'number') {
      isReorderingLinks.value = true

      const item = links.value.splice(e.oldIndex, 1)[0]

      if (item) {
        links.value.splice(e.newIndex, 0, item)

        const reorderedLinksIds = links.value.map(link => link.id) as number[]

        try {
          if (reorderedLinksIds && !!reorderedLinksIds.length) {
            await storeUserLinks.reorderLinks({ order: reorderedLinksIds })
            await storeUserLinks.syncLinksToUser()
          }
        }
        catch (error: unknown) {
          notifyError(error)
        }
        finally {
          isReorderingLinks.value = false
        }
      }
    }
  },
})

const showModalLink = () => {
  activeLink.value = null
  isVisibleModalLink.value = true
}

const onModalLinkClose = () => {
  // Modal closes itself via v-model:open; re-fetch is done inside the modal's save()
}

const onEditLinkDelete = () => {
  isVisibleModalLink.value = false
  isVisibleModalDelete.value = true
}

const handleActionLink = (link: Link, action: string) => {
  activeLink.value = link

  switch (action) {
    case 'edit':
      isVisibleModalLink.value = true
      break

    case 'delete':
      isVisibleModalDelete.value = true
      break

    case 'archive':
      if (!storeUserLinks.isArchiveLinkAvailable) {
        notifyError(t('profile.maxLimitArchivedLinks'))
        break
      }

      toggleArchive(true)

      break
    case 'unarchive':
      if (!storeUserLinks.isAddingLinkAvailable) {
        notifyError(t('profile.maxLimitActiveLinks'))

        break
      }

      toggleArchive(false)
      break
  }
}

const toggleArchive = async (isArchive: boolean) => {
  if (activeLink.value?.id) {
    try {
      loadingAction.value = isArchive ? 'archive' : 'unarchive'

      const data: CreateLinkRequest = {
        url: activeLink.value.url || '',
        is_archive: isArchive,
      }

      await storeUserLinks.edit(activeLink.value?.id, data)
      await storeUserLinks.syncLinksToUser()

      // Закрываем меню действий
      activeLink.value = null
    }
    catch (error) {
      console.error('Ошибка при архивировании ссылки:', error)
    }
    finally {
      loadingAction.value = null
    }
  }
}

const acceptDelete = async () => {
  if (activeLink.value?.id) {
    try {
      loadingAction.value = 'delete'

      await storeUserLinks.delete(activeLink.value.id)
      await storeUserLinks.syncLinksToUser()

      // Сбрасываем активную ссылку
      activeLink.value = null
    }
    catch (error) {
      console.error('Ошибка при удалении ссылки:', error)
    }
    finally {
      loadingAction.value = null
    }
  }
}

onMounted(() => {
  storeUserLinks.get()
})
</script>
