import type { ISharedHintListItems } from '~/types/components/shared-hint-list.types'

export interface UseBioLinkValidationReturn {
  hasLinks: Readonly<Ref<boolean>>
  linkHintItem: ISharedHintListItems
}
