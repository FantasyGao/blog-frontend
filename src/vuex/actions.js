import * as types from './type.js'
import API from '../util/api.js'

export const judgeisPC = ({commit}) => {
  var userAgentInfo = navigator.userAgent
  var Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
  var flag = true
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false
      break
    }
  }
  commit(types.JUDGE_PC, flag)
}

export const setToken = ({commit}, data) => {
  commit(types.SET_TOKEN, data)
}

export const logOut = ({commit}) => {
  commit(types.LOG_OUT)
}
// index页面数据
export const getIndexList = ({commit}) => {
  API.getIndexList(message => {
    commit(types.GET_LIST, {
      message
    })
  })
}
// Tag页面数据
export const getTagList = ({commit}, payload) => {
  API.getTagList(payload, message => {
    commit(types.GET_LIST, {
      message
    })
  })
}
// class页面数据
export const getClassicList = ({commit}, payload) => {
  API.getClassicList(payload, message => {
    commit(types.GET_LIST, {
      message
    })
  })
}
// 详细内容页面数据
export const getArticleList = ({commit}, payload) => {
  API.getArticleList(payload, message => {
    commit(types.GET_ARTICLE_INFO, {
      message
    })
  })
}
