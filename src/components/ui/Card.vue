<template>
  <a
    class="card"
    :href="card.link"
    :style="{ backgroundImage: `url('./src/assets/images/projects/${card.image}')` }"
    target="_blank"
  >
    <div class="card-tags">
      <!-- <div class="card-tag" :class="tag.color" v-for="tag in card.tags" :key="tag.id">
        <p>{{ tag.name[locale] }}</p>
      </div> -->
    </div>
    <div class="card__title">{{ card.title }}</div>
  </a>
</template>

<script setup lang="ts">
const { locale } = useI18n()
defineProps<{
  card: any
}>()
</script>

<style lang="stylus">
.card
  width 300px
  height 200px
  border-radius 30px
  background-color #DCFFD0
  display flex
  flex-direction column
  justify-content space-between
  align-items space-between
  padding 10px 20px
  padding-top 15px
  background-size cover
  background-position center
  &__title
    color #171717
    font-size 28px
    font-weight 700
  &-tags
    position relative
    display flex
    gap 10px
  &-tag
    height 30px
    padding 0 14px
    display flex
    align-items center
    border-radius 30px
    p
      color #171717
    &.orange
      background-color orange
    &.green
      background-color green
    &.blue
      background-color blue
</style>
