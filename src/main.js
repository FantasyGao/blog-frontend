// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store.js'
import iView from 'iview'
import 'iview/dist/styles/iview.css'   // 使用 CSS

import axios from './util/axios.js'
import 'babel-polyfill'

Vue.use(iView)

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  if (to.meta.auth) {
    if (!token) {
      next('/admin/login')
    } else {
      next()
    }
  } else {
    next()
  }
})
// 将axios挂载到prototype上，在组件中可以直接使用this.axios访问
Vue.prototype.axios = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
const myApp = new Vue({
  el: '#app',
  router,
  store,
  axios,
  template: '<App/>',
  components: { App }
})
export default myApp
