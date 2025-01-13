<template>
  <secion class="projects">
    <div class="wrap">
      <h1>Projects</h1>
      <Tags v-model:tags="tags" v-model:active="activeTags" />
      <div class="projects-body">
        <Card v-for="project in filteredCards" :key="project.id" :card="project" />
      </div>
      <!-- @clicked="tagsHandler" -->
    </div>
  </secion>
</template>
<script setup lang="ts">
import tags from '@/data/tags.json'
import projects from '@/data/projects.json'
import Tags from '@/components/blocks/Tags.vue'
import Card from '@/components/ui/Card.vue'

const activeTags = ref([])

const filteredCards = computed(() => {
  if (!activeTags.value?.length) return projects
  return projects.filter((project) =>
    project?.tags.find((tag) => activeTags.value.find((tagt) => tag.id === tagt.id)),
  )
})
</script>
<style lang="stylus">
.projects
  padding 40px 0
  display block

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
</style>
