// axios——设置请求
import Vue from 'vue'
import axios from 'axios'
import store from '../vuex/store.js'
import myApp from '../main.js'

import iView from 'iview'
Vue.use(iView)

import * as types from '../vuex/type.js'

const http = axios.create({
  baseURL: 'http://localhost:7002/api',
  timeout: 8000,
  data: {},
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
})
// 请求前
http.interceptors.request.use(
  config => {
    let token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  })
// 请求后
http.interceptors.response.use(
    response => {
      return response
    },
    error => {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            // 401 清除token信息并跳转到登录页面
            iView.Notice.warning({
              title: '登录超时'
            })
            store.commit(types.LOG_OUT)
            myApp.$router.replace('/admin/login')
        }
      }
      return Promise.reject(error)
    })

export default http
