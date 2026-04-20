import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'dist')
const publicDir = path.join(rootDir, 'public')

const FALLBACK_SITE_URL = 'https://alexey-chernov.netlify.app'
const siteUrl = (process.env.VITE_SITE_URL || process.env.SITE_URL || FALLBACK_SITE_URL).replace(/\/$/, '')

const IGNORED_HTML = new Set(['404.html'])

async function walkHtmlFiles(dir, acc = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const absolutePath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      await walkHtmlFiles(absolutePath, acc)
      continue
    }

    if (entry.isFile() && entry.name.endsWith('.html') && !IGNORED_HTML.has(entry.name)) {
      acc.push(absolutePath)
    }
  }

  return acc
}

function toRoute(distFile) {
  const rel = path.relative(distDir, distFile).split(path.sep).join('/')

  if (rel === 'index.html') return '/'
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'/index.html'.length)}`

  return `/${rel.replace(/\.html$/, '')}`
}

function routePriority(route) {
  if (route === '/') return '1.0'
  if (route === '/order-website') return '0.95'
  if (route === '/projects') return '0.9'
  if (route === '/articles') return '0.8'
  if (route.startsWith('/articles/')) return '0.7'
  return '0.75'
}

function routeChangeFreq(route) {
  if (route === '/' || route === '/projects' || route === '/articles' || route === '/order-website') {
    return 'weekly'
  }

  return 'monthly'
}

function toLastMod(stat) {
  return new Date(stat.mtime).toISOString().slice(0, 10)
}

function xmlEscape(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

async function generate() {
  const htmlFiles = await walkHtmlFiles(distDir)

  if (!htmlFiles.length) {
    throw new Error('No HTML files found in dist. Run build before sitemap generation.')
  }

  const entries = await Promise.all(
    htmlFiles.map(async (filePath) => {
      const stat = await fs.stat(filePath)
      const route = toRoute(filePath)

      return {
        loc: `${siteUrl}${route}`,
        lastmod: toLastMod(stat),
        changefreq: routeChangeFreq(route),
        priority: routePriority(route),
      }
    }),
  )

  entries.sort((a, b) => {
    if (a.loc === `${siteUrl}/`) return -1
    if (b.loc === `${siteUrl}/`) return 1
    return a.loc.localeCompare(b.loc)
  })

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries
    .map(
      (entry) => `  <url>\n    <loc>${xmlEscape(entry.loc)}</loc>\n    <lastmod>${entry.lastmod}</lastmod>\n    <changefreq>${entry.changefreq}</changefreq>\n    <priority>${entry.priority}</priority>\n  </url>`,
    )
    .join('\n')}\n</urlset>\n`

  await fs.writeFile(path.join(distDir, 'sitemap.xml'), xml, 'utf8')
  await fs.writeFile(path.join(publicDir, 'sitemap.xml'), xml, 'utf8')

  console.log(`[sitemap] Generated ${entries.length} URLs for ${siteUrl}`)
}

generate().catch((error) => {
  console.error('[sitemap] Generation failed:', error)
  process.exit(1)
})
