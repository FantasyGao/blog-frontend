<template>
    <div class="markList">
        <div class="markDetail" v-for="item in mark">
            <div class="markHead">
                <div class="markUser">{{item.userName}}<span>评论说</span></div>
                <div class="markTime"><span class="spanTime">评论时间：</span>{{item.markTime}}</div>
            </div>
            <div class="markContent"> {{item.markContent}}</div>
            <div class="markButton">
                <Button shape="circle" size="small" @click="changeShow(item.markId)">
                    reply
                </Button>
                <div class="markInput" v-show="showInput[item.markId]">
                    <div class="input-group input-group-sm">
                        <input v-model="replyName" type="text" class="form-control" placeholder="name" aria-describedby="sizing-addon1">
                    </div>
                    <div class="input-group input-group-sm">
                        <input v-model="replyEmail" type="text" class="form-control" placeholder="email" aria-describedby="sizing-addon1">
                    </div>
                    <div v-bind:class="[isPC ? PC_list : Phone_list]">
                        <Input v-model="replyContent"  type="textarea" :rows="4"  placeholder="reply"></Input>
                    </div>
                    <div>
                        <Button shape="circle" size="small" @click="submitMark(item.markId,item.userName)">submit</Button>
                    </div>
                </div>
            </div>
            <reply :ID = "ID" :markId = 'item.markId' :reply = "item.replyList"></reply>
        </div>
    </div>
</template>

<script>
import reply from './reply.vue'

export default {
  components: {
    reply
  },
  props: ['mark', 'ID'],
  data () {
    return {
      showInput: [],
      isPC: this.$store.state.isPC,
      Phone_list: 'phone',
      PC_list: 'input-group',
      replyName: '',
      replyEmail: '',
      replyContent: ''
    }
  },
  methods: {
    changeShow (id) {
      let temp = []
      temp[id] = true
      this.showInput = temp
    },
    submitMark (id, replyedUser) {
      let obj = {
        id: this.ID,
        markId: id,
        user: this.replyName,
        email: this.replyEmail,
        replyedUser: replyedUser,
        replyContent: this.replyContent
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
          if (key === 'replyContent') {
            this.$Notice.error({
              title: '回复内容不可为空'
            })
          }
          return
        }
      }
      this.axios('addReply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: obj
      })
      .then((data) => {
        this.$Modal.remove()
        if (data.data.status !== 1) {
          this.$Message.warning(data.data.msg)
          return
        }
        this.showInput = []
        this.$Notice.success({
          title: '评论成功！'
        })
      }).catch((e) => {
        console.log('error')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.markList{
    width:100%;
    padding:0px;
    margin-top:25px;
}
.markList:hover{
    box-shadow:3px 2px 3px 3px #c3c39e;
}
.markList .markDetail{
    width:100%;
    padding:15px;
}
.markList .markDetail .markHead{
    width:100%;
    display:inline-block;
    border-bottom:1px solid #aba6a6;
}
.spanTime{
    margin-right:5px;
}
@media screen and (min-width: 600px){
    .markList .markDetail .markHead .markUser{
        width:200px;
        float:left;
        font-size:16px;
        line-height:30px;
        text-indent:1cm;
        font-family:'kaiti'
    }
    .markList .markDetail .markHead .markTime{
        font-size:14px;
        line-height:30px;
        float:right;
        margin-right: 15px;
        font-family:'kaiti'
    }
}

@media screen and (max-width: 600px){
    .markList .markDetail .markHead .markUser {
        float: left;
        font-size: 14px;
        line-height: 30px;
    }
    .markList .markDetail .markHead .markTime{
        font-size:12px;
        line-height:30px;
        float:left;
        margin-left:10px;
    }
}


.markList .markDetail .markContent{
    text-indent:1cm;
    width:100%;
    padding-left:15px;
    font-size:16px;
    letter-spacing: 0.01em;
    word-spacing: 0.1em;
    word-break:break-all;
}
.markList .markButton{
    margin-top:10px;
}
.markInput{
    width:70%;
    margin-left:7%;
    margin:15px;
    padding:15px;
   background:#cccca1;
    border-radius:3px;
    box-shadow:2px 1px 2px 2px #c3c39e;
}
.markInput div{
    margin-top:10px;
}
.input-group{
    width:60%;
}
.phone{
    width:100%;
}
</style>
