export interface ISharedHintListItems {
  text: string | ComputedRef<string>
  state: globalThis.ComputedRef<'base' | 'valid' | 'invalid'>
  valueLength?: number
  maxLength?: number
}

export interface ISharedHintListProps {
  content?: ISharedHintListItems[]
  error?: boolean
}
