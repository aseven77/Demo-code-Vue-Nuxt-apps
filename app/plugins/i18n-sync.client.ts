import { BROADCAST_CHANNEL_NAME, EVENT_TYPE_CHANGE_LOCALE } from '~/constants/localization'

interface i18nInstance {
  locale: Ref<string>
  setLocale: (locale: string) => Promise<void>
}

export default defineNuxtPlugin((nuxtApp) => {
  const i18n = nuxtApp.$i18n as i18nInstance

  const channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME)

  channel.onmessage = (event) => {
    if (event.data.type === EVENT_TYPE_CHANGE_LOCALE && event.data.code !== i18n.locale.value) {
      void i18n.setLocale(event.data.code)
    }
  }

  return {
    provide: {
      i18nChannel: channel,
    },
  }
})
