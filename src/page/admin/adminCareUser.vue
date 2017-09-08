<template>
    <div id="index">
        <div class="myContent">
        <div class="searchItem">
          <div class="row">
            <div class="col-lg-3">
              <div class="input-group">
                <span class="input-group-btn">
                  <button class="btn btn-default" type="button">用户名</button>
                </span>
                <input v-model="user" type="text" class="form-control" placeholder="Search for...">
              </div><!-- /input-group -->
            </div><!-- /.col-lg-6 -->
            <div class="col-lg-1">
              <Button @click="search" type="primary">查找</Button>
            </div>
          </div>
        </div>
        <smartTable v-bind:get-message="tableData" v-on:receiveData="receiveData" ref="changeItem">
            <tr slot="thead">
              <th>用户名</th>
              <th>邮箱</th>
              <th>最近上线时间</th>
              <th>最近参与文章</th>
              <th>参与的评论信息</th>
              <th>操作</th>
            </tr>
            <tr slot="tbody" v-for="item in Data">
              <td>{{item.user}}</td>
              <td>{{item.email}}</td>
              <td>{{item.nearTime}}</td>
              <td>{{item.title}}</td>
              <td>{{item.ParticipatinComments}}</td>
              <td>
                <button class="btn btn-info btn-xs">查看详情</button>
                <button class="btn btn-danger btn-xs" @click = "deleteUser(item._id)">移除关注</button>
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
        'url': 'printConcernedUser',
        'query': {}
      },
      Data: [],
      user: ''
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
      if (this.user) {
        paramsObj.user = this.user
      }
      this.$refs.changeItem.fetchData(paramsObj)
    },
    deleteUser (id) {
      this.$Modal.confirm({
        title: '评论删除',
        content: '<p>确认将该评论删除吗？</p>',
        okText: 'OK',
        loading: true,
        cancelText: 'Cancel',
        onOk: () => {
          this.axios.get('deleteConcernedUser', {
            params: {
              id: id
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
