import './assets/stylus/common.styl'

import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import { ViteSSG } from 'vite-ssg'

import messages from '@intlify/unplugin-vue-i18n/messages'
import projects from '@/data/projects.json'
import { articles } from '@/data/articles'
import { applySeo } from '@/utils/seo'
import { LOCALES } from '@/types/environment'

const i18n = createI18n({
  locale: 'en',
  messages,
})

import App from './App.vue'
import { routes } from './router'

export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  ({ app, router }) => {
    app.use(createPinia())
    app.use(i18n)

    router.afterEach((to) => {
      const metaSeo = (to.meta?.seo as Record<string, any> | undefined) || {}
      const locale = (i18n.global.locale as string) as LOCALES
      const currentArticle = to.name === 'article-detail' ? articles.find((article) => article.slug === String(to.params.slug || '')) : null

      const pageSchema =
        to.name === 'projects'
          ? {
              '@type': 'ItemList',
              name: 'Portfolio Projects',
              itemListElement: projects.slice(0, 30).map((project: any, index: number) => ({
                '@type': 'CreativeWork',
                position: index + 1,
                name: project.title,
                image: project.image ? `/images/projects/${project.image}` : undefined,
                url: project.link || undefined,
                description: project.description,
              })),
            }
          : to.name === 'articles'
            ? {
                '@type': 'Blog',
                name: 'Portfolio Articles',
                inLanguage: locale,
                blogPost: articles.map((article) => ({
                  '@type': 'BlogPosting',
                  headline: article.title?.[locale] || article.title?.en,
                  description: article.summary?.[locale] || article.summary?.en,
                  datePublished: article.publishedAt,
                  timeRequired: article.readTime,
                })),
              }
            : to.name === 'article-detail' && currentArticle
              ? {
                  '@type': 'TechArticle',
                  headline: currentArticle.title?.[locale] || currentArticle.title?.en,
                  description: currentArticle.seoDescription?.[locale] || currentArticle.seoDescription?.en,
                  datePublished: currentArticle.publishedAt,
                  image: currentArticle.image,
                }
            : {
                '@type': 'Person',
                name: 'Alexey Chernov',
                jobTitle: 'Designer & Full-Stack Developer',
                url: to.path,
                sameAs: ['https://github.com/DodgerFox', 'https://t.me/lilborsch'],
              }

      const dynamicTitle =
        to.name === 'article-detail' && currentArticle
          ? currentArticle.title?.[locale] || currentArticle.title?.en
          : metaSeo.title || 'Alexey Chernov - Designer & Full-Stack developer'

      const dynamicDescription =
        to.name === 'article-detail' && currentArticle
          ? currentArticle.seoDescription?.[locale] || currentArticle.seoDescription?.en
          : metaSeo.description || 'Portfolio website'

      const dynamicImage =
        to.name === 'article-detail' && currentArticle
          ? currentArticle.image
          : metaSeo.image

      applySeo({
        title: dynamicTitle,
        description: dynamicDescription,
        keywords: metaSeo.keywords || [],
        image: dynamicImage,
        type: metaSeo.type || 'website',
        path: to.fullPath,
        locale,
        schema: pageSchema,
      })
    })
  })

export function includedRoutes(paths: string[]) {
  const articlePaths = articles.map((article) => `/articles/${article.slug}`)
  const staticPaths = paths.filter((path) => path === '/' || path === '/projects' || path === '/articles')
  return Array.from(new Set([...staticPaths, ...articlePaths]))
}
