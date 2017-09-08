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
                <input v-model="name" type="text" class="form-control" placeholder="Search for...">
              </div><!-- /input-group -->
            </div><!-- /.col-lg-6 -->
            <div class="col-lg-3">
              <div class="input-group">
                <span class="input-group-btn">
                  <button class="btn btn-default" type="button">邮箱</button>
                </span>
                <input v-model="email" type="text" class="form-control" placeholder="Search for...">
              </div>
            </div>
            <div class="col-lg-3">
              <div class="input-group">
                <span class="input-group-btn">
                  <button class="btn btn-default" type="button">备注</button>
                </span>
                <input v-model="remark" type="text" class="form-control" placeholder="Search for...">
              </div>
            </div>
            <div class="col-lg-3">
              <Button @click="search" type="primary">查找</Button>
            </div>
          </div>
        </div>
        <smartTable v-bind:get-message="tableData" v-on:receiveData="receiveData" ref="changeItem">
            <tr slot="thead">
              <th>用户名</th>
              <th>邮箱</th>
              <th>注册时间</th>
              <th>备注</th>
              <th>操作</th>
            </tr>
            <tr slot="tbody" v-for="item in Data">
              <td>{{item.user}}</td>
              <td>{{item.email}}</td>
              <td>{{item.time}}</td>
              <td>{{item.remark}}</td>
              <td>
                <button @click = "remarkForUser(item.id,item.user)" class="btn btn-info btn-xs">修改备注</button>
                <button class="btn btn-danger btn-xs" @click = "deleteUser(item.id,item.user)">删除</button>
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
        'url': 'printUser',
        'query': {}
      },
      Data: [],
      name: '',
      email: '',
      remark: '',
      remarkValue: ''
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
      if (this.name) {
        paramsObj.name = this.name
      }
      if (this.email) {
        paramsObj.email = this.email
      }
      if (this.remark) {
        paramsObj.remark = this.remark
      }
      this.$refs.changeItem.fetchData(paramsObj)
    },
    remarkForUser (id) {
      this.$Modal.confirm({
        render: (h) => {
          return h('Input', {
            props: {
              value: this.remarkValue,
              autofocus: true,
              placeholder: 'Please enter remark...'
            },
            on: {
              input: (val) => {
                this.remarkValue = val
              }
            }
          })
        },
        onOk: () => {
          this.axios.get('editRemark', {
            params: {
              id: id,
              remark: this.remarkValue
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
              title: '修改备注成功'
            })
          })
          .catch(data => {
            console.log('error')
          })
        }
      })
    },
    deleteUser (id, user) {
      this.$Modal.confirm({
        title: '删除用户',
        content: '<p>确认将<strong>' + user + '</strong>删除吗？</p>',
        okText: 'OK',
        loading: true,
        cancelText: 'Cancel',
        onOk: () => {
          this.axios.get('deleteUser', {
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
