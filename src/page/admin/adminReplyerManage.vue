<template>
    <div id="index">
        <div class="myContent">
        <div class="searchItem">
          <div class="row">
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
              <th>回复用户</th>
              <th>回复时间</th>
              <th>回复文章</th>
              <th>文章状态</th>
              <th>评论用户</th>
              <th>评论状态</th>
              <th>回复状态</th>
              <th>操作</th>
            </tr>
            <tr slot="tbody" v-for="item in Data">
              <td>{{item.replyUser}}</td>
              <td>{{item.replyTime}}</td>
              <td>{{item.title}}</td>
              <td v-if="item.show ==1" class="btn-success btn-xs">已发布</td>
              <td v-if="item.show ==0" class="btn-info btn-xs">已下线</td>
              <td>{{item.markUser}}</td>
              <td v-if="item.markShow ==0" class="btn-info btn-xs">审核中</td>
              <td v-if="item.markShow ==1" class="btn-success  btn-xs">通过审核</td>
              <td v-if="item.replyShow ==0" class="btn-info btn-xs">审核中</td>
              <td v-if="item.replyShow ==1" class="btn-success  btn-xs">通过审核</td>
              <td>
                <button class="btn btn-info btn-xs">查看详情</button>
                <button v-if="item.attention==0" @click = "addAttion(item.id,item.title,item.email,item.replyUser,item.replyTime,item.replyContent)" class="btn btn-success btn-xs">添加关注</button>
                <button v-if="item.attention ==1" @click = "deleteAttion(item.id,item.replyUser)" class="btn btn-danger btn-xs">取消关注</button>
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
        'url': 'searchReplyers',
        'query': {}
      },
      Data: [],
      cityList: [
        {
          id: 1,
          value: '全部'
        },
        {
          id: 2,
          value: '已发表'
        },
        {
          id: 3,
          value: '已下线'
        }
      ],
      status: 1,
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
        paramsObj.show = this.show
      }
      if (this.user) {
        paramsObj.markUser = this.user
      }
      if (this.classic) {
        paramsObj.classic = this.classic
      }
      this.$refs.changeItem.fetchData(paramsObj)
    },
    addAttion (id, title, email, User, Time, Content) {
      this.$Modal.confirm({
        title: '添加为联系人',
        content: '<p>确认添加？</p>',
        okText: 'OK',
        loading: true,
        cancelText: 'Cancel',
        onOk: () => {
          this.axios('addAttentionUser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            data: {
              id: id,
              title: title,
              user: User,
              email: email,
              nearTime: Time,
              ParticipatinComments: Content
            }
          })
          .then(data => {
            this.$Modal.remove()
            if (data.data.status !== 1) {
              this.$Message.warning(data.data.msg)
              return
            }
            this.$Notice.success({
              title: '添加成功'
            })
          })
          .catch(data => {
            console.log('error')
          })
        }
      })
    },
    deleteAttion (id, markUser) {
      this.$Modal.confirm({
        title: '删除关注',
        content: '<p>确认移除关注？</p>',
        okText: 'OK',
        loading: true,
        cancelText: 'Cancel',
        onOk: () => {
          this.axios('addAttentionUser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            data: {
              id: id,
              user: markUser
            }
          })
          .then(data => {
            this.$Modal.remove()
            if (data.data.status !== 1) {
              this.$Message.warning(data.data.msg)
              return
            }
            this.$Notice.success({
              title: '移除成功'
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
