import Vue from 'vue'
import VueRouter from 'vue-router'
// import coreRoutes from '../BubotCore/router/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../components/Auth')
  },
  // {
  //   path: '/login',
  //   component: () => import('../views/Login/Login')
  // },
  // {
  //   path: '/logout',
  //   component: () => import('../views/Login/Logout')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
