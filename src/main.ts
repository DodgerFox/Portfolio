import './assets/stylus/common.styl'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import messages from '@intlify/unplugin-vue-i18n/messages'
console.log(messages, 'messages')

const i18n = createI18n({
  locale: 'en',
  messages,
})

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
