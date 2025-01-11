import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'node:path'
import AutoImport from 'unplugin-auto-import/vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      include: [
        /\.vue$/, /\.vue\?vue/,
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      ],
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
        '@vueuse/head',
        '@vueuse/core',
        'pinia'
      ],
      dirs: [
        path.resolve(__dirname, './src/stores/**'),
      ],
      dts: true,
      vueTemplate: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // css: {
  //   preprocessorOptions: {
  //     stylus: {
  //       additionalData: `@import "${path.resolve(__dirname, 'src/assets/stylus/base/colors.styl')}";`,
  //       use: rupture() 
  //       // additionalData: '@import "~/assets/stylus/common.styl"',
  //       // globals: {
  //       //   '$accent': '#23D05F',
  //       //   '$main': '#FFFFFF',
  //       //   '$second': '#181818',
  //       // }
  //     }
  //   }
  // },
})
