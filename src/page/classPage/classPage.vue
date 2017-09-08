<template>
<div class="app">
  <slot></slot>
  <div v-bind:class="[isPC ? isPC_index : isPHONE_index]">
    <div class="tab" v-if="isPC">
      <ul class="tabBar" >
        <li v-bind:class="[{ choosed: isSelect[0] }, '']">
            <router-link :to="{ name: 'classicOne'}">
              <span @click="choose(1)">技术</span>
            </router-link>
        </li>
        <li v-bind:class="[{ choosed: isSelect[1] }, '']">
            <router-link :to="{ name: 'classicTwo'}">
              <span @click="choose(2)">生活</span>
            </router-link>
        </li>
        <li v-bind:class="[{ choosed: isSelect[2] }, '']">
            <router-link :to="{ name: 'classicThree'}">
              <span @click="choose(3)">梦想</span>
            </router-link>
        </li>
        <li v-bind:class="[{ choosed: isSelect[3] }, '']">
            <router-link :to="{ name: 'classicFour'}">
              <span @click="choose(4)">创作</span>
            </router-link>
        </li>
        <li v-bind:class="[{ choosed: isSelect[4] }, '']">
            <router-link :to="{ name: 'classicFive'}">
              <span @click="choose(5)">精品摘抄</span>
            </router-link>
        </li>
        <li v-bind:class="[{ choosed: isSelect[5] }, '']">
            <router-link :to="{ name: 'classicSix'}">
              <span @click="choose(6)">杂七杂八</span>
            </router-link>
        </li>
      </ul>
    </div>
    <div class="phoneTab" v-if="!isPC">
      <ul class="ivu-menu ivu-menu-light ivu-menu-vertical">
          <li class="ivu-menu-submenu">
              <div class="ivu-menu-submenu-title" @click="showClass=!showClass">
                  <i class="ivu-icon ivu-icon-ios-paper"></i>
                          查看分类
                  <i v-show="showClass" class="ivu-icon ivu-icon-ios-arrow-down ivu-menu-submenu-title-icon"></i>
                  <i v-show="!showClass" class="ivu-icon ivu-icon-ios-arrow-up ivu-menu-submenu-title-icon"></i>
              </div> 
              <ul class="ivu-menu" v-show="showClass"> 
                  <li class="ivu-menu-item">
                    <router-link :to="{ name: 'classicOne' }"><span>技术</span></router-link>
                  </li> 
                  <li class="ivu-menu-item">
                    <router-link :to="{ name: 'classicTwo' }"><span>生活</span></router-link>
                  </li> 
                  <li class="ivu-menu-item">
                    <router-link :to="{ name: 'classicThree' }"><span>梦想</span></router-link>
                  </li>
                  <li class="ivu-menu-item">
                    <router-link :to="{ name: 'classicFour' }"><span>创作</span></router-link>
                  </li>
                  <li class="ivu-menu-item">
                    <router-link :to="{ name: 'classicFive' }"><span>精品摘抄</span></router-link>
                  </li>
                  <li class="ivu-menu-item">
                    <router-link :to="{ name: 'classicSix' }"><span>杂七杂八</span></router-link>
                  </li>
              </ul>
          </li>
      </ul>
    </div>
    <div class="guide">
        <router-link :to="{ name: 'Index'}">
            <span class="toindex">首页</span>
        </router-link>
        <span> » 该分类下的文章</span>
    </div>
    <router-view></router-view>
  </div>
</div>
</template>

<script>
import classDetail from './classDetail.vue'
export default {
  components: {
    classDetail
  },
  data () {
    return {
      isSelect: [true],
      isPC: this.$store.state.isPC,
      isPC_index: 'index',
      isPHONE_index: 'index_phone',
      showClass: false
    }
  },
  methods: {
    choose (index) {
      let temp = []
      temp[index - 1] = true
      this.isSelect = temp
    }
  },
  mounted () {
    let classic = this.$route.path.slice(7)
    if (classic === 'one') {
      this.choose(1)
    } else if (classic === 'two') {
      this.choose(2)
    } else if (classic === 'three') {
      this.choose(3)
    } else if (classic === 'four') {
      this.choose(4)
    } else if (classic === 'five') {
      this.choose(5)
    } else {
      this.choose(6)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.app{
    overflow:auto;
    background-color: #f5f5d5;
    position:fixed;
    width:100%;
    height:100%;
}
.index{
    margin-top:50px;
    margin-left:10%;
    width:80%;
    background-color: #f5f5d5;
    letter-spacing: -0.01em;
    word-spacing: 0.2em;
    line-height: 1.8em;
    font-size: 62.5%;
    color: #111111;
    height:100%;
}
.guide{
    height:50px;
}
.guide .toindex{
    margin-left: 15%;
}
.guide span{
    line-height:50px;
    color:#635656;
    font-size:14px;
}
.index_phone{
    margin-top:0px;
    background-color: #f5f5d5;
    letter-spacing: -0.01em;
    word-spacing: 0.2em;
    line-height: 1.8em;
    font-size: 62.5%;
    color: #111111;
    height:100%;
    margin-bottom:30px
}
.content{
    position:absolute;
    top:150px;
    left:10%;
    width:80%;
    height:2000px;
    background:white;
}
.list{
    position:absolute;
    top:50px;
    left:10%;
    width:55%;
    height:200px;
    border:black 1px solid;
}
.tab {
    margin-left: 15%;
}
.tabBar{
    display:inline-block;
    border-bottom:#d2d2d2 1px solid;
    color:#6b6b6b;
    font-size:14px;
    height:26px;
}
.tabBar li{
    float:left;
    text-align:center;
    width:100px;
    color:#6b6b6b;
    cursor:pointer;
    height:26px;
}
.tabBar li span{
    color:#6b6b6b;
}
.tabBar li span:hover{
    color:#2b2626;
}
.choosed{
    color:#2b2626;
    border-bottom:#4c4545 2px solid;
}
.phoneTab{
    background:#f5f5d5
}
.ivu-menu-vertical .ivu-menu-item:hover, .ivu-menu-light, .ivu-menu-vertical .ivu-menu-submenu-title:hover{
    background:#f5f5d5
}

.phoneTab .ivu-menu{
    width:80%;
    margin-left:10%;
}
span{
  color:#2b2626;
}
</style>
