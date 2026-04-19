import { createMemoryHistory, createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Welcome from '../views/Welcome.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Welcome,
    meta: {
      seo: {
        title: 'Alexey Chernov - Designer & Full-Stack developer',
        description:
          'Designer & Full-Stack developer portfolio: real web projects, UI/UX approach, and contacts for collaboration.',
        keywords: ['portfolio', 'frontend developer', 'full-stack', 'web design', 'vue', 'typescript', 'Алексей Чернов'],
        image: '/images/avatar.webp',
        type: 'website',
      },
    },
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('../views/Projects.vue'),
    meta: {
      seo: {
        title: 'Projects — Alexey Chernov Portfolio',
        description:
          'Подборка реализованных проектов: лендинги, корпоративные сайты, e-commerce и frontend/full-stack кейсы с визуальными обложками.',
        keywords: ['проекты', 'portfolio projects', 'vue projects', 'web development', 'frontend cases', 'дизайн сайтов'],
        image: '/images/projects/Scam.webp',
        type: 'website',
      },
    },
  },
  {
    path: '/articles',
    name: 'articles',
    component: () => import('../views/Articles.vue'),
    meta: {
      seo: {
        title: 'Articles — Alexey Chernov Portfolio',
        description:
          'Статьи о фронтенде, дизайне интерфейсов, SEO и разработке: практические заметки и рабочие подходы.',
        keywords: ['articles', 'frontend articles', 'vue', 'seo', 'web design', 'статьи по разработке'],
        image: '/android-chrome-512x512.png',
        type: 'website',
      },
    },
  },
  {
    path: '/order-website',
    name: 'order-website',
    component: () => import('../views/OrderWebsite.vue'),
    meta: {
      seo: {
        title: 'Заказать сайт под ключ — Alexey Chernov',
        description:
          'Создание сайта под ключ: лендинги, корпоративные сайты и MVP. Дизайн, разработка, техническое SEO и запуск под заявки и продажи.',
        keywords: ['заказать сайт', 'создание сайта', 'лендинг под ключ', 'разработка сайта', 'seo сайт', 'web development'],
        image: '/images/avatar.webp',
        type: 'website',
      },
    },
  },
    {
      path: '/articles/:slug',
      name: 'article-detail',
      component: () => import('../views/ArticleDetail.vue'),
      meta: {
        seo: {
          title: 'Tech Article — Alexey Chernov Portfolio',
          description: 'Подробная техническая статья с практическими примерами, кодом, архитектурой и SEO-подходом.',
          keywords: ['tech article', 'frontend', 'backend', 'seo', 'web development'],
          image: '/android-chrome-512x512.png',
          type: 'article',
        },
      },
    },
]

const router = createRouter({
  history: import.meta.env.SSR
    ? createMemoryHistory(import.meta.env.BASE_URL)
    : createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
