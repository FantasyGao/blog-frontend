<template>
  <div class="hello">
    <div class="back" @click="changeBack()">
       <img :src="imgSrc" width="100%" height="100%"/>
    </div>
    <div v-bind:class="[isPC ? PC_list : Phone_list]">
      <router-link :to="{ name: 'Index'}">
        <div class="bolg">» BLOG</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      isPC: this.$store.state.isPC,
      Phone_list: 'info_phone',
      PC_list: 'info',
      imgSrc: '/static/images/9.jpg'
    }
  },
  methods: {
    changeBack () {
      this.imgSrc = '/static/images/' + Math.ceil(Math.random() * 10) + '.jpg'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.back{
    position:fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
}
.info{
    width:600px;
    height:400px;
    background: #000000;
    border-radius:20px;
    position:fixed;
    opacity:0.6;
    top:50%;
    left:50%;
    margin-left:-300px;
    margin-top:-200px;
}
img{
    width:100%;
    border-radius: 0px; 
    border:  none;
    margin-left: 0px;
}
.info_phone {
    width: 80%;
    height: 40%;
    background: #000000;
    border-radius:20px;
    opacity:0.6;
    position: fixed;
    top: 40%;
    left: 50%;
    margin-left: -40%;
    margin-top: -20%;
}
.bolg{
    width:80%;
    margin-left:10%;
    margin-top:40%;
    background: #9091a0;
    line-height: 47px;
    border-radius: 15px;
    font-size:16px;
    color:black;
    opacity:1;
    font-weight:800;
    padding-left: 10px;
}
</style>
