<template>
<div>
    <table class="table table-bordered table-hover table-striped">
      <thead>
        <tr>
          <th>名称</th>
          <th>发布日期</th>
          <th>类别</th>
          <th>标签</th>
          <th>作者</th>
          <th>浏览量</th>
          <th>评论数</th>
          <th>状态</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{articleInfo.title}}</td>
          <td>{{articleInfo.time}}</td>
          <td>{{articleInfo.classic}}</td>
          <td>{{articleInfo.tag}}</td>
          <td>{{articleInfo.author}}</td>
          <td>{{articleInfo.pv}}</td>
          <td>{{articleInfo.markNum}}</td>
		  <td v-if="articleInfo.show ==0" class="btn-info btn-xs">下线</td>
		  <td v-if="articleInfo.show ==1" class="btn-success  btn-xs">在线</td>
        </tr>
      </tbody>
    </table>
    <table class="table table-bordered table-hover table-striped">
      <thead>
        <tr>
          <th>评论人</th>
          <th>邮箱</th>
          <th>评论日期</th>
          <th>评论状态</th>
          <th>获赞数</th>
          <th>回复数</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for = "item in articleInfo.markList">
          <td>{{item.userName}}</td>
          <td>{{item.userEmail}}</td>
          <td>{{item.markTime}}</td>
		  <td v-if="item.markShow ==0" class="btn-info btn-xs">审核中</td>
		  <td v-if="item.markShow ==1" class="btn-success  btn-xs">通过审核</td>
          <td>{{item.likeNum}}</td>
          <td>{{item.replyList.length}}</td>
        </tr>
      </tbody>
    </table>
    <table class="table table-bordered table-hover table-striped">
      <thead>
        <tr>
          <th>回复人</th>
          <th>邮箱</th>
          <th>评论人</th>
          <th>回复日期</th>
          <th>回复状态</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for = "reply in replyList">
          <td>{{reply.replyName}}</td>
          <td>{{reply.replyEmail}}</td>
          <td>{{reply.replyedUser}}</td>
          <td>{{reply.replyTime}}</td>
		  <td v-if="reply.replyShow ==0" class="btn-info btn-xs">审核中</td>
		  <td v-if="reply.replyShow ==1" class="btn-success  btn-xs">通过审核</td>
        </tr>
      </tbody>
    </table>
</div>    
</template>

<script>
export default {
  props: ['articleInfo', 'replyList'],
  data () {
    return {
    }
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
