<template>
  <div class="hello">
      <ul class="listItem" v-for="item in articleList" v-if="isPC">
          <li class="time">{{item.time}}  »   </li>
          <li class="title">
            <router-link :to="{ name: 'article', params: { id: item.id }}"><span>{{item.title}}</span></router-link>
          </li>
          <li class="markNum">({{item.markNum}}条评论)</li>
      </ul>
      <ul class="listItem" v-for="item in articleList" v-if="!isPC">
          <li class="time">{{item.time}}</li>
          <li class="markNum">({{item.markNum}}条评论)</li>
          <li class="title">»
            <router-link :to="{ name: 'article', params: { id: item.id }}"><span>{{item.title}}</span></router-link>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
  props: ['articleList'],
  data () {
    return {
      isPC: this.$store.state.isPC
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
   width:100%;
   height:100%;
}
.listItem{
   list-style:none;
   display:inline-block;
   width:80%;
   font-size:16px;
   line-height:30px;
   margin-top:5px;
}
.listItem .title{
  float:left;
  margin-left:10%;
  line-height: 30px;
}
.listItem .title:hover{
  border-bottom:1px solid #887f7f;
  cursor:pointer
}
.listItem .time{
  float:left;
  font-family: Georgia, serif;
}
span{
  color:black
}
</style>
