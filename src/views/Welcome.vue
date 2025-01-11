<template>
  <secion class="welcome">
    <div class="wrap">
      <div class="welcome-blocks">
        <div class="welcome-block welcome-profile">
          <div class="welcome-header">
            <div class="button">
              <p>About</p>
            </div>
            <div class="welcome-tools">
              <div class="welcome-tool">
                <inline-svg src="./src/assets/icons/share.svg" />
              </div>
              <div class="welcome-tool">
                <inline-svg src="./src/assets/icons/globe.svg" />
              </div>
            </div>
          </div>
          <div class="welcome-profile__avatar">
            <img src="@/assets/images/avatar.png" alt="" srcset="" />
          </div>
          <div class="welcome-content">
            <h2 class="welcome-content__title">I'm Alexey Chernov</h2>
            <h3 class="welcome-content__text">Designer & Full-stack</h3>
          </div>
        </div>
        <div class="welcome-links">
          <h1 class="welcome-title">Portfolio</h1>
          <div class="welcome-blocks">
            <router-link to="projects" class="welcome-block clickable">
              <div class="welcome-stat__title">272</div>
              <div class="welcome-stat__text">Projects</div>
            </router-link>
            <div class="welcome-block clickable">
              <div class="welcome-stat__title">69</div>
              <div class="welcome-stat__text">Clients</div>
            </div>
            <div class="welcome-block clickable">
              <div class="welcome-stat__title">75</div>
              <div class="welcome-stat__text">Skills</div>
            </div>
            <div class="welcome-block socials">
              <div class="socials-item telegram">
                <inline-svg src="./src/assets/icons/socials/telegram.svg" width="45" />
              </div>
              <div class="socials-item whatsapp">
                <inline-svg src="./src/assets/icons/socials/whatsapp.svg" width="45" />
              </div>
              <div class="socials-item gmail">
                <inline-svg src="./src/assets/icons/socials/gmail.svg" width="45" />
              </div>
              <div class="socials-item github">
                <inline-svg src="./src/assets/icons/socials/github.svg" width="45" />
              </div>
              <!-- <div class="welcome-stat__title">272</div>
              <div class="welcome-stat__text">Projects</div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </secion>
</template>
<script setup lang="ts">
import InlineSvg from 'vue-inline-svg'
</script>
<style lang="stylus">
.welcome
  width 100%
  height 100vh
  display flex
  align-items center
  background-color #171717
  .wrap
    display flex
    align-items center

  &-blocks
    display flex
    width 100%
    gap 40px

  &-block
    border-radius 30px
    padding 20px
    background-color #DCFFD0
    min-width 100px
    width calc(50% - 20px)
    display block
    &.clickable
      transition 0.3s transform
      cursor pointer
      &:hover
        transform scale(1.05)
    &.socials
      display flex
      flex-wrap wrap
      gap 10px
      padding 0
      background-color transparent
      .socials-item
        width calc(50% - 5px)
        height calc(50% - 5px)
        display flex
        align-items center
        justify-content center
        border-radius 20px
        transition 0.3s transform
        cursor pointer
        &:hover
          transform scale(1.05)
        &.telegram
          background-color #37AEE2
        &.whatsapp
          background-color #25D366
        &.gmail
          background-color #000000
        &.github
          background-color #272727

  &-profile
    height 550px
    width 35%
    display flex
    flex-direction column
    align-items center
    justify-content space-between
    padding-bottom 30px
    img
      max-width 100%

    &__avatar
      border-radius 50%
      overflow hidden
      background-color #171717
      width 300px
      height 300px
      display flex
      align-items center

  &-title
    font-size 90px
    color white
    font-family Roboto
    font-weight 900
    text-transform uppercase
    letter-spacing 22px
    line-height 75px

  &-header
    width 100%
    display flex
    justify-content space-between

  &-tools
    display flex
    gap 10px

  &-tool
    display flex
    align-items center
    justify-content center
    background-color #171717
    width 50px
    height 50px
    border-radius 50%
    svg
      color white

  &-content
    &__title
      font-size 32px
      font-weight 700
    &__text
      font-size 22px
      font-weight 600

  &-links
    display flex
    flex-direction column
    gap 40px
    width 65%
    .welcome-blocks
      flex-wrap wrap
      flex 1

  &-stat
    &__title
      font-size 68px
      font-weight 900
      color black
      // font-family Roboto
    &__text
      font-size 28px
      font-weight 600
      color black
</style>
