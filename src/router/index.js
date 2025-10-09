import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import IconsView from '../views/IconsView.vue'
import DocsView from '../views/DocsView.vue'
import AboutView from '../views/AboutView.vue'
import ContributeView from '../views/ContributeView.vue'
import LicenseView from '../views/LicenseView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/icons', component: IconsView },
  { path: '/docs', component: DocsView },
  { path: '/about', component: AboutView },
  { path: '/contribute', component: ContributeView },
  { path: '/license', component: LicenseView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
