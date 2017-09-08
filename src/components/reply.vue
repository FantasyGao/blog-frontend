<template>
    <div class="reply">
      <div class="replyItem" v-for="item in reply">
        <div class="replyUser">{{item.replyName}}<span class="spanReply">回复了</span>{{item.replyedUser}}</div>
        <div class="replyTime"><span>回复时间:</span> {{item.replyTime}}</div>
        <div class="replyContent"> {{item.replyContent}}</div>
        <div class="replyButton">
            <Button shape="circle" size="small" @click="changeShow(item.replyId)">
                reply
            </Button>
            <div class="replyInput" v-if="showInput[item.replyId]">
                <div class="input-group input-group-sm">
                    <input v-model="replyName" type="text" class="form-control" placeholder="name" aria-describedby="sizing-addon1">
                </div>
                <div class="input-group input-group-sm">
                    <input v-model="replyEmail" type="text" class="form-control" placeholder="email" aria-describedby="sizing-addon1">
                </div>
                <div v-bind:class="[isPC ? PC_list : Phone_list]">
                    <Input v-model="replyContent"  type="textarea" :rows="4"  placeholder="mark"></Input>
                </div>
                <div>
                    <Button shape="circle" size="small" @click="submitReply(item.replyName)">
                        submit
                    </Button>
                </div>
            </div>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  name: 'hello',
  props: ['reply', 'ID', 'markId'],
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
    submitReply (replyedUser) {
      let obj = {
        id: this.ID,
        markId: this.markId,
        replyedUser: replyedUser,
        user: this.replyName,
        email: this.replyEmail,
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
          title: '回复成功！'
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
.reply{
    width:93%;
    margin-left:7%;
    display:inline-block;
    padding:15px;
}
.replyItem{
    margin-top:15px;
}
.reply:hover{
    width:93%;
    margin-left:7%;
    box-shadow:3px 2px 3px 3px #c3c39e;
    display:inline-block;
    padding:15px;
}
.spanReply{
    margin:0 10px;
}
@media screen and (min-width: 600px){
    .reply .replyUser{
        float:left;
        font-size:16px;
        line-height:30px;
        text-indent:1cm;
        font-family:'kaiti'
    }
    .reply .replyTime{
        float:right;
        font-size:14px;
        line-height:30px;
        text-indent:1cm;
        font-family:'kaiti'
    }
}
@media screen and (max-width: 600px){
    .reply .replyUser{
        float:left;
        font-size:14px;
        line-height:30px;
    }
    .reply .replyTime{
        float:right;
        font-size:10px;
        line-height:30px;
        margin-left:10px;
    }
}
.reply .replyContent{
    text-indent:1cm;
    width:100%;
    border-top:1px solid #aba6a6;
    font-size:16px;
    letter-spacing: 0.01em;
    word-spacing: 0.1em;
    line-height:22px;
    padding:15px;
    padding-bottom:0px;
    word-break:break-all;
    display: inline-block;
}
.reply .replyButton{
    margin-top:10px;
}
.reply .replyInput{
    background:#cccca1;
    border-radius:3px;
    margin:15px;
    width:80%;
    box-shadow:2px 1px 2px 2px #c3c39e;
    padding:15px;
}
.reply .replyInput div{
    margin-top:10px;
}
.markList .markButton{
    margin-top:10px;
}
.markInput{
    width:70%;
    margin-left:7%;
    margin:15px;
    border:1px solid black;
}
.markInput div{
    margin-top:10px;
}
.input-group{
    width:60%;
}
.phone{
    width:100%
}
</style>
