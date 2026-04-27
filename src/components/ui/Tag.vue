<template>
  <div class="tag" :class="tag.color">
    <!-- <inline-svg 
            v-if="tag.icon" 
            :src="`./src/assets/icon/${tag.icon}.svg`" 
            :size="24"
            :width="24"
            :height="24"
        /> -->
    <p v-if="tag.name">{{ tag.name[localeKey] }}</p>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import type { Tag } from '@/types/Tag'
import { LOCALES } from '@/types/environment'

const { locale } = useI18n()
const localeKey = computed(() => locale.value as LOCALES)
defineProps<{
  tag: Tag
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
