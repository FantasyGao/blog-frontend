<template>
    <div class="app">
        <slot></slot>
        <div v-bind:class="[isPC ? isPC_index : isPHONE_index]">
            <div class="guide">
                <router-link :to="{ name: 'Index'}">
                    <span>首页</span>
                </router-link>
                <span> » 该标签下的文章</span>
            </div>
            <div v-for="item in articleList" v-show="showDetail">
                <articleItem :articleItem="item"></articleItem>
            </div>
            <div v-show="!showDetail">
                <articleList :articleList="allArticleList"></articleList>
            </div>
            <div class="bar">
                <a class="btn-xs"  @click="showDetail=!showDetail" v-show="showDetail">查看更多>></a>
                <a  class="btn-xs"  @click="showDetail=!showDetail" v-show="!showDetail"><<返回</a>
            </div>   
        </div> 
    </div>
</template>

<script>
import articleList from '../../components/articleList.vue'
import articleItem from '../../components/articleItem.vue'
import {mapState} from 'vuex'

export default {
  name: 'index',
  data () {
    return {
      showDetail: true,
      isPC: this.$store.state.isPC,
      isPC_index: 'index',
      isPHONE_index: 'index_phone'
    }
  },
  components: {
    articleList,
    articleItem
  },
  methods: {
  },
  computed: {
    ...mapState({
      articleList: state => state.indexPageList.articleList,
      allArticleList: state => state.indexPageList.allArticleList
    })
  },
  mounted () {
    let tagId = this.$route.params.id
    this.$store.dispatch('getTagList', {
      params: tagId
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.app{
    overflow:auto;
    background-color: #f5f5d5;
    position: fixed;
    height: 100%;
    width:100%;
}
.index{
    margin-top:50px;
    margin-left: 20%;
    width: 60%;
    background-color: #f5f5d5;
    letter-spacing: -0.01em;
    word-spacing: 0.2em;
    line-height: 1.8em;
    font-size: 62.5%;
    color: #111111;
    height:100%;
    margin-bottom:30px
}
.index_phone{
    margin-top:10px;
    margin-left: 10%;
    width: 80%;
    background-color: #f5f5d5;
    letter-spacing: -0.01em;
    word-spacing: 0.2em;
    line-height: 1.8em;
    font-size: 62.5%;
    color: #111111;
    height:100%;
    margin-bottom:30px
}
.guide{
    height:50px;
}
.guide span{
    line-height:50px;
    color:#6b6b6b;
    font-size:14px;
}
.content{
    position:absolute;
    top:150px;
    left:10%;
    width:80%;
    height:2000px;
    background:white;
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

</style>
