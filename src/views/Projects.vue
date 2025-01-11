<template>
  <secion class="projects">
    <div class="wrap">
      <h1>Projects</h1>
      <Tags v-model:tags="tags" :active="[]" />
      <!-- @clicked="tagsHandler" -->
    </div>
  </secion>
</template>
<script setup lang="ts">
import tags from '@/data/tags.json'
import Tags from '@/components/blocks/Tags.vue'
</script>
<style lang="stylus">
.projects
  padding 40px 0
  display block

h1
  font-size 90px
  color white
  font-family Roboto
  font-weight 900
  text-transform uppercase
  letter-spacing 22px
  line-height 75px
</style>
