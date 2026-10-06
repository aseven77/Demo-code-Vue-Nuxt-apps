<template>
  <article>
    <div class="mb-8">
      <h3
        class="onboarding-title"
      >
        {{ $t('onboarding.appearance') }}
      </h3>
      <p class="font-medium text-base leading-5 text-[var(--ds-color-primitive-grey-700)]">
        {{ $t('onboarding.appearanceHint') }}
      </p>
    </div>

    <div v-if="view === 'menu'">
      <ThemeCardsList
        :themes="themeItems"
        :show-custom-theme="true"
        :selected-id="props.selectedThemeId"
        @select="handleSelect"
      />
    </div>
  </article>
</template>

<script setup lang="ts">
import ThemeCardsList from '../themes/ThemeCardsList.vue'
import type { Background } from '~/generatedApi'

interface Props {
  selectedThemeId?: Nullable<number>
}

const props = withDefaults(defineProps<Props>(), { selectedThemeId: null })

interface Emits {
  selectTheme: [Background]
}

const emits = defineEmits<Emits>()

const { themes } = storeToRefs(useUserStore())
const themeItems = computed(() => themes.value ?? [])

const handleSelect = (theme: Background) => {
  if (!theme.id) {
    view.value = 'new-theme'
  }
  else {
    view.value = 'menu'
  }

  emits('selectTheme', theme)
}

const view = ref<string>('menu')
</script>
