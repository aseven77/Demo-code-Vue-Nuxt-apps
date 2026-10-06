export interface DropDownMenuProps {
  label: string
  icon?: string
  color: 'primary' | 'error'
  forMobileOnly?: boolean
  onSelect: () => void
}
