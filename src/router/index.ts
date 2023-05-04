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

// beforeEach é uma função/hook que será executado antes de cada rota iniciar. O primeiro argumento é a rota de destino e o segundo a rota de origem.
router.beforeEach(async (to, from) => {
  const isAuthenticated = Cookie.get('token')

  if (
    // essa condição pede que o usuario seja autenticado e verifica se a rota de destino não é a página de login e nem a página inicial. Se essa condição for atendida, significa que o usuário não está autenticado e está tentando acessar uma página que requer autenticação.
    // make sure the user is authenticated
    !isAuthenticated &&
    // ❗️ Avoid an infinite redirect
    to.name !== 'login' &&
    to.name !== 'Home'
  ) {
    // redirect the user to the login page
    // se o usuário tentar acessar uma rota que não seja a Home ou a página de login ele é direcionado para a página de login.
    return { name: 'login' }
  }
})

export default router
