<template>
<div class="app">
  <slot></slot>
  <div class="index">
     <div class="content">
         <div  v-bind:class="[isPC ? PC_list : Phone_list]">
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
                    <li class="ivu-menu-submenu">
                        <div class="ivu-menu-submenu-title" @click="showTags=!showTags">
                            <i class="ivu-icon ivu-icon-ios-pricetags-outline"></i>
                                    查看标签
                            <i v-show="showTags" class="ivu-icon ivu-icon-ios-arrow-down ivu-menu-submenu-title-icon"></i>
                            <i v-show="!showTags" class="ivu-icon ivu-icon-ios-arrow-up ivu-menu-submenu-title-icon"></i>
                        </div> 
                        <ul class="ivu-menu" v-show="showTags"> 
                            <router-link v-for="item in tagList" :to="{ name: 'tags' ,params: {id:item.id}}" :key="item.id">
                                <span v-bind:class="[button, next]">{{item.name}}</span>
                            </router-link>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="guide">
                <router-link :to="{ name: 'Index'}">
                    <span>首页</span>
                </router-link>
                <span> » 最新发表文章</span>
            </div>
            <div v-for="item in articleList"  v-show="showDetail">
              <articleItem :articleItem="item"></articleItem>
            </div>
            <div v-show="!showDetail">
                <articleList :articleList="AllArticleList"></articleList>
            </div>
            <div class="bar">
                <a class="btn-xs"  @click="showDetail=!showDetail" v-show="showDetail">查看更多>></a>
                <a  class="btn-xs"  @click="showDetail=!showDetail" v-show="!showDetail"><<返回</a>
            </div> 
         </div>
         <div class="info" v-show="showDetail" v-if="isPC">
             <div class="articleClass">
                <Card style="width:100%">
                    <div style="text-align:center">
                        <classic></classic>
                        <h4>分类查看</h4>
                    </div>
                </Card>
             </div>
             <div class="tagClass">
                <Card style="width:100%">
                    <div style="text-align:center">
                        <div class="tagName"><h4>标签查看</h4></div>
                        <tag :tags="tagList"></tag>
                    </div>
                </Card>
             </div>
             <div class="tagClass">
                <Card style="width:100%">
                    <div style="text-align:center">
                        <h4>关于本站</h4>
                        <author></author>
                    </div>
                </Card>
             </div>
         </div>
     </div>
  </div>
  </div>
</template>

<script>
import articleItem from '../../components/articleItem.vue'
import classic from '../../components/class.vue'
import tag from '../../components/tag.vue'
import author from '../../components/author.vue'
import articleList from '../../components/articleList.vue'
import {mapState, mapActions} from 'vuex'

export default {
  components: {
    articleItem,
    classic,
    tag,
    articleList,
    author
  },
  data () {
    return {
      showDetail: true,
      showClass: false,
      showTags: false,
      isPC: this.$store.state.isPC,
      Phone_list: 'Phone_list',
      PC_list: 'PC_list',
      button: 'button',
      next: 'next'
    }
  },
  methods: {
    ...mapActions(['getIndexList'])
  },
  computed: {
    ...mapState({
      tagList: state => state.indexPageList.tagList,
      articleList: state => state.indexPageList.articleList,
      AllArticleList: state => state.indexPageList.allArticleList
    })
  },
  mounted () {
    this.$store.dispatch('getIndexList')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Phone_list{
    margin-left:10%;
    width:95%;
}
.PC_list{
    margin-left:10%;
    width:55%;
}
.app{
    overflow:auto;
    background-color: #f5f5d5;
    position: fixed;
    height: 100%;
    width:100%;
}
.index{
    letter-spacing: -0.01em;
    word-spacing: 0.2em;
    line-height: 1.8em;
    font-size: 62.5%;
    color: #111111;
    width: 100%;
    height:100%;
}

@media screen and (min-width: 1600px){
   .content{
        position:relative;
        width:80%;
        margin-top:20px;
        max-width:1200px;
        margin-left: 13%;
        padding-bottom: 30px;
   }
}
@media screen and (max-width: 1600px){
    .content{
        position:relative;
        width:80%;
        margin-top:10px;
        max-width:1500px;
        margin-left: 5%;
        max-width: 1600px;
        padding-bottom: 30px;
    }
}
.guide{
    height:50px;
}
.guide span{
    line-height:50px;
    color:#6b6b6b;
    font-size:14px;
}
.tagName{
    border-bottom:#e9eaec 1px solid;
    width: 380px;
    margin-left: -18px;
    height:30px
}
.info{
    position:absolute;
    right:0px;
    top:25px;
    margin-top:50px;
    margin-right:50px;
    width:25%;
    height:200px;
}
.articleClass{
    width:380px;
    height:200px;
    background:white;
    border:#e9eaec 1px solid;
}
.tagClass{
    margin-top:25px;
    width:380px;
}
.author{
    width:100%;
    height:200px;
    border:black 1px solid;
}
.input-group{
    width:40%;
}
.bar{
  margin-top:15px;
}
.btn-xs{
  color:black
}
.phoneTab{
    background:#f5f5d5
}
.ivu-menu-vertical .ivu-menu-item:hover, .ivu-menu-light, .ivu-menu-vertical .ivu-menu-submenu-title:hover{
    background:#f5f5d5
}
.phoneTab .ivu-menu{
    width:100%;
}
span{
  color:#2b2626;
}
.button {
	display: inline-block;
	position: relative;
	color: #888;
	text-shadow: 0 1px 0 rgba(255,255,255, 0.8);
	text-decoration: none;
	text-align: center;
	padding: 3px 6px;
	font-size: 12px;
	font-weight: 700;
	font-family: helvetica, arial, sans-serif;
	border-radius: 4px;
	border: 1px solid #bcbcbc;
	-webkit-box-shadow: 0 1px 3px rgba(0,0,0,0.12);
	box-shadow: 0 1px 3px rgba(0,0,0,0.12);
	background-image: -webkit-linear-gradient(top, rgba(255,255,255,1) 0%,rgba(239,239,239,1) 60%,rgba(225,223,226,1) 100%);
	background-image: -moz-linear-gradient(top, rgba(255,255,255,1) 0%,rgba(239,239,239,1) 60%,rgba(225,223,226,1) 100%);
	background-image: -o-linear-gradient(top, rgba(255,255,255,1) 0%,rgba(239,239,239,1) 60%,rgba(225,223,226,1) 100%);
	background-image: -ms-linear-gradient(top, rgba(255,255,255,1) 0%,rgba(239,239,239,1) 60%,rgba(225,223,226,1) 100%);
	background-image: linear-gradient(top, rgba(255,255,255,1) 0%,rgba(239,239,239,1) 60%,rgba(225,223,226,1) 100%);
}

.button:hover {
	color: #555;
}

.button:active,.button:active:after,.button:active:before {
	-webkit-box-shadow: none;
	box-shadow: none;
}

/* Back Button */
.button.back {
	border-left: none;
}

.button.back:after {
	content: '';
	position: absolute;
	height: 50%;
	width: 15px;
	border-left: 1px solid #bcbcbc;

	background-image: -webkit-linear-gradient(top, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 1%,rgba(240,240,240,1) 100%);
	background-image: -moz-linear-gradient(top, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 1%,rgba(240,240,240,1) 100%);
	background-image: -o-linear-gradient(top, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 1%,rgba(240,240,240,1) 100%);
	background-image: -ms-linear-gradient(top, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 1%,rgba(240,240,240,1) 100%);
	background-image: linear-gradient(top, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 1%,rgba(240,240,240,1) 100%);
	left: -5px;
	top: 1px;

	-webkit-transform: skew(-35deg, 0);
	-moz-transform: skew(-35deg, 0);
	-o-transform: skew(-35deg, 0);
	-ms-transform: skew(-35deg, 0);
	transform: skew(-35deg, 0);
}

.button.back:before {
	content: '';
	position: absolute;
	height: 48%;
	width: 15px;
	border-left: 1px solid #bcbcbc;
	bottom: 1px;
	left: -5px;

	-webkit-transform: skew(35deg, 0);
	-moz-transform: skew(35deg, 0);
	-o-transform: skew(35deg, 0);
	-ms-transform: skew(35deg, 0);
	transform: skew(35deg, 0);

	background-image: -webkit-linear-gradient(top, rgba(240,240,240,1) 0%,rgba(239,239,239,1) 10%,rgba(225,223,226,1) 100%);
	background-image: -moz-linear-gradient(top, rgba(240,240,240,1) 0%,rgba(239,239,239,1) 10%,rgba(225,223,226,1) 100%);
	background-image: -o-linear-gradient(top, rgba(240,240,240,1) 0%,rgba(239,239,239,1) 10%,rgba(225,223,226,1) 100%);
	background-image: -ms-linear-gradient(top, rgba(240,240,240,1) 0%,rgba(239,239,239,1) 10%,rgba(225,223,226,1) 100%);
	background-image: linear-gradient(top, rgba(240,240,240,1) 0%,rgba(239,239,239,1) 10%,rgba(225,223,226,1) 100%);

	-webkit-box-shadow: -2px 1px 2px rgba(100,100,100,0.1);
	box-shadow: -2px 1px 2px rgba(100,100,100,0.1);
}

/* Next Button */
.button.next {
	border-right: none;
}

.button.next:after {
	content: '';
	position: absolute;
	height: 48%;
	width: 15px;
	border-right: 1px solid #bcbcbc;

	background-image: -webkit-linear-gradient(top, rgba(240,240,240,1) 0%,rgba(239,239,239,1) 10%,rgba(225,223,226,1) 100%);
	background-image: -moz-linear-gradient(top, rgba(240,240,240,1) 0%,rgba(239,239,239,1) 10%,rgba(225,223,226,1) 100%);
	background-image: -o-linear-gradient(top, rgba(240,240,240,1) 0%,rgba(239,239,239,1) 10%,rgba(225,223,226,1) 100%);
	background-image: -ms-linear-gradient(top, rgba(240,240,240,1) 0%,rgba(239,239,239,1) 10%,rgba(225,223,226,1) 100%);
	background-image: linear-gradient(top, rgba(240,240,240,1) 0%,rgba(239,239,239,1) 10%,rgba(225,223,226,1) 100%);
	right: -5px;
	bottom: 1px;

	-webkit-transform: skew(-35deg, 0);
	-moz-transform: skew(-35deg, 0);
	-o-transform: skew(-35deg, 0);
	-ms-transform: skew(-35deg, 0);
	transform: skew(-35deg, 0);

	-webkit-box-shadow: 2px 1px 2px rgba(100,100,100,0.1);
	box-shadow: 2px 1px 2px rgba(100,100,100,0.1);
}

.button.next:before {
	content: '';
	position: absolute;

	background-image: -webkit-linear-gradient(top, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 1%,rgba(240,240,240,1) 100%);
	background-image: -moz-linear-gradient(top, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 1%,rgba(240,240,240,1) 100%);
	background-image: -o-linear-gradient(top, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 1%,rgba(240,240,240,1) 100%);
	background-image: -ms-linear-gradient(top, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 1%,rgba(240,240,240,1) 100%);
	background-image: linear-gradient(top, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 1%,rgba(240,240,240,1) 100%);
	height: 50%;
	width: 15px;
	border-right: 1px solid #bcbcbc;
	top: 1px;
	right: -5px;

	-webkit-transform: skew(35deg, 0);
	-moz-transform: skew(35deg, 0);
	-o-transform: skew(35deg, 0);
	-ms-transform: skew(35deg, 0);
	transform: skew(35deg, 0);
}
</style>
