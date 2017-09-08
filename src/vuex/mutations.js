import * as types from './type'

export default {
  [types.JUDGE_PC] (state, flag) {
    state.isPC = flag
  },
  [types.SET_TOKEN] (state, data) {
    localStorage.setItem('token', data.token)
    state.token = data
  },
  [types.LOG_OUT] (state) {
    localStorage.removeItem('token')
    state.token = ''
  },
  [types.GET_LIST] (state, data) {
    state.indexPageList = data.message
  },
  [types.GET_ARTICLE_INFO] (state, data) {
    state.articleInfo = data.message
  }
}
