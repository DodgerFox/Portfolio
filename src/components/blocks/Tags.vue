<template>
  <div class="tags">
    <TagComponent
      v-for="tag in filteredTags"
      :tag="tag"
      :key="tag.id"
      :class="{ active: isActive(tag) }"
      @click.stop="tagClickHandler(tag)"
    />
  </div>
</template>
<script setup lang="ts">
// @ts-nocheck
import TagComponent from '~/components/ui/Tag.vue'
import { Tag } from '~/types/Tag'
import { defineModels } from 'vue'

const props = defineProps<{
  // active: {
  //     type: Array,
  //     required: false,
  //     default: []
  // },
  showIcons: Boolean
  single: Boolean
  cut: Number
}>()

const { tags, active } = defineModels<{
  tags: Tag[]
  active: any
}>()

const emit = defineEmits<{
  (e: 'update:active'): void
  (e: 'clicked'): void
}>()

const filteredTags = computed(() => {
  let filtered = tags.value

  if (props.cut) filtered = filtered.slice(-props.cut)
  if (!props.showIcons)
    filtered = filtered.map((tag) => {
      return { ...tag, icon: null }
    })

  return filtered
})

function isActive(current: object) {
  return Array.isArray(active.value)
    ? active.value?.find((tag) => tag.id === current.id)
    : active.value?.id === current.id
}

function tagClickHandler(clicked: object) {
  emit('clicked', clicked)
  // console.log(props.active,'props.active');
  // console.log(props.active?.find(tag => tag.id === clicked.id),'find');
  // if (active.value)
  if (props.single) emit('update:active', [clicked])
  else if (active.value?.find((tag) => tag.id === clicked.id)) {
    active.value = active.value.filter((tag) => tag.id !== clicked.id)
    emit(
      'update:active',
      active.value.filter((tag) => tag.id !== clicked.id),
    )
  } else {
    active.value = active.value.concat([clicked])
    emit('update:active', active.value.concat([clicked]))
  }
}
</script>
<style lang="stylus">
.tags
  display flex
  flex-wrap wrap
  gap 10px
</style>
