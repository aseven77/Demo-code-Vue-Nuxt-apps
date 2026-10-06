import { countriesEn } from './byLocale/en'
import { countriesRu } from './byLocale/ru'

const countriesByLocale = {
  en: countriesEn,
  ru: countriesRu,
} as const

export default countriesByLocale

export const UNKNOWN_COUNTRY = 'unknown'
