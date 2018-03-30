import Vue from 'vue'
import VueRouter from 'vue-router'
// import VueResource from 'vue-resource'
import axios from 'axios'
// import { sync } from 'vuex-router-sync'

import App from './app-components.vue'
// import lazy from 'vue-lazy-component'
import XyPopup from 'tools/vue-popup/main'
import tip from 'tools/tip/main'
import { getCookie } from 'tools/client'
import 'core-js/fn/promise'
import store from 'Store/demo'

import Index from './views/index.vue'
import Drag from './views/drag.vue'
import Its from './views/its.vue'
import NotFound from 'Views/404.vue'

// 此处注册后可全局直接引入
import Global from 'components/ui/global.vue'
import Button from '@/components/global/button/normal'
import Collapse from '@/components/global/collapse/normal'
import Switch from '@/components/global/switch/normal'
import Slider from '@/components/global/slider/normal'
import InputCheckbox from '@/components/global/input/checkbox'
import InputRadio from '@/components/global/input/radio'
import InputText from '@/components/global/input/text'
import Search from '@/components/global/search/normal'
import Select from '@/components/global/select/normal'
import SelectInput from '@/components/global/select/input'

Vue.component('el-global', Global)

Vue.component('global-btn', Button)
Vue.component('global-collapse', Collapse)
Vue.component('global-switch', Switch)
Vue.component('global-slider', Slider)
Vue.component('global-checkbox', InputCheckbox)
Vue.component('global-radio', InputRadio)
Vue.component('global-text', InputText)
Vue.component('global-search', Search)
Vue.component('global-select', Select)
Vue.component('global-select-input', SelectInput)

Vue.use(VueRouter)
Vue.use(XyPopup)
Vue.use(tip)
// Vue.use(VueResource)
Vue.prototype.$http = axios
// Vue.use(lazy)

const routes = [
  {
    path: '/components',
    name: 'components',
    component: Index,
    meta: {
      user: true
    }
  },
  {
    path: '/components/drag',
    name: 'drag',
    component: Drag,
    meta: {
      user: true
    }
  },
  {
    path: '/components/its',
    name: 'its',
    component: Its,
    meta: {
      user: true
    }
  },
  {
    path: '/login',
    name: 'login'
  },
  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach(({meta, path}, from, next) => {
  let sessionId = getCookie('session')
  if (!!sessionId || !meta.user) {
    return next()
  } else {
    window.location.href = 'index.html#/login'
  }
})

module.exports = new Vue({
  el: '#page-components',
  router,
  store,
  ...App
})
