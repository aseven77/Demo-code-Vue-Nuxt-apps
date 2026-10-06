export type LocaleCode = 'en' | 'ru'

export interface SupportedLocale {
  code: LocaleCode
  name: string
  icon: string
}

export interface LanguagePickerEmits {
  (e: 'localeChanged', locale: LocaleCode): void
}
