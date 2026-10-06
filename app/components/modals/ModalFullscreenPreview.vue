<script setup lang="ts">
import type { User } from '~/generatedApi'
import SharedPreviewPhone from '~/components/shared/SharedPreviewPhone.vue'
import ModalBase from '~/components/ModalBase.vue'
import { useI18n } from '#imports'

const { t } = useI18n()

defineProps<{
  user: User
}>()

const isOpen = defineModel<boolean>('open')

const viewMode = ref<'mobile' | 'desktop'>('mobile')
</script>

<template>
  <ModalBase
    v-model:open="isOpen"
    :title="t('linkStyle.preview')"
    fullscreen
  >
    <template #body>
      <div class="flex flex-col items-center h-full">
        <!-- Viewport toggle -->
        <div class="flex gap-2 mb-6">
          <button
            data-testid="preview-mode-desktop"
            class="px-4 py-2 text-sm rounded-full border cursor-pointer transition-all"
            :class="[
              viewMode === 'desktop'
                ? 'bg-brand-500 text-white border-brand-500'
                : 'border-gray-200 hover:border-gray-300',
            ]"
            @click="viewMode = 'desktop'"
          >
            {{ t('linkStyle.desktopView') }}
          </button>
          <button
            data-testid="preview-mode-mobile"
            class="px-4 py-2 text-sm rounded-full border cursor-pointer transition-all"
            :class="[
              viewMode === 'mobile'
                ? 'bg-brand-500 text-white border-brand-500'
                : 'border-gray-200 hover:border-gray-300',
            ]"
            @click="viewMode = 'mobile'"
          >
            {{ t('linkStyle.mobileView') }}
          </button>
        </div>

        <!-- Preview container -->
        <div
          class="flex-1 overflow-auto"
          :class="[
            viewMode === 'mobile' ? 'w-[390px] mx-auto' : 'w-full max-w-4xl mx-auto',
          ]"
        >
          <SharedPreviewPhone
            :user="user"
            mode="preview"
            :class="[
              viewMode === 'mobile'
                ? 'rounded-[45px] overflow-hidden h-full'
                : 'rounded-lg overflow-hidden h-full',
            ]"
          />
        </div>
      </div>
    </template>
  </ModalBase>
</template>
