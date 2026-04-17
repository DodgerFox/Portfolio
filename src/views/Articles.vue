<template>
  <section class="articles">
    <div class="wrap">
      <div class="articles-head">
        <h1>{{ $t('global.articles') }}</h1>
        <div class="articles-actions">
          <button class="lang-toggle" @click="toggleLocale" type="button">🌐 {{ currentLocale.toUpperCase() }}</button>
          <router-link to="/" class="articles-link">{{ $t('welcome.portfolio') }}</router-link>
        </div>
      </div>

      <div class="articles-grid">
        <router-link class="article-card" :to="`/articles/${item.slug}`" v-for="item in articles" :key="item.id">
          <img class="article-card__image" :src="item.image" :alt="item.imageAlt[currentLocale]" loading="lazy" />
          <p class="article-card__meta">{{ formatDate(item.publishedAt) }} · {{ item.readTime }}</p>
          <h2 class="article-card__title">{{ item.title[currentLocale] }}</h2>
          <div class="article-card__tags">
            <span class="article-card__tag" v-for="tag in item.tags" :key="`${item.id}-${tag.id}`">{{ tag.icon }} {{ tag.title[currentLocale] }}</span>
          </div>
          <p class="article-card__description">{{ item.summary[currentLocale] }}</p>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { articles } from '@/data/articles'
import { LOCALES } from '@/types/environment'

const { locale } = useI18n()
const currentLocale = computed(() => (locale.value as LOCALES) || LOCALES.en)

function toggleLocale() {
  locale.value = locale.value === LOCALES.ru ? LOCALES.en : LOCALES.ru
}

useHead({
  title: 'Articles — Alexey Chernov Portfolio',
  meta: [
    {
      name: 'description',
      content: 'Статьи о фронтенде, дизайне интерфейсов, SEO и разработке: практические заметки и рабочие подходы.',
    },
  ],
})

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat(locale.value === 'ru' ? 'ru-RU' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}
</script>

<style lang="stylus">
.articles
  padding 40px 0

  .wrap
    display flex
    flex-direction column
    gap 32px

  &-head
    display flex
    justify-content space-between
    align-items center
    gap 16px
    flex-wrap wrap

  &-link
    font-size 16px
    color white
    text-decoration none
    border 1px solid white
    border-radius 999px
    padding 6px 14px
    transition .2s ease all
    &:hover
      background white
      color #171717

  &-actions
    display flex
    align-items center
    gap 10px

  &-grid
    display grid
    grid-template-columns repeat(auto-fill, minmax(280px, 1fr))
    gap 20px

.article-card
  background #DCFFD0
  border-radius 24px
  padding 18px
  color #171717
  display flex
  flex-direction column
  gap 10px
  text-decoration none

  &__image
    width 100%
    height 180px
    object-fit cover
    border-radius 16px

  &__meta
    font-size 14px
    opacity .7

  &__tags
    display flex
    gap 8px
    flex-wrap wrap

  &__tag
    font-size 12px
    border 1px solid rgba(0,0,0,0.25)
    border-radius 999px
    padding 4px 8px

  &__title
    font-size 24px
    line-height 1.2

  &__description
    font-size 16px

.lang-toggle
  font-size 14px
  color white
  background transparent
  border 1px solid white
  border-radius 999px
  padding 6px 12px
  cursor pointer
  transition .2s all ease
  &:hover
    background white
    color #111
</style>
