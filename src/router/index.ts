import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Welcome,
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/Projects.vue'),
    },
  ],
})

export default router
