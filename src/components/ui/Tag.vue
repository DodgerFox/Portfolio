<template>
  <div class="tag" :class="tag.color">
    <!-- <inline-svg 
            v-if="tag.icon" 
            :src="`./src/assets/icon/${tag.icon}.svg`" 
            :size="24"
            :width="24"
            :height="24"
        /> -->
    <p v-if="tag.name">{{ tag.name[locale] }}</p>
  </div>
</template>
<script setup lang="ts">
const { locale } = useI18n()
defineProps<{
  tag: any
}>()
</script>
<style lang="stylus">
.tag
  padding 8px 10px
  border-radius 8px
  border 1px solid $second
  display flex
  align-items center
  gap 5px
  cursor pointer
  t()
  p
    color $second
    font-weight 500

  &.active
    background-color $second
    p
    svg
      color $main
</style>
