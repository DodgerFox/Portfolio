<template>
  <secion class="projects">
    <div class="wrap">
      <h1>Projects</h1>
      <Tags v-model:tags="tags" :active="[]" />
      <div class="projects-body">
        <Card v-for="project in projects" :key="project.id" :card="project" />
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
    .tag
      padding 4px 8px
      // border 1px solid green
      border-radius 25px
      p
        font-size 16px
        color white

h1
  font-size 90px
  color white
  font-family Roboto
  font-weight 900
  text-transform uppercase
  letter-spacing 22px
  line-height 75px
</style>
