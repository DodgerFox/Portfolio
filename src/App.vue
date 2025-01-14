<template>
  <main>
    <!-- <DynamicBackground /> -->
    <Notifications />
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
    <p class="copyright">{{ $t('copyright') }}</p>
  </main>
</template>

<style scoped></style>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Notifications from '@/components/blocks/Notifications.vue'
// import DynamicBackground from '@/components/blocks/DynamicBackground.vue'
</script>
