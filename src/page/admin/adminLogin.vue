<template>
  <div class="index">
       <div class="content">
          <div class="main">
            <div class="input-group input-group-lg mgt50">
              <input v-model="Username" type="text" class="form-control w600" placeholder="Username" aria-describedby="sizing-addon1">
            </div>
            <div class="input-group input-group-lg mgt20">
              <input v-model="Password" type="password" @keyup.enter="login" class="form-control w600" placeholder="Password" aria-describedby="sizing-addon1">
            </div>
            <div class="input-group input-group-lg mgt20">
              <button class="form-control btn btn-default w600" @click="login()">Login</button>
            </div>
          </div>
       </div>
  </div>
</template>

<script>
import Crypto from 'node-crypto'
const cp = new Crypto('myapp')
export default {
  data () {
    return {
      Username: '',
      Password: ''
    }
  },
  methods: {
    login () {
      let content = this.Password.trim()
      let password = cp.hex(content)
      this.axios.get('/login', {
        params: {
          user: this.Username,
          password: password
        }
      })
      .then(data => {
        if (data.data.status === 1) {
          localStorage.setItem('adminName', this.Username)
          this.$store.dispatch('setToken', {
            token: data.data.token
          })
          this.$Notice.success({
            title: '登录成功'
          })
          this.$router.replace('/admin/index')
        } else {
          this.$Message.warning(data.data.msg)
        }
      })
      .catch(data => {
        console.log('error')
      })
    }
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
    color: #baccbe;
    width: 100%;
    height:100%;
    overflow:auto;
    z-index: 2;
}
.content{
    position:absolute;
    top:25%;
    left:25%;
    width:800px;
    height:400px;
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
</style>
