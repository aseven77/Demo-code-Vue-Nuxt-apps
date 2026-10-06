import { Environment } from './app/constants/app-config/sentry'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/icon',
    'nuxt-qrcode',
    '@nuxtjs/i18n',
    '@sentry/nuxt/module',
    'nuxt-gtag',
  ],

  devtools: {
    enabled: process.env.NODE_ENV !== 'production',

    timeline: {
      enabled: true,
    },
  },

  app: {
    head: {
      title: '',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/images/favicon.svg' },
      ],
    },
  },

  css: [
    '~/assets/css/variables.css',
    '~/assets/css/main.css',
  ],

  ui: {
    fonts: false,
    colorMode: false,
  },

  runtimeConfig: {
    telegramBotId: '',
    telegramRedirect: '',
    appOrigin: '',
    vkRedirect: '',
    vkClientId: '',
    appleClientId: '',
    NUXT_ENV: '',
    NUXT_SENTRY_ORG: '',
    NUXT_SENTRY_PROJECT: '',
    NUXT_SENTRY_DSN: '',
    NUXT_APP_VERSION: '',
    public: {
      urlApi: process.env.NUXT_PUBLIC_URL_API,
      env: process.env.NUXT_ENV,
      sentryOrg: process.env.NUXT_SENTRY_ORG,
      sentryProject: process.env.NUXT_SENTRY_PROJECT,
      sentryDsn: process.env.NUXT_SENTRY_DSN,
      appVersion: process.env.NUXT_APP_VERSION,
    },
  },

  build: {
    transpile: [
      'vue-advanced-cropper',
    ],
  },

  routeRules: {
    '/': { isr: 3600 },
    '/_nuxt/**': {
      headers: { 'cache-control': 'public, max-age=31536000, immutable' },
    },
    // Публичные страницы пользователей — можно кэшировать (нет зависимости от auth)
    '/user/**': { swr: 60 },
    // Все остальные маршруты НЕ кэшируются через SWR:
    // SWR рендерит страницы без cookie-заголовков (в отдельном контексте),
    // поэтому middleware не видит auth state → неправильный SSR → hydration mismatch
  },

  sourcemap: {
    client: 'hidden',
  },

  devServer: {
    port: 3000,
  },

  features: {
    inlineStyles: false,
  },
  experimental: {
    typedPages: true,
    renderJsonPayloads: true,
    payloadExtraction: true,
    componentIslands: true,
  },

  compatibilityDate: '2025-11-01',

  nitro: {
    storage: {
      cache: {
        driver: 'lruCache',
        max: 1000,
      },
    },
    sourceMap: true,
    compressPublicAssets: true,
    prerender: {
      routes: ['/'],
    },
    hooks: {
      close: () => {
        // Принудительно завершаем процесс после успешной сборки.
        // Решает проблему зависшего MessagePort от сторонних зависимостей.
        // Не вызываем при тестах — @nuxt/test-utils закрывает Nuxt при инициализации,
        // и process.exit(0) убивает vitest до запуска тестов.
        if (!process.env.VITEST) {
          process.exit(0)
        }
      },
    },
  },

  vite: {
    server: {
      // todo: Для авторизации соц сетей. Для прохождения через CORS (только для локальной разработки)
      allowedHosts: ['9a748fb9301a.ngrok-free.app', 'localhost'],
    },
  },

  eslint: {
    config: {
      stylistic: true,
    },
    // checker: true // Включите, если нужна проверка при разработке (в деве, НЕ добавлять в коммит)
  },

  gtag: {
    id: 'G-H5Y5GTQQB9',
    enabled: process.env.NODE_ENV !== Environment.TEST,
    // в nuxt3 версии работает наоборот эта настройка
    // https://nuxt.com/modules/gtag
    // The enabled option is still available in v3.x,
    // but is now used to disable the Google tag module for the current environment.
    // то есть сейчас только для теста работает, очень странно, но так работает
  },
  i18n: {
    vueI18n: './i18n.config.ts',
    defaultLocale: 'en',
    strategy: 'no_prefix',
    locales: [
      { code: 'en', iso: 'en-US', file: 'en-US.json', name: 'English' },
      { code: 'ru', iso: 'ru-RU', file: 'ru-RU.json', name: 'Русский' },
    ],
    langDir: 'lang',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: false,
      redirectOn: 'root',
    },
  },
  icon: {
    serverBundle: 'remote',
    clientBundle: {
      scan: true,
      includeCustomCollections: true,
      sizeLimitKb: 256,
    },
    customCollections: [
      {
        normalizeIconName: false,
        prefix: 'custom',
        dir: './app/assets/icons',
      },
    ],
  },

  qrcode: {
    options: {
      variant: {
        inner: 'default',
        marker: 'default',
        pixel: 'default',
      },
      radius: 1,
      blackColor: 'currentColor',
      whiteColor: 'transparent',
    },
  },

  sentry: {
    sourceMapsUploadOptions: {
      org: 'rd-ul',
      project: '',
      sourcemaps: {
        filesToDeleteAfterUpload: ['.output/**/*.map'],
      },
    },
  },
})
