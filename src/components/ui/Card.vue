<template>
  <component
    :is="card.link ? 'a' : 'div'"
    class="card"
    :class="[card?.options, { noImage: !card.image, lightText: isDark }]"
    :href="card.link || undefined"
    :style="card.image ? { backgroundImage: `url('/images/projects/${card.image}')` } : undefined"
    :target="card.link ? '_blank' : undefined"
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
    <!-- SEO / accessibility image: visible to crawlers and screen readers (offscreen for layout) -->
    <img
      v-if="card.image"
      class="card-seo-img"
      :src="`/images/projects/${card.image}`"
      :alt="card.title || card.description || 'Project image'"
      loading="lazy"
    />
  </component>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { onMounted, ref, watch } from 'vue'

const { locale } = useI18n()
const props = defineProps<{
  card: any
}>()

const isDark = ref(false)

function analyzeImageBrightness(src: string) {
  if (!src) return
  const img = new Image()
  img.crossOrigin = 'Anonymous'
  img.src = src
  img.onload = () => {
    try {
      const w = 40
      const h = 40
      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.drawImage(img, 0, 0, w, h)
      const data = ctx.getImageData(0, 0, w, h).data
      let total = 0
      let count = 0
      // sample every 4th pixel to be fast
      for (let i = 0; i < data.length; i += 16) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        // luminance formula
        const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b
        total += lum
        count++
      }
      const avg = total / Math.max(1, count)
      // threshold tuned: below -> dark
      isDark.value = avg < 140
    } catch (e) {
      // if any error, fallback to false
      isDark.value = false
    }
  }
  img.onerror = () => {
    isDark.value = false
  }
}

onMounted(() => {
  if (typeof window === 'undefined') return
  if (props?.card?.image) {
    // images are served from /images/projects/
    analyzeImageBrightness(`/images/projects/${props.card.image}`)
  }
})

// watch for changes to card.image (if cards are dynamic)
watch(
  () => (props as any).card?.image,
  (val) => {
    if (val) analyzeImageBrightness(`/images/projects/${val}`)
  },
)
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
    flex-wrap wrap
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

  &.gazpromCoverFix
    background-size calc(100% + 10px) auto
    background-position center center

  &.noImage
    background linear-gradient(135deg, #21242b 0%, #121417 100%)
    border 1px solid #2b2f36
    .card-content
      opacity 1
      backdrop-filter none
      justify-content center
      align-items center
      text-align center
    .card-tags
    .card__description
      display none
    .card__title
      color #ffffff
      font-size 36px
      letter-spacing 0.5px

  .card-seo-img
    position absolute
    width 1px
    height 1px
    overflow hidden
    left -9999px
    top auto
    clip rect(1px, 1px, 1px, 1px)
    border 0
</style>
