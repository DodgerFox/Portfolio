<template>
  <section class="welcome" :class="{ 'order-open': orderPanelOpen }">
    <div class="welcome-scene">
      <div class="wrap">
        <h1 class="welcome-title mobile">{{ $t('welcome.portfolio') }}</h1>
        <div class="welcome-blocks">
          <div class="welcome-block welcome-profile">
            <div class="welcome-header">
              <div class="button" @click="aboutIsOpen = !aboutIsOpen">
                <p>{{ !aboutIsOpen ? $t('welcome.about') : $t('welcome.general') }}</p>
              </div>
              <div class="welcome-tools">
                <div class="welcome-tool">
                  <inline-svg src="./icons/share.svg" />
                </div>
                <div class="welcome-tool">
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
            <div class="welcome-profile__avatar" v-if="!aboutIsOpen">
              <img :src="avatarSrc" alt="Alexey Chernov avatar" @error="onAvatarError" />
            </div>
            <div class="welcome-content" v-if="!aboutIsOpen">
              <h2 class="welcome-content__title">{{ $t('welcome.hi') }}</h2>
              <h3 class="welcome-content__text">{{ $t('welcome.occupation') }}</h3>
            </div>

            <div class="welcome-about" v-else v-html="story[currentLocale]"></div>
          </div>
          <div class="welcome-links">
            <h1 class="welcome-title">{{ $t('welcome.portfolio') }}</h1>
            <div class="welcome-blocks">
              <router-link to="projects" class="welcome-block clickable">
                <div class="welcome-stat__title">{{ projects.length }}</div>
                <div class="welcome-stat__text">{{ $t('global.projects') }}</div>
              </router-link>
              <!-- <div class="welcome-block clickable" @click="later">
                <div class="welcome-stat__title">31</div>
                <div class="welcome-stat__text">{{ $t('global.clients') }}</div>
              </div> -->
              <button class="welcome-order-cta welcome-order-cta--card" @click="openOrderPanel">
                {{ orderCtaText }}
              </button>
              <router-link to="/articles" class="welcome-block clickable">
                <div class="welcome-stat__title">{{ articles.length }}</div>
                <div class="welcome-stat__text">{{ $t('global.articles') }}</div>
              </router-link>
              <div class="welcome-block socials">
                <a href="https://t.me/lilborsch" target="_blank" class="socials-item telegram">
                  <inline-svg src="./icons/socials/telegram.svg" width="45" />
                </a>
                <a target="_blank" href="https://wa.me/+79959971293" class="socials-item whatsapp">
                  <inline-svg src="./icons/socials/whatsapp.svg" width="45" />
                </a>
                <a href="mailto:limmeco@gmail.com" class="socials-item gmail">
                  <inline-svg src="./icons/socials/gmail.svg" width="45" />
                </a>
                <a target="_blank" href="https://github.com/DodgerFox" class="socials-item github">
                  <inline-svg src="./icons/socials/github.svg" width="45" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section class="welcome-order" :class="{ open: orderPanelOpen }">
      <div class="welcome-order__head">
        <h2>{{ currentLocale === LOCALES.ru ? 'Как я делаю сайты' : 'How I build websites' }}</h2>
        <button type="button" class="welcome-order__close" @click="closeOrderPanel">✕</button>
      </div>
      <p class="welcome-order__subtitle">{{ orderInfo.subtitle }}</p>

      <div class="welcome-order__stats">
        <article class="welcome-order__stat" v-for="item in orderInfo.stats" :key="item.label">
          <div class="welcome-order__stat-value">{{ item.value }}</div>
          <div class="welcome-order__stat-label">{{ item.label }}</div>
        </article>
      </div>

      <div class="welcome-order__progress" aria-hidden="true">
        <template v-for="(step, index) in orderInfo.steps" :key="`progress-${step.title}`">
          <span class="welcome-order__progress-node">{{ String(index + 1).padStart(2, '0') }}</span>
          <span v-if="index < orderInfo.steps.length - 1" class="welcome-order__progress-line"></span>
        </template>
      </div>

      <div class="welcome-order__flow">
        <article class="welcome-order__step" v-for="(step, index) in orderInfo.steps" :key="step.title">
          <div class="welcome-order__step-index">{{ String(index + 1).padStart(2, '0') }}</div>
          <h3 class="welcome-order__step-title">{{ step.title }}</h3>
          <p class="welcome-order__step-text">{{ step.text }}</p>
        </article>
      </div>

      <div class="welcome-order__deliverables">
        <span class="welcome-order__chip" v-for="chip in orderInfo.deliverables" :key="chip">{{ chip }}</span>
      </div>

      <div class="welcome-order__actions">
        <a href="https://t.me/lilborsch" target="_blank" rel="noopener noreferrer">
          {{ orderInfo.cta }}
        </a>
      </div>
    </section>
  </section>
</template>
<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import InlineSvg from 'vue-inline-svg'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher.vue'
import projects from '@/data/projects.json'
import { articles } from '@/data/articles'
import story from '@/data/story.json'
import { NotificationsStore } from '@/stores/notifications'
import { LOCALES } from '@/types/environment.ts'
const { locale, t } = useI18n()

const notificationsStore = NotificationsStore()

const aboutIsOpen = ref(false)
const orderPanelOpen = ref(false)
const currentLocale = computed(() => (locale.value as LOCALES) || LOCALES.en)
const orderCtaText = computed(() => (currentLocale.value === LOCALES.ru ? 'Заказать\nсайт' : 'Order\nwebsite'))
const orderInfo = computed(() => {
  if (currentLocale.value === LOCALES.ru) {
    return {
      subtitle: 'Инфографика процесса: прозрачные этапы, фиксируем сроки и даю понятный результат на каждом шаге.',
      stats: [
        { value: '5+', label: 'этапов под ключ' },
        { value: '7–21', label: 'дней на MVP' },
        { value: 'A+', label: 'упор на качество' },
      ],
      steps: [
        { title: 'Бриф и стратегия', text: 'Разбираем задачу, аудиторию, структуру и коммерческие цели проекта.' },
        { title: 'UX/UI и прототип', text: 'Собираю логику страниц и визуальную систему в стиле вашего бренда.' },
        { title: 'Разработка', text: 'Делаю адаптивный сайт, подключаю формы, CRM/аналитику и техническое SEO.' },
        { title: 'Тесты и запуск', text: 'Проверяю скорость/стабильность, выкатываю проект и передаю инструкции.' },
      ],
      deliverables: ['UI-kit', 'CMS / формы', 'SEO-ready', 'Analytics', 'Support'],
      cta: 'Написать в Telegram',
    }
  }

  return {
    subtitle: 'Process infographic: transparent stages, clear timeline, and measurable outcomes at each step.',
    stats: [
      { value: '5+', label: 'turnkey stages' },
      { value: '7–21', label: 'days to MVP' },
      { value: 'A+', label: 'quality focus' },
    ],
    steps: [
      { title: 'Brief & Strategy', text: 'Define goals, audience, structure, and conversion priorities.' },
      { title: 'UX/UI Prototype', text: 'Design user flow and visual system aligned with your brand.' },
      { title: 'Development', text: 'Build responsive pages, forms, integrations, analytics, and technical SEO.' },
      { title: 'Testing & Launch', text: 'Validate performance and stability, then launch with handover notes.' },
    ],
    deliverables: ['UI-kit', 'CMS / forms', 'SEO-ready', 'Analytics', 'Support'],
    cta: 'Message on Telegram',
  }
})
const avatarSrc = ref('/images/avatar-latest.jpg')

function onAvatarError(event: Event) {
  const target = event.target as HTMLImageElement
  target.src = '/images/avatar.webp'
}

useHead({
  title: 'Alexey Chernov - Designer & Full-Stack developer',
  meta: [
    {
      name: 'description',
      content: 'Designer & Full-Stack developer portfolio: real web projects, UI/UX approach, and contacts for collaboration.',
    },
  ],
})

function later() {
  notificationsStore.addNotification(t('notifications.later'), 6000)
}

function openOrderPanel() {
  orderPanelOpen.value = true
}

function closeOrderPanel() {
  orderPanelOpen.value = false
}
</script>
<style lang="stylus">
.welcome
  width 100%
  min-height 100vh
  display flex
  align-items center
  position absolute
  z-index 2
  overflow hidden
  @media screen and (max-width: 750px)
    padding 40px 0

  &-scene
    width 100%
    transition transform .7s cubic-bezier(.22, .61, .36, 1), opacity .55s ease

  &.order-open
    .welcome-scene
      transform translateY(-110vh)
      opacity .08
      pointer-events none
  .wrap
    display flex
    align-items center
    @media screen and (max-width: 750px)
      align-items flex-start
      flex-direction column

  &-blocks
    display flex
    width 100%
    gap 40px
    @media screen and (max-width: 1100px)
      gap 25px
    @media screen and (max-width: 650px)
      flex-direction column

  &-block
    border-radius 30px
    padding 20px
    background-color #DCFFD0
    min-width 100px
    width calc(50% - 20px)
    display block
    &.clickable
      transition 0.3s transform
      cursor pointer
      &:hover
        transform scale(1.05)
    &.socials
      display flex
      flex-wrap wrap
      gap 10px
      padding 0
      background-color transparent
      .socials-item
        width calc(50% - 5px)
        height calc(50% - 5px)
        display flex
        align-items center
        justify-content center
        border-radius 20px
        transition 0.3s transform
        cursor pointer
        &:hover
          transform scale(1.05)
        &.telegram
          background-color #37AEE2
        &.whatsapp
          background-color #25D366
        &.gmail
          background-color #000000
        &.github
          background-color #272727
        @media screen and (max-width: 750px)
          height 90px
        @media screen and (max-width: 500px)
          height 75px
          svg
            width 30px
            height 30px

    @media screen and (max-width: 1100px)
      width calc(50% - 13px)
    @media screen and (max-width: 750px)
      width auto
    @media screen and (max-width: 650px)
      width calc(50% - 13px)

  &-profile
    height 550px
    width 35%
    min-width 280px
    display flex
    flex-direction column
    align-items center
    justify-content space-between
    padding-bottom 30px
    container-type inline-size
    img
      width 100%
      height 100%
      object-fit cover
    @media screen and (max-width: 1100px)
      width 40%
    @media screen and (max-width: 850px)
      height 500px
    @media screen and (max-width: 750px)
      width 70%
      height 550px
      min-width 360px
    @media screen and (max-width: 650px)
      width 100%
      min-width 280px

    &__avatar
      border-radius 50%
      overflow hidden
      background-color #171717
      width 300px
      height 300px
      display flex
      align-items center

  &-title
    font-size 6vw
    color white
    font-family Roboto
    font-weight 900
    text-transform uppercase
    letter-spacing 22px
    line-height 75px
    &.mobile
      display none
    @media screen and (max-width: 750px)
      display none
      font-size 11.5vw
      padding-bottom 20px
      &.mobile
        display block
    @media screen and (max-width: 750px)
      font-size 10vw
    @media screen and (max-width: 450px)
      letter-spacing 15px
    @media screen and (max-width: 380px)
      font-size 9vw

  &-header
    width 100%
    display flex
    justify-content space-between

  &-tools
    display flex
    gap 10px

  &-tool
    display flex
    align-items center
    justify-content center
    background-color #171717
    width 50px
    height 50px
    border-radius 50%
    position relative
    cursor pointer
    &:last-child
      z-index 3
    svg
      color white
      z-index 2
    .droplist
      position absolute
      right 0
      top 0
      background-color #171717
      border-radius 15px
      list-style none
      padding 10px 20px
      padding-right 50px
      opacity 0
      pointer-events none
      // transition 0.3s all
      li
        color white
        font-size 18px
        font-weight 600

    &:hover
      .droplist
        opacity 1
        pointer-events all

  &-about
    height 100%
    max-height 100%
    margin-top 20px
    overflow-y auto
    font-size 16px
    font-weight 600
    ::-webkit-scrollbar
      width 6px
      border-radius 50px

    ::-webkit-scrollbar-track
      background black

    ::-webkit-scrollbar-thumb
      background white
      border-radius 50px

    ::-webkit-scrollbar-thumb:hover
      background #555
      border-radius 50px

  &-content
    min-height 122px
    display flex
    flex-direction column
    justify-content flex-start
    &__title
      font-size 32px
      font-weight 700
      line-height 36px
      min-height 72px
      margin 0
      display -webkit-box
      -webkit-line-clamp 2
      -webkit-box-orient vertical
      overflow hidden

    &__text
      font-size 22px
      font-weight 600
      min-height 58px
      margin 0
      line-height 1.35
      display -webkit-box
      -webkit-line-clamp 2
      -webkit-box-orient vertical
      overflow hidden

  &-links
    display flex
    flex-direction column
    gap 40px
    width 65%
    .welcome-blocks
      flex-wrap wrap
      flex 1
      @media screen and (max-width: 750px)
        flex-direction column
      @media screen and (max-width: 650px)
        flex-direction row
    @media screen and (max-width: 1100px)
      width 60%
    @media screen and (max-width: 650px)
      width 100%

  &-stat
    &__title
      font-size 68px
      font-weight 900
      color black
      // font-family Roboto
      @media screen and (max-width: 850px)
        font-size 58px
      @media screen and (max-width: 650px)
        line-height 75px
    &__text
      font-size 28px
      font-weight 600
      color black
      overflow hidden
      text-overflow ellipsis
      @media screen and (max-width: 750px)
        font-size 24px
      @media screen and (max-width: 500px)
        font-size 20px

.welcome-order-cta
  width calc(50% - 20px)
  margin-top 0
  min-height 186px
  border 1px solid rgba(255, 255, 255, .28)
  border-radius 30px
  padding 16px 24px
  background rgba(255, 255, 255, .03)
  backdrop-filter blur(2px)
  color white
  font-family Roboto, sans-serif
  font-size clamp(24px, 3.1vw, 54px)
  font-weight 900
  text-transform uppercase
  line-height 1.02
  letter-spacing .22em
  cursor pointer
  text-align center
  white-space pre-line
  box-shadow 0 12px 35px rgba(8, 10, 13, .35)
  z-index 15
  transition transform .22s ease, box-shadow .22s ease, background .22s ease, border-color .22s ease
  &:hover
    transform translateY(-2px)
    background rgba(255, 255, 255, .08)
    border-color rgba(220, 255, 208, .75)
    box-shadow 0 18px 40px rgba(8, 10, 13, .45)
  @media screen and (max-width: 1100px)
    width calc(50% - 13px)
  @media screen and (max-width: 750px)
    width auto
    min-height 156px
    letter-spacing .12em
    border-radius 18px
  @media screen and (max-width: 650px)
    width calc(50% - 13px)
  @media screen and (max-width: 500px)
    font-size 24px

.welcome-order-cta--card
  display flex
  align-items center
  justify-content center

.welcome-links
  .welcome-block.clickable
    min-height 186px
    display flex
    flex-direction column
    justify-content center

    @media screen and (max-width: 750px)
      min-height 156px

.welcome-order
  position fixed
  left 50%
  bottom calc(-100% - 24px)
  transform translateX(-50%)
  width calc(100% - 34px)
  max-height none
  max-width 960px
  overflow visible
  background linear-gradient(135deg, rgba(24, 28, 34, .98) 0%, rgba(16, 18, 21, .98) 100%)
  border 1px solid #2f3e4c
  border-radius 28px 28px 0 0
  padding 28px 28px 24px
  color #f5f7fa
  z-index 16
  transition bottom .72s cubic-bezier(.22, .61, .36, 1)
  &.open
    bottom 0

  &__head
    position relative
    margin-bottom 10px
    padding-right 70px
    h2
      margin 0
      font-size clamp(36px, 6vw, 82px)
      line-height .92
      color white
      font-family Roboto, sans-serif
      font-weight 900
      text-transform uppercase
      letter-spacing clamp(8px, 1.4vw, 22px)

  &__subtitle
    margin 0 0 16px
    color #b7c6d6
    font-size 18px

  &__stats
    display grid
    grid-template-columns repeat(3, minmax(0, 1fr))
    gap 10px
    margin-bottom 14px
    @media screen and (max-width: 760px)
      grid-template-columns 1fr

  &__stat
    background #dcffd0
    border-radius 16px
    padding 14px
    color #121212

  &__stat-value
    font-size 34px
    font-weight 900
    line-height 1

  &__stat-label
    margin-top 8px
    font-size 14px
    font-weight 700
    text-transform uppercase
    letter-spacing .06em

  &__flow
    display grid
    grid-template-columns repeat(2, minmax(0, 1fr))
    gap 10px
    margin-bottom 14px
    @media screen and (max-width: 860px)
      grid-template-columns 1fr

  &__step
    background rgba(220, 255, 208, .06)
    border 1px solid rgba(220, 255, 208, .18)
    border-radius 16px
    padding 14px

  &__step-index
    display inline-flex
    width 30px
    height 30px
    align-items center
    justify-content center
    border-radius 10px
    background #dcffd0
    color #0f1317
    font-size 12px
    font-weight 800
    margin-bottom 10px

  &__step-title
    margin 0 0 8px
    font-size 20px
    font-weight 800
    line-height 1.15

  &__step-text
    margin 0
    color #d6e2ed
    font-size 15px
    line-height 1.45

  &__deliverables
    display flex
    flex-wrap wrap
    gap 8px
    margin-bottom 12px

  &__chip
    display inline-flex
    align-items center
    padding 8px 12px
    border-radius 999px
    border 1px solid rgba(167, 202, 236, .32)
    background rgba(50, 70, 92, .28)
    color #eaf2fa
    font-size 13px
    font-weight 600

  &__close
    position absolute
    top 2px
    right 2px
    width 44px
    height 44px
    border-radius 12px
    border 1px solid #425466
    background rgba(255, 255, 255, .03)
    color #fff
    cursor pointer
    font-size 20px

  &__progress
    display flex
    align-items center
    gap 8px
    margin 2px 0 14px

  &__progress-node
    min-width 38px
    height 38px
    border-radius 12px
    display inline-flex
    align-items center
    justify-content center
    background #dcffd0
    color #0f1317
    font-size 13px
    font-weight 900
    letter-spacing .04em

  &__progress-line
    height 2px
    flex 1
    border-radius 999px
    background linear-gradient(90deg, rgba(220, 255, 208, .2) 0%, rgba(220, 255, 208, .9) 50%, rgba(220, 255, 208, .2) 100%)
    background-size 220% 100%
    animation flowLine 2.8s linear infinite

  &__actions
    margin-top 6px
    a
      display inline-flex
      align-items center
      justify-content center
      min-height 52px
      width 100%
      padding 0 18px
      border-radius 12px
      text-decoration none
      background #dcffd0
      color #111
      font-weight 700

  @media screen and (max-width: 860px)
    width calc(100% - 20px)
    border-radius 24px 24px 0 0
    padding 18px 16px 16px
    max-height calc(100vh - 12px)
    overflow auto

    &__head
      padding-right 56px

    &__close
      width 38px
      height 38px
      font-size 18px

    &__progress
      flex-direction column
      align-items flex-start
      gap 6px

    &__progress-line
      width 2px
      height 18px
      flex none
      margin-left 18px
      background linear-gradient(180deg, rgba(220, 255, 208, .2) 0%, rgba(220, 255, 208, .9) 50%, rgba(220, 255, 208, .2) 100%)
      background-size 100% 220%
      animation flowLineY 2.8s linear infinite

  @media screen and (max-width: 480px)
    width calc(100% - 12px)
    padding 14px 12px 12px
    border-radius 18px 18px 0 0

    &__head
      h2
        letter-spacing clamp(4px, 2.6vw, 10px)
        font-size clamp(30px, 12vw, 52px)

    &__subtitle
      font-size 16px

    &__step-title
      font-size 18px

    &__step-text
      font-size 14px

@keyframes flowLine
  0%
    background-position 200% 50%
  100%
    background-position -20% 50%

@keyframes flowLineY
  0%
    background-position 50% 200%
  100%
    background-position 50% -20%
</style>
<style>
@container (width < 320px) {
  .welcome-profile__avatar {
    width: 240px;
    height: 240px;
  }
}
</style>
