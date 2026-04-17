<template>
  <div class="lang-switcher">
    <div class="lang-icon">
      <inline-svg src="/icons/globe.svg" />
    </div>
    <ul class="droplist">
      <li v-for="(lang, index) in locales" :key="index" @click="setLocale(lang)">
        {{ $t('locales.' + lang) }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { LOCALES } from '@/types/environment'
import InlineSvg from 'vue-inline-svg'

const { locale } = useI18n()
const locales = Object.values(LOCALES)

function setLocale(lang: string) {
  locale.value = lang as LOCALES
}
</script>

<style scoped lang="stylus">
.lang-switcher
  position relative
  .lang-icon
    width 34px
    height 34px
    display flex
    align-items center
    justify-content center
    cursor pointer
    color #fff
    svg
      width 22px
      height 22px

  .droplist
    position absolute
    right 0
    top 36px
    background #171717
    border-radius 12px
    padding 8px 12px
    list-style none
    opacity 0
    pointer-events none
    transition 0.15s all
    li
      color #fff
      padding 6px 8px
      cursor pointer

  &:hover
    .droplist
      opacity 1
      pointer-events all
</style>
