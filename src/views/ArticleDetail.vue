<template>
  <section class="article-page" v-if="article">
    <div class="wrap">
      <div class="article-page__head">
          <div class="article-page__actions">
            <router-link to="/articles" class="article-page__back">← {{ $t('global.articles') }}</router-link>
            <LanguageSwitcher />
          </div>
        <h1>{{ article.title[currentLocale] }}</h1>
        <p class="article-page__meta">{{ formatDate(article.publishedAt) }} · {{ article.readTime }}</p>
        <div class="article-page__tags">
          <span class="article-page__tag" v-for="tag in article.tags" :key="tag.id">{{ tag.title[currentLocale] }}</span>
        </div>
        <p class="article-page__lead">{{ article.summary[currentLocale] }}</p>
      </div>

      <img class="article-page__cover" :src="article.image" :alt="article.imageAlt[currentLocale]" loading="eager" />

      <aside class="article-page__toc">
        <p class="article-page__toc-title">{{ currentLocale === 'ru' ? 'Содержание' : 'Contents' }}</p>
        <ul>
          <li v-for="(section, index) in article.sections" :key="section.id">
            <a :href="`#${section.id}`">
              <span class="article-page__toc-num">{{ String(index + 1).padStart(2, '0') }}</span>
              <span class="article-page__toc-text">{{ section.title[currentLocale] }}</span>
            </a>
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
import LanguageSwitcher from '@/components/ui/LanguageSwitcher.vue'

const route = useRoute()
const { locale } = useI18n()
const currentLocale = computed(() => (locale.value as LOCALES) || LOCALES.en)
const copied = ref(false)

const article = computed(() => getArticleBySlug(String(route.params.slug || '')))
const relatedArticles = computed(() => articles.filter((item) => item.slug !== article.value?.slug).slice(0, 3))

// locale switching is handled by LanguageSwitcher component

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
      overflow-wrap anywhere
      word-break break-word

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

.article-page
  &__toc
    background linear-gradient(135deg, #121318 0%, #0e1114 100%)
    border 1px solid #2f3942
    border-radius 22px
    padding 18px
    box-shadow inset 0 1px 0 rgba(255, 255, 255, .05)
    ul
      margin 0
      padding 0
      list-style none
      display flex
      flex-direction column
      gap 8px
    li
      margin 0
    a
      color #d8eaff
      text-decoration none
      display flex
      align-items center
      gap 10px
      padding 8px 10px
      border-radius 12px
      transition .18s ease all
      &:hover
        background rgba(151, 197, 255, .1)
        transform translateX(2px)

  &__toc-title
    color #fff
    margin-bottom 12px
    font-size 13px
    font-weight 700
    text-transform uppercase
    letter-spacing .12em

  &__toc-num
    width 30px
    height 30px
    border-radius 10px
    display inline-flex
    align-items center
    justify-content center
    background rgba(126, 182, 255, .14)
    border 1px solid rgba(126, 182, 255, .25)
    color #b9d8ff
    font-size 12px
    font-weight 700

  &__toc-text
    font-size 15px
    line-height 1.4

.article-content
  display flex
  flex-direction column
  gap 14px

  &__section
    background #0f0f10
    border 1px solid #2a2a2a
    border-radius 20px
    padding 16px
    h2
      margin 0 0 12px
      color #fff
      line-height 1.35
    p
      margin 0 0 12px
      color #d8d8d8
      line-height 1.8
    p:last-child
      margin-bottom 0
    pre
      margin 12px 0 0
      background #06080b
      border 1px solid #1e2630
      border-radius 14px
      padding 14px
      overflow-x auto
    code
      color #bfffd2
      font-family ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace
      font-size 14px
      line-height 1.6

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

</style>
