<template>
  <ModalBase
    v-model:open="isOpen"
    :title="$t(titleKey)"
    @close="isOpen = false"
  >
    <template #body>
      <div
        ref="scrollAreaRef"
        class="scrollbar scrollbar-thumb-(--ds-color-primitive-brand-400) scrollbar-track-(--ds-color-primitive-brand-100) overflow-y-auto pr-1 text-sm leading-relaxed"
      >
        <VueMarkdownRender
          v-if="markdownSource"
          :source="markdownSource"
          class="markdown-content"
        />

        <LegalErrorContent
          v-if="markdownSource"
          :error-title-key="props.errorTitleKey"
          :error-text-key="props.errorTextKey"
        />

        <div
          v-else
          class="flex justify-center items-center h-80"
        >
          <span class="loading loading-spinner loading-lg text-primary" />
        </div>
      </div>
    </template>
  </ModalBase>
</template>

<script setup lang="ts">
import { ref, watch, computed, nextTick } from 'vue'
import VueMarkdownRender from 'vue-markdown-render'
import LegalErrorContent from '@/components/LegalErrorContent.vue'
import ModalBase from '~/components/ModalBase.vue'

const props = defineProps<{
  document: string
  titleKey: string
  errorTitleKey?: string
  errorTextKey?: string
}>()

const { locale } = useI18n()
const isOpen = defineModel<boolean>('open', { default: false })

const markdownSource = ref<string | null>(null)
const hasError = ref(false)
const scrollAreaRef = ref<HTMLElement | null>(null)

const documentPath = computed(() =>
  `/content/${props.document}/${locale.value}.md`,
)

watch([isOpen, locale], async ([open]) => {
  if (!open) {
    markdownSource.value = null
    hasError.value = false
    return
  }

  try {
    const response = await fetch(documentPath.value)

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`)
    }

    const text = await response.text()
    markdownSource.value = text
  }
  catch (err) {
    console.error(`Failed to load legal document ${props.document} (${locale.value}):`, err)
    hasError.value = true
  }
  finally {
    nextTick(() => scrollAreaRef.value?.scrollTo(0, 0))
  }
}, { immediate: true })
</script>

<style scoped>
.markdown-content {
  :deep(p) {
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }

  :deep(h1),
  :deep(h2),
  :deep(h3),
  :deep(h4),
  :deep(h5),
  :deep(h6) {
    font-weight: 700;
    margin-bottom: 10px;
  }

  :deep(ul) {
    list-style: inside;
    margin-bottom: 10px;
  }
}
</style>
