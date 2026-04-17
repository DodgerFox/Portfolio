<template>
  <section class="article-page" v-if="article">
    <div class="wrap">
      <div class="article-page__head">
        <div class="article-page__actions">
          <router-link to="/articles" class="article-page__back">← {{ $t('global.articles') }}</router-link>
          <button class="lang-toggle" @click="toggleLocale" type="button">🌐 {{ currentLocale.toUpperCase() }}</button>
        </div>
        <h1>{{ article.title[currentLocale] }}</h1>
        <p class="article-page__meta">{{ formatDate(article.publishedAt) }} · {{ article.readTime }}</p>
        <div class="article-page__tags">
          <span class="article-page__tag" v-for="tag in article.tags" :key="tag.id">{{ tag.icon }} {{ tag.title[currentLocale] }}</span>
        </div>
        <p class="article-page__lead">{{ article.summary[currentLocale] }}</p>
      </div>

      <img class="article-page__cover" :src="article.image" :alt="article.imageAlt[currentLocale]" loading="eager" />

      <aside class="article-page__toc">
        <p class="article-page__toc-title">{{ currentLocale === 'ru' ? 'Содержание' : 'Contents' }}</p>
        <ul>
          <li v-for="section in article.sections" :key="section.id">
            <a :href="`#${section.id}`">{{ section.title[currentLocale] }}</a>
          </li>
        </ul>
      </aside>

      <article class="article-content">
        <section v-for="section in article.sections" :id="section.id" :key="section.id" class="article-content__section">
          <h2>{{ section.title[currentLocale] }}</h2>
          <p v-for="(paragraph, idx) in section.paragraphs" :key="idx">{{ paragraph[currentLocale] }}</p>
        </section>

        <section class="article-content__section">
          <div class="article-content__code-head">
            <h2>{{ article.codeTitle[currentLocale] }}</h2>
            <button type="button" class="article-content__copy" @click="copyCode" :title="currentLocale === 'ru' ? 'Копировать код' : 'Copy code'">
              {{ copied ? '✅' : '📋' }}
            </button>
          </div>
          <pre><code>{{ article.code }}</code></pre>
        </section>
      </article>

      <section class="article-related" v-if="relatedArticles.length">
        <h2>{{ currentLocale === 'ru' ? 'Читайте также' : 'Read also' }}</h2>
        <div class="article-related__list">
          <router-link class="article-related__item" v-for="item in relatedArticles" :key="item.slug" :to="`/articles/${item.slug}`">
            <img :src="item.image" :alt="item.imageAlt[currentLocale]" loading="lazy" />
            <p>{{ item.title[currentLocale] }}</p>
          </router-link>
        </div>
      </section>
    </div>
  </section>

  <section class="article-page article-page--not-found" v-else>
    <div class="wrap">
      <h1>{{ currentLocale === 'ru' ? 'Статья не найдена' : 'Article not found' }}</h1>
      <router-link class="article-page__back" to="/articles">{{ currentLocale === 'ru' ? 'Вернуться к статьям' : 'Back to articles' }}</router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useHead } from '@unhead/vue'
import { articles, getArticleBySlug } from '@/data/articles'
import { LOCALES } from '@/types/environment'

const route = useRoute()
const { locale } = useI18n()
const currentLocale = computed(() => (locale.value as LOCALES) || LOCALES.en)
const copied = ref(false)

const article = computed(() => getArticleBySlug(String(route.params.slug || '')))
const relatedArticles = computed(() => articles.filter((item) => item.slug !== article.value?.slug).slice(0, 3))

function toggleLocale() {
  locale.value = locale.value === LOCALES.ru ? LOCALES.en : LOCALES.ru
}

async function copyCode() {
  if (!article.value?.code) return
  try {
    await navigator.clipboard.writeText(article.value.code)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 1400)
  } catch {
    copied.value = false
  }
}

useHead(() => {
  const current = article.value
  if (!current) {
    return {
      title: 'Article not found — Alexey Chernov Portfolio',
      meta: [{ name: 'robots', content: 'noindex, nofollow' }],
    }
  }

  const lang = currentLocale.value
  const title = current.title[lang]
  const description = current.seoDescription[lang]
  const canonical = `/articles/${current.slug}`

  return {
    title,
    link: [{ rel: 'canonical', href: canonical }],
    meta: [
      { name: 'description', content: description },
      { name: 'robots', content: 'index, follow, max-image-preview:large' },
      { property: 'og:type', content: 'article' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: current.image },
      { property: 'og:url', content: canonical },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: current.image },
    ],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          headline: title,
          description,
          datePublished: current.publishedAt,
          image: current.image,
          author: {
            '@type': 'Person',
            name: 'Alexey Chernov',
          },
        }),
      },
    ],
  }
})

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat(locale.value === 'ru' ? 'ru-RU' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}
</script>

<style lang="stylus">
.article-page
  padding 40px 0

  .wrap
    display flex
    flex-direction column
    gap 24px

  &__head
    display flex
    flex-direction column
    gap 8px

    h1
      font-size clamp(46px, 8vw, 112px)
      line-height 1.1

  &__actions
    display flex
    align-items center
    gap 10px
    flex-wrap wrap

  &__back
    color #fff
    text-decoration none
    width fit-content
    border 1px solid #fff
    border-radius 999px
    padding 6px 12px

  &__meta
    color #bbb

  &__lead
    color #fff
    max-width 900px

  &__tags
    display flex
    flex-wrap wrap
    gap 8px

  &__tag
    border 1px solid #414141
    border-radius 999px
    padding 5px 9px
    font-size 13px
    color #ddd

  &__cover
    width 100%
    max-height 460px
    object-fit cover
    border-radius 24px

  &__toc
    background #191919
    border 1px solid #2d2d2d
    border-radius 20px
    padding 16px
    ul
      margin 0
      padding-left 20px
    a
      color #b7d8ff
      text-decoration none

  &__toc-title
    color #fff
    margin-bottom 10px

.article-content
  display flex
  flex-direction column
  gap 14px

  &__section
    background #0f0f10
    border 1px solid #2a2a2a
    border-radius 20px
    padding 16px

  &__code-head
    display flex
    align-items center
    justify-content space-between
    gap 10px

  &__copy
    background #141414
    border 1px solid #3a3a3a
    border-radius 10px
    color #fff
    padding 6px 10px
    cursor pointer

    h2
      margin 0 0 14px
      color #fff

    p
      color #dfdfdf
      line-height 1.7
      margin 0 0 8px

    pre
      background #050607
      border 1px solid #333
      border-radius 12px
      padding 12px
      overflow auto

    code
      color #bcffcf
      font-family ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace
      font-size 14px

.article-page--not-found
  min-height 60vh
  display flex
  align-items center

.article-related
  h2
    margin-bottom 10px
  &__list
    display grid
    grid-template-columns repeat(auto-fill, minmax(230px, 1fr))
    gap 12px
  &__item
    text-decoration none
    color #fff
    background #101010
    border 1px solid #2b2b2b
    border-radius 16px
    overflow hidden
    display flex
    flex-direction column
    gap 10px
    padding-bottom 12px
    img
      width 100%
      height 130px
      object-fit cover
    p
      margin 0
      padding 0 12px

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
