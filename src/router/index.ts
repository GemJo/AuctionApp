import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auction',
      name: 'auction',
      alias: '/',
      component: () => import('@/views/AuctionView.vue'),
    }
  ]
})

export default router
