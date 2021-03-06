import Vue from 'vue'
import VueRouter from 'vue-router'
import LookingPage from '../components/LookingPage.vue'
import MainBanner from '../components/MainBanner.vue'
import Favourite from '../components/Favourite.vue'
import Card from '../components/Card.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/articles/:id',
    name: 'home',
    component: MainBanner,
  },
  {
    path:'/MainBanner',
    component:MainBanner,
  },
  {
    path:'/Favourite',
    component: Favourite,
  },
  {
    path:'/card',
    component:Card,
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: '/post/:id',
    name: 'post',
    component: LookingPage
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
