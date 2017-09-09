<template>
    <div class="index">
        <slot></slot>
        <div v-bind:class="[isPC ? PC_content : Phone_content]">
            <div class="share">
                <button type="button" class="btn btn-default btn-sm pull-right">
                share
                </button>
            </div>
            <div class="title">{{articleInfo.title}}</div>
            <div class="classic">
                <div class="cls">class:{{articleInfo.classic}}</div>
                <div class="time">time:{{articleInfo.time}}</div>
            </div>
            <div class="tag">
                <div class="tags">tags:</div>
                <div class="tagDetail"><tag :tags="articleInfo.tag"></tag></div>
            </div>
            <div class="body">
                <p v-html="articleInfo.content"></p>
            </div>
        </div>
    </div>
</template>

<script>
import tag from '../../components/tag.vue'
import {mapState} from 'vuex'

export default {
  components: {
    tag
  },
  data () {
    return {
      isPC: this.$store.state.isPC,
      Phone_list: 'info_phone',
      PC_list: 'userInfo',
      PC_content: 'content',
      Phone_content: 'phone_content'
    }
  },
  computed: {
    ...mapState({
      articleInfo: state => state.articleInfo
    })
  },
  mounted () {
    let id = this.$route.params.id
    this.$store.dispatch('getArticleList', {
      params: id
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index{
    position:fixed;
    background-color: #f5f5d5;
    letter-spacing: -0.01em;
    word-spacing: 0.2em;
    line-height: 1.8em;
    color: #111111;
    height:100%;
    overflow:auto;
}
.input-group{
    width:60%;
    margin-top:15px
}
.input-group .form-control{
    border-radius: 5px;
}
.content{
    margin:0px auto;
    width:60%;
    margin-bottom:100px
}
.phone_content{
    margin:50px auto;
    width:80%;
    margin-bottom:100px
}
.title{
    width:100%;
    text-align:center;
    font-size:26px;
    background:#f5f5d5;
    line-height:60px;
    box-shadow:2px 1px 2px 2px #c3c39e;
}
.classic{
    width:100%;
    text-align:center;
    font-size:26px;
    line-height:40px;
    display:inline-block;
    margin-top:10px;
}
.classic .cls{
    width: 130px;
    text-align:center;
    font-size:16px;
    float:left;
    box-shadow:2px 1px 2px 2px #c3c39e !important
}
.classic .time{
    width: 130px;
    text-align:center;
    font-size:16px;
    float:left;
    box-shadow:2px 1px 2px 2px #c3c39e;
}
 .share{
    margin-bottom: 10px;
    height:25px;
}
.tag{
    width:100%;
    font-size:16px;
    line-height:22px;
    display:inline-block;
}
.tag .tags{
    float:left;
    line-height:40px;
}
.tag .tagDetail{
    margin-left:15px;
}
.body{
    width:100%;
    font-size:16px;
    word-break:break-all;
    letter-spacing: 0.01em;
    word-spacing: 0.2em;
    margin-top: 1em;
    line-height: 180%;
    padding-bottom: 100px;
}
</style>
