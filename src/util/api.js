import http from './axios'

// index页的数据获取
const GET_INDEXPAGE_MESSAGE_API = 'indexPage'
// tag页的数据获取
const GET_TAGPAGE_MESSAGE_API = 'searchTag?tag='
// 分类页数据获取
const GET_CLASSIC_MESSAGE_API = 'searchClassic?classic='
// 文章
const GET_ARTICLEINFO_MESSAGE_API = 'searchOne?&id='

export default {
  getIndexList (callback) {
    http(GET_INDEXPAGE_MESSAGE_API)
    .then((res) => {
      if (res.data.status === 1) {
        let data = res.data.data
        callback(data)
      } else {
        console.log(res.data)
      }
    }).catch((e) => {
      console.log('error')
    })
  },
  getTagList (payload, callback) {
    http(GET_TAGPAGE_MESSAGE_API + payload.params)
    .then((res) => {
      if (res.data.status === 1) {
        let data = res.data.data
        callback(data)
      } else {
        console.log(res.data)
      }
    }).catch((e) => {
      console.log('error')
    })
  },
  getClassicList (payload, callback) {
    http(GET_CLASSIC_MESSAGE_API + payload.params)
    .then((res) => {
      if (res.data.status === 1) {
        let data = res.data.data
        callback(data)
      } else {
        console.log(res.data)
      }
    }).catch((e) => {
      console.log('error')
    })
  },
  getArticleList (payload, callback) {
    http(GET_ARTICLEINFO_MESSAGE_API + payload.params)
    .then((res) => {
      if (res.data.status === 1) {
        let data = res.data.data
        callback(data)
      } else {
        console.log(res.data)
      }
    }).catch((e) => {
      console.log('error')
    })
  }
}
