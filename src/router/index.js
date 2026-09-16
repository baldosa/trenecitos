import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  mode: 'history',

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/trenes',
      name: 'trenes',
      component: () => import('../views/TrenesView.vue')
    },
    {
      path: '/lineas/:id',
      name: 'linea',
      component: () => import('../views/LineView.vue')
    },
    {
      path: '/lineas/:id/ramales/:ramalId',
      name: 'ramal',
      component: () => import('../views/RamalView.vue')
    },
    {
      path: '/docs',
      name: 'docs',
      component: () => import('../views/DocsView.vue')
    }
  ]
})

export default router
