import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Index from '@/views/Index'
import Book from '@/views/Book'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    name: 'home',
    component: Index,
    children: [
      {
        path: "home",
        meta: {title: '首页'},
        component: Home
      },
      {
        path: "book",
        meta: {title: '书云'},
        component: Book
      },

    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
