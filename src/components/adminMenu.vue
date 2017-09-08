<template>
  <div class="index">
    <div class="banner" >BLOG'S Management
      <span class="pull-right logout">
        <Dropdown>
          <span>
              {{userName}}
              <Icon type="arrow-down-b"></Icon>
          </span>
          <Dropdown-menu slot="list">
              <!-- <Dropdown-item>修改密码</Dropdown-item> -->
              <Dropdown-item @click.native="logout">退 出</Dropdown-item>
          </Dropdown-menu>
        </Dropdown>
      </span>
    </div>
    <div id="nav" v-show="!isHide" v-bind:class="[isHide ? 'hideTable' : 'showTable']" >
           <Menu>
                <Submenu name="0">
                    <template slot="title">
                        <Icon type="ios-compose-outline"></Icon>
                        撰写
                    </template>
                    <Menu-item name="1-4" @click.native="selectItem(0)">写文章</Menu-item>
                </Submenu>
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-paper"></Icon>
                        内容管理
                    </template>
                    <Menu-item name="1-1" @click.native="selectItem(1)">文章管理</Menu-item>
                    <Menu-item name="1-2" @click.native="selectItem(2)">评论管理</Menu-item>
                    <Menu-item name="1-3" @click.native="selectItem(3)">回复管理</Menu-item>
                </Submenu>
                <Submenu name="2">
                    <template slot="title">
                        <Icon type="ios-people"></Icon>
                        用户管理
                    </template>
                    <Menu-item name="2-1" @click.native="selectItem(4)">用户</Menu-item>
                    <Menu-item name="2-2" @click.native="selectItem(5)">评论用户</Menu-item>
                    <Menu-item name="2-3" @click.native="selectItem(8)">回复用户</Menu-item>
                    <Menu-item name="2-4" @click.native="selectItem(9)">已关注用户</Menu-item>
                </Submenu>
                <Submenu name="4">
                    <template slot="title">
                        <Icon type="ios-pulse"></Icon>
                        系统日志
                    </template>
                    <Menu-item name="4-1" @click.native="selectItem(10)">日志</Menu-item>
                </Submenu>
                <Submenu name="3">
                    <template slot="title">
                        <Icon type="stats-bars"></Icon>
                        统计分析
                    </template>
                    <Menu-item name="3-1" @click.native="selectItem(6)">数据概览</Menu-item>
                    <Menu-item name="3-2" @click.native="selectItem(7)">图表概览</Menu-item>
                </Submenu>
            </Menu>
      </div>
      <div class="rightContent">
        <div class="content" v-bind:class="[isHide ? 'bigWidth' : 'smallWidth']">
        <div class="toggle" @click="showMenu()">
            <span class="demo-affix">
              <Icon type="navigate"></Icon>
            </span>
        </div>
           <slot></slot>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    let user = localStorage.getItem('adminName')
    return {
      isHide: true,
      userName: user
    }
  },
  methods: {
    showMenu () {
      this.isHide = !this.isHide
    },
    logout () {
      this.$store.dispatch('logOut')
      this.$router.replace('/admin/login')
    },
    selectItem (data) {
      let nextRouter
      if (data === 0) {
        nextRouter = 'adminWrite'
      } else if (data === 1) {
        nextRouter = 'adminIndex'
      } else if (data === 2) {
        nextRouter = 'adminMarkManage'
      } else if (data === 3) {
        nextRouter = 'adminReplyManage'
      } else if (data === 4) {
        nextRouter = 'adminUserManage'
      } else if (data === 5) {
        nextRouter = 'adminMarkerManage'
      } else if (data === 6) {
        nextRouter = 'adminReadAnaly'
      } else if (data === 7) {
        nextRouter = 'adminChartsAnaly'
      } else if (data === 8) {
        nextRouter = 'adminReplyerManage'
      } else if (data === 9) {
        nextRouter = 'adminCareUser'
      } else if (data === 10) {
        nextRouter = 'adminLogs'
      }
      this.$router.push({name: nextRouter})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index{
    background:#f5f5d5;
    width: 100%;
    clear: both;
    display: inline-block;
    margin-top: 0px;
    min-width: 1000px;
}
#nav{
    position:relative;
    float:left;
    height: 1501px;
    margin-right:-240px;/* 数值核心2 */
    background: #1e313e;
}
.hideTable{
    width:0;/* 数值核心1 */
}
.showTable{
    width:239px;
}
.bigWidth{
    margin-left:0px;
}
.smallWidth{
    margin-left:240px;
}
.content{
    background-color: #f5f5d5;
    height: 100%;
}
.rightContent{
    float:right;
    width:100%;
    height: 100%;
    
}
.banner{
    height:60px;
    width:100%;
    background: #1e313e;
    font-size:28px;
    font-weight:600;
    text-align:center;
    line-height:65px;
    color: #838383;
    text-shadow:2px -2px #cfa8a8;
}
.ivu-menu-light {
    background: #1e313e;
}
.ivu-menu {
    display: block;
    margin: 0;
    padding: 0;
    outline: 0;
    list-style: none;
    color: #78e0ff;
    font-size: 14px;
    position: relative;
}
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
    color: #d5ff84;
    background:#5a5757;
    border:none;
    z-index: 2;
}
.logout{
    width:140px;
    text-align:center;
    height:60px;
    font-size:16px;
    color:white;
    text-shadow:none
}
.logout:hover{
    width:140px;
    background:#3c300e;
    text-align:center;
    height:60px;
    font-size:16px;
    color:white;
    text-shadow:none;
    cursor:pointer;
}
.toggle{
    margin-bottom:30px;
    width:30px;
    background:#1e313e;
    text-align:center;
    color:white;
    cursor:pointer
}
</style>
