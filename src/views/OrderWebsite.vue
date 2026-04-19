<template>
  <section class="order-landing">
    <div class="wrap">
      <header class="order-landing__topnav">
        <div class="order-landing__topnav-links">
          <router-link to="/">{{ currentLocale === LOCALES.ru ? 'Главная' : 'Home' }}</router-link>
          <router-link to="/projects">{{ currentLocale === LOCALES.ru ? 'Проекты' : 'Projects' }}</router-link>
          <router-link to="/articles">{{ currentLocale === LOCALES.ru ? 'Статьи' : 'Articles' }}</router-link>
          <a href="#cases">{{ currentLocale === LOCALES.ru ? 'Кейсы' : 'Cases' }}</a>
          <a href="#quiz">{{ currentLocale === LOCALES.ru ? 'Квиз' : 'Quiz' }}</a>
        </div>
        <div class="order-landing__topnav-lang">
          <LanguageSwitcher />
        </div>
      </header>

      <header class="order-landing__hero">
        <p class="order-landing__badge">{{ content.badge }}</p>
        <h1>{{ content.title }}</h1>
        <p class="order-landing__lead">{{ content.lead }}</p>
        <div class="order-landing__hero-actions">
          <a href="https://t.me/lilborsch" target="_blank" rel="noopener noreferrer" class="primary">{{ content.primaryCta }}</a>
          <a href="https://wa.me/+79959971293" target="_blank" rel="noopener noreferrer" class="secondary">{{ content.secondaryCta }}</a>
        </div>
      </header>

      <section class="order-landing__proof">
        <article class="proof-card" v-for="item in content.proofCards" :key="item.label">
          <div class="proof-card__value">{{ item.value }}</div>
          <p>{{ item.label }}</p>
        </article>
      </section>

      <section class="order-landing__section" id="benefits">
        <h2>{{ content.benefitsTitle }}</h2>
        <div class="benefits-grid">
          <article class="benefit" v-for="item in content.benefits" :key="item.title">
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </article>
        </div>
      </section>

      <section class="order-landing__section order-landing__process" id="process">
        <h2>{{ content.processDisplayTitle }}</h2>
        <p class="order-landing__section-lead">{{ content.processSubtitle }}</p>
        <div class="process-kpis">
          <article class="process-kpi" v-for="item in content.processStats" :key="item.label">
            <p class="process-kpi__value">{{ item.value }}</p>
            <p class="process-kpi__label">{{ item.label }}</p>
          </article>
        </div>
        <div class="process-line" aria-hidden="true">
          <span v-for="n in content.process.length" :key="`process-node-${n}`" class="process-line__node">{{ String(n).padStart(2, '0') }}</span>
        </div>
        <div class="process-grid">
          <article class="process-item" v-for="(step, index) in content.process" :key="step.title">
            <div class="process-item__index">{{ String(index + 1).padStart(2, '0') }}</div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.text }}</p>
          </article>
        </div>
        <div class="process-tags">
          <span class="type-chip" v-for="tag in content.processTags" :key="tag">{{ tag }}</span>
        </div>
        <a href="https://t.me/lilborsch" target="_blank" rel="noopener noreferrer" class="process-action">{{ content.processCta }}</a>
      </section>

      <section class="order-landing__section" id="cases">
        <h2>{{ content.casesTitle }}</h2>
        <div class="cases-filters">
          <button
            v-for="filter in content.caseFilters"
            :key="filter.id"
            type="button"
            class="cases-filters__item"
            :class="{ active: selectedCaseFilter === filter.id }"
            @click="selectedCaseFilter = filter.id"
          >
            {{ filter.title }}
          </button>
        </div>
        <div class="cases-grid">
          <article class="case-card" v-for="item in filteredCases" :key="item.title">
            <p class="case-card__niche">{{ item.nicheTitle }}</p>
            <h3>{{ item.title }}</h3>
            <p class="case-card__offer">{{ item.offer }}</p>
            <div class="case-card__meta">
              <span>{{ item.timeline }}</span>
              <span>{{ item.budget }}</span>
            </div>
          </article>
        </div>
      </section>

      <section class="order-landing__section" id="types">
        <h2>{{ content.siteTypesTitle }}</h2>
        <p class="order-landing__section-lead">{{ content.siteTypesLead }}</p>
        <div class="types-grid">
          <span class="type-chip" v-for="type in content.siteTypes" :key="type">{{ type }}</span>
        </div>
      </section>

      <section class="order-landing__section" id="quiz">
        <h2>{{ content.quizTitle }}</h2>
        <p class="order-landing__section-lead">{{ content.quizLead }}</p>
        <div class="quiz-grid">
          <article class="quiz-item" v-for="question in content.quizQuestions" :key="question.id">
            <h3>{{ question.q }}</h3>
            <div class="quiz-item__options">
              <button
                v-for="option in question.options"
                :key="option"
                type="button"
                :class="{ active: quizAnswers[question.id] === option }"
                @click="setQuizAnswer(question.id, option)"
              >
                {{ option }}
              </button>
            </div>
          </article>
        </div>
        <div class="quiz-result" :class="{ done: isQuizComplete }">
          <p>{{ isQuizComplete ? content.quizDone : content.quizPending }}</p>
          <a v-if="isQuizComplete" :href="quizLeadHref" target="_blank" rel="noopener noreferrer">{{ content.quizCta }}</a>
        </div>
      </section>

      <section class="order-landing__section" id="faq">
        <h2>{{ content.faqTitle }}</h2>
        <div class="faq-list">
          <details v-for="faq in content.faq" :key="faq.q">
            <summary>{{ faq.q }}</summary>
            <p>{{ faq.a }}</p>
          </details>
        </div>
      </section>

      <section class="order-landing__cta">
        <h2>{{ content.finalTitle }}</h2>
        <p>{{ content.finalLead }}</p>
        <a href="https://t.me/lilborsch" target="_blank" rel="noopener noreferrer">{{ content.primaryCta }}</a>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@unhead/vue'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher.vue'
import projects from '@/data/projects.json'
import { articles } from '@/data/articles'
import { LOCALES } from '@/types/environment'

const { locale } = useI18n()
const currentLocale = computed(() => (locale.value as LOCALES) || LOCALES.en)
const selectedCaseFilter = ref('all')
const quizAnswers = ref<Record<string, string>>({})

const content = computed(() => {
  if (currentLocale.value === LOCALES.ru) {
    return {
      badge: 'Лендинг / корпоративный сайт / MVP',
      title: 'Создание сайтов под заявки и продажи: дизайн, разработка, SEO и запуск под ключ',
      lead: 'Делаю сайты, которые быстро загружаются, хорошо индексируются и ведут клиента к целевому действию. От брифа и структуры до запуска и поддержки.',
      primaryCta: 'Заказать сайт в Telegram',
      secondaryCta: 'Написать в WhatsApp',
      proofCards: [
        { value: `${projects.length}+`, label: 'проектов в портфолио' },
        { value: '11+', label: 'лет коммерческой разработки' },
        { value: 'Highload', label: 'опыт сложных сервисов' },
        { value: `${articles.length}`, label: 'экспертных материалов' },
      ],
      benefitsTitle: 'Плюсы заказа сайта у меня',
      benefits: [
        {
          title: 'Объёмное портфолио',
          text: 'Большое количество реальных проектов в разных нишах: от лендингов до сложных платформ и интерфейсов.',
        },
        {
          title: '11+ лет практического опыта',
          text: 'Проектирую и запускаю сайты на продакшн-уровне: с фокусом на бизнес-результат, скорость и поддержку.',
        },
        {
          title: 'Сложные highload-сервисы',
          text: 'Разрабатывал и поддерживал масштабные решения для крупных компаний, включая Газпром-нефть, IQOption и другие проекты enterprise-уровня.',
        },
        {
          title: 'Техническое SEO сразу в архитектуре',
          text: 'Семантическая структура, корректные мета-данные, Open Graph, schema.org и чистые URL закладываются на этапе разработки.',
        },
        {
          title: 'Скорость и UX как фактор конверсии',
          text: 'Оптимизирую рендер, изображения и критический путь загрузки, чтобы пользователю было удобно оставлять заявку с первого экрана.',
        },
        {
          title: 'Контент и оффер под ваш рынок',
          text: 'Формирую смысловые блоки, заголовки и CTA под вашу аудиторию: меньше воды, больше пользы и доверия.',
        },
      ],
      processTitle: 'Как проходит работа',
      processDisplayTitle: 'Как я делаю сайты',
      processSubtitle: 'Инфографика процесса: прозрачные этапы, понятные сроки и измеримый результат на каждом шаге.',
      processStats: [
        { value: '5+', label: 'этапов под ключ' },
        { value: '7–21', label: 'дней до MVP' },
        { value: 'A+', label: 'фокус на качестве' },
      ],
      process: [
        { title: 'Бриф и цели', text: 'Определяем продукт, аудиторию, оффер и KPI: заявки, звонки, продажи.' },
        { title: 'Прототип и дизайн', text: 'Собираем структуру экранами, делаем визуальную систему и тексты под конверсию.' },
        { title: 'Разработка и интеграции', text: 'Верстка, фронтенд/бекенд, формы, аналитика, CRM, уведомления и автоматика.' },
        { title: 'Запуск и рост', text: 'Релиз, проверка метрик, улучшения по данным и сопровождение после запуска.' },
      ],
      processTags: ['UI-kit', 'CMS / forms', 'SEO-ready', 'Analytics', 'Support'],
      processCta: 'Написать в Telegram',
      casesTitle: 'Кейсы по нишам: что можно сделать под ваш бизнес',
      caseFilters: [
        { id: 'all', title: 'Все ниши' },
        { id: 'services', title: 'Услуги' },
        { id: 'ecom', title: 'E-commerce' },
        { id: 'b2b', title: 'B2B / корп.' },
        { id: 'media', title: 'Медиа / контент' },
        { id: 'fintech', title: 'FinTech' },
        { id: 'industrial', title: 'Промышленность' },
      ],
      cases: [
        { filter: 'services', nicheTitle: 'Юридические и экспертные услуги', title: 'Лендинг на заявки', offer: 'УТП + квиз + форма в 2 клика, интеграция с CRM.', timeline: '10–14 дней', budget: 'от 90 000 ₽' },
        { filter: 'ecom', nicheTitle: 'Интернет-магазин', title: 'Каталог + карточка + оплата', offer: 'Оптимизация каталога, быстрый фильтр, SEO-структура разделов.', timeline: '21–35 дней', budget: 'от 180 000 ₽' },
        { filter: 'b2b', nicheTitle: 'Корпоративный сайт', title: 'Имидж + лидогенерация', offer: 'Структура под доверие: кейсы, услуги, экспертиза, лид-магниты.', timeline: '14–28 дней', budget: 'от 140 000 ₽' },
        { filter: 'media', nicheTitle: 'Медиа / блог / журнал', title: 'Контент-платформа', offer: 'Таксономия материалов, шаблоны статей, выдача и перелинковка.', timeline: '18–30 дней', budget: 'от 160 000 ₽' },
        { filter: 'fintech', nicheTitle: 'FinTech / трейдинг', title: 'Личный кабинет и дашборды', offer: 'Реалтайм-данные, роли доступа, отчеты и безопасный поток данных.', timeline: '30–60 дней', budget: 'от 280 000 ₽' },
        { filter: 'industrial', nicheTitle: 'Промышленные компании', title: 'Корпоративный highload-портал', offer: 'Многоуровневая структура, интеграции, каталоги и административные панели.', timeline: '30–55 дней', budget: 'от 260 000 ₽' },
        { filter: 'services', nicheTitle: 'Агентства и студии', title: 'Мульти-лендинг под услуги', offer: 'Отдельные страницы под сегменты + сквозная аналитика конверсий.', timeline: '14–24 дней', budget: 'от 130 000 ₽' },
        { filter: 'ecom', nicheTitle: 'D2C бренды', title: 'Витрина + контент-маркетинг', offer: 'Комбо e-commerce и блоговой структуры для SEO и повторных продаж.', timeline: '24–40 дней', budget: 'от 220 000 ₽' },
        { filter: 'b2b', nicheTitle: 'IT / SaaS', title: 'Сайт продукта + onboarding', offer: 'Оффер, pricing, FAQ, demo-форма и воронка пробного доступа.', timeline: '16–30 дней', budget: 'от 170 000 ₽' },
        { filter: 'media', nicheTitle: 'Образовательные проекты', title: 'Журнал + воронка обучения', offer: 'Секции материалов, фильтры, подписка и лид-магнит через квиз.', timeline: '18–35 дней', budget: 'от 180 000 ₽' },
      ],
      siteTypesTitle: 'Типы сайтов и сервисов, которые я разрабатываю',
      siteTypesLead: 'Работаю с продуктами любой сложности: от одностраничников до высоконагруженных платформ с админкой и сложной бизнес-логикой.',
      siteTypes: [
        'Лендинг',
        'Интернет-магазин',
        'Корпоративный сайт',
        'Блог',
        'Сайт-визитка',
        'Высоконагруженные сервисы',
        'CRM-системы',
        'Админ-панели',
        'Дашборды',
        'Сложный функционал и интеграции',
        'Интернет-журналы',
        'Сервисы любой сложности',
      ],
      quizTitle: 'Быстрый квиз: за 30 секунд определим формат проекта',
      quizLead: 'Ответьте на 4 вопроса — я получу контекст и вернусь с конкретным планом и бюджетным коридором.',
      quizQuestions: [
        { id: 'goal', q: '1. Какая основная цель сайта?', options: ['Заявки', 'Продажи', 'Имидж', 'Контент / медиа'] },
        { id: 'type', q: '2. Какой тип сайта нужен?', options: ['Лендинг', 'Корпоративный', 'Интернет-магазин', 'Сервис / CRM'] },
        { id: 'deadline', q: '3. Какой комфортный срок?', options: ['До 2 недель', '2–4 недели', '1–2 месяца', 'Гибко по этапам'] },
        { id: 'budget', q: '4. Ориентир по бюджету?', options: ['До 100k', '100–200k', '200k+', 'Нужна оценка'] },
      ],
      quizDone: 'Отлично! Квиз заполнен — можно отправить вводные и получить точный план.',
      quizPending: 'Заполните 4 ответа, чтобы сформировать персональный стартовый бриф.',
      quizCta: 'Отправить бриф в Telegram',
      faqTitle: 'Частые вопросы перед заказом сайта',
      faq: [
        { q: 'Сколько стоит создание сайта?', a: 'Цена зависит от объема и интеграций. После короткого брифа даю прозрачную вилку бюджета и план этапов.' },
        { q: 'Можно ли запустить быстро?', a: 'Да. Для MVP обычно укладываемся в 7–21 день при согласованном контенте и оперативной обратной связи.' },
        { q: 'Вы делаете SEO сразу?', a: 'Да, техническое SEO закладывается в разработку: структура, мета-теги, микроразметка, скорость и индексируемость.' },
        { q: 'Что после запуска?', a: 'Даю поддержку: мониторинг, правки, развитие контента и улучшение конверсии на основе аналитики.' },
      ],
      finalTitle: 'Готов обсудить ваш проект сегодня',
      finalLead: 'Напишите задачу, нишу и пример сайта, который нравится — предложу структуру, сроки и бюджетный коридор.',
    }
  }

  return {
    badge: 'Landing page / corporate site / MVP',
    title: 'Website development focused on leads and sales: design, engineering, SEO, and launch',
    lead: 'I build websites that load fast, rank better, and guide visitors toward conversion. From discovery and structure to launch and support.',
    primaryCta: 'Order website via Telegram',
    secondaryCta: 'Message on WhatsApp',
    proofCards: [
      { value: `${projects.length}+`, label: 'projects in portfolio' },
      { value: '11+', label: 'years of commercial development' },
      { value: 'Highload', label: 'complex service expertise' },
      { value: `${articles.length}`, label: 'expert articles' },
    ],
    benefitsTitle: 'Why clients choose me for website development',
    benefits: [
      {
        title: 'Large practical portfolio',
        text: 'Extensive portfolio across niches: landing pages, corporate websites, and advanced product interfaces.',
      },
      {
        title: '11+ years of development experience',
        text: 'Hands-on execution of production-grade web projects focused on measurable business goals.',
      },
      {
        title: 'Enterprise high-load background',
        text: 'Built and maintained complex services for large companies including Gazprom Neft, IQOption, and other enterprise-level products.',
      },
      {
        title: 'Technical SEO by design',
        text: 'Semantic structure, clean metadata, Open Graph, schema.org, and crawl-friendly URLs are built in from day one.',
      },
      {
        title: 'Performance and UX for conversion',
        text: 'I optimize rendering, assets, and loading path to reduce friction and increase conversion from the first screen.',
      },
      {
        title: 'Offer and content aligned to market',
        text: 'Page blocks, messaging, and CTA are tailored to your audience: less fluff, more relevance and trust.',
      },
    ],
    processTitle: 'How the process works',
    processDisplayTitle: 'How I Build Websites',
    processSubtitle: 'Process infographic: transparent stages, clear timeline, and measurable outcomes at each step.',
    processStats: [
      { value: '5+', label: 'turnkey stages' },
      { value: '7–21', label: 'days to MVP' },
      { value: 'A+', label: 'quality focus' },
    ],
    process: [
      { title: 'Brief and goals', text: 'Define product, audience, offer, and measurable KPIs: leads, calls, sales.' },
      { title: 'Prototype and design', text: 'Build screen structure, visual system, and conversion-oriented copy.' },
      { title: 'Development and integrations', text: 'Frontend/backend, forms, analytics, CRM, notifications, and automation.' },
      { title: 'Launch and growth', text: 'Release, metrics review, iterative improvements, and post-launch support.' },
    ],
    processTags: ['UI-kit', 'CMS / forms', 'SEO-ready', 'Analytics', 'Support'],
    processCta: 'Message on Telegram',
    casesTitle: 'Niche cases: what can be built for your business',
    caseFilters: [
      { id: 'all', title: 'All niches' },
      { id: 'services', title: 'Services' },
      { id: 'ecom', title: 'E-commerce' },
      { id: 'b2b', title: 'B2B / Corporate' },
      { id: 'media', title: 'Media / Content' },
      { id: 'fintech', title: 'FinTech' },
      { id: 'industrial', title: 'Industrial' },
    ],
    cases: [
      { filter: 'services', nicheTitle: 'Professional services', title: 'Lead generation landing', offer: 'Strong USP, short quiz, and 2-click lead form with CRM sync.', timeline: '10–14 days', budget: 'from $1,000' },
      { filter: 'ecom', nicheTitle: 'Online store', title: 'Catalog + checkout', offer: 'Fast listing UX, conversion-first product cards, and SEO architecture.', timeline: '21–35 days', budget: 'from $2,200' },
      { filter: 'b2b', nicheTitle: 'Corporate website', title: 'Trust + lead funnel', offer: 'Structured credibility blocks: services, proof, cases, lead magnets.', timeline: '14–28 days', budget: 'from $1,700' },
      { filter: 'media', nicheTitle: 'Media / Blog / Journal', title: 'Content platform', offer: 'Taxonomy, article templates, category SEO, and internal linking.', timeline: '18–30 days', budget: 'from $2,000' },
      { filter: 'fintech', nicheTitle: 'FinTech / trading', title: 'User account + dashboards', offer: 'Real-time metrics, role-based access, reporting, and reliable data flows.', timeline: '30–60 days', budget: 'from $3,200' },
      { filter: 'industrial', nicheTitle: 'Industrial companies', title: 'Corporate high-load portal', offer: 'Multi-level architecture, integrations, catalogs, and admin workspaces.', timeline: '30–55 days', budget: 'from $3,000' },
      { filter: 'services', nicheTitle: 'Agencies and studios', title: 'Multi-landing service funnel', offer: 'Segment pages with unified analytics and lead attribution.', timeline: '14–24 days', budget: 'from $1,500' },
      { filter: 'ecom', nicheTitle: 'D2C brands', title: 'Storefront + content engine', offer: 'E-commerce plus SEO content structure for repeated acquisition.', timeline: '24–40 days', budget: 'from $2,600' },
      { filter: 'b2b', nicheTitle: 'IT / SaaS products', title: 'Product site + onboarding', offer: 'Offer positioning, pricing, FAQ, demo funnel, and trial conversion path.', timeline: '16–30 days', budget: 'from $1,900' },
      { filter: 'media', nicheTitle: 'Education projects', title: 'Journal + conversion funnel', offer: 'Structured knowledge base, subscriptions, and quiz-based lead magnets.', timeline: '18–35 days', budget: 'from $2,200' },
    ],
    siteTypesTitle: 'Website and product types I build',
    siteTypesLead: 'I deliver products of any complexity: from one-page sites to high-load platforms with admin areas and advanced business logic.',
    siteTypes: [
      'Landing pages',
      'Online stores',
      'Corporate websites',
      'Blogs',
      'Business-card websites',
      'High-load services',
      'CRM systems',
      'Admin panels',
      'Dashboards',
      'Complex functional products',
      'Online magazines',
      'Services of any complexity',
    ],
    quizTitle: 'Quick quiz: define your project in 30 seconds',
    quizLead: 'Answer 4 questions — I’ll prepare a focused launch plan and budget range.',
    quizQuestions: [
      { id: 'goal', q: '1. What is the primary goal?', options: ['Leads', 'Sales', 'Brand presence', 'Content / media'] },
      { id: 'type', q: '2. What type of site do you need?', options: ['Landing page', 'Corporate site', 'E-commerce', 'Service / CRM'] },
      { id: 'deadline', q: '3. Preferred timeline?', options: ['Up to 2 weeks', '2–4 weeks', '1–2 months', 'Flexible by stages'] },
      { id: 'budget', q: '4. Budget expectation?', options: ['Up to $1k', '$1k–2k', '$2k+', 'Need estimation'] },
    ],
    quizDone: 'Great! Quiz completed — send it and I’ll return with a practical execution plan.',
    quizPending: 'Complete all 4 answers to generate your personalized starter brief.',
    quizCta: 'Send brief to Telegram',
    faqTitle: 'FAQ before ordering a website',
    faq: [
      { q: 'How much does website development cost?', a: 'It depends on scope and integrations. After a short brief, I provide a transparent budget range and implementation plan.' },
      { q: 'Can we launch quickly?', a: 'Yes. MVP projects are typically launched in 7–21 days with aligned content and fast feedback cycles.' },
      { q: 'Do you include SEO from the start?', a: 'Yes, technical SEO is embedded into architecture: metadata, structured data, speed, and indexability.' },
      { q: 'What happens after launch?', a: 'I provide support: monitoring, iterations, content growth, and conversion improvements based on analytics.' },
    ],
    finalTitle: 'Let’s discuss your project today',
    finalLead: 'Send your niche, task, and an example site you like — I’ll propose structure, timeline, and budget range.',
  }
})

const filteredCases = computed(() => {
  const list = content.value.cases
  if (selectedCaseFilter.value === 'all') return list
  return list.filter((item) => item.filter === selectedCaseFilter.value)
})

const isQuizComplete = computed(() => content.value.quizQuestions.every((question) => Boolean(quizAnswers.value[question.id])))

function setQuizAnswer(questionId: string, option: string) {
  quizAnswers.value = { ...quizAnswers.value, [questionId]: option }
}

const quizLeadHref = computed(() => {
  if (!isQuizComplete.value) return 'https://t.me/lilborsch'
  const lines = content.value.quizQuestions.map((q) => `${q.q} — ${quizAnswers.value[q.id]}`)
  const message = `${currentLocale.value === LOCALES.ru ? 'Бриф по сайту' : 'Website brief'}:%0A${lines.join('%0A')}`
  return `https://t.me/lilborsch?text=${message}`
})

useHead(() => {
  const isRu = currentLocale.value === LOCALES.ru
  const title = isRu
    ? 'Заказать сайт под ключ — дизайн, разработка и SEO | Alexey Chernov'
    : 'Order Website Turnkey — design, development and SEO | Alexey Chernov'
  const description = isRu
    ? 'Создание сайта под ключ: лендинг, корпоративный сайт, MVP. Разработка, дизайн, техническое SEO и запуск под заявки и продажи.'
    : 'Turnkey website development: landing page, corporate website, MVP. Design, engineering, technical SEO, and launch focused on leads and sales.'

  return {
    title,
    meta: [
      { name: 'description', content: description },
      {
        name: 'keywords',
        content: isRu
          ? 'заказать сайт, создание сайта, разработка сайта, лендинг под ключ, сайт для бизнеса, SEO сайт'
          : 'order website, website development, landing page development, corporate website, technical SEO website',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: '/order-website' },
    ],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'ProfessionalService',
              name: 'Alexey Chernov Web Development',
              serviceType: isRu ? 'Создание сайтов под ключ' : 'Turnkey website development',
              areaServed: 'Worldwide',
              url: '/order-website',
            },
            {
              '@type': 'FAQPage',
              mainEntity: content.value.faq.map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: item.a,
                },
              })),
            },
          ],
        }),
      },
    ],
  }
})
</script>

<style lang="stylus">
.order-landing
  position relative
  color #e7edf5
  padding 38px 0 68px
  overflow hidden
  isolation isolate

  &::before
    content ''
    position fixed
    inset 0
    z-index 0
    pointer-events none
    background radial-gradient(circle at 12% 18%, rgba(131, 255, 192, .12) 0%, rgba(131, 255, 192, 0) 42%), radial-gradient(circle at 88% 11%, rgba(94, 164, 255, .14) 0%, rgba(94, 164, 255, 0) 34%), radial-gradient(circle at 74% 84%, rgba(138, 119, 255, .08) 0%, rgba(138, 119, 255, 0) 40%), linear-gradient(180deg, #090c11 0%, #0b1118 45%, #0a0f15 100%)
    animation bgShift 18s ease-in-out infinite alternate

  &::after
    content ''
    position fixed
    inset -25%
    z-index 0
    pointer-events none
    opacity .3
    background-image linear-gradient(rgba(220, 255, 208, .06) 1px, transparent 1px), linear-gradient(90deg, rgba(220, 255, 208, .06) 1px, transparent 1px)
    background-size 46px 46px, 46px 46px
    mask-image radial-gradient(circle at center, rgba(0, 0, 0, .95) 45%, rgba(0, 0, 0, 0) 82%)
    animation patternDrift 32s linear infinite

  .wrap
    position relative
    z-index 1
    display flex
    flex-direction column
    gap 18px
    &::before
      content ''
      position absolute
      inset 0
      pointer-events none
      border-radius 32px
      z-index -1
      background radial-gradient(circle at 20% 18%, rgba(220, 255, 208, .08) 0%, rgba(220, 255, 208, 0) 34%), radial-gradient(circle at 80% 88%, rgba(122, 161, 255, .08) 0%, rgba(122, 161, 255, 0) 38%)

  &__topnav
    display flex
    justify-content space-between
    gap 10px
    align-items center
    flex-wrap wrap

  &__topnav-links
    display flex
    gap 8px
    flex-wrap wrap

    a
      position relative
      min-height 36px
      padding 0 14px
      border-radius 999px
      border 1px solid rgba(126, 156, 189, .34)
      background linear-gradient(180deg, rgba(255, 255, 255, .06) 0%, rgba(255, 255, 255, .02) 100%)
      text-decoration none
      color #dbe8f6
      display inline-flex
      align-items center
      justify-content center
      font-size 14px
      font-weight 700
      letter-spacing .01em
      transition border-color .2s ease, color .2s ease, transform .2s ease, box-shadow .2s ease, background .2s ease
      overflow hidden
      backdrop-filter blur(4px)

      &::after
        content ''
        position absolute
        left 14px
        right 14px
        bottom 7px
        height 2px
        border-radius 999px
        background linear-gradient(90deg, rgba(220, 255, 208, 0) 0%, rgba(220, 255, 208, .95) 50%, rgba(220, 255, 208, 0) 100%)
        transform scaleX(.2)
        opacity 0
        transition transform .2s ease, opacity .2s ease

      &:hover
        border-color rgba(220, 255, 208, .72)
        color #f6fffb
        transform translateY(-1px)
        box-shadow 0 8px 20px rgba(0, 0, 0, .22), 0 0 0 1px rgba(220, 255, 208, .1) inset

        &::after
          transform scaleX(1)
          opacity 1

      &:focus-visible
        outline none
        border-color rgba(220, 255, 208, .92)
        box-shadow 0 0 0 3px rgba(220, 255, 208, .2)

      &.router-link-active,
      &.router-link-exact-active
        color #111
        border-color #dcffd0
        background #dcffd0
        box-shadow 0 10px 24px rgba(220, 255, 208, .2)

        &::after
          opacity .4
          transform scaleX(1)

  &__topnav-lang
    margin-left auto

    :deep(.language-switcher)
      background rgba(255, 255, 255, .03)
      border 1px solid rgba(126, 156, 189, .36)
      border-radius 999px
      padding 0 8px

    :deep(.language-switcher__button)
      min-height 34px
      color #e8f1fb

    :deep(.language-switcher__menu)
      border-radius 14px

  &__hero
    background linear-gradient(135deg, rgba(16, 21, 27, .94) 0%, rgba(10, 14, 18, .96) 100%)
    border 1px solid #273342
    border-radius 30px
    padding 26px

    h1
      margin 8px 0 0
      font-size clamp(34px, 6.2vw, 76px)
      line-height .96
      text-transform uppercase
      letter-spacing clamp(4px, .8vw, 15px)

  &__badge
    display inline-flex
    background #dcffd0
    color #0f1215
    font-weight 700
    padding 7px 12px
    border-radius 999px
    font-size 13px

  &__lead
    margin-top 14px
    max-width 840px
    color #d2e0ee
    font-size 20px

  &__hero-actions
    margin-top 20px
    display flex
    flex-wrap wrap
    gap 10px
    a
      min-height 52px
      border-radius 12px
      padding 0 18px
      display inline-flex
      align-items center
      justify-content center
      text-decoration none
      font-weight 700
      &.primary
        background #dcffd0
        color #111
      &.secondary
        border 1px solid #42566a
        color #e7eff8

  &__proof
    display grid
    grid-template-columns repeat(4, minmax(0, 1fr))
    gap 10px

.proof-card
  background #dcffd0
  color #101010
  border-radius 22px
  padding 16px

  &__value
    font-size clamp(30px, 4.5vw, 58px)
    font-weight 900
    line-height .95

  p
    margin-top 8px
    text-transform uppercase
    letter-spacing .05em
    font-size 13px
    font-weight 700

.order-landing__section
  background rgba(13, 17, 22, .86)
  border 1px solid #283442
  border-radius 24px
  padding 18px
  h2
    margin 0 0 12px
    font-size clamp(24px, 4vw, 46px)
    line-height 1.02
    color #eef5ff

.order-landing__process
  h2
    text-transform uppercase
    letter-spacing .18em
    line-height .92

.process-kpis
  display grid
  grid-template-columns repeat(3, minmax(0, 1fr))
  gap 10px
  margin-bottom 12px

.process-kpi
  background #dcffd0
  color #101010
  border-radius 16px
  padding 14px

  &__value
    margin 0
    font-size clamp(34px, 5.4vw, 56px)
    line-height .9
    font-weight 900

  &__label
    margin 6px 0 0
    text-transform uppercase
    letter-spacing .05em
    font-size 13px
    font-weight 700

.order-landing__section-lead
  margin 0 0 12px
  color #cbd8e6
  font-size 18px

.benefits-grid
  display grid
  grid-template-columns repeat(3, minmax(0, 1fr))
  gap 10px

.benefit
  background rgba(220, 255, 208, .06)
  border 1px solid rgba(220, 255, 208, .18)
  border-radius 16px
  padding 14px
  h3
    margin 0 0 8px
    font-size 24px
    color #f2f8ff
  p
    margin 0
    color #d0deec
    line-height 1.45

.process-line
  display flex
  align-items center
  gap 8px
  margin 4px 0 12px

  &__node
    width 38px
    height 38px
    border-radius 10px
    display inline-flex
    align-items center
    justify-content center
    font-weight 900
    background #dcffd0
    color #121212
    position relative
    &:not(:last-child)::after
      content ''
      position absolute
      left calc(100% + 4px)
      top 50%
      width calc(100% + 10px)
      height 2px
      border-radius 999px
      transform translateY(-50%)
      background linear-gradient(90deg, rgba(220, 255, 208, .2) 0%, rgba(220, 255, 208, .9) 50%, rgba(220, 255, 208, .2) 100%)
      background-size 220% 100%
      animation progressFlow 2.8s linear infinite

.process-grid
  display grid
  grid-template-columns repeat(2, minmax(0, 1fr))
  gap 10px

.process-item
  background rgba(255, 255, 255, .02)
  border 1px solid #344556
  border-radius 16px
  padding 14px

  &__index
    width 34px
    height 34px
    border-radius 10px
    background #dcffd0
    color #121212
    display inline-flex
    align-items center
    justify-content center
    font-weight 900
    margin-bottom 8px
  h3
    margin 0 0 7px
    font-size 29px
    color #f2f8ff
  p
    margin 0
    color #d0deeb

.process-tags
  margin-top 12px
  display flex
  flex-wrap wrap
  gap 8px

.process-action
  margin-top 10px
  width 100%
  min-height 50px
  border-radius 12px
  text-decoration none
  display inline-flex
  align-items center
  justify-content center
  font-weight 800
  background #dcffd0
  color #111

.cases-filters
  display flex
  flex-wrap wrap
  gap 8px
  margin-bottom 12px

  &__item
    border 1px solid rgba(125, 157, 192, .35)
    background rgba(255, 255, 255, .03)
    color #e9f1fa
    border-radius 999px
    min-height 38px
    padding 0 12px
    font-weight 700
    cursor pointer
    transition .18s ease all
    &.active
      background #dcffd0
      color #111
      border-color #dcffd0

.cases-grid
  display grid
  grid-template-columns repeat(2, minmax(0, 1fr))
  gap 10px

.case-card
  background rgba(255, 255, 255, .03)
  border 1px solid #344658
  border-radius 16px
  padding 14px
  &__niche
    margin 0
    color #b7cde2
    font-size 12px
    text-transform uppercase
    letter-spacing .08em
  h3
    margin 8px 0 6px
    color #f2f8ff
    font-size 25px
  &__offer
    margin 0
    color #d2dfed
    line-height 1.45
  &__meta
    margin-top 10px
    display flex
    justify-content space-between
    gap 8px
    span
      color #dff7d7
      font-size 13px
      font-weight 700

.types-grid
  display flex
  flex-wrap wrap
  gap 8px

.type-chip
  display inline-flex
  border-radius 999px
  padding 9px 13px
  border 1px solid rgba(220, 255, 208, .3)
  background rgba(220, 255, 208, .06)
  color #ebf7ff
  font-weight 600
  font-size 14px

.quiz-grid
  display grid
  grid-template-columns repeat(2, minmax(0, 1fr))
  gap 10px

.quiz-item
  background rgba(255, 255, 255, .03)
  border 1px solid #334658
  border-radius 16px
  padding 14px
  h3
    margin 0 0 10px
    color #f3f9ff
    font-size 22px

  &__options
    display flex
    flex-wrap wrap
    gap 8px
    button
      min-height 34px
      padding 0 10px
      border-radius 999px
      border 1px solid rgba(142, 168, 196, .42)
      background rgba(255, 255, 255, .02)
      color #deebf8
      font-weight 600
      cursor pointer
      &.active
        background #dcffd0
        border-color #dcffd0
        color #101010

.quiz-result
  margin-top 12px
  border 1px dashed #445b73
  border-radius 14px
  padding 12px
  display flex
  align-items center
  justify-content space-between
  gap 12px
  p
    margin 0
    color #c9d9ea
  a
    min-height 42px
    padding 0 14px
    border-radius 10px
    text-decoration none
    display inline-flex
    align-items center
    justify-content center
    background #dcffd0
    color #111
    font-weight 700
  &.done
    border-color rgba(220, 255, 208, .5)

.faq-list
  display grid
  gap 8px
  details
    border 1px solid #344658
    border-radius 12px
    padding 10px 12px
    background rgba(255, 255, 255, .02)
    summary
      cursor pointer
      font-weight 700
      color #eef5ff
    p
      margin-top 8px
      color #cedceb

.order-landing__cta
  background #dcffd0
  color #111
  border-radius 24px
  padding 18px
  h2
    margin 0
    font-size clamp(28px, 5vw, 58px)
    line-height .95
    color #111
  p
    margin-top 8px
    max-width 800px
    font-size 18px
  a
    margin-top 14px
    display inline-flex
    min-height 52px
    border-radius 12px
    align-items center
    justify-content center
    padding 0 18px
    text-decoration none
    background #0f1419
    color #fff
    font-weight 700

@keyframes progressFlow
  0%
    background-position 200% 50%
  100%
    background-position -20% 50%

@keyframes bgShift
  0%
    transform translate3d(0, 0, 0) scale(1)
    filter hue-rotate(0deg)
  100%
    transform translate3d(-1.5%, -1.8%, 0) scale(1.04)
    filter hue-rotate(8deg)

@keyframes patternDrift
  0%
    transform translate3d(0, 0, 0)
  100%
    transform translate3d(-78px, -46px, 0)

@media screen and (max-width: 980px)
  .order-landing__proof,
  .process-kpis,
  .benefits-grid,
  .cases-grid,
  .quiz-grid
    grid-template-columns 1fr

  .process-grid
    grid-template-columns 1fr

@media screen and (max-width: 560px)
  .order-landing
    padding-top 20px
    .wrap
      padding 0 12px

  .order-landing__hero
    padding 16px

  .order-landing__hero h1
    letter-spacing 4px

  .order-landing__process h2
    letter-spacing .1em

  .process-line
    flex-wrap wrap

  .quiz-result
    flex-direction column
    align-items stretch
    a
      width 100%

@media screen and (max-width: 320px)
  .order-landing__hero-actions a
    width 100%
</style>
