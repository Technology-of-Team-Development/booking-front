import { createRouter, createWebHistory } from 'vue-router'
import MapPage from '@/components/map/MapPage.vue'
import ReportPage from '@/components/report/ReportPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MapPage,
    },
    {
      path: '/report',
      name: 'report',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: ReportPage,
    },
  ],
})

export default router
