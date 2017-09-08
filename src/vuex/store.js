import Vuex from 'vuex'
import Vue from 'vue'

import * as types from './type.js'
import * as actions from './actions.js'
import mutations from './mutations.js'

import 'babel-polyfill'

Vue.use(Vuex)

const state = {
  isPC: true,
  token: null,
  indexPageList: {},
  articleInfo: {}
}

const store = new Vuex.Store({
  state,
  actions,
  mutations
})
store.subscribe((mutation, state) => {
  // console.log(mutation.type)
  // console.log(mutation.payload)
})
store.dispatch(types.JUDGE_PC)

export default store
