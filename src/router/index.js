import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  mode: 'history',

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/lineas/:id',
      name: 'lineas',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LineasView.vue')
    },
    {
      path: '/trenes',
      name: 'trenes',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/TrenesView.vue')
    }
  ]
})

export default router
