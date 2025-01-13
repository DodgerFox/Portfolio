<template>
  <a
    class="card"
    :class="card?.options"
    :href="card.link"
    :style="{ backgroundImage: `url('./src/assets/images/projects/${card.image}')` }"
    target="_blank"
  >
    <div class="card-content">
      <div class="card-tags">
        <div class="card-tag" :class="tag.color" v-for="tag in card.tags" :key="tag.id">
          <p>{{ tag.name[locale] }}</p>
        </div>
      </div>

      <div class="card-body">
        <div class="card__title">{{ card.title }}</div>
        <p class="card__description">{{ card.description }}</p>
      </div>
    </div>
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
  width 340px
  height 220px
  border-radius 30px
  background-color #DCFFD0
  display flex
  flex-direction column
  justify-content space-between
  align-items space-between
  background-size cover
  background-position center
  overflow hidden
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
    border 1px solid black
    p
      color #171717
    // &.orange
    //   background-color orange
    // &.green
    //   background-color green
    // &.blue
    //   background-color blue
  &-content
    height 100%
    opacity 0
    transition 0.3s all
    backdrop-filter blur(4px)
    display flex
    flex-direction column
    justify-content space-between
    padding 10px 20px
    padding-top 15px

  &__description
    color black

  &:hover
    .card-content
      opacity 1

  &.lightText
    .card__title
    .card__description
    .card-tag p
      color white !important
    .card-tag
      border-color white
</style>
