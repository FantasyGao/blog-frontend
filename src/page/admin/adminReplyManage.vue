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
                  <button class="btn btn-default" type="button">评论人</button>
                </span>
                <input v-model="user" type="text" class="form-control" placeholder="Search for...">
              </div>
            </div>
            <div class="col-lg-3">
              <div class="input-group">
                <span class="input-group-btn">
                  <button class="btn btn-default" type="button">回复人</button>
                </span>
                <input v-model="replyUser" type="text" class="form-control" placeholder="Search for...">
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
              <th>发表日期</th>
              <th>状态</th>
              <th>评论人</th>
              <th>评论时间</th>
              <th>评论状态</th>
              <th>回复人</th>
              <th>回复时间</th>
              <th>回复状态</th>
              <th>操作</th>
            </tr>
            <tr slot="tbody" v-for="item in Data">
              <td>{{item.title}}</td>
              <td>{{item.time}}</td>
              <td v-if="item.show ==1" class="btn-success btn-xs">已发布</td>
              <td v-if="item.show ==0" class="btn-info btn-xs">已下线</td>
              <td>{{item.markUser}}</td>
              <td>{{item.markTime}}</td>
              <td v-if="item.markShow ==0" class="btn-info btn-xs">审核中</td>
              <td v-if="item.markShow ==1" class="btn-success  btn-xs">通过审核</td>
              <td>{{item.replyUser}}</td>
              <td>{{item.replyTime}}</td>
              <td v-if="item.replyShow ==0" class="btn-info btn-xs">审核中</td>
              <td v-if="item.replyShow ==1" class="btn-success  btn-xs">通过审核</td>
              <td>
                <button class="btn btn-info btn-xs">查看详情</button>
                <button v-if="item.replyShow ==1" @click = "downLine(item.id,item.markId,item.replyId)" class="btn btn-warning btn-xs">审核回复</button>
                <button v-if="item.replyShow ==0" @click = "upLine(item.id,item.markId,item.replyId)" class="btn btn-success btn-xs">通过审核</button>
                <button class="btn btn-danger btn-xs" @click = "deleteMark(item.id,item.markId,item.replyId)">删除</button>
              </td>
            </tr>
        </smartTable>
        </div>
    </div>
</template>

<script>
import smartTable from '../../components/smartTable.vue'
export default {
  data () {
    return {
      tableData: {
        'method': 'GET',
        'type': 'sync',
        'url': 'searchReplys',
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
      status: 2,
      title: '',
      classic: '',
      user: '',
      replyUser: ''
    }
  },
  components: {
    smartTable
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
        paramsObj.replyShow = this.status
      }
      if (this.user) {
        paramsObj.markUser = this.user
      }
      if (this.replyUser) {
        paramsObj.replyUser = this.replyUser
      }
      this.$refs.changeItem.fetchData(paramsObj)
    },
    downLine (id, markId, replyId) {
      this.$Modal.confirm({
        title: '回复审核',
        content: '<p>确认审核？</p>',
        okText: 'OK',
        loading: true,
        cancelText: 'Cancel',
        onOk: () => {
          this.axios.get('editReplyShow', {
            params: {
              id: id,
              markId: markId,
              replyId: replyId,
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
    upLine (id, markId, replyId) {
      this.$Modal.confirm({
        title: '回复审核',
        content: '<p>审核通过？</p>',
        okText: 'OK',
        loading: true,
        cancelText: 'Cancel',
        onOk: () => {
          this.axios.get('editReplyShow', {
            params: {
              id: id,
              markId: markId,
              replyId: replyId,
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
