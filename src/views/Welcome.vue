<template>
  <secion class="welcome">
    <div class="wrap">
      <div class="welcome-blocks">
        <div class="welcome-block welcome-profile">
          <div class="welcome-header">
            <div class="button" @click="aboutIsOpen = !aboutIsOpen">
              <p>{{ !aboutIsOpen ? $t('welcome.about') : $t('welcome.general') }}</p>
            </div>
            <div class="welcome-tools">
              <div class="welcome-tool">
                <inline-svg src="./src/assets/icons/share.svg" />
              </div>
              <div class="welcome-tool">
                <inline-svg src="./src/assets/icons/globe.svg" />
                <ul class="droplist">
                  <li v-for="(lang, index) in LOCALES" :key="index" @click="locale = lang">
                    {{ $t('locales.' + lang) }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="welcome-profile__avatar" v-if="!aboutIsOpen">
            <img src="@/assets/images/avatar.png" alt="" srcset="" />
          </div>
          <div class="welcome-content" v-if="!aboutIsOpen">
            <h2 class="welcome-content__title">{{ $t('welcome.hi') }}</h2>
            <h3 class="welcome-content__text">{{ $t('welcome.occupation') }}</h3>
          </div>

          <div class="welcome-about" v-else v-html="story[locale]"></div>
        </div>
        <div class="welcome-links">
          <h1 class="welcome-title">{{ $t('welcome.portfolio') }}</h1>
          <div class="welcome-blocks">
            <router-link to="projects" class="welcome-block clickable">
              <div class="welcome-stat__title">{{ projects.length }}</div>
              <div class="welcome-stat__text">{{ $t('global.projects') }}</div>
            </router-link>
            <div class="welcome-block clickable" @click="later">
              <div class="welcome-stat__title">31</div>
              <div class="welcome-stat__text">{{ $t('global.clients') }}</div>
            </div>
            <div class="welcome-block clickable" @click="later">
              <div class="welcome-stat__title">47</div>
              <div class="welcome-stat__text">{{ $t('global.technologies') }}</div>
            </div>
            <div class="welcome-block socials">
              <a href="https://t.me/lilborsch" target="_blank" class="socials-item telegram">
                <inline-svg src="./src/assets/icons/socials/telegram.svg" width="45" />
              </a>
              <a target="_blank" href="https://wa.me/+79959971293" class="socials-item whatsapp">
                <inline-svg src="./src/assets/icons/socials/whatsapp.svg" width="45" />
              </a>
              <a href="mailto:limmeco@gmail.com" class="socials-item gmail">
                <inline-svg src="./src/assets/icons/socials/gmail.svg" width="45" />
              </a>
              <a target="_blank" href="https://github.com/DodgerFox" class="socials-item github">
                <inline-svg src="./src/assets/icons/socials/github.svg" width="45" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </secion>
</template>
<script setup lang="ts">
import InlineSvg from 'vue-inline-svg'
import projects from '@/data/projects.json'
import story from '@/data/story.json'
import { LOCALES } from '@/types/environtment.ts'
const { locale, t } = useI18n()

const notificationsStore = NotificationsStore()

const aboutIsOpen = ref(false)

function later() {
  console.log('later')

  notificationsStore.addNotification(t('notifications.later'))
}
</script>
<style lang="stylus">
.welcome
  width 100%
  height 100vh
  display flex
  align-items center
  // background-color #171717
  position absolute
  z-index 2
  .wrap
    display flex
    align-items center

  &-blocks
    display flex
    width 100%
    gap 40px

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

  &-profile
    height 550px
    width 35%
    min-width 280px
    display flex
    flex-direction column
    align-items center
    justify-content space-between
    padding-bottom 30px
    img
      max-width 100%

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
    &__title
      font-size 32px
      font-weight 700
      line-height 36px

    &__text
      font-size 22px
      font-weight 600

  &-links
    display flex
    flex-direction column
    gap 40px
    width 65%
    .welcome-blocks
      flex-wrap wrap
      flex 1

  &-stat
    &__title
      font-size 68px
      font-weight 900
      color black
      // font-family Roboto
    &__text
      font-size 28px
      font-weight 600
      color black

// @container (width < 710px) {
//   .avatar {
//     font-size: 18px;
//   }
// }
</style>
