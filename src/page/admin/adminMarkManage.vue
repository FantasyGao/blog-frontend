<template>
    <div id="index">
        <div class="myContent">
        <div class="searchItem">
          <div class="row">
            <div class="col-lg-3">
              <div class="input-group">
                <span class="input-group-btn">
                  <button class="btn btn-default" type="button">标题</button>
                </span>
                <input v-model="title" type="text" class="form-control" placeholder="Search for...">
              </div><!-- /input-group -->
            </div><!-- /.col-lg-6 -->
            <div class="col-lg-3">
              <div class="input-group">
                <span class="input-group-btn">
                  <button class="btn btn-default" type="button">类别</button>
                </span>
                <input v-model="classic" type="text" class="form-control" placeholder="Search for...">
              </div>
            </div>
            <div class="col-lg-3">
              <div class="input-group">
                <span class="input-group-btn">
                  <button class="btn btn-default" type="button">评论人</button>
                </span>
                <input v-model="user" type="text" class="form-control" placeholder="Search for...">
              </div>
            </div>
            <div class="col-lg-2">
              <div class="input-group">
                <span class="input-group-btn">
                <Select v-model="status">
                    <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.value }}</Option>
                </Select>
                </span>
              </div>
            </div>
            <div class="col-lg-1">
              <Button @click="search" type="primary">查找</Button>
            </div>
          </div>
        </div>
        <smartTable v-bind:get-message="tableData" v-on:receiveData="receiveData" ref="changeItem">
            <tr slot="thead">
              <th>标题</th>
              <th>类别</th>
              <th>发表日期</th>
              <th>作者</th>
              <th>状态</th>
              <th>评论人</th>
              <th>邮箱</th>
              <th>评论时间</th>
              <th>评论状态</th>
              <th>操作</th>
            </tr>
            <tr slot="tbody" v-for="item in Data">
              <td>{{item.title}}</td>
              <td>{{item.classic}}</td>
              <td>{{item.time}}</td>
              <td>{{item.author}}</td>
              <td v-if="item.show ==1" class="btn-success btn-xs">已发布</td>
              <td v-if="item.show ==0" class="btn-info btn-xs">已下线</td>
              <td>{{item.markUser}}</td>
              <td>{{item.userEmail}}</td>
              <td>{{item.markTime}}</td>
              <td v-if="item.markShow ==0" class="btn-info btn-xs">审核中</td>
              <td v-if="item.markShow ==1" class="btn-success  btn-xs">通过审核</td>
              <td>
                <button class="btn btn-info btn-xs" @click="detail(item.id)">查看详情</button>
                <button v-if="item.markShow ==1" @click = "downLine(item.id,item.markId)" class="btn btn-warning btn-xs">审核评论</button>
                <button v-if="item.markShow ==0" @click = "upLine(item.id,item.markId)" class="btn btn-success btn-xs">通过审核</button>
                <button class="btn btn-danger btn-xs" @click = "deleteMark(item.id,item.markId)">删除</button>
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
        'url': 'searchMarks',
        'query': {}
      },
      Data: [],
      cityList: [
        {
          id: 2,
          value: '全部'
        },
        {
          id: 1,
          value: '通过审核'
        },
        {
          id: 0,
          value: '审核中'
        }
      ],
      status: 1,
      title: '',
      tag: '',
      classic: '',
      user: '',
      articleInfo: {},
      replyList: [],
      showModal: false
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
      if (this.status) {
        paramsObj.markShow = this.status
      }
      if (this.user) {
        paramsObj.markUser = this.user
      }
      if (this.classic) {
        paramsObj.classic = this.classic
      }
      this.$refs.changeItem.fetchData(paramsObj)
    },
    downLine (id, markId) {
      this.$Modal.confirm({
        title: '评论审核',
        content: '<p>确认审核？</p>',
        okText: 'OK',
        loading: true,
        cancelText: 'Cancel',
        onOk: () => {
          this.axios.get('editMarkShow', {
            params: {
              id: id,
              markId: markId,
              show: 0
            }
          })
          .then(data => {
            this.$Modal.remove()
            if (data.data.status !== 1) {
              this.$Message.warning(data.data.msg)
              return
            }
            this.$Notice.success({
              title: '评审开启'
            })
          })
          .catch(data => {
            console.log('error')
          })
        }
      })
    },
    upLine (id, markId) {
      this.$Modal.confirm({
        title: '评论审核',
        content: '<p>审核通过？</p>',
        okText: 'OK',
        loading: true,
        cancelText: 'Cancel',
        onOk: () => {
          this.axios.get('editMarkShow', {
            params: {
              id: id,
              markId: markId,
              show: 1
            }
          })
          .then(data => {
            this.$Modal.remove()
            if (data.data.status !== 1) {
              this.$Message.warning(data.data.msg)
              return
            }
            this.$Notice.success({
              title: '审核通过'
            })
          })
          .catch(data => {
            console.log('error')
          })
        }
      })
    },
    deleteMark (id, markId) {
      this.$Modal.confirm({
        title: '评论删除',
        content: '<p>确认将该评论删除吗？</p>',
        okText: 'OK',
        loading: true,
        cancelText: 'Cancel',
        onOk: () => {
          this.axios.get('deleteMark', {
            params: {
              id: id,
              markId: markId
            }
          })
          .then(data => {
            this.$Modal.remove()
            if (data.data.status !== 1) {
              this.$Message.warning(data.data.msg)
              return
            }
            this.$refs.changeItem.fetchData()
            this.$Notice.success({
              title: '删除成功'
            })
          })
          .catch(data => {
            console.log('error')
          })
        }
      })
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
</style>
