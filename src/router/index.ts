import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/customer',
      name: 'customer',
      component: () => import('../views/CustomerInteractions.vue')
    }
  ]
})

export default router
