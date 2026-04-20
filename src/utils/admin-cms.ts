import { computed, ref } from 'vue'
import type { TechArticle } from '@/data/articles'
import baseTags from '@/data/tags.json'

type LocalePair = {
  ru: string
  en: string
}

type ProjectTag = {
  id: number
  name: LocalePair
  color: string
}

export type AdminProject = {
  id: string
  title: string
  description: string
  link: string
  image: string
  tagIds: number[]
  lightText?: boolean
  createdAt: string
}

export type AdminArticle = {
  id: string
  slug: string
  title: LocalePair
  summary: LocalePair
  seoDescription: LocalePair
  content: LocalePair
  tags: string[]
  image: string
  readTime: string
  publishedAt: string
  createdAt: string
}

export type AdminTextSettings = {
  welcome: {
    hi: LocalePair
    occupation: LocalePair
    orderCta: LocalePair
    orderSubtitle: LocalePair
  }
  orderLanding: {
    title: LocalePair
    lead: LocalePair
    finalTitle: LocalePair
    finalLead: LocalePair
  }
}

const STORAGE_KEYS = {
  projects: 'portfolio.admin.projects.v1',
  articles: 'portfolio.admin.articles.v1',
  texts: 'portfolio.admin.texts.v1',
} as const

const defaultTextSettings: AdminTextSettings = {
  welcome: {
    hi: { ru: '', en: '' },
    occupation: { ru: '', en: '' },
    orderCta: { ru: '', en: '' },
    orderSubtitle: { ru: '', en: '' },
  },
  orderLanding: {
    title: { ru: '', en: '' },
    lead: { ru: '', en: '' },
    finalTitle: { ru: '', en: '' },
    finalLead: { ru: '', en: '' },
  },
}

const customProjects = ref<AdminProject[]>([])
const customArticles = ref<AdminArticle[]>([])
const textSettings = ref<AdminTextSettings>(defaultTextSettings)
const initialized = ref(false)

const tagIndex = new Map<number, ProjectTag>(baseTags.map((tag) => [tag.id, tag as ProjectTag]))

function isBrowser() {
  return typeof window !== 'undefined'
}

function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

function withTextDefaults(input?: Partial<AdminTextSettings>): AdminTextSettings {
  return {
    welcome: {
      hi: {
        ru: input?.welcome?.hi?.ru || '',
        en: input?.welcome?.hi?.en || '',
      },
      occupation: {
        ru: input?.welcome?.occupation?.ru || '',
        en: input?.welcome?.occupation?.en || '',
      },
      orderCta: {
        ru: input?.welcome?.orderCta?.ru || '',
        en: input?.welcome?.orderCta?.en || '',
      },
      orderSubtitle: {
        ru: input?.welcome?.orderSubtitle?.ru || '',
        en: input?.welcome?.orderSubtitle?.en || '',
      },
    },
    orderLanding: {
      title: {
        ru: input?.orderLanding?.title?.ru || '',
        en: input?.orderLanding?.title?.en || '',
      },
      lead: {
        ru: input?.orderLanding?.lead?.ru || '',
        en: input?.orderLanding?.lead?.en || '',
      },
      finalTitle: {
        ru: input?.orderLanding?.finalTitle?.ru || '',
        en: input?.orderLanding?.finalTitle?.en || '',
      },
      finalLead: {
        ru: input?.orderLanding?.finalLead?.ru || '',
        en: input?.orderLanding?.finalLead?.en || '',
      },
    },
  }
}

function readStorage<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback

  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function writeStorage(key: string, payload: unknown) {
  if (!isBrowser()) return
  window.localStorage.setItem(key, JSON.stringify(payload))
}

function init() {
  if (initialized.value || !isBrowser()) return

  customProjects.value = readStorage<AdminProject[]>(STORAGE_KEYS.projects, [])
  customArticles.value = readStorage<AdminArticle[]>(STORAGE_KEYS.articles, [])
  textSettings.value = withTextDefaults(readStorage<AdminTextSettings>(STORAGE_KEYS.texts, defaultTextSettings))

  initialized.value = true
}

function slugify(input: string) {
  const fallback = `article-${Date.now()}`
  const slug = input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9а-яё\s-]/gi, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

  return slug || fallback
}

function normalizeProjectTagIds(ids: number[]) {
  return Array.from(new Set(ids.filter((id) => tagIndex.has(id))))
}

function projectToView(project: AdminProject) {
  return {
    id: Number(project.id.replace(/\D/g, '').slice(0, 8)) || Date.now(),
    title: project.title,
    description: project.description,
    link: project.link,
    image: project.image,
    tags: normalizeProjectTagIds(project.tagIds).map((id) => tagIndex.get(id) as ProjectTag),
    options: {
      lightText: Boolean(project.lightText),
    },
  }
}

function parseParagraphs(content: string, fallback: string) {
  const source = content?.trim() || fallback?.trim() || ''
  const parts = source
    .split(/\n{2,}/)
    .map((item) => item.trim())
    .filter(Boolean)

  return parts.length ? parts : [source || '']
}

function articleToView(article: AdminArticle): TechArticle {
  const paragraphsRu = parseParagraphs(article.content.ru, article.summary.ru)
  const paragraphsEn = parseParagraphs(article.content.en, article.summary.en)
  const total = Math.max(paragraphsRu.length, paragraphsEn.length)

  const mergedParagraphs = Array.from({ length: total }, (_, index) => ({
    ru: paragraphsRu[index] || paragraphsRu[paragraphsRu.length - 1] || article.summary.ru,
    en: paragraphsEn[index] || paragraphsEn[paragraphsEn.length - 1] || article.summary.en,
  }))

  return {
    id: Number(article.id.replace(/\D/g, '').slice(0, 8)) || Date.now(),
    slug: article.slug,
    technology: 'Custom Article',
    title: deepClone(article.title),
    summary: deepClone(article.summary),
    seoDescription: deepClone(article.seoDescription),
    publishedAt: article.publishedAt,
    readTime: article.readTime,
    image: article.image,
    imageAlt: {
      ru: `Иллюстрация: ${article.title.ru}`,
      en: `Cover image: ${article.title.en}`,
    },
    tags: article.tags.map((tag, index) => ({
      id: `${article.id}-tag-${index}`,
      icon: '✍️',
      title: { ru: tag, en: tag },
    })),
    codeLanguage: 'text',
    codeTitle: {
      ru: 'Ключевые тезисы',
      en: 'Key highlights',
    },
    code: article.summary.ru,
    sections: [
      {
        id: 'overview',
        title: {
          ru: 'Обзор',
          en: 'Overview',
        },
        paragraphs: mergedParagraphs,
      },
    ],
  }
}

export function useAdminCms() {
  init()

  const viewProjects = computed(() => customProjects.value.map(projectToView))
  const viewArticles = computed(() => customArticles.value.map(articleToView))

  function upsertProject(payload: Omit<AdminProject, 'id' | 'createdAt'> & { id?: string }) {
    const next: AdminProject = {
      id: payload.id || `project-${Date.now()}`,
      createdAt: payload.id
        ? customProjects.value.find((item) => item.id === payload.id)?.createdAt || new Date().toISOString()
        : new Date().toISOString(),
      title: payload.title.trim(),
      description: payload.description.trim(),
      link: payload.link.trim(),
      image: payload.image.trim(),
      tagIds: normalizeProjectTagIds(payload.tagIds),
      lightText: Boolean(payload.lightText),
    }

    customProjects.value = [next, ...customProjects.value.filter((item) => item.id !== next.id)]
    writeStorage(STORAGE_KEYS.projects, customProjects.value)
  }

  function removeProject(projectId: string) {
    customProjects.value = customProjects.value.filter((item) => item.id !== projectId)
    writeStorage(STORAGE_KEYS.projects, customProjects.value)
  }

  function upsertArticle(payload: Omit<AdminArticle, 'id' | 'createdAt' | 'slug'> & { id?: string; slug?: string }) {
    const generatedSlug = slugify(payload.slug || payload.title.en || payload.title.ru)
    const next: AdminArticle = {
      id: payload.id || `article-${Date.now()}`,
      createdAt: payload.id
        ? customArticles.value.find((item) => item.id === payload.id)?.createdAt || new Date().toISOString()
        : new Date().toISOString(),
      slug: generatedSlug,
      title: {
        ru: payload.title.ru.trim(),
        en: payload.title.en.trim(),
      },
      summary: {
        ru: payload.summary.ru.trim(),
        en: payload.summary.en.trim(),
      },
      seoDescription: {
        ru: payload.seoDescription.ru.trim(),
        en: payload.seoDescription.en.trim(),
      },
      content: {
        ru: payload.content.ru.trim(),
        en: payload.content.en.trim(),
      },
      tags: payload.tags.map((tag) => tag.trim()).filter(Boolean),
      image: payload.image.trim(),
      readTime: payload.readTime.trim() || '6 min',
      publishedAt: payload.publishedAt || new Date().toISOString().slice(0, 10),
    }

    customArticles.value = [next, ...customArticles.value.filter((item) => item.id !== next.id)]
    writeStorage(STORAGE_KEYS.articles, customArticles.value)
  }

  function removeArticle(articleId: string) {
    customArticles.value = customArticles.value.filter((item) => item.id !== articleId)
    writeStorage(STORAGE_KEYS.articles, customArticles.value)
  }

  function saveTextSettings(payload: AdminTextSettings) {
    textSettings.value = withTextDefaults(payload)
    writeStorage(STORAGE_KEYS.texts, textSettings.value)
  }

  function resetAll() {
    customProjects.value = []
    customArticles.value = []
    textSettings.value = deepClone(defaultTextSettings)

    if (isBrowser()) {
      window.localStorage.removeItem(STORAGE_KEYS.projects)
      window.localStorage.removeItem(STORAGE_KEYS.articles)
      window.localStorage.removeItem(STORAGE_KEYS.texts)
    }
  }

  return {
    tags: baseTags as ProjectTag[],
    customProjects,
    customArticles,
    textSettings,
    viewProjects,
    viewArticles,
    upsertProject,
    removeProject,
    upsertArticle,
    removeArticle,
    saveTextSettings,
    resetAll,
  }
}
