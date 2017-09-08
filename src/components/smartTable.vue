<template>
    <div class="smartTable">
        <div class="head">
          <div class="selset">
            <span>每页展示</span>
            <select v-model="selectedPageNum" v-on:change="chooosePageNum(selectedPageNum)">
              <option v-for="pageNum in pageNumList" v-bind:value="pageNum.num">{{pageNum.num}}</option>
            </select>
            <span>条</span>
          </div>
          <div class="search">
            <input type="text" v-model="searchKey"  placeholder="输入查找">
          </div>
        </div>
        <div>
          <table class="table">
            <thead>
                <slot name="thead"></slot>
            </thead>
            <tbody>
                <slot name="tbody"></slot>
            </tbody>
          </table>
        </div>
        <div class="foot">
          <div class="count">
            <span>共计</span>{{total}}<span>条</span>
          </div>
          <div class="pagination">
              <ul>
                <li><span class="disabled firstPage"  v-if="disabled[0]">首页</span></li>
                <li><span class="disabled"  v-if="disabled[0]">上一页</span></li>
                <li><span class="firstPage" @click="chooosePage(1)" v-if="!disabled[0]">首页</span></li>
                <li><span @click="chooosePage(currentPage-1)" v-if="!disabled[0]">上一页</span></li>
                <li><span v-if="showToggle[0]">...</span></li>
                <li v-for="page in pageList">
                   <span @click="chooosePage(page.num)" v-bind:class="{ 'active':page.clicked }">{{page.num}}</span>
                </li>
                <li><span v-if="showToggle[1]">...</span></li>
                <li><span @click="chooosePage(currentPage+1)" v-if="disabled[1]">下一页</span></li>
                <li><span class="lastPage" @click="chooosePage(maxPage)" v-if="disabled[1]">末页</span></li>
                <li><span class="disabled" v-if="!disabled[1]">下一页</span></li>
                <li><span class="disabled lastPage" v-if="!disabled[1]">末页</span></li>
              </ul>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      total: 0,
      searchKey: '',
      disabled: [],
      showToggle: [],
      pageNumList: [
        {num: 10},
        {num: 20},
        {num: 50}
      ],
      selectedPageNum: 10,
      pageList: [],
      currentPage: 1,
      maxPage: 0,
      resultData: [],
      initData: [],
      query: {}
    }
  },
  props: ['getMessage'],
  methods: {
    // 向父组件发送数据
    sendData (data) {
      this.$emit('receiveData', data)
    },
    // 选择页码
    chooosePage (currentPage) {
      this.currentPage = currentPage
      if (this.getMessage.type === 'async') {
        this.fetchData()
      } else {
        this.ProcessData()
      }
    },
    // 选择分页大小
    chooosePageNum (currentPageNum) {
      this.currentPage = 1
      if (this.getMessage.type === 'async') {
        this.fetchData()
      } else {
        this.ProcessData()
      }
    },
    doPagination (currentPage) {
      this.currentPage = currentPage
      // 判断左右翻页是否可用
      if (this.maxPage !== 1) {
        if (currentPage === 1) {
          this.disabled = [true, true]
        } else if (currentPage === this.maxPage) {
          this.disabled = [false, false]
        } else {
          this.disabled = [false, true]
        }
      } else {
        this.disabled = [true, false]
      }
      // 根据最大值页码判断页尾展示
      if (this.maxPage > 7) {
        if (currentPage <= 4) {
          this.showToggle = [false, true]
          this.pageList = this.printPageList(6, currentPage - 1, 1)
        } else if (currentPage > this.maxPage - 4) {
          this.showToggle = [true, false]
          this.pageList = this.printPageList(6, currentPage - this.maxPage + 5, this.maxPage - 5)
        } else {
          this.showToggle = [true, true]
          this.pageList = this.printPageList(5, 2, currentPage - 2)
        }
      } else {
        this.showToggle = [false, false]
        this.pageList = this.printPageList(this.maxPage, currentPage - 1, 1)
      }
    },
    // 生产页码
    printPageList (x, y, z) {
      let List = []
      for (let i = 0; i < x; i++) {
        List[i] = {}
        List[i]['num'] = i + z
        if (i === y) {
          List[i]['clicked'] = true
        } else {
          List[i]['clicked'] = false
        }
      }
      return List
    },
    ProcessData () {
      if (this.total % this.selectedPageNum > 0) {
        this.maxPage = Math.ceil(this.total / this.selectedPageNum)
      } else {
        this.maxPage = this.total / this.selectedPageNum
      }
      this.doPagination(this.currentPage)
      // 默认同步方式发送数据
      if (this.getMessage.type === 'async') {
        this.sendData(this.resultData)     // 发送数据
      } else {
        let page = this.currentPage - 1
        this.sendData(this.resultData.slice(page * this.selectedPageNum, this.selectedPageNum * this.currentPage))
      }
    },
    // 查询信息
    fetchData (paramsObj) {
      if (paramsObj) {
        this.currentPage = 1
        this.query = paramsObj
      }
      if (!this.getMessage.query) {
        this.query = this.getMessage.query
      }
      // 默认同步
      if (this.getMessage.type === 'async') {
        this.query.pageNum = this.selectedPageNum
        this.query.searchKey = this.searchKey
        this.query.page = this.currentPage
      }

      let requestHead = {
        'method': this.getMessage.method,
        'url': this.getMessage.url
      }
      // 默认get方式
      if (this.getMessage.method === 'POST' || this.getMessage.method === 'post') {
        requestHead.data = this.query
      } else {
        requestHead.params = this.query
      }
      this.axios(requestHead)
      .then((response) => {
        this.total = response.data.data.count
        this.resultData = response.data.data.list
        this.initData = response.data.data.list
        this.ProcessData()
      }, (err) => {
        console.log(err)
      })
    }
  },
  watch: {
    searchKey (val, oldval) {
      if (this.getMessage.type === 'async') {
        this.fetchData()
      } else {
        let searchRegex = new RegExp(val, 'i')
        let arr = []
        let items = this.initData
        let count = this.initData.length
        for (let i = 0; i < count; i++) {
          let flag = true
          for (let key in items[i]) {
            if (flag && searchRegex.test(items[i][key])) {
              arr.push(items[i])
              flag = false
            }
          }
        }
        this.total = arr.length
        this.resultData = arr
        this.ProcessData()
      }
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.smartTable {
  font-family:'Times New Roman';
  .head {
    margin-bottom:20px;
    font-size:14px;
    height:25px;
    position:relative;
    .selset select{
      width:50px;
      height:30px;
      border-radius:5px;
      margin-right:5px; 
    }
    .search{
      position:absolute;
      top:0;
      right:0;
      input{
        border:1px solid #dddddd;
        width:200px;
        height:30px;  
        border-radius:3px;
        padding-left: 5px;
      }
    }
  }
  .table{
    width: 100%;
    max-width: 100%;
    border-collapse: collapse;
    thead > tr > th,
    tbody > tr > td {
        padding: 6px;
        vertical-align: inherit;
        border: 1px solid #ddd;
        text-align:center;
    }
  }
  .foot{
    position:relative;
    height:30px;
    .count{
      font-size:14px;
    }
    .pagination{
      position:absolute;
      top:0;
      right:0;
      margin: 0;
      height:30px;
      ul{
        margin: 0px;
        padding:0px;
        list-style:none;
        display:flex;
        li {
          .active{
            background-color:#5db4e6;
          }
          .disabled{
            cursor:not-allowed !important;
          }
          span{
            float:left;
            width:50px;
            height:30px;
            text-align:center;
            line-height:30px;
            border:1px solid #dddddd;
            cursor:pointer;
          }
          span:hover{
            background-color:#dddddd;
          }
          .lastPage {
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
          }
          .firstPage {
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
          }
        }
      }
    }
  }
}
</style>
