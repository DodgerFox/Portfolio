<template>
  <section class="admin">
    <div class="wrap">
      <section class="admin-card admin-auth" v-if="!passwordVerified">
        <h2>Шаг 1: пароль</h2>
        <p>Введите пароль администратора, затем подтвердите вход через TOTP.</p>

        <form class="admin-form" @submit.prevent="loginWithPassword">
          <input
            v-model="passwordInput"
            type="password"
            autocomplete="current-password"
            placeholder="Пароль администратора"
            :disabled="isPasswordLocked || !hasPasswordConfig"
            required
          />
          <div class="admin-form__actions">
            <button type="submit" :disabled="isPasswordLocked || !hasPasswordConfig">Продолжить</button>
          </div>
        </form>

        <p v-if="!hasPasswordConfig" class="admin-error">
          Не настроены VITE_ADMIN_PASSWORD_HASH и VITE_ADMIN_PASSWORD_SALT. Доступ к админке отключён.
        </p>
        <p v-else-if="isPasswordLocked" class="admin-error">
          Слишком много попыток пароля. Повтори через {{ passwordLockLeftSeconds }} сек.
        </p>
        <p v-else-if="passwordError" class="admin-error">{{ passwordError }}</p>
      </section>

      <section class="admin-card admin-auth" v-else-if="isSetupMode">
        <h2>Настройка TOTP</h2>
        <p>
          Сканируй ключ в Google Authenticator / 1Password / Authy, затем введи 6-значный код для активации админки.
        </p>

        <div class="admin-auth__secret">{{ pendingSecret }}</div>
        <a class="admin-auth__uri" :href="setupUri">otpauth link</a>

        <form class="admin-form" @submit.prevent="confirmSetup">
          <input
            v-model.trim="setupCode"
            inputmode="numeric"
            autocomplete="one-time-code"
            maxlength="6"
            placeholder="Код из приложения (6 цифр)"
            required
          />
          <div class="admin-form__actions">
            <button type="submit">Подтвердить и войти</button>
            <button type="button" class="ghost" @click="regenerateSecret">Сгенерировать новый ключ</button>
          </div>
        </form>
        <p v-if="authError" class="admin-error">{{ authError }}</p>
      </section>

      <section class="admin-card admin-auth" v-else-if="!isUnlocked">
        <h2>Вход в админку (TOTP)</h2>
        <p>Введи одноразовый 6-значный код из приложения-аутентификатора.</p>

        <form class="admin-form" @submit.prevent="loginWithTotp">
          <input
            v-model.trim="loginCode"
            inputmode="numeric"
            autocomplete="one-time-code"
            maxlength="6"
            placeholder="000000"
            :disabled="isLocked"
            required
          />
          <div class="admin-form__actions">
            <button type="submit" :disabled="isLocked">Войти</button>
          </div>
        </form>

        <p v-if="isLocked" class="admin-error">Слишком много попыток. Повтори через {{ lockLeftSeconds }} сек.</p>
        <p v-else-if="authError" class="admin-error">{{ authError }}</p>
      </section>

      <template v-else>
      <header class="admin__head">
        <h1>Admin panel</h1>
        <div class="admin__links">
          <router-link to="/">Главная</router-link>
          <router-link to="/projects">Проекты</router-link>
          <router-link to="/articles">Статьи</router-link>
          <router-link to="/order-website">Лендинг</router-link>
          <button type="button" class="ghost" @click="logout">Выйти</button>
        </div>
      </header>

      <div class="admin__tabs">
        <button type="button" :class="{ active: tab === 'projects' }" @click="tab = 'projects'">Проекты</button>
        <button type="button" :class="{ active: tab === 'articles' }" @click="tab = 'articles'">Статьи</button>
        <button type="button" :class="{ active: tab === 'texts' }" @click="tab = 'texts'">Тексты</button>
      </div>

      <section class="admin-card" v-if="tab === 'projects'">
        <h2>Добавить / редактировать проект</h2>
        <form class="admin-form" @submit.prevent="saveProject">
          <input v-model.trim="projectForm.title" placeholder="Название проекта" required />
          <textarea v-model.trim="projectForm.description" placeholder="Описание" rows="3" required />
          <input v-model.trim="projectForm.link" placeholder="Ссылка (https://...)" required />
          <input v-model.trim="projectForm.image" placeholder="Изображение: URL или имя файла" required />

          <div class="admin-tags">
            <label v-for="tag in tags" :key="tag.id">
              <input type="checkbox" :value="tag.id" v-model="projectForm.tagIds" />
              {{ tag.name.ru }} / {{ tag.name.en }}
            </label>
          </div>

          <label class="admin-check">
            <input type="checkbox" v-model="projectForm.lightText" />
            Светлый текст поверх обложки
          </label>

          <div class="admin-form__actions">
            <button type="submit">{{ projectForm.id ? 'Сохранить проект' : 'Добавить проект' }}</button>
            <button type="button" class="ghost" @click="resetProjectForm">Очистить</button>
          </div>
        </form>

        <div class="admin-list">
          <article v-for="item in customProjects" :key="item.id" class="admin-item">
            <div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
              <small>{{ item.link }}</small>
            </div>
            <div class="admin-item__actions">
              <button type="button" class="ghost" @click="editProject(item.id)">Редактировать</button>
              <button type="button" class="danger" @click="removeProject(item.id)">Удалить</button>
            </div>
          </article>
          <p v-if="!customProjects.length" class="admin-empty">Пока нет пользовательских проектов.</p>
        </div>
      </section>

      <section class="admin-card" v-else-if="tab === 'articles'">
        <h2>Добавить / редактировать статью</h2>
        <form class="admin-form" @submit.prevent="saveArticle">
          <input v-model.trim="articleForm.slug" placeholder="Slug (опционально)" />
          <div class="admin-grid-2">
            <input v-model.trim="articleForm.title.ru" placeholder="Заголовок RU" required />
            <input v-model.trim="articleForm.title.en" placeholder="Заголовок EN" required />
          </div>
          <div class="admin-grid-2">
            <textarea v-model.trim="articleForm.summary.ru" placeholder="Кратко RU" rows="2" required />
            <textarea v-model.trim="articleForm.summary.en" placeholder="Кратко EN" rows="2" required />
          </div>
          <div class="admin-grid-2">
            <textarea v-model.trim="articleForm.seoDescription.ru" placeholder="SEO описание RU" rows="2" required />
            <textarea v-model.trim="articleForm.seoDescription.en" placeholder="SEO описание EN" rows="2" required />
          </div>
          <div class="admin-grid-2">
            <textarea v-model.trim="articleForm.content.ru" placeholder="Контент RU" rows="5" required />
            <textarea v-model.trim="articleForm.content.en" placeholder="Контент EN" rows="5" required />
          </div>
          <input v-model.trim="articleForm.image" placeholder="Картинка (URL)" required />
          <div class="admin-grid-2">
            <input v-model.trim="articleForm.readTime" placeholder="Время чтения (пример: 7 min)" required />
            <input v-model="articleForm.publishedAt" type="date" required />
          </div>
          <input v-model.trim="articleTagsInput" placeholder="Теги через запятую (например: SEO, Vue, UX)" />

          <div class="admin-form__actions">
            <button type="submit">{{ articleForm.id ? 'Сохранить статью' : 'Добавить статью' }}</button>
            <button type="button" class="ghost" @click="resetArticleForm">Очистить</button>
          </div>
        </form>

        <div class="admin-list">
          <article v-for="item in customArticles" :key="item.id" class="admin-item">
            <div>
              <h3>{{ item.title.ru }}</h3>
              <p>{{ item.summary.ru }}</p>
              <small>/articles/{{ item.slug }}</small>
            </div>
            <div class="admin-item__actions">
              <button type="button" class="ghost" @click="editArticle(item.id)">Редактировать</button>
              <button type="button" class="danger" @click="removeArticle(item.id)">Удалить</button>
            </div>
          </article>
          <p v-if="!customArticles.length" class="admin-empty">Пока нет пользовательских статей.</p>
        </div>
      </section>

      <section class="admin-card" v-else>
        <h2>Редактирование текстов (главная и лендинг)</h2>
        <form class="admin-form" @submit.prevent="saveTexts">
          <h3>Главная</h3>
          <div class="admin-grid-2">
            <input v-model.trim="textsForm.welcome.hi.ru" placeholder="HI RU" />
            <input v-model.trim="textsForm.welcome.hi.en" placeholder="HI EN" />
          </div>
          <div class="admin-grid-2">
            <input v-model.trim="textsForm.welcome.occupation.ru" placeholder="Occupation RU" />
            <input v-model.trim="textsForm.welcome.occupation.en" placeholder="Occupation EN" />
          </div>
          <div class="admin-grid-2">
            <input v-model.trim="textsForm.welcome.orderCta.ru" placeholder="CTA RU" />
            <input v-model.trim="textsForm.welcome.orderCta.en" placeholder="CTA EN" />
          </div>
          <div class="admin-grid-2">
            <textarea v-model.trim="textsForm.welcome.orderSubtitle.ru" placeholder="Подзаголовок блока заказа RU" rows="2" />
            <textarea v-model.trim="textsForm.welcome.orderSubtitle.en" placeholder="Order subtitle EN" rows="2" />
          </div>

          <h3>Лендинг /order-website</h3>
          <div class="admin-grid-2">
            <input v-model.trim="textsForm.orderLanding.title.ru" placeholder="Title RU" />
            <input v-model.trim="textsForm.orderLanding.title.en" placeholder="Title EN" />
          </div>
          <div class="admin-grid-2">
            <textarea v-model.trim="textsForm.orderLanding.lead.ru" placeholder="Lead RU" rows="2" />
            <textarea v-model.trim="textsForm.orderLanding.lead.en" placeholder="Lead EN" rows="2" />
          </div>
          <div class="admin-grid-2">
            <input v-model.trim="textsForm.orderLanding.finalTitle.ru" placeholder="Final title RU" />
            <input v-model.trim="textsForm.orderLanding.finalTitle.en" placeholder="Final title EN" />
          </div>
          <div class="admin-grid-2">
            <textarea v-model.trim="textsForm.orderLanding.finalLead.ru" placeholder="Final lead RU" rows="2" />
            <textarea v-model.trim="textsForm.orderLanding.finalLead.en" placeholder="Final lead EN" rows="2" />
          </div>

          <div class="admin-form__actions">
            <button type="submit">Сохранить тексты</button>
          </div>
        </form>
      </section>

      <section class="admin-card admin-card--danger">
        <h2>Сброс</h2>
        <p>Удаляет все пользовательские проекты, статьи и тексты из localStorage.</p>
        <button type="button" class="danger" @click="handleReset">Сбросить всё</button>
      </section>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { useHead } from '@unhead/vue'
import { useAdminCms, type AdminTextSettings } from '@/utils/admin-cms'
import { buildOtpAuthUri, generateBase32Secret, verifyTotpCode } from '@/utils/totp'
import { constantTimeEqual, hashPasswordPbkdf2 } from '@/utils/password-auth'

const {
  tags,
  customProjects,
  customArticles,
  textSettings,
  upsertProject,
  removeProject,
  upsertArticle,
  removeArticle,
  saveTextSettings,
  resetAll,
} = useAdminCms()

const TOTP_SECRET_KEY = 'portfolio.admin.totp.secret.v1'
const TOTP_SESSION_KEY = 'portfolio.admin.totp.session.v1'
const TOTP_FAILS_KEY = 'portfolio.admin.totp.fails.v1'
const TOTP_LOCK_UNTIL_KEY = 'portfolio.admin.totp.lock-until.v1'
const PASSWORD_FAILS_KEY = 'portfolio.admin.password.fails.v1'
const PASSWORD_LOCK_UNTIL_KEY = 'portfolio.admin.password.lock-until.v1'

const PASSWORD_HASH = String(import.meta.env.VITE_ADMIN_PASSWORD_HASH || '').trim().toLowerCase()
const PASSWORD_SALT = String(import.meta.env.VITE_ADMIN_PASSWORD_SALT || '').trim()
const PASSWORD_ITERATIONS = Number(import.meta.env.VITE_ADMIN_PASSWORD_ITERATIONS || 210000)

const SESSION_MS = 15 * 60 * 1000
const MAX_FAILS = 5
const LOCK_MS = 5 * 60 * 1000

const passwordInput = ref('')
const passwordVerified = ref(false)
const passwordError = ref('')
const passwordLockUntil = ref(0)

const pendingSecret = ref('')
const setupCode = ref('')
const loginCode = ref('')
const isUnlocked = ref(false)
const authError = ref('')
const lockUntil = ref(0)
const lockNow = ref(Date.now())
let lockTicker: number | null = null

const setupUri = computed(() =>
  buildOtpAuthUri({
    secret: pendingSecret.value,
    accountName: 'admin@alexey-chernov.netlify.app',
    issuer: 'Alexey Chernov Portfolio',
  }),
)

const hasPasswordConfig = computed(() => Boolean(PASSWORD_HASH && PASSWORD_SALT))
const isPasswordLocked = computed(() => passwordLockUntil.value > lockNow.value)
const passwordLockLeftSeconds = computed(() => Math.max(0, Math.ceil((passwordLockUntil.value - lockNow.value) / 1000)))

const isSetupMode = computed(() => {
  if (typeof window === 'undefined') return false
  return !window.localStorage.getItem(TOTP_SECRET_KEY)
})

const isLocked = computed(() => lockUntil.value > lockNow.value)
const lockLeftSeconds = computed(() => Math.max(0, Math.ceil((lockUntil.value - lockNow.value) / 1000)))

const tab = ref<'projects' | 'articles' | 'texts'>('projects')

const projectForm = reactive({
  id: '',
  title: '',
  description: '',
  link: '',
  image: '',
  tagIds: [] as number[],
  lightText: false,
})

const articleForm = reactive({
  id: '',
  slug: '',
  title: { ru: '', en: '' },
  summary: { ru: '', en: '' },
  seoDescription: { ru: '', en: '' },
  content: { ru: '', en: '' },
  image: '',
  readTime: '6 min',
  publishedAt: new Date().toISOString().slice(0, 10),
})
const articleTagsInput = ref('')

const textsForm = reactive<AdminTextSettings>(JSON.parse(JSON.stringify(textSettings.value)))

function resetProjectForm() {
  projectForm.id = ''
  projectForm.title = ''
  projectForm.description = ''
  projectForm.link = ''
  projectForm.image = ''
  projectForm.tagIds = []
  projectForm.lightText = false
}

function editProject(id: string) {
  const target = customProjects.value.find((item) => item.id === id)
  if (!target) return
  projectForm.id = target.id
  projectForm.title = target.title
  projectForm.description = target.description
  projectForm.link = target.link
  projectForm.image = target.image
  projectForm.tagIds = [...target.tagIds]
  projectForm.lightText = Boolean(target.lightText)
}

function saveProject() {
  upsertProject({
    id: projectForm.id || undefined,
    title: projectForm.title,
    description: projectForm.description,
    link: projectForm.link,
    image: projectForm.image,
    tagIds: projectForm.tagIds,
    lightText: projectForm.lightText,
  })
  resetProjectForm()
}

function resetArticleForm() {
  articleForm.id = ''
  articleForm.slug = ''
  articleForm.title.ru = ''
  articleForm.title.en = ''
  articleForm.summary.ru = ''
  articleForm.summary.en = ''
  articleForm.seoDescription.ru = ''
  articleForm.seoDescription.en = ''
  articleForm.content.ru = ''
  articleForm.content.en = ''
  articleForm.image = ''
  articleForm.readTime = '6 min'
  articleForm.publishedAt = new Date().toISOString().slice(0, 10)
  articleTagsInput.value = ''
}

function editArticle(id: string) {
  const target = customArticles.value.find((item) => item.id === id)
  if (!target) return

  articleForm.id = target.id
  articleForm.slug = target.slug
  articleForm.title.ru = target.title.ru
  articleForm.title.en = target.title.en
  articleForm.summary.ru = target.summary.ru
  articleForm.summary.en = target.summary.en
  articleForm.seoDescription.ru = target.seoDescription.ru
  articleForm.seoDescription.en = target.seoDescription.en
  articleForm.content.ru = target.content.ru
  articleForm.content.en = target.content.en
  articleForm.image = target.image
  articleForm.readTime = target.readTime
  articleForm.publishedAt = target.publishedAt
  articleTagsInput.value = target.tags.join(', ')
}

function saveArticle() {
  upsertArticle({
    id: articleForm.id || undefined,
    slug: articleForm.slug,
    title: articleForm.title,
    summary: articleForm.summary,
    seoDescription: articleForm.seoDescription,
    content: articleForm.content,
    image: articleForm.image,
    readTime: articleForm.readTime,
    publishedAt: articleForm.publishedAt,
    tags: articleTagsInput.value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean),
  })

  resetArticleForm()
}

function saveTexts() {
  saveTextSettings(JSON.parse(JSON.stringify(textsForm)))
}

function handleReset() {
  resetAll()
  resetProjectForm()
  resetArticleForm()
  Object.assign(textsForm, JSON.parse(JSON.stringify(textSettings.value)))
}

function readNumber(key: string, fallback = 0) {
  if (typeof window === 'undefined') return fallback
  const raw = window.localStorage.getItem(key)
  const value = Number(raw)
  return Number.isFinite(value) ? value : fallback
}

function setSession() {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(TOTP_SESSION_KEY, String(Date.now() + SESSION_MS))
  window.localStorage.setItem(TOTP_FAILS_KEY, '0')
  window.localStorage.removeItem(TOTP_LOCK_UNTIL_KEY)
  lockUntil.value = 0
  isUnlocked.value = true
  authError.value = ''
}

function logout() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(TOTP_SESSION_KEY)
  isUnlocked.value = false
  passwordVerified.value = false
  loginCode.value = ''
  passwordInput.value = ''
}

async function loginWithPassword() {
  passwordError.value = ''

  if (!hasPasswordConfig.value) {
    passwordError.value = 'Пароль не настроен в окружении.'
    return
  }

  if (isPasswordLocked.value) return

  const value = passwordInput.value || ''
  if (value.length < 8) {
    passwordError.value = 'Слишком короткий пароль.'
    return
  }

  const derived = await hashPasswordPbkdf2({
    password: value,
    salt: PASSWORD_SALT,
    iterations: PASSWORD_ITERATIONS,
    keyLength: 32,
  })

  if (constantTimeEqual(derived, PASSWORD_HASH)) {
    passwordVerified.value = true
    passwordInput.value = ''
    passwordError.value = ''
    window.localStorage.setItem(PASSWORD_FAILS_KEY, '0')
    window.localStorage.removeItem(PASSWORD_LOCK_UNTIL_KEY)
    passwordLockUntil.value = 0
    return
  }

  const fails = readNumber(PASSWORD_FAILS_KEY, 0) + 1
  window.localStorage.setItem(PASSWORD_FAILS_KEY, String(fails))

  if (fails >= MAX_FAILS) {
    const until = Date.now() + LOCK_MS
    window.localStorage.setItem(PASSWORD_LOCK_UNTIL_KEY, String(until))
    window.localStorage.setItem(PASSWORD_FAILS_KEY, '0')
    passwordLockUntil.value = until
    passwordError.value = 'Лимит попыток пароля превышен.'
    return
  }

  passwordError.value = `Неверный пароль. Осталось попыток: ${MAX_FAILS - fails}.`
}

function regenerateSecret() {
  pendingSecret.value = generateBase32Secret(32)
  setupCode.value = ''
  authError.value = ''
}

async function confirmSetup() {
  authError.value = ''
  const code = setupCode.value.replace(/\D/g, '')

  if (code.length !== 6) {
    authError.value = 'Код должен содержать 6 цифр.'
    return
  }

  const valid = await verifyTotpCode(pendingSecret.value, code, { window: 1 })
  if (!valid) {
    authError.value = 'Неверный код. Проверь время на устройстве и попробуй снова.'
    return
  }

  window.localStorage.setItem(TOTP_SECRET_KEY, pendingSecret.value)
  setSession()
}

async function loginWithTotp() {
  authError.value = ''
  if (isLocked.value) return

  if (typeof window === 'undefined') return
  const secret = window.localStorage.getItem(TOTP_SECRET_KEY)
  if (!secret) {
    authError.value = 'TOTP не настроен. Сначала пройди первичную настройку.'
    return
  }

  const code = loginCode.value.replace(/\D/g, '')
  if (code.length !== 6) {
    authError.value = 'Код должен содержать 6 цифр.'
    return
  }

  const valid = await verifyTotpCode(secret, code, { window: 1 })
  if (valid) {
    setSession()
    loginCode.value = ''
    return
  }

  const fails = readNumber(TOTP_FAILS_KEY, 0) + 1
  window.localStorage.setItem(TOTP_FAILS_KEY, String(fails))

  if (fails >= MAX_FAILS) {
    const until = Date.now() + LOCK_MS
    window.localStorage.setItem(TOTP_LOCK_UNTIL_KEY, String(until))
    window.localStorage.setItem(TOTP_FAILS_KEY, '0')
    lockUntil.value = until
    authError.value = 'Лимит попыток превышен.'
    return
  }

  authError.value = `Неверный код. Осталось попыток: ${MAX_FAILS - fails}.`
}

onMounted(() => {
  if (typeof window === 'undefined') return

  passwordLockUntil.value = readNumber(PASSWORD_LOCK_UNTIL_KEY, 0)
  lockUntil.value = readNumber(TOTP_LOCK_UNTIL_KEY, 0)
  const expiresAt = readNumber(TOTP_SESSION_KEY, 0)
  isUnlocked.value = Boolean(expiresAt && expiresAt > Date.now())

  if (!window.localStorage.getItem(TOTP_SECRET_KEY)) {
    pendingSecret.value = generateBase32Secret(32)
  }

  lockTicker = window.setInterval(() => {
    lockNow.value = Date.now()

    const exp = readNumber(TOTP_SESSION_KEY, 0)
    if (isUnlocked.value && exp && exp <= Date.now()) {
      logout()
    }

    passwordLockUntil.value = readNumber(PASSWORD_LOCK_UNTIL_KEY, 0)
    lockUntil.value = readNumber(TOTP_LOCK_UNTIL_KEY, 0)
  }, 1000)
})

onBeforeUnmount(() => {
  if (lockTicker) window.clearInterval(lockTicker)
})

useHead({
  title: 'Admin — Portfolio',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})
</script>

<style lang="stylus">
.admin
  padding 32px 0 56px
  color #eaf2fb

  .wrap
    display flex
    flex-direction column
    gap 16px

  &__head
    display flex
    justify-content space-between
    align-items center
    gap 14px
    flex-wrap wrap

    h1
      margin 0
      font-size clamp(28px, 5vw, 44px)

  &__links
    display flex
    gap 8px
    flex-wrap wrap
    a
      text-decoration none
      border 1px solid #445a72
      color #ecf5ff
      border-radius 999px
      min-height 34px
      display inline-flex
      align-items center
      padding 0 12px

  &__tabs
    display flex
    gap 8px
    flex-wrap wrap

    button
      min-height 38px
      border-radius 999px
      border 1px solid #445a72
      background rgba(255, 255, 255, .02)
      color #e9f3ff
      padding 0 14px
      font-weight 700
      cursor pointer

      &.active
        background #dcffd0
        color #111
        border-color #dcffd0

.admin-card
  background #10161f
  border 1px solid #2a3a4c
  border-radius 18px
  padding 16px
  display flex
  flex-direction column
  gap 12px

  h2
    margin 0

  h3
    margin 4px 0 0

  p
    margin 0

  &--danger
    border-color rgba(255, 98, 98, .4)

.admin-auth
  max-width 760px

  &__secret
    font-family ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace
    background #0a1017
    border 1px solid #2f4560
    border-radius 12px
    padding 10px 12px
    letter-spacing .06em
    word-break break-all

  &__uri
    color #aad4ff
    text-decoration none
    max-width 100%
    overflow hidden
    text-overflow ellipsis
    white-space nowrap

.admin-error
  color #ff8f8f

.admin-form
  display flex
  flex-direction column
  gap 10px

  input,
  textarea
    background #0a1017
    border 1px solid #2a3c52
    border-radius 12px
    min-height 40px
    color #e9f2fb
    padding 10px 12px
    font inherit

  textarea
    resize vertical

  &__actions
    display flex
    gap 8px
    flex-wrap wrap

.admin-grid-2
  display grid
  grid-template-columns repeat(2, minmax(0, 1fr))
  gap 10px

.admin-tags
  display grid
  grid-template-columns repeat(3, minmax(0, 1fr))
  gap 8px

  label
    display inline-flex
    gap 8px
    align-items center
    font-size 14px

.admin-check
  display inline-flex
  gap 8px
  align-items center

.admin-list
  display flex
  flex-direction column
  gap 8px

.admin-item
  border 1px solid #30445b
  border-radius 12px
  padding 10px
  display flex
  align-items flex-start
  justify-content space-between
  gap 10px

  h3
    margin 0 0 4px

  p
    margin 0 0 6px
    color #c2d5e9

  small
    color #8faccc

  &__actions
    display flex
    gap 8px

button
  border 0
  border-radius 10px
  min-height 38px
  padding 0 12px
  cursor pointer
  font-weight 700
  background #dcffd0
  color #111

  &.ghost
    background transparent
    border 1px solid #3e556f
    color #e8f1fb

  &.danger
    background #ff5f5f
    color #fff

.admin-empty
  color #9fb4cb

@media screen and (max-width: 860px)
  .admin-grid-2,
  .admin-tags
    grid-template-columns 1fr
</style>
