<script setup lang="ts">
import PreviewBlock from '~/components/preview/PreviewBlock.vue'
import { useUserLinks } from '~/stores/user-links'

const userStore = useUserStore()
const userLinksStore = useUserLinks()
const { user } = storeToRefs(userStore)
const { notifyError } = useNotify()
try {
  const [fetchedUser] = await Promise.all([
    userStore.getUser(),
    userLinksStore.get(),
  ])
  userStore.$patch({
    user: {
      ...fetchedUser,
      links: userLinksStore.listLinks,
    },
  })
}
catch (error: unknown) {
  notifyError(error instanceof Error ? error : 'Failed to load user')
}
</script>

<template>
  <PreviewBlock
    v-if="user"
    :user="user"
    mode="preview-analytics"
  />
</template>
