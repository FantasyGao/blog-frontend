<template>
    <div class="index">
        <slot></slot>
        <div v-bind:class="[isPC ? PC_content : Phone_content]">
            <div class="guide">
                <router-link :to="{ name: 'Index'}">
                    <span>首页</span>
                </router-link>
                <span> » 文章</span>
            </div>
            <div class="share">
                <button type="button" class="btn btn-default btn-sm pull-right">
                share
                </button>
            </div>
            <div class="title">{{articleInfo.title}}</div>
            <div class="classic">
                <div class="cls">分类:<span class="clsInfo">{{articleInfo.classic}}</span></div>
                <div class="time">发表日期:<span>{{articleInfo.time}}</span></div>
            </div>
            <div class="tag">
                <div class="tags">标签:</div>
                <div class="tagDetail"><tag :tags="articleInfo.tag"></tag></div>
            </div>
            <div class="body" v-html="articleInfo.content">
            </div>
            <!--评论部分-->
            <div class="marks">
                <div v-bind:class="[isPC ? PC_list : Phone_list]">
                    <div>
                        <div class="input-group input-group-md">
                            <input v-model="MarkName" type="text" class="form-control" placeholder="Name" aria-describedby="sizing-addon1">
                        </div>
                        <div class="input-group input-group-md">
                            <input v-model="MarkEmail" type="text" class="form-control" placeholder="Email" aria-describedby="sizing-addon1">
                        </div>
                        <div class="texte">
                            <Input v-model="MarkComment"  type="textarea" :rows="8"  placeholder="Comment"></Input>
                        </div>
                        <button type="button" class="btn btn-default btn-lg" @click="submitMark()">
                            submit
                        </button>
                    </div>
                </div>
            </div>
            <markList :ID = "articleInfo.id" :mark="articleInfo.markList"></markList>
        </div> 
    </div>
</template>

<script>
import tag from '../../components/tag.vue'
import markList from '../../components/markList.vue'
import {mapState} from 'vuex'

export default {
  components: {
    tag,
    markList
  },
  data () {
    return {
      isPC: this.$store.state.isPC,
      Phone_list: 'info_phone',
      PC_list: 'userInfo',
      PC_content: 'content',
      Phone_content: 'phone_content',
      MarkName: '',
      MarkEmail: '',
      MarkComment: ''
    }
  },
  methods: {
    submitMark () {  // 提交评论
      let obj = {
        id: this.articleInfo.id,
        user: this.MarkName,
        email: this.MarkEmail,
        markContent: this.MarkComment
      }
      for (let key in obj) {
        if (!obj[key]) {
          if (key === 'user') {
            this.$Notice.error({
              title: '名称不可为空'
            })
          }
          if (key === 'email') {
            this.$Notice.error({
              title: '邮箱不可为空'
            })
          }
          if (key === 'markContent') {
            this.$Notice.error({
              title: '评论内容不可为空'
            })
          }
          return
        }
      }
      this.axios('addMark', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: obj
      })
      .then((data) => {
        if (data.data.status === 1) {
          this.$Notice.success({
            title: '评论成功'
          })
        } else {
          this.$Notice.error({
            title: '评论失败，请稍后再试'
          })
        }
      }).catch((e) => {
        this.$Notice.error({
          title: '网络出错，请稍后再试'
        })
      })
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
      params: id + '&auth=1'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.index{
    position:fixed;
    background-color: #f5f5d5;
    letter-spacing: -0.01em;
    word-spacing: 0.2em;
    line-height: 1.8em;
    color: #111111;
    height:100%;
    width: 100%;
    overflow:auto;
    min-width: 1000px;
}
.input-group{
    width:60%;
    margin-top:15px
}
.input-group .form-control{
    border-radius: 5px;
}
.content{
    margin:50px auto;
    width:60%;
    margin-bottom:100px
}
.phone_content{
    margin:50px auto;
    width:80%;
    margin-bottom:100px
}
.guide{
    height:10px;
}
.guide span{
    line-height:10px;
    color:#6b6b6b;
    font-size:14px;
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
    font-size:17px;
    line-height:26px;
    display:inline-block;
    margin-top:10px;
}
.classic .cls{
    text-align:center;
    font-size:16px;
    float:left;
}
.clsInfo{
    margin-left: 15px;
    cursor: pointer;
}
.clsInfo:hover{
    font-weight: 700
}
.time{
    text-align:center;
    font-size:16px;
    float: right;
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
    line-height:30px;
}
.tag .tagDetail{
    margin-left:15px;
}
.body{
    width:100%;
    font-size:16px;
    text-indent:1cm;
    word-break:break-all;
    letter-spacing: 0.05em;
    word-spacing: 0.2em;
    margin-top: 1em;
    line-height: 180%;
    padding-top:15px;
    padding-bottom:30px;
    border-top:1px solid #968e8e;
    border-bottom:1px solid #968e8e;
} 
.language-javascript{
    color:red
}
.userInfo{
    width:60%;
}
.info_phone{
    width:100%;
}
.userInfo .input-group{
    margin-top:15px;
    border-radius:4px
}
.userInfo .texte{
    margin-top:15px;
    min-height:200px;
}
.info_phone .input-group{
    margin-top:15px;
    border-radius:4px
}
.info_phone .texte{
    margin-top:15px;
    min-height:200px;
}
@media screen and (max-width: 600px){
   .userInfo{
     width:100%;
   }
}

</style>
