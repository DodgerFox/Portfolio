<template>
  <div class="notifications">
    <div class="notifications-left" v-if="errors?.length">
      <transition name="fade" v-for="(error, index) in errors" :key="index">
        <div class="notifications-container error">
          <!-- <div class="icon-close" @click="$store.dispatch('deleteError', error)"></div> -->
          <p>{{ error.message }}</p>
        </div>
      </transition>
    </div>
    <div class="notifications-right" v-if="notifications?.length">
      <transition name="fade" v-for="(notification, index) in notifications" :key="index">
        <div class="notifications-container">
          <div class="icon-close" @click="deleteNotification(notification)"></div>
          <p v-html="notification.message"></p>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
const notificationsStore = NotificationsStore()
const { notifications, errors } = storeToRefs(notificationsStore)

function deleteNotification(notification) {
  notificationsStore.deleteNotification(notification)
}
</script>
<style lang="stylus">
.notifications
  position fixed
  right 0
  top 0
  left 0
  bottom 0
  pointer-events none
  z-index 20

  &-left
    position absolute
    left 0
    bottom 10px
    padding 30px
  &-right
    position absolute
    right 0
    bottom 10px
    padding 30px
  &-container
    width 300px
    padding 25px
    pointer-events all
    border-radius 15px
    background-color white
    color black
    font-size 14px
    font-weight 500
    line-height 20px
    margin-top 6px
    transition opacity 0.5s
    animation fadeinup 0.3s linear
    position relative
    &.error
      background-color #fb3434c9
      box-shadow 0 0 18px #fb3434c9
      color white
    span
      font-size 16px

    &__title
      font-size 12px
      margin-bottom 10px
      color $blue
</style>
