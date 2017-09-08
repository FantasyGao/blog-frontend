<template>
    <div id="index">
        <div class="myContent">
        <div class="searchItem">
          <div class="row">
            <div class="col-lg-3">
              <div class="input-group">
                <span class="input-group-btn">
                  <button class="btn btn-default" type="button">文章名</button>
                </span>
                <input v-model="title" type="text" class="form-control" placeholder="Search for...">
              </div>
            </div>
            <div class="col-lg-3">
              <div class="input-group">
                <span class="input-group-btn">
                  <button class="btn btn-default" type="button">作者</button>
                </span>
                <input v-model="author" type="text" class="form-control" placeholder="Search for...">
              </div>
            </div>
            <div class="col-lg-1">
              <Button @click="search" type="primary">查找</Button>
            </div>
          </div>
        </div>
        <smartTable v-bind:get-message="tableData" v-on:receiveData="receiveData" ref="changeItem">
            <tr slot="thead">
              <th>文章名</th>
              <th>作者</th>
              <th>分类</th>
              <th>发表日期</th>
              <th>浏览量</th>
              <th>评论总数</th>
              <th>操作</th>
            </tr>
            <tr slot="tbody" v-for="item in Data">
              <td>{{item.title}}</td>
              <td>{{item.author}}</td>
              <td>{{item.classic}}</td>
              <td>{{item.time}}</td>
              <td>{{item.pv}}</td>
              <td>{{item.markNum}}</td>
              <td>
                <button class="btn btn-info btn-xs" @click ='detail(item.id)'>查看详情</button>
              </td>
            </tr>
        </smartTable>
        </div>
        <Modal
          v-model="showModal"
          width="800"
          :styles="{top: '20px'}"
          >
          <p slot="header" style="text-align:center">
              <Icon type="information-circled"></Icon>
              <span>详细信息</span>
          </p>
          <p slot="footer">
              <button class="btn btn-info btn-xs" @click="showModal=false"><span>关闭</span></button>  
          </p>
          <adminModel :articleInfo = 'articleInfo' :replyList='replyList'></adminModel>
        </Modal>
    </div>
</template>

<script>
import smartTable from '../../components/smartTable.vue'
import adminModel from '../../components/adminModel.vue'
export default {
  data () {
    return {
      tableData: {
        'method': 'GET',
        'type': 'sync',
        'url': 'searchAll',
        'query': {}
      },
      Data: [],
      title: '',
      author: '',
      showModal: false,
      articleInfo: '',
      replyList: []
    }
  },
  components: {
    smartTable,
    adminModel
  },
  methods: {
    receiveData (data) {
      this.Data = data
    },
    search () {
      let paramsObj = {}
      if (this.title) {
        paramsObj.title = this.title
      }
      if (this.author) {
        paramsObj.author = this.author
      }
      this.$refs.changeItem.fetchData(paramsObj)
    },
    detail (id) {
      this.axios('searchOne', {
        method: 'GET',
        params: {
          id: id
        }
      })
      .then(data => {
        if (data.data.status !== 1) {
          this.$Message.warning(data.data.msg)
          return
        }
        this.showModal = true
        this.articleInfo = data.data.data
        data.data.data.markList.forEach((item, i) => {
          this.replyList = this.replyList.concat(item.replyList)
        })
      })
      .catch(data => {
        console.log('error')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#index{
    background-color: #f5f5d5;
    font-family: Georgia, serif;
    letter-spacing: -0.01em;
    word-spacing: 0.2em;
    width: 100%;
    height:100%;
}
.myContent{
    width:90%;
    margin-left:5%;
    background:white;
    padding:50px;
}
.searchItem{
    height:50px;
}
.searchBtn{
    width:100%;
}
.Editor .v-note-wrapper {
    position: static;
}
</style>
