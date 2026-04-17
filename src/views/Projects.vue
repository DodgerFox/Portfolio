<template>
  <section class="projects">
    <div class="wrap">
      <div class="projects-head">
        <h1>Projects</h1>
        <div class="projects-links">
          <router-link to="/" class="projects-link">На главную</router-link>
          <a class="projects-link" href="https://t.me/alekseichernovv" target="_blank" rel="noopener noreferrer"
            >Заказать сайт</a
          >
        </div>
      </div>
      <Tags :show-icons="false" :single="false" :cut="0" v-model:tags="tags" v-model:active="activeTags" />
      <div class="projects-body">
        <Card v-for="project in filteredCards" :key="project.id" :card="project" />
      </div>
    </div>
  </section>
  <!-- fixed order button visible while scrolling -->
  <a class="order-fixed" href="https://t.me/alekseichernovv" target="_blank" rel="noopener noreferrer">Заказать сайт</a>
</template>
<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { computed, ref } from 'vue'
import tags from '@/data/tags.json'
import projects from '@/data/projects.json'
import Tags from '@/components/blocks/Tags.vue'
import Card from '@/components/ui/Card.vue'

const activeTags = ref([])

const filteredCards = computed(() => {
  if (!activeTags.value?.length) return projects
  return projects.filter((project) =>
    project?.tags.find((tag) => activeTags.value.find((activeTag: { id: number }) => tag.id === activeTag.id)),
  )
})

useHead({
  title: 'Projects — Alexey Chernov Portfolio',
  meta: [
    {
      name: 'description',
      content:
        'Подборка реализованных проектов: лендинги, корпоративные сайты, e-commerce и frontend/full-stack кейсы с визуальными обложками.',
    },
  ],
})
</script>
<style lang="stylus">
.projects
  padding 40px 0
  display block

  &-head
    display flex
    justify-content space-between
    align-items center
    gap 20px
    flex-wrap wrap

  &-links
    display flex
    align-items center
    gap 10px

  &-link
    font-size 16px
    color white
    text-decoration none
    border 1px solid white
    border-radius 999px
    padding 6px 14px
    transition .2s ease all
    &:hover
      background white
      color #171717

  &-body
    display flex
    flex-wrap wrap
    gap 30px

  .wrap
    display flex
    flex-direction column
    gap 40px

  .tags
    transform translateX(-1px)
    .tag
      padding 4px 10px
      border 1px solid transparent
      border-radius 25px
      p
        font-size 16px
        color white
      &.active
        border 1px solid white

  .order-fixed
    position fixed
    left 50%
    transform translateX(-50%)
    bottom 24px
    z-index 9999
    background #ff4d4f
    color white
    padding 12px 22px
    border-radius 999px
    text-decoration none
    font-weight 600
    box-shadow 0 6px 18px rgba(0,0,0,0.35)
    transition .18s ease transform, .18s ease opacity
    &:hover
      transform translateX(-50%) scale(1.03)
      opacity 0.95
</style>
