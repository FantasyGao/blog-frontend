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
	    width:80%;
	    border-radius: 10px; 
	    margin-left: 10%;
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
.body table{
	width: 80%
}
.body table th,
.body table td {
    border: 1px solid #928787 !important;
  }
</style>
