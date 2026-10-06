import type ru from '../../../i18n/lang/ru-RU.json'

type MessageSchema = typeof ru

declare module 'vue-i18n' {
  export type DefineLocaleMessage = MessageSchema
}
