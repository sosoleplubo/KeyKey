import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/regles',
      name: 'rules',
      component: () => import('@/views/RulesView.vue'),
    },
    {
      path: '/lore',
      name: 'lore',
      component: () => import('@/views/LoreView.vue'),
    },
    {
      path: '/classement',
      name: 'leaderboard',
      component: () => import('@/views/LeaderboardView.vue'),
    },
    {
      path: '/actualites',
      name: 'news',
      component: () => import('@/views/NewsView.vue'),
    },
    {
      path: '/actualites/:slug',
      name: 'news-detail',
      component: () => import('@/views/NewsDetailView.vue'),
    },
    {
      path: '/royaumes',
      name: 'kingdoms',
      component: () => import('@/views/KingdomsView.vue'),
    },
    {
      path: '/royaumes/:slug',
      name: 'kingdom-detail',
      component: () => import('@/views/KingdomDetailView.vue'),
    },
    {
      path: '/galerie',
      name: 'gallery',
      component: () => import('@/views/GalleryView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
})

export default router
