import { createRouter, createWebHistory } from 'vue-router'
import Cookie from 'js-cookie'

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
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginPage.vue')
    }
  ]
})

router.beforeEach(async (to, from) => {
  const isAuthenticated = Cookie.get('token')

  if (
    // make sure the user is authenticated
    !isAuthenticated &&
    // ❗️ Avoid an infinite redirect
    to.name !== 'login' &&
    to.name !== 'Home'
  ) {
    // redirect the user to the login page
    return { name: 'login' }
  }
})

export default router
