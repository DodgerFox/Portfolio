export type LocaleText = {
  ru: string
  en: string
}

export type ArticleSection = {
  id: string
  title: LocaleText
  paragraphs: LocaleText[]
}

export type ArticleTag = {
  id: string
  icon: string
  title: LocaleText
}

export type TechArticle = {
  id: number
  slug: string
  technology: string
  title: LocaleText
  summary: LocaleText
  seoDescription: LocaleText
  publishedAt: string
  readTime: string
  image: string
  imageAlt: LocaleText
  tags: ArticleTag[]
  codeLanguage: string
  codeTitle: LocaleText
  code: string
  sections: ArticleSection[]
}

type TechSeed = {
  slug: string
  technology: string
  image: string
  readTime: string
  codeLanguage: string
  code: string
}

const techSeeds: TechSeed[] = [
  { slug: 'html5-semantic-layouts', technology: 'HTML5', image: 'https://source.unsplash.com/1600x900/?html,frontend,code', readTime: '11 min', codeLanguage: 'html', code: `<main class="landing">\n  <header class="hero" aria-labelledby="hero-title">\n    <h1 id="hero-title">Premium Product</h1>\n  </header>\n</main>` },
  { slug: 'css3-system-architecture', technology: 'CSS3', image: 'https://source.unsplash.com/1600x900/?css,ui,design', readTime: '12 min', codeLanguage: 'css', code: `:root {\n  --space-4: 16px;\n}\n.card {\n  padding: var(--space-4);\n}` },
  { slug: 'javascript-production-patterns', technology: 'JavaScript (ES6+)', image: 'https://source.unsplash.com/1600x900/?javascript,developer', readTime: '12 min', codeLanguage: 'javascript', code: `const [user, projects] = await Promise.all([\n  fetch('/api/user').then(r => r.json()),\n  fetch('/api/projects').then(r => r.json()),\n])` },
  { slug: 'typescript-domain-modeling', technology: 'TypeScript', image: 'https://source.unsplash.com/1600x900/?typescript,code', readTime: '13 min', codeLanguage: 'typescript', code: `type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string }` },
  { slug: 'vue3-composable-architecture', technology: 'Vue.js 3', image: 'https://source.unsplash.com/1600x900/?vuejs,frontend', readTime: '12 min', codeLanguage: 'vue', code: `<script setup lang="ts">\nconst query = ref('')\nconst filtered = computed(() => list.value.filter(x => x.includes(query.value)))\n</script>` },
  { slug: 'nuxt3-ssr-and-isr', technology: 'Nuxt.js / SSR', image: 'https://source.unsplash.com/1600x900/?nuxt,ssr', readTime: '14 min', codeLanguage: 'typescript', code: `export default defineNuxtConfig({ routeRules: { '/': { prerender: true } } })` },
  { slug: 'pinia-state-management', technology: 'Pinia', image: 'https://source.unsplash.com/1600x900/?state,management,code', readTime: '10 min', codeLanguage: 'typescript', code: `export const useStore = defineStore('main', { state: () => ({ count: 0 }) })` },
  { slug: 'vue-router-navigation-strategy', technology: 'Vue Router', image: 'https://source.unsplash.com/1600x900/?routing,web,app', readTime: '9 min', codeLanguage: 'typescript', code: `router.beforeEach((to) => { if (to.meta.requiresAuth) return '/login' })` },
  { slug: 'vite-build-optimization', technology: 'Vite / Webpack migration', image: 'https://source.unsplash.com/1600x900/?build,performance,web', readTime: '11 min', codeLanguage: 'typescript', code: `export default defineConfig({ build: { rollupOptions: { output: { manualChunks: { framework: ['vue'] }}}}})` },
  { slug: 'nodejs-api-backend', technology: 'Node.js', image: 'https://source.unsplash.com/1600x900/?nodejs,server', readTime: '12 min', codeLanguage: 'javascript', code: `import http from 'node:http'\nhttp.createServer((req, res) => res.end('ok')).listen(3000)` },
  { slug: 'express-rest-api-patterns', technology: 'Express.js', image: 'https://source.unsplash.com/1600x900/?api,backend,server', readTime: '11 min', codeLanguage: 'javascript', code: `app.get('/api/projects', (_req, res) => res.json([{ id: 1, title: 'Portfolio' }]))` },
  { slug: 'sequelize-data-modeling', technology: 'Sequelize', image: 'https://source.unsplash.com/1600x900/?orm,database,nodejs', readTime: '11 min', codeLanguage: 'typescript', code: `const Article = sequelize.define('Article', { slug: DataTypes.STRING, body: DataTypes.TEXT })` },
  { slug: 'mysql-query-design', technology: 'MySQL', image: 'https://source.unsplash.com/1600x900/?mysql,database', readTime: '12 min', codeLanguage: 'sql', code: `select id, slug, title from articles order by published_at desc limit 20;` },
  { slug: 'socketio-realtime-features', technology: 'Socket.io', image: 'https://source.unsplash.com/1600x900/?realtime,chat,websocket', readTime: '10 min', codeLanguage: 'typescript', code: `io.on('connection', (socket) => { socket.on('message', (data) => io.emit('message', data)) })` },
  { slug: 'docker-production-images', technology: 'Docker', image: 'https://source.unsplash.com/1600x900/?docker,devops,containers', readTime: '12 min', codeLanguage: 'dockerfile', code: `FROM node:22-alpine\nWORKDIR /app\nCOPY . .\nRUN pnpm build-only` },
  { slug: 'docker-compose-multi-service', technology: 'Docker-compose', image: 'https://source.unsplash.com/1600x900/?docker-compose,devops', readTime: '10 min', codeLanguage: 'yaml', code: `services:\n  app:\n    build: .\n  db:\n    image: mysql:8` },
  { slug: 'nginx-routing-and-cache', technology: 'Nginx', image: 'https://source.unsplash.com/1600x900/?nginx,server,infrastructure', readTime: '11 min', codeLanguage: 'nginx', code: `location / { try_files $uri $uri/ /index.html; }` },
  { slug: 'gitlab-cicd-pipelines', technology: 'GitLab CI/CD', image: 'https://source.unsplash.com/1600x900/?ci-cd,pipeline,automation', readTime: '10 min', codeLanguage: 'yaml', code: `stages: [install, build]\nbuild:\n  script:\n    - pnpm build-only` },
  { slug: 'openlayers-mapbox-leaflet', technology: 'OpenLayers / MapBox / Leaflet', image: 'https://source.unsplash.com/1600x900/?map,gis,geodata', readTime: '11 min', codeLanguage: 'javascript', code: `const map = L.map('map').setView([59.93, 30.31], 11)` },
  { slug: 'threejs-potree-3d-visualization', technology: 'Three.js / Potree', image: 'https://source.unsplash.com/1600x900/?3d,visualization,technology', readTime: '13 min', codeLanguage: 'javascript', code: `const scene = new THREE.Scene()\nconst camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)` },
]

function makeRuParagraphs(technology: string) {
  return [
    `Технология ${technology} в продакшн-разработке даёт максимальную ценность, когда встроена в процесс команды, а не используется как формальный пункт стека. На практике я всегда начинаю с архитектурного контракта: определяю входные данные, ожидаемый результат, критичные ограничения по времени ответа и ключевые сценарии отказа. Такой подход позволяет заранее управлять рисками, а не тушить проблемы после релиза. Для коммерческих проектов это особенно важно: стабильность в продакшне напрямую влияет на деньги, репутацию и скорость роста продукта.`,
    `Второй слой — структурирование кода и ответственности. Для ${technology} я выделяю отдельные доменные модули, где каждый блок решает понятную бизнес-задачу. Это упрощает ревью, ускоряет внедрение новых функций и снижает вероятность “каскадных” поломок, когда изменение одной фичи ломает весь интерфейс. Дополнительно фиксирую практики по именованию, структуре файлов и обработке ошибок, чтобы команда писала код в едином стиле. На длинной дистанции такие правила уменьшают технический долг и делают систему предсказуемой для поддержки.`,
    `Отдельно контролируется производительность: замеры рендера, анализ бандла, деградационные сценарии и оптимизация критического пути. Даже если проект визуально простой, неэффективные операции быстро накапливаются и начинают влиять на LCP/FID, стабильность интерфейса и поведенческие метрики. В проектах с ${technology} я использую итерационный подход: сначала базовые метрики, затем точечные оптимизации и повторная валидация. Это позволяет сохранять баланс между скоростью разработки и качеством пользовательского опыта без переработки всего приложения.`,
    `Для SEO и индексации ${technology} я рассматриваю как часть общей системы, а не как отдельную настройку. Нужны семантическая структура, корректный title/description, canonical, Open Graph, структурированные данные и предсказуемые URL. Для SPA-проектов обязательно включаются prerender/SSR маршруты, чтобы поисковые боты получали готовый HTML без выполнения JavaScript. В результате улучшается не только индексация, но и внешний вид сниппетов в выдаче, что положительно влияет на CTR и органический трафик.`,
    `Тестирование в случае ${technology} строится на трёх уровнях: unit для бизнес-логики, интеграционные проверки для стыков модулей и smoke-сценарии для критичных пользовательских путей. Такой набор покрывает реальные риски: нестабильную сеть, частичные ошибки API, крайние состояния данных и регрессии при обновлении зависимостей. Это особенно важно в командах, где релизы идут часто и без длинных ручных циклов QA. Регулярные автопроверки позволяют держать предсказуемый темп поставки и снижать стоимость ошибок на продакшне.`,
    `Инфраструктурная часть также влияет на итог. Для ${technology} заранее проектируются логирование, мониторинг, ротация секретов, деплой и rollback-стратегия. Я стараюсь включать эти требования в Definition of Done, чтобы “операционные” задачи не оставались на финальный этап. Такой процесс делает релизы рутинными и прозрачными: меньше ручной рутины, меньше рисков, больше контроля над системой. Особенно это критично для высоконагруженных сервисов, где стабильность и наблюдаемость важнее красивых демо-сценариев.`,
    `Наконец, масштабирование. Когда продукт растёт, нужно поддерживать эволюционную архитектуру: рефакторинг-окна, ревью ключевых решений, ADR-документация, контроль зависимостей. Для ${technology} это позволяет развивать систему без “переписывания с нуля” и снижает bus-factor команды. В долгоживущих проектах такая дисциплина окупается многократно: новые модули внедряются быстрее, качество не падает, а бизнес получает гибкую платформу для запуска новых гипотез и направлений.`,
    `Практический вывод по ${technology}: решает не модность инструмента, а качество инженерной системы вокруг него. Если архитектура, производительность, тестирование, SEO и эксплуатация связаны между собой, технология начинает работать на результат бизнеса: ускоряет разработку, повышает конверсию, снижает стоимость поддержки и делает продукт устойчивым к росту нагрузки. Именно такой подход даёт предсказуемые результаты в коммерческой разработке и формирует фундамент для долгосрочного развития.`,
  ]
}

function makeEnParagraphs(technology: string) {
  return [
    `In production, ${technology} delivers real value when it is embedded in an engineering workflow instead of being treated as a checkbox skill. I usually begin with an architecture contract: define data inputs, expected outputs, latency constraints, and core failure modes. This reduces uncertainty before implementation and prevents expensive rework after release. For commercial products this is critical because stability and delivery speed directly affect revenue, trust, and long-term scalability.`,
    `The next layer is code organization and ownership boundaries. With ${technology}, I split domains into explicit modules with clear responsibilities. That makes reviews faster, onboarding easier, and feature delivery more predictable. It also decreases the risk of cascade regressions when one update unexpectedly breaks neighboring functionality. Combined with strict naming and error-handling conventions, this structure keeps the codebase maintainable over time and allows teams to move quickly without sacrificing consistency.`,
    `Performance is treated as a continuous process, not a final-stage checklist. For ${technology} projects I track rendering hotspots, bundle growth, and real-world interaction metrics like LCP/FID. Even visually simple products can degrade if expensive operations accumulate across releases. Iterative measurement and targeted optimization help teams keep a healthy balance between shipping speed and user experience quality. This approach enables sustainable velocity without architectural compromise.`,
    `For SEO and discoverability, ${technology} should be part of a complete search strategy: semantic markup, accurate metadata, canonical URLs, structured data, and stable routing patterns. In SPA contexts, prerender or SSR for critical routes is essential so bots receive ready-to-index HTML without executing client scripts. Done properly, this improves indexing quality and snippet relevance, which has a direct impact on organic traffic and click-through rate.`,
    `Testing around ${technology} is most effective with a layered model: unit tests for business logic, integration tests for module contracts, and smoke tests for critical flows. This stack catches realistic risks such as network instability, API partial failures, boundary states, and regressions from dependency updates. Teams gain confidence to release more frequently, while stakeholders gain predictable delivery cadence and fewer rollback incidents.`,
    `Operational maturity is equally important. For ${technology}, I design logging, monitoring, secrets management, deployment, and rollback strategies early in the lifecycle. Including these requirements in Definition of Done avoids last-minute operational chaos. Releases become routine and measurable rather than risky events. This is especially important for high-load systems where uptime and observability are business-critical, not optional technical extras.`,
    `At scale, maintainability becomes the main differentiator. With ${technology}, I recommend regular refactoring windows, architecture reviews, and lightweight ADR documentation to preserve context and design intent. This reduces bus factor, lowers long-term complexity, and allows incremental modernization instead of costly rewrites. In long-lived products, this discipline is what keeps teams productive release after release.`,
    `The practical conclusion for ${technology}: success does not come from trendiness, but from system quality around the tool. When architecture, performance, testing, SEO, and operations are aligned, technology supports measurable business outcomes—faster delivery, better conversion, lower maintenance cost, and resilience under growth. That is the baseline engineering model I apply in real-world commercial development.`,
  ]
}

function buildTags(technology: string): ArticleTag[] {
  const t = technology.toLowerCase()
  const tags: ArticleTag[] = []

  if (['html', 'css', 'javascript', 'typescript', 'vue', 'nuxt', 'pinia', 'router', 'vite'].some((k) => t.includes(k))) {
    tags.push({ id: 'frontend', icon: '🧩', title: { ru: 'Frontend', en: 'Frontend' } })
  }

  if (['node', 'express', 'sequelize', 'mysql', 'socket', 'nginx', 'docker', 'gitlab'].some((k) => t.includes(k))) {
    tags.push({ id: 'backend', icon: '⚙️', title: { ru: 'Backend', en: 'Backend' } })
  }

  if (['seo', 'map', 'three', 'potree', 'openlayers', 'leaflet', 'ssr'].some((k) => t.includes(k))) {
    tags.push({ id: 'special', icon: '🚀', title: { ru: 'Спец. опыт', en: 'Specialized' } })
  }

  tags.push({ id: 'from-cv', icon: '📌', title: { ru: 'Из резюме', en: 'From CV' } })

  return tags
}

function makeArticle(seed: TechSeed, id: number): TechArticle {
  const ruParagraphs = makeRuParagraphs(seed.technology)
  const enParagraphs = makeEnParagraphs(seed.technology)

  const sections: ArticleSection[] = [
    {
      id: 'architecture',
      title: { ru: 'Архитектура и практическая роль технологии', en: 'Architecture and practical role of the technology' },
      paragraphs: [
        { ru: ruParagraphs[0], en: enParagraphs[0] },
        { ru: ruParagraphs[1], en: enParagraphs[1] },
      ],
    },
    {
      id: 'quality-performance',
      title: { ru: 'Производительность, качество и SEO', en: 'Performance, quality and SEO' },
      paragraphs: [
        { ru: ruParagraphs[2], en: enParagraphs[2] },
        { ru: ruParagraphs[3], en: enParagraphs[3] },
        { ru: ruParagraphs[4], en: enParagraphs[4] },
      ],
    },
    {
      id: 'operations',
      title: { ru: 'Эксплуатация, масштабирование и выводы', en: 'Operations, scaling and final takeaways' },
      paragraphs: [
        { ru: ruParagraphs[5], en: enParagraphs[5] },
        { ru: ruParagraphs[6], en: enParagraphs[6] },
        { ru: ruParagraphs[7], en: enParagraphs[7] },
      ],
    },
  ]

  const fullRu = sections.flatMap((section) => section.paragraphs.map((p) => p.ru)).join(' ')
  const fullEn = sections.flatMap((section) => section.paragraphs.map((p) => p.en)).join(' ')

  if (fullRu.length < 1500 || fullEn.length < 1500) {
    throw new Error(`Article ${seed.slug} does not satisfy the 1500+ characters requirement`)
  }

  return {
    id,
    slug: seed.slug,
    technology: seed.technology,
    title: {
      ru: `${seed.technology}: продакшн-подход, масштабирование и SEO`,
      en: `${seed.technology}: production approach, scaling and SEO`,
    },
    summary: {
      ru: `Практическая статья по ${seed.technology}: архитектура, производительность, SEO и эксплуатация в реальных проектах.`,
      en: `A practical guide to ${seed.technology}: architecture, performance, SEO, and operations in real products.`,
    },
    seoDescription: {
      ru: `Разбор ${seed.technology} на коммерческих проектах: от архитектуры и кода до индексации и стабильного продакшн-цикла.`,
      en: `${seed.technology} in commercial projects: architecture, implementation, indexing, and production reliability.`,
    },
    publishedAt: '2026-04-17',
    readTime: seed.readTime,
    image: seed.image,
    imageAlt: {
      ru: `Иллюстрация к статье по ${seed.technology}`,
      en: `Cover image for the ${seed.technology} article`,
    },
    tags: buildTags(seed.technology),
    codeLanguage: seed.codeLanguage,
    codeTitle: {
      ru: `Практический фрагмент кода (${seed.technology})`,
      en: `Practical code snippet (${seed.technology})`,
    },
    code: seed.code,
    sections,
  }
}

export const articles: TechArticle[] = techSeeds.map((seed, index) => makeArticle(seed, index + 1))

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug)
}
