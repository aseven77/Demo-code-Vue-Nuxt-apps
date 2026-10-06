import { russianPluralIndex } from '~/utils/declension'
import { defineI18nConfig } from '#imports'

export default defineI18nConfig(() => ({
  legacy: false,
  fallbackLocale: 'en',
  pluralRules: {
    ru: russianPluralIndex,
  },
}))
