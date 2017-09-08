<template>
  <div id="app">
    <router-view><headImg></headImg></router-view>
    <Back-top :height="200" :bottom="50"></Back-top>
  </div>
</template>

<script>
import headImg from './components/head.vue'
export default {
  components: {
    headImg
  }
}
</script>

<style>
#app {
  background-color: #f5f5d5;
}
@media screen and (max-width: 770px){
	img {
	    width:95%;
	    border-radius: 10px; 
	    margin-left: -30px;
	    border:  5px solid #675e5e;
	}
}
@media screen and (min-width: 770px){
	img {
	    width:50%;
	    border-radius: 10px; 
	    margin-left: 20%;
	    border:  5px solid #675e5e;
	}
}
pre{
	margin-top: 15px;
	background: #3b3838;
	border-radius: 15px;
}
pre code {
	background: #3b3838;
    color: #5dd7d1;
}
</style>
