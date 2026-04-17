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

type ArticleTheme = {
  title: LocaleText
  summary: LocaleText
  seoDescription: LocaleText
  focus: LocaleText
}

const techSeeds: TechSeed[] = [
  { slug: 'html5-semantic-layouts', technology: 'HTML5', image: 'https://picsum.photos/seed/html5-semantic-layouts/1200/675', readTime: '11 min', codeLanguage: 'html', code: `<main class="landing">\n  <header class="hero" aria-labelledby="hero-title">\n    <h1 id="hero-title">Premium Product</h1>\n  </header>\n</main>` },
  { slug: 'css3-system-architecture', technology: 'CSS3', image: 'https://picsum.photos/seed/css3-system-architecture/1200/675', readTime: '12 min', codeLanguage: 'css', code: `:root {\n  --space-4: 16px;\n}\n.card {\n  padding: var(--space-4);\n}` },
  { slug: 'javascript-production-patterns', technology: 'JavaScript (ES6+)', image: 'https://picsum.photos/seed/javascript-production-patterns/1200/675', readTime: '12 min', codeLanguage: 'javascript', code: `const [user, projects] = await Promise.all([\n  fetch('/api/user').then(r => r.json()),\n  fetch('/api/projects').then(r => r.json()),\n])` },
  { slug: 'typescript-domain-modeling', technology: 'TypeScript', image: 'https://picsum.photos/seed/typescript-domain-modeling/1200/675', readTime: '13 min', codeLanguage: 'typescript', code: `type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string }` },
  { slug: 'vue3-composable-architecture', technology: 'Vue.js 3', image: 'https://picsum.photos/seed/vue3-composable-architecture/1200/675', readTime: '12 min', codeLanguage: 'vue', code: `<script setup lang="ts">\nconst query = ref('')\nconst filtered = computed(() => list.value.filter(x => x.includes(query.value)))\n</script>` },
  { slug: 'nuxt3-ssr-and-isr', technology: 'Nuxt.js / SSR', image: 'https://picsum.photos/seed/nuxt3-ssr-and-isr/1200/675', readTime: '14 min', codeLanguage: 'typescript', code: `export default defineNuxtConfig({ routeRules: { '/': { prerender: true } } })` },
  { slug: 'pinia-state-management', technology: 'Pinia', image: 'https://picsum.photos/seed/pinia-state-management/1200/675', readTime: '10 min', codeLanguage: 'typescript', code: `export const useStore = defineStore('main', { state: () => ({ count: 0 }) })` },
  { slug: 'vue-router-navigation-strategy', technology: 'Vue Router', image: 'https://picsum.photos/seed/vue-router-navigation-strategy/1200/675', readTime: '9 min', codeLanguage: 'typescript', code: `router.beforeEach((to) => { if (to.meta.requiresAuth) return '/login' })` },
  { slug: 'vite-build-optimization', technology: 'Vite / Webpack migration', image: 'https://picsum.photos/seed/vite-build-optimization/1200/675', readTime: '11 min', codeLanguage: 'typescript', code: `export default defineConfig({ build: { rollupOptions: { output: { manualChunks: { framework: ['vue'] }}}}})` },
  { slug: 'nodejs-api-backend', technology: 'Node.js', image: 'https://picsum.photos/seed/nodejs-api-backend/1200/675', readTime: '12 min', codeLanguage: 'javascript', code: `import http from 'node:http'\nhttp.createServer((req, res) => res.end('ok')).listen(3000)` },
  { slug: 'express-rest-api-patterns', technology: 'Express.js', image: 'https://picsum.photos/seed/express-rest-api-patterns/1200/675', readTime: '11 min', codeLanguage: 'javascript', code: `app.get('/api/projects', (_req, res) => res.json([{ id: 1, title: 'Portfolio' }]))` },
  { slug: 'sequelize-data-modeling', technology: 'Sequelize', image: 'https://picsum.photos/seed/sequelize-data-modeling/1200/675', readTime: '11 min', codeLanguage: 'typescript', code: `const Article = sequelize.define('Article', { slug: DataTypes.STRING, body: DataTypes.TEXT })` },
  { slug: 'mysql-query-design', technology: 'MySQL', image: 'https://picsum.photos/seed/mysql-query-design/1200/675', readTime: '12 min', codeLanguage: 'sql', code: `select id, slug, title from articles order by published_at desc limit 20;` },
  { slug: 'socketio-realtime-features', technology: 'Socket.io', image: 'https://picsum.photos/seed/socketio-realtime-features/1200/675', readTime: '10 min', codeLanguage: 'typescript', code: `io.on('connection', (socket) => { socket.on('message', (data) => io.emit('message', data)) })` },
  { slug: 'docker-production-images', technology: 'Docker', image: 'https://picsum.photos/seed/docker-production-images/1200/675', readTime: '12 min', codeLanguage: 'dockerfile', code: `FROM node:22-alpine\nWORKDIR /app\nCOPY . .\nRUN pnpm build-only` },
  { slug: 'docker-compose-multi-service', technology: 'Docker-compose', image: 'https://picsum.photos/seed/docker-compose-multi-service/1200/675', readTime: '10 min', codeLanguage: 'yaml', code: `services:\n  app:\n    build: .\n  db:\n    image: mysql:8` },
  { slug: 'nginx-routing-and-cache', technology: 'Nginx', image: 'https://picsum.photos/seed/nginx-routing-and-cache/1200/675', readTime: '11 min', codeLanguage: 'nginx', code: `location / { try_files $uri $uri/ /index.html; }` },
  { slug: 'gitlab-cicd-pipelines', technology: 'GitLab CI/CD', image: 'https://picsum.photos/seed/gitlab-cicd-pipelines/1200/675', readTime: '10 min', codeLanguage: 'yaml', code: `stages: [install, build]\nbuild:\n  script:\n    - pnpm build-only` },
  { slug: 'openlayers-mapbox-leaflet', technology: 'OpenLayers / MapBox / Leaflet', image: 'https://picsum.photos/seed/openlayers-mapbox-leaflet/1200/675', readTime: '11 min', codeLanguage: 'javascript', code: `const map = L.map('map').setView([59.93, 30.31], 11)` },
  { slug: 'threejs-potree-3d-visualization', technology: 'Three.js / Potree', image: 'https://picsum.photos/seed/threejs-potree-3d-visualization/1200/675', readTime: '13 min', codeLanguage: 'javascript', code: `const scene = new THREE.Scene()\nconst camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)` },
]

const advancedThemes: Record<string, ArticleTheme> = {
  'html5-semantic-layouts': {
    title: {
      ru: 'HTML5 в эпоху AI-поиска: семантика, accessibility tree и индексируемость',
      en: 'HTML5 in AI Search Era: semantics, accessibility tree, and indexability',
    },
    summary: {
      ru: 'Продвинутый разбор semantic-first архитектуры: как HTML5 влияет на AI-сниппеты, доступность и долгосрочную поддерживаемость интерфейсов.',
      en: 'Advanced semantic-first architecture patterns and how HTML5 affects AI snippets, accessibility, and long-term maintainability.',
    },
    seoDescription: {
      ru: 'Практика semantic-first в HTML5: доступность, структурные сигналы для AI-поиска, и устойчивые UI-контракты.',
      en: 'Practical semantic-first HTML5 strategy: accessibility, AI-search signals, and resilient UI contracts.',
    },
    focus: { ru: 'Семантика и AI-индексация', en: 'Semantics and AI indexing' },
  },
  'css3-system-architecture': {
    title: {
      ru: 'CSS архитектура 2026: layers, container queries и design tokens в масштабе',
      en: 'Modern CSS Architecture: layers, container queries, and scalable design tokens',
    },
    summary: {
      ru: 'Как строить зрелую CSS-систему на layers и tokens без каскадного хаоса, с предсказуемой поддержкой большого продукта.',
      en: 'How to build a mature CSS system with layers and tokens without cascade chaos in large products.',
    },
    seoDescription: {
      ru: 'Продвинутый CSS-подход: container queries, cascade layers и токены для масштабируемого UI.',
      en: 'Advanced CSS strategy: container queries, cascade layers, and tokens for scalable UI.',
    },
    focus: { ru: 'Design system и каскад', en: 'Design systems and cascade control' },
  },
  'javascript-production-patterns': {
    title: {
      ru: 'JavaScript высокого уровня: управление конкуренцией, cancellation и стабильные async-пайплайны',
      en: 'Advanced JavaScript: concurrency control, cancellation, and robust async pipelines',
    },
    summary: {
      ru: 'Практики продвинутого async в JS: отмена запросов, дедупликация и предсказуемые data-flow контракты.',
      en: 'Advanced async JavaScript patterns: cancellation, deduplication, and predictable data-flow contracts.',
    },
    seoDescription: {
      ru: 'Глубокий JS: race conditions, AbortController, retry-стратегии и надёжный data orchestration слой.',
      en: 'Deep JavaScript: race conditions, AbortController, retries, and reliable data orchestration.',
    },
    focus: { ru: 'Async orchestration', en: 'Async orchestration' },
  },
  'typescript-domain-modeling': {
    title: {
      ru: 'TypeScript как контракт системы: type-level дизайн, schema sync и безопасные refactor-потоки',
      en: 'TypeScript as a system contract: type-level design, schema sync, and safe refactoring',
    },
    summary: {
      ru: 'Как использовать TypeScript для доменного моделирования, контроля API-контрактов и снижения регрессий.',
      en: 'How to use TypeScript for domain modeling, API contracts, and reduced regression risk.',
    },
    seoDescription: {
      ru: 'Type-level архитектура на TypeScript: discriminated unions, генерация типов и эволюционные изменения без боли.',
      en: 'Type-level TypeScript architecture: discriminated unions, generated types, and painless evolution.',
    },
    focus: { ru: 'Type-level архитектура', en: 'Type-level architecture' },
  },
  'vue3-composable-architecture': {
    title: {
      ru: 'Vue 3 composable-архитектура: effect scopes, reactivity cost и предсказуемая модульность',
      en: 'Vue 3 composable architecture: effect scopes, reactivity cost, and predictable modularity',
    },
    summary: {
      ru: 'Продвинутый Vue 3: контроль реактивной стоимости, границы composables и масштабируемая структура приложения.',
      en: 'Advanced Vue 3: controlling reactivity cost, composable boundaries, and scalable app structure.',
    },
    seoDescription: {
      ru: 'Инженерные паттерны Vue 3: composables, рендер-производительность и устойчивый код под рост продукта.',
      en: 'Vue 3 engineering patterns: composables, render performance, and growth-ready code.',
    },
    focus: { ru: 'Reactive performance', en: 'Reactive performance' },
  },
  'nuxt3-ssr-and-isr': {
    title: {
      ru: 'Nuxt 3 гибридный рендеринг: SSR/ISR/edge cache и стратегия свежести данных',
      en: 'Nuxt 3 hybrid rendering: SSR/ISR/edge cache and data freshness strategy',
    },
    summary: {
      ru: 'Как комбинировать SSR, ISR и edge-кэш для быстрых страниц, свежих данных и оптимальной стоимости инфраструктуры.',
      en: 'How to combine SSR, ISR, and edge caching for fast pages, fresh data, and infrastructure efficiency.',
    },
    seoDescription: {
      ru: 'Nuxt 3 в production: route rules, revalidation, кэш-слои и компромиссы между скоростью и актуальностью.',
      en: 'Nuxt 3 in production: route rules, revalidation, cache layers, and speed/freshness trade-offs.',
    },
    focus: { ru: 'Hybrid rendering', en: 'Hybrid rendering' },
  },
  'pinia-state-management': {
    title: {
      ru: 'Pinia на уровне enterprise: optimistic updates, undo/redo и наблюдаемый state-flow',
      en: 'Pinia at enterprise scale: optimistic updates, undo/redo, and observable state flows',
    },
    summary: {
      ru: 'Продвинутые стратегии состояния в Pinia: событийная модель, rollback и телеметрия пользовательских действий.',
      en: 'Advanced Pinia state strategies: event-like flows, rollback mechanics, and action telemetry.',
    },
    seoDescription: {
      ru: 'Pinia-подход для сложных продуктов: предсказуемый state-flow, optimistic UI и контроль ошибок.',
      en: 'Pinia strategy for complex products: predictable state flow, optimistic UI, and error control.',
    },
    focus: { ru: 'State orchestration', en: 'State orchestration' },
  },
  'vue-router-navigation-strategy': {
    title: {
      ru: 'Vue Router как orchestration-слой: prefetch, transitions и UX-навигация без рывков',
      en: 'Vue Router as orchestration layer: prefetch, transitions, and smooth UX navigation',
    },
    summary: {
      ru: 'Архитектура навигации в SPA: prefetch-стратегии, route guards и управление perceived performance.',
      en: 'SPA navigation architecture: prefetch strategies, route guards, and perceived performance control.',
    },
    seoDescription: {
      ru: 'Продвинутый Vue Router: data prefetch, route-level разделение ответственности и безболезненные переходы.',
      en: 'Advanced Vue Router: data prefetch, route-level boundaries, and frictionless transitions.',
    },
    focus: { ru: 'Навигация и prefetch', en: 'Navigation and prefetch' },
  },
  'vite-build-optimization': {
    title: {
      ru: 'Vite build engineering: chunk strategy, performance budgets и контроль деградаций',
      en: 'Vite build engineering: chunk strategy, performance budgets, and regression control',
    },
    summary: {
      ru: 'Как проектировать бандл-стратегию, отслеживать деградации и удерживать web-vitals при росте продукта.',
      en: 'How to design bundle strategy, monitor regressions, and protect web vitals at scale.',
    },
    seoDescription: {
      ru: 'Инженерный подход к Vite: chunking, анализ бандла, lazy boundaries и CI-контроль перформанса.',
      en: 'Engineering Vite builds: chunking, bundle analysis, lazy boundaries, and CI performance gates.',
    },
    focus: { ru: 'Build/perf budgets', en: 'Build and performance budgets' },
  },
  'nodejs-api-backend': {
    title: {
      ru: 'Node.js API 2026: backpressure, worker threads и устойчивость под пиковую нагрузку',
      en: 'Node.js API in 2026: backpressure, worker threads, and peak-load resilience',
    },
    summary: {
      ru: 'Продвинутый backend на Node.js: ограничение конкуренции, очереди задач и стабильный latency-профиль.',
      en: 'Advanced Node.js backend patterns: concurrency limits, job queues, and stable latency profiles.',
    },
    seoDescription: {
      ru: 'Node.js production-практики: event-loop hygiene, backpressure, worker pools и наблюдаемость.',
      en: 'Node.js production practices: event-loop hygiene, backpressure, worker pools, and observability.',
    },
    focus: { ru: 'Runtime resilience', en: 'Runtime resilience' },
  },
  'express-rest-api-patterns': {
    title: {
      ru: 'Express API зрелого уровня: idempotency, rate limiting и контрактно-ориентированный дизайн',
      en: 'Advanced Express API: idempotency, rate limiting, and contract-first design',
    },
    summary: {
      ru: 'Как строить надёжные REST API на Express: idempotency keys, partial failures и предсказуемые ошибки.',
      en: 'How to build reliable Express APIs with idempotency keys, partial-failure handling, and predictable errors.',
    },
    seoDescription: {
      ru: 'Продвинутый Express: контрактная схема, отказоустойчивость и эксплуатация API в high-load сценариях.',
      en: 'Advanced Express engineering: contract schemas, resilience, and high-load API operations.',
    },
    focus: { ru: 'Contract-first API', en: 'Contract-first API' },
  },
  'sequelize-data-modeling': {
    title: {
      ru: 'Sequelize без боли: zero-downtime миграции, query plans и контроль ORM-накладных расходов',
      en: 'Sequelize done right: zero-downtime migrations, query plans, and ORM overhead control',
    },
    summary: {
      ru: 'Практика Sequelize в больших системах: эволюция схемы без простоя и диагностика медленных запросов.',
      en: 'Sequelize in larger systems: no-downtime schema evolution and slow-query diagnostics.',
    },
    seoDescription: {
      ru: 'Продвинутый Sequelize-поток: миграции, транзакционные границы и производительность SQL под ORM.',
      en: 'Advanced Sequelize workflow: migrations, transactional boundaries, and SQL performance under ORM.',
    },
    focus: { ru: 'Schema evolution', en: 'Schema evolution' },
  },
  'mysql-query-design': {
    title: {
      ru: 'MySQL для нагруженных систем: индексные стратегии, CTE и защита от query regressions',
      en: 'MySQL for high-load systems: index strategy, CTEs, and query regression defense',
    },
    summary: {
      ru: 'Глубокий подход к MySQL: профиль запросов, индексный дизайн и контроль деградаций после релизов.',
      en: 'Deep MySQL practices: query profiling, index design, and post-release regression control.',
    },
    seoDescription: {
      ru: 'MySQL инженерия: explain-analyze, композитные индексы, репликация и стабильный latency.',
      en: 'MySQL engineering: explain-analyze, composite indexes, replication, and stable latency.',
    },
    focus: { ru: 'Query engineering', en: 'Query engineering' },
  },
  'socketio-realtime-features': {
    title: {
      ru: 'Socket.io на больших объёмах: ordering, presence, recovery и горизонтальное масштабирование',
      en: 'Socket.io at scale: ordering, presence, recovery, and horizontal scaling',
    },
    summary: {
      ru: 'Как проектировать real-time слой: гарантии порядка, reconnect-политики и прозрачная эксплуатация.',
      en: 'Designing robust real-time layers: ordering guarantees, reconnect policies, and operability.',
    },
    seoDescription: {
      ru: 'Realtime-инженерия в Socket.io: масштабирование, state recovery и QoS для пользовательских событий.',
      en: 'Realtime Socket.io engineering: scaling, state recovery, and QoS for user events.',
    },
    focus: { ru: 'Realtime reliability', en: 'Realtime reliability' },
  },
  'docker-production-images': {
    title: {
      ru: 'Docker production images: distroless, SBOM и supply-chain security на практике',
      en: 'Docker production images: distroless, SBOM, and practical supply-chain security',
    },
    summary: {
      ru: 'Продвинутый подход к контейнерным образам: минимизация surface area, подпись артефактов и воспроизводимые билды.',
      en: 'Advanced container image strategy: smaller surface area, signed artifacts, and reproducible builds.',
    },
    seoDescription: {
      ru: 'Безопасные Docker-образы: multi-stage, distroless, SBOM и контроль уязвимостей в CI.',
      en: 'Secure Docker images: multi-stage builds, distroless, SBOM, and CI vulnerability controls.',
    },
    focus: { ru: 'Container security', en: 'Container security' },
  },
  'docker-compose-multi-service': {
    title: {
      ru: 'Docker Compose для команд: dev parity, ephemeral env и быстрая проверка интеграций',
      en: 'Docker Compose for teams: dev parity, ephemeral envs, and fast integration checks',
    },
    summary: {
      ru: 'Как превратить Compose в инженерный инструмент: локальные стенды, reproducible окружения и onboarding без трения.',
      en: 'How to turn Compose into an engineering accelerator with reproducible environments and low-friction onboarding.',
    },
    seoDescription: {
      ru: 'Compose-подход для multi-service разработки: инфраструктурная предсказуемость и быстрый цикл обратной связи.',
      en: 'Compose for multi-service development: infrastructure predictability and short feedback loops.',
    },
    focus: { ru: 'Environment parity', en: 'Environment parity' },
  },
  'nginx-routing-and-cache': {
    title: {
      ru: 'Nginx как edge-слой: smart caching, cache keys и безопасная инвалидация',
      en: 'Nginx as an edge layer: smart caching, cache keys, and safe invalidation',
    },
    summary: {
      ru: 'Продвинутый edge на Nginx: маршрутизация, кэш-стратегии и защита происхождения от лишней нагрузки.',
      en: 'Advanced Nginx edge strategy: routing, caching, and origin protection from avoidable load.',
    },
    seoDescription: {
      ru: 'Nginx в production: TTL-модели, stale-while-revalidate и управление кэш-рисками.',
      en: 'Nginx in production: TTL models, stale-while-revalidate, and cache risk management.',
    },
    focus: { ru: 'Edge caching', en: 'Edge caching' },
  },
  'gitlab-cicd-pipelines': {
    title: {
      ru: 'GitLab CI/CD зрелого уровня: DAG-пайплайны, quality gates и supply-chain контроль',
      en: 'Advanced GitLab CI/CD: DAG pipelines, quality gates, and supply-chain controls',
    },
    summary: {
      ru: 'Как ускорить delivery без потери качества: параллельные пайплайны, кэширование и безопасные release-потоки.',
      en: 'How to accelerate delivery safely with parallel pipelines, caching, and secure release flows.',
    },
    seoDescription: {
      ru: 'Инженерия GitLab CI/CD: pipeline DAG, policy-as-code и стабильные релизы с проверками.',
      en: 'GitLab CI/CD engineering: pipeline DAG, policy-as-code, and stable release validation.',
    },
    focus: { ru: 'Delivery pipelines', en: 'Delivery pipelines' },
  },
  'openlayers-mapbox-leaflet': {
    title: {
      ru: 'Гео-веб продвинутого уровня: vector tiles, spatial indexing и быстрый map UX',
      en: 'Advanced geo-web: vector tiles, spatial indexing, and fast map UX',
    },
    summary: {
      ru: 'Практика OpenLayers/MapBox/Leaflet в real-world задачах: производительность, точность и UX-навигация.',
      en: 'Practical OpenLayers/MapBox/Leaflet patterns for real workloads: performance, precision, and map UX.',
    },
    seoDescription: {
      ru: 'Современный гео-frontend: tiles, кластеры, spatial-фильтрация и устойчивый рендер карт.',
      en: 'Modern geospatial frontend: tiles, clustering, spatial filtering, and resilient map rendering.',
    },
    focus: { ru: 'Geospatial performance', en: 'Geospatial performance' },
  },
  'threejs-potree-3d-visualization': {
    title: {
      ru: '3D Web на практике: LOD-стриминг, point clouds и производительный рендер в Three.js/Potree',
      en: 'Practical 3D web: LOD streaming, point clouds, and high-performance Three.js/Potree rendering',
    },
    summary: {
      ru: 'Продвинутые техники 3D-визуализации в браузере: управление памятью, LOD и плавная интерактивность.',
      en: 'Advanced browser 3D techniques: memory control, LOD strategies, and smooth interactivity.',
    },
    seoDescription: {
      ru: 'Three.js/Potree advanced: point cloud streaming, оптимизация кадра и эксплуатация 3D-сцен в production.',
      en: 'Three.js/Potree advanced guide: point-cloud streaming, frame optimization, and production operations.',
    },
    focus: { ru: '3D performance', en: '3D performance' },
  },
}

const defaultTheme: ArticleTheme = {
  title: {
    ru: 'Продвинутая инженерная тема: архитектура, надёжность и эксплуатация',
    en: 'Advanced engineering topic: architecture, reliability, and operations',
  },
  summary: {
    ru: 'Практическая статья о современных подходах в разработке: от архитектурных решений до устойчивой эксплуатации.',
    en: 'A practical article on modern engineering practices: from architecture choices to resilient operations.',
  },
  seoDescription: {
    ru: 'Глубокий технический разбор: архитектура, производительность, безопасность и наблюдаемость.',
    en: 'Deep technical breakdown: architecture, performance, security, and observability.',
  },
  focus: { ru: 'Engineering excellence', en: 'Engineering excellence' },
}

function getThemeBySlug(slug: string): ArticleTheme {
  return advancedThemes[slug] ?? defaultTheme
}

function makeRuParagraphs(technology: string, theme: ArticleTheme) {
  return [
    `В контексте ${technology} сегодня ключевой акцент смещается в сторону темы «${theme.focus.ru}». В зрелых командах уже недостаточно просто «запустить фичу»: требуется формализовать контракты, определить non-functional требования и заранее описать, как система будет вести себя при пиковых сценариях и частичных отказах. Я обычно начинаю с архитектурного ADR и тестируемого контракта интерфейсов, чтобы все дальнейшие решения были проверяемыми и воспроизводимыми. Это снижает риск хаотичных изменений и делает технологический трек прозрачным для продукта и бизнеса.`,
    `Для ${technology} критично выстроить границы ответственности на уровне модулей и потоков данных. Когда доменные правила смешиваются с инфраструктурными деталями, скорость изменений резко падает, а стоимость ревью растёт. Поэтому в advanced-проектах я отделяю policy-слой, orchestration-слой и execution-слой: это помогает команде независимо развивать функциональность и безопасно обновлять зависимые компоненты. Такой подход особенно важен при параллельной работе нескольких команд и частых релизах.`,
    `Отдельный фокус — производительность как дисциплина, а не разовая оптимизация. Вокруг ${technology} я строю регулярный цикл: сбор продуктовых метрик, профилирование «узких мест», постановка performance budget и автоматическая проверка деградаций в CI. Это означает, что каждый релиз оценивается не только по функциональности, но и по влиянию на latency, стабильность интерфейса и стоимость вычислений. В долгую эта практика даёт более устойчивую систему, чем эпизодические «переписывания ради скорости».`,
    `Актуальные требования к качеству включают и надежность поставки данных: retry-политики, idempotency, отмену устаревших запросов, дедупликацию операций и контроль race conditions. В проектах с ${technology} именно этот слой часто определяет воспринимаемое качество продукта. Пользователь не видит архитектурные диаграммы, но мгновенно замечает рассинхронизацию, дубли действий и нестабильные ответы. Поэтому я закладываю устойчивость в data-flow как часть базового инженерного контракта, а не как пост-фактум фикс.`,
    `Тестирование для advanced-уровня в ${technology} строится вокруг рисков, а не вокруг количества тестов. Вместо «покрыть всё» я выделяю критические инварианты, граничные состояния и цепочки, где ошибка наиболее дорога. Для них создаются быстрые unit/contract проверки и несколько интеграционных сценариев с реалистичными нагрузочными предпосылками. Такой набор проще поддерживать, и он лучше защищает от регрессий в реальных бизнес-флоу, чем формальное повышение процента coverage.`,
    `Эксплуатация — ещё один критерий зрелости. Системы на ${technology} должны быть наблюдаемыми: структурные логи, трассировка ключевых операций, метрики «задержка/ошибка/насыщение», плюс понятные алерты с actionable контекстом. Я стараюсь проектировать этот слой параллельно с функциональностью, чтобы при инциденте команда могла быстро локализовать проблему и выполнить rollback или feature-flag деградацию без остановки продукта. Это существенно снижает MTTR и повышает доверие к релизному процессу.`,
    `Безопасность и supply-chain сегодня также обязательны. Для стека ${technology} это означает контроль зависимостей, review внешних пакетов, политику секретов и регулярную валидацию уязвимостей в CI/CD. В зрелых командах безопасность не рассматривается как «отдельный этап перед релизом» — она встроена в Definition of Done и автоматические quality gates. Такой подход делает скорость поставки более предсказуемой и снижает вероятность критичных инцидентов на production.`,
    `Практический вывод: ${technology} показывает максимальную ценность, когда реализуется через системный инженерный подход, соответствующий теме «${theme.focus.ru}». Это комбинация архитектурной дисциплины, метрик, наблюдаемости, эксплуатационной готовности и управляемой эволюции. Именно так технологический стек перестает быть набором инструментов и превращается в устойчивую платформу, которая выдерживает рост продукта, нагрузку и изменение бизнес-приоритетов.`,
  ]
}

function makeEnParagraphs(technology: string, theme: ArticleTheme) {
  return [
    `${technology} delivers serious value when teams treat it as a system discipline aligned with “${theme.focus.en}”, not just as a stack keyword. In advanced environments, I start with explicit architecture contracts, non-functional constraints, and failure-mode definitions before feature implementation. This creates a shared model for product, engineering, and operations, and makes trade-offs visible early. The result is lower uncertainty and fewer expensive corrections after release.`,
    `With ${technology}, structure is usually the deciding factor between short-term velocity and long-term sustainability. I separate policy logic, orchestration flows, and execution details so modules can evolve independently. This boundary-driven model improves review quality, reduces cognitive load, and prevents accidental cross-layer coupling. In multi-team delivery it also makes ownership clear and enables parallel development without introducing fragile integration points.`,
    `Performance is managed as a continuous engineering loop: baseline measurements, hotspot profiling, budget targets, and automated regression checks. In ${technology}-based products, this process is far more effective than one-off optimization sprints. It protects user experience under rapid iteration and keeps operational costs predictable. Teams can still move quickly, but they do so with measurable guardrails rather than intuition alone.`,
    `Reliability at advanced level depends on data-flow correctness: idempotent operations, cancellation support, stale-request handling, and race-condition prevention. In many real systems, these mechanics are what users perceive as “quality”. A polished interface is not enough if the underlying flow occasionally duplicates actions or resolves in wrong order. For ${technology}, I therefore model resilience directly into request orchestration and state transitions.`,
    `Testing strategy should be risk-oriented, not metric-oriented. Instead of maximizing raw coverage numbers, I target invariants, edge behavior, and expensive failure paths. For ${technology}, this typically means fast unit/contract tests plus a thin layer of realistic integration scenarios. That combination gives strong release confidence while keeping the suite maintainable and fast enough for daily CI pipelines.`,
    `Operational readiness is a first-class concern. Systems built with ${technology} need structured logging, traceable critical paths, and actionable alerts tied to latency/error/saturation signals. I prefer shipping this observability layer together with feature work, not as a deferred phase. During incidents, this drastically reduces detection and recovery time, and helps teams make safe mitigation decisions under pressure.`,
    `Security and supply-chain controls are equally important in modern delivery. In ${technology} ecosystems, dependency governance, secret hygiene, and automated vulnerability checks should be part of quality gates by default. Treating security as embedded engineering policy—rather than a late compliance step—keeps deployment velocity stable and minimizes high-impact surprises in production.`,
    `The practical takeaway: ${technology} becomes strategically powerful when implemented through a cohesive model focused on “${theme.focus.en}”. Architecture discipline, performance budgets, observability, and secure delivery together produce systems that survive scale, changing business priorities, and real-world operational stress. That is the level where advanced engineering translates into durable product advantage.`,
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
  const theme = getThemeBySlug(seed.slug)
  const ruParagraphs = makeRuParagraphs(seed.technology, theme)
  const enParagraphs = makeEnParagraphs(seed.technology, theme)

  const sections: ArticleSection[] = [
    {
      id: 'architecture',
      title: {
        ru: `Контекст и системные ограничения: ${theme.focus.ru}`,
        en: `Context and system constraints: ${theme.focus.en}`,
      },
      paragraphs: [
        { ru: ruParagraphs[0], en: enParagraphs[0] },
        { ru: ruParagraphs[1], en: enParagraphs[1] },
      ],
    },
    {
      id: 'quality-performance',
      title: {
        ru: 'Качество реализации: производительность, устойчивость и тест-стратегия',
        en: 'Implementation quality: performance, resilience, and testing strategy',
      },
      paragraphs: [
        { ru: ruParagraphs[2], en: enParagraphs[2] },
        { ru: ruParagraphs[3], en: enParagraphs[3] },
        { ru: ruParagraphs[4], en: enParagraphs[4] },
      ],
    },
    {
      id: 'operations',
      title: {
        ru: 'Эксплуатация, безопасность и эволюция платформы',
        en: 'Operations, security, and platform evolution',
      },
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
    title: theme.title,
    summary: theme.summary,
    seoDescription: theme.seoDescription,
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
