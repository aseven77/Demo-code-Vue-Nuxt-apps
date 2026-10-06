import { watchDebounced } from '@vueuse/core'
import type { UseBioLinkValidationReturn } from '~/types/composable/use-bio-link-validation.types'
import { detectLinksInText } from '~/helpers/detect-links-in-text'
import { useI18n } from '#imports'

export function useBioLinkValidation(bio: Ref<string>): UseBioLinkValidationReturn {
  const { t } = useI18n()

  const hasLinks = ref(false)

  // FR-013: Immediate detection on mount for pre-existing bio text
  hasLinks.value = detectLinksInText(bio.value).length > 0

  // SC-005: Debounced detection on text changes (300ms)
  watchDebounced(
    bio,
    (newVal) => {
      hasLinks.value = detectLinksInText(newVal).length > 0
    },
    { debounce: 300 },
  )

  const linkHintItem = {
    text: t('profile.bioLinksNotAllowed'),
    state: computed(() => {
      if (hasLinks.value) return 'invalid' as const
      return bio.value?.length ? 'valid' as const : 'base' as const
    }),
  }

  return {
    hasLinks: readonly(hasLinks),
    linkHintItem,
  }
}
