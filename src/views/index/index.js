import Vue from 'vue'
import VueRouter from 'vue-router'
// import VueResource from 'vue-resource'
import axios from 'axios'
// import { sync } from 'vuex-router-sync' // 同步vuex与路由的状态

import {getCookie} from 'tools/client'

import App from './app-index.vue'
import 'core-js/fn/promise'
import store from 'Store/index'

import Index from '@/views/index/index.vue'
import Login from '@/components/login.vue'
import NotFound from '@/views/404.vue'

Vue.use(VueRouter)
// Vue.use(VueResource)
Vue.prototype.$http = axios

const routes = [
  {
    path: '/',
    component: Index,
    name: 'index',
    meta: {
      user: true
    }
  }, {
    path: '/login',
    component: Login,
    name: 'login',
    meta: {
      user: false
    }
  }, {
    path: '*',
    component: NotFound,
    meta: {
      user: false
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach(({meta, path}, from, next) => {
  let sessionId = getCookie('session')
  if (sessionId) {
    return next()
  } else if (meta.user && path !== '/login') {
    return next({path: '/login'})
  }
  next()
})

module.exports = new Vue({
  el: '#page-home',
  router,
  store,
  ...App
})
