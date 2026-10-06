import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

// Fix: @vue/compiler-core@3.5.22 (hoisted) depends on entities@^4 but pnpm hoists entities@7.
// Redirect to v3.5.28 which uses entities@^7, matching the hoisted version.
const compilerCore328 = resolve(__dirname, 'node_modules/.pnpm/@vue+compiler-core@3.5.28/node_modules/@vue/compiler-core')

export default defineConfig({
  plugins: [
    {
      name: 'nuxt-meta-env',
      transform(code) {
        return code
          .replace(/import\.meta\.client/g, 'true')
          .replace(/import\.meta\.server/g, 'false')
      },
    },
    vue({
      template: {
        transformAssetUrls: false,
      },
    }),
    AutoImport({
      imports: ['vue'],
      dirs: ['app/composables', 'app/stores'],
    }),
  ],
  esbuild: {
    tsconfigRaw: '{}',
  },
  resolve: {
    alias: [
      { find: '~', replacement: resolve(__dirname, 'app') },
      { find: '@', replacement: resolve(__dirname, 'app') },
      { find: '#imports', replacement: resolve(__dirname, 'tests/mocks/nuxt-imports') },
      { find: '#app', replacement: resolve(__dirname, 'tests/mocks/nuxt-imports') },
      { find: '@vue/compiler-core', replacement: compilerCore328 },
    ],
  },
  test: {
    environment: 'happy-dom',
    setupFiles: ['tests/setup/setupTests.ts'],
    include: ['tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['json-summary', 'html', 'text'],
      include: ['app/**/*.{ts,vue}'],
    },
  },
})
