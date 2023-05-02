import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/customer',
      name: 'customer',
      component: () => import('../views/CustomerInteractions.vue')
    },
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/LoginPage.vue')
    }
  ]
})

export default router
