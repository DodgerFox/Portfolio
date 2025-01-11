<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <main>
    <transition name="fade">
      <RouterView />
    </transition>
  </main>
</template>

<style scoped></style>
