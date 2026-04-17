type JsonLdObject = Record<string, unknown>

type PageType = 'website' | 'article' | 'profile'

export type SeoPayload = {
  title: string
  description: string
  path?: string
  image?: string
  keywords?: string[]
  locale?: string
  type?: PageType
  noindex?: boolean
  schema?: JsonLdObject | JsonLdObject[]
}

const SITE_NAME = 'Alexey Chernov Portfolio'
const DEFAULT_IMAGE = '/android-chrome-512x512.png'

function normalizeBaseUrl(url?: string) {
  if (!url) return ''
  return url.replace(/\/+$/, '')
}

function getSiteUrl() {
  const envUrl = normalizeBaseUrl(import.meta.env.VITE_SITE_URL)
  if (envUrl) return envUrl

  if (typeof window !== 'undefined') {
    return window.location.origin
  }

  return ''
}

function makeAbsoluteUrl(urlOrPath: string, baseUrl: string) {
  if (!urlOrPath) return baseUrl
  if (/^https?:\/\//i.test(urlOrPath)) return urlOrPath
  if (!baseUrl) return urlOrPath
  return `${baseUrl}${urlOrPath.startsWith('/') ? '' : '/'}${urlOrPath}`
}

function upsertMeta(name: string, content: string, useProperty = false) {
  const selector = useProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`
  let el = document.head.querySelector(selector) as HTMLMetaElement | null

  if (!el) {
    el = document.createElement('meta')
    if (useProperty) {
      el.setAttribute('property', name)
    } else {
      el.setAttribute('name', name)
    }
    document.head.appendChild(el)
  }

  el.setAttribute('content', content)
}

function upsertCanonical(url: string) {
  let canonical = document.head.querySelector("link[rel='canonical']") as HTMLLinkElement | null

  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }

  canonical.setAttribute('href', url)
}

function upsertAlternateLang(lang: string, href: string) {
  const selector = `link[rel="alternate"][hreflang="${lang}"]`
  let link = document.head.querySelector(selector) as HTMLLinkElement | null

  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'alternate')
    link.setAttribute('hreflang', lang)
    document.head.appendChild(link)
  }

  link.setAttribute('href', href)
}

function upsertJsonLd(schema: JsonLdObject | JsonLdObject[]) {
  let script = document.head.querySelector('#app-seo-jsonld') as HTMLScriptElement | null

  if (!script) {
    script = document.createElement('script')
    script.id = 'app-seo-jsonld'
    script.type = 'application/ld+json'
    document.head.appendChild(script)
  }

  script.text = JSON.stringify(schema)
}

export function applySeo(payload: SeoPayload) {
  if (typeof document === 'undefined') return

  const siteUrl = getSiteUrl()
  const pagePath = payload.path || window.location.pathname
  const canonicalUrl = makeAbsoluteUrl(pagePath, siteUrl)
  const imageUrl = makeAbsoluteUrl(payload.image || DEFAULT_IMAGE, siteUrl)
  const locale = payload.locale || document.documentElement.lang || 'en'
  const ogLocale = locale.toLowerCase().startsWith('ru') ? 'ru_RU' : 'en_US'
  const title = payload.title || SITE_NAME

  document.title = title
  document.documentElement.lang = locale

  upsertMeta('description', payload.description)
  upsertMeta('author', 'Alexey Chernov')
  upsertMeta('robots', payload.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')

  if (payload.keywords?.length) {
    upsertMeta('keywords', payload.keywords.join(', '))
  }

  upsertMeta('og:title', title, true)
  upsertMeta('og:description', payload.description, true)
  upsertMeta('og:type', payload.type || 'website', true)
  upsertMeta('og:url', canonicalUrl, true)
  upsertMeta('og:image', imageUrl, true)
  upsertMeta('og:site_name', SITE_NAME, true)
  upsertMeta('og:locale', ogLocale, true)

  upsertMeta('twitter:card', 'summary_large_image')
  upsertMeta('twitter:title', title)
  upsertMeta('twitter:description', payload.description)
  upsertMeta('twitter:image', imageUrl)

  upsertCanonical(canonicalUrl)
  upsertAlternateLang('x-default', canonicalUrl)
  upsertAlternateLang('en', canonicalUrl)
  upsertAlternateLang('ru', canonicalUrl)

  const defaultPageSchema: JsonLdObject = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: payload.description,
    url: canonicalUrl,
    inLanguage: locale,
  }

  const websiteSchema: JsonLdObject = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: siteUrl || canonicalUrl,
    inLanguage: locale,
  }

  const schemaItems = payload.schema
    ? Array.isArray(payload.schema)
      ? payload.schema
      : [payload.schema]
    : [defaultPageSchema]

  const normalizedSchema = [websiteSchema, ...schemaItems].map((item) => ({
    '@context': 'https://schema.org',
    ...item,
  }))

  upsertJsonLd(normalizedSchema)
}
