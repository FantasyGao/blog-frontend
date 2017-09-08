<template>
  <div  <div v-bind:class="[isPC ? isPC_index : isPHONE_index]">
    <div  v-for="item in articleList" v-show="showDetail">
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
      isPC_index: 'content1',
      isPHONE_index: 'index_phone'
    }
  },
  components: {
    articleList,
    articleItem
  },
  methods: {
    onChangeUrl () {
      let classicId = this.$route.path.slice(7)
      let classic
      if (classicId === 'one') {
        classic = '技术'
      } else if (classicId === 'two') {
        classic = '生活'
      } else if (classicId === 'three') {
        classic = '梦想'
      } else if (classicId === 'four') {
        classic = '创作'
      } else if (classicId === 'five') {
        classic = '精品摘抄'
      } else {
        classic = '杂七杂八'
      }
      this.$store.dispatch('getClassicList', {
        params: classic
      })
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'onChangeUrl'
  },
  computed: {
    ...mapState({
      articleList: state => state.indexPageList.articleList,
      allArticleList: state => state.indexPageList.allArticleList
    })
  },
  mounted () {
    this.onChangeUrl()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content1{
  width:70%;
  margin-left:15%;
  margin-bottom:20px;
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
.bar{
  margin-top:15px;
}
.btn-xs{
  color:black
}
</style>
