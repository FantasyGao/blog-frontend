<template>
  <div class="index">
       <div class="content">
          <div class="main">
            <div class="input-group input-group-lg mgt50">
              <input v-model="Username" type="text" class="form-control w600" placeholder="Username" aria-describedby="sizing-addon1">
            </div>
            <div class="input-group input-group-lg mgt20">
              <input v-model="Email" type="text" class="form-control w600" placeholder="Email" aria-describedby="sizing-addon1">
            </div>
             <div class="input-group input-group-lg mgt20">
              <input v-model="Password" type="password" class="form-control w600" placeholder="Password" aria-describedby="sizing-addon1">
            </div>
            <div class="input-group input-group-lg mgt20">
              <input v-model="PasswordToo" type="password" class="form-control w600" placeholder="Confirm Password" aria-describedby="sizing-addon1" @keyup.enter="register">
            </div>
            <div class="input-group input-group-lg mgt20">
              <button class="form-control btn btn-default w600" @click="register">Register</button>
            </div>
            <span class="info" v-show="checkUser"><Alert type="error" show-icon>用户名不能为空</Alert></span>
            <span class="info" v-show="checkEmail"><Alert type="error" show-icon>邮箱不能为空</Alert></span>
            <span class="info" v-show="checkPassword"><Alert type="error" show-icon>密码不能为空</Alert></span>
            <span class="info" v-show="checkPas"><Alert type="error" show-icon>两次密码输入不一致</Alert></span>
            <span class="info" v-show="checkMa"><Alert type="error" show-icon>请验证邮箱是否正确</Alert></span>
          </div>
       </div>
  </div>
</template>

<script>
import Crypto from 'node-crypto'
const cp = new Crypto('myapp')
export default {
  name: 'index',
  data () {
    return {
      checkPas: false,
      checkEmail: false,
      checkPassword: false,
      checkMa: false,
      checkUser: false,
      Username: '',
      Email: '',
      Password: '',
      PasswordToo: ''
    }
  },
  methods: {
    check () {
      if (this.Password !== this.PasswordToo) {
        this.checkPas = true
      } else {
        this.checkPas = false
      }
    },
    checkMail () {
      let szReg = new RegExp(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/)
      // console.log(szReg.test(this.Email))
      if (szReg.test(this.Email)) {
        this.checkMa = false
      } else {
        this.checkMa = true
      }
    },
    register () {
      this.checkUser = false
      this.checkEmail = false
      this.checkPassword = false
      if (this.Username === '') {
        this.checkUser = true
        return
      } else if (this.Email === '') {
        this.checkEmail = true
        return
      } else if (this.Password === '') {
        this.checkPassword = true
        return
      }
      if (this.checkMa || this.checkPas) return
      let content = this.Password.trim()
      let password = cp.hex(content)
      this.axios.get('/register', {
        params: {
          user: this.Username,
          password: password,
          email: this.Email
        }
      })
      .then(data => {
        if (data.data.status !== 1) {
          this.$Message.warning(data.data.msg)
          return
        }
        this.$Notice.success({
          title: '注册成功',
          desc: '将跳转至登录页，请稍后'
        })
        setTimeout(() => {
          this.$router.replace('/admin/login')
        }, 1000)
      })
      .catch(data => {
        console.log('error')
      })
    }
  },
  watch: {
    PasswordToo: 'check',
    Email: 'checkMail'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index{
    position:fixed;
    top:0;
    left:0;
    background-color: #baccbe;
    font-family: Georgia, serif;
    letter-spacing: -0.01em;
    word-spacing: 0.2em;
    line-height: 1.8em;
    font-size: 62.5%;
    color: #111111;
    width: 100%;
    height:100%;
    z-index: 2;
}
.content{
    position:absolute;
    top:150px;
    left:25%;
    width:800px;
    height:550px;
    background:#3e6948;
    opacity:0.6;
    box-shadow:-5px -5px 8px #888888;
    border-radius:5px;
}
.main{
    position:absolute;
    top:50px;
    left:50%;
    margin-left:-225px;
}
.mgt50{
    margin-top:50px
}
.mgt20{
    margin-top:20px
}
.w100{
    width:100px
}
.w600{
    width:450px;
}
.info{
    margin-top:10px;
    display: block;
}
</style>
