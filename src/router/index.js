import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Index from '@/views/Index'
import Book from '@/views/Book'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Calendar from '@/views/Calendar'
import Demo from '@/views/Demo'

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
        name: 'home1',
        meta: {title: '首页'},
        component: Home
      },
      {
        path: "book",
        name: "book",
        meta: {title: '书云'},
        component: Book
      },

    ]
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: Calendar,
  },
  {
    path: '/demo',
    name: 'demo',
    meta: {title: 'Demo'},
    component: Demo,
  },
  {
    path: '/login',
    name: 'login',
    meta: {title: '登录'},
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    meta: {title: '注册'},
    component: Register,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
