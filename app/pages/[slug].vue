<script setup lang="ts">
import PreviewBlock from '~/components/preview/PreviewBlock.vue'
import { useUserDeviceInfo } from '~/composables/useUserDeviceInfo'
import { useGeo } from '#imports'
import { UNKNOWN_COUNTRY } from '~/constants/countries'

const route = useRoute()
const slug = route.params.slug

if (typeof slug != 'string') {
  throw new Error('slug must be a string')
}

const { clientDeviceType, clientOs } = await useUserDeviceInfo()
const { data: clientRegion } = await useGeo()

const userStore = useUserStore()

const { data, error } = await useAsyncData(
  `user-${slug}`,
  () => userStore.getUserBySlug({
    slug,
    clientRegion: clientRegion.value?.country || UNKNOWN_COUNTRY,
    clientDeviceType,
    clientOs,
  }),
  {
    getCachedData: (key) => {
      const nuxtApp = useNuxtApp()
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
    },
  },
)

if (error.value?.message) {
  throw error.value
}
</script>

<template>
  <PreviewBlock
    v-if="data"
    :user="data"
    mode="production"
  />
</template>
