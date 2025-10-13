import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LicenseView from '../views/LicenseView.vue'

const routes = [
  { path: '/', component: HomeView },

  { path: '/about', component: AboutView },
 
  { path: '/license', component: LicenseView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
