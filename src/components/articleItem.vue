<template>
    <div class="item">
        <router-link :to="{ name: 'article', params: { id: articleItem.id }}" class="row">
            <div class="col-xs-4 col-sm-4">
                <div style="height:140px;">
                    <img :src="articleItem.imgSrc" width="100%" height="100%"/>
                </div>
            </div>
            <div class="col-xs-8 col-sm-8">
                <div class="titleItem">{{articleItem.title}}</div>
                <div class="intrItem" id="intrItem">
                    <span v-html="articleItem.intr"></span>
                </div>
                <div class="timeItem">------ {{articleItem.time}}</div>
            </div>
        </router-link>
    </div>
</template>

<script>

export default {
  props: ['articleItem'],
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item{
    border-radius:5px;
    margin-top:5px;
    box-shadow:1px 2px 1px 2px #82858c;
}
.item:hover{
    box-shadow:2px 3px 2px 3px #82858c;
}
@media screen and (max-width: 770px){
    img{
        width:123%;
        border-radius: 10px; 
        margin-left:0px;
        border:  1px solid #675e5e;
    }
}
@media screen and (min-width: 770px){
  img {
      width:100%;
      border-radius: 10px; 
      margin-left: 5px;
      margin-top: 8px;
      border: none;
  }
}
.titleItem{
    text-align:center;
    letter-spacing: -0.01em;
    word-spacing: 0.2em;
    line-height: 1.5em;
    font-size: 260.5%;
    height:30px;
    color:black;
    text-decoration:1px solid black;
    overflow: hidden; 
    text-overflow: ellipsis;
    white-space: nowrap;
}
@media screen and (min-width: 1300px){
   .intrItem{
      height:95px;
   }
}
@media screen and (max-width: 1300px){/* 可视区域小于 850px, 设置更小font-size属性 */
   .titleItem{
     font-size:16px;
   }
   .intrItem{
     height:60px;
   }
}
@media screen and (max-width: 780px){
   .intrItem{
     height:0;
   }
}
.intrItem{
    width:100%;
    margin-top:10px;
    line-height: 1.2em;
    font-size: 200%;
    text-indent:1cm;
    word-break:break-all;
    overflow:hidden;
    color:black;
}
.timeItem{
    width:100%;
    margin-top:10px;
    text-align:right;
    padding-right:15px;
    font-family: Georgia, serif;
    letter-spacing: -0.01em;
    word-spacing: 0.2em;
    line-height: 1.8em;
    font-size: 202.5%;
    color:black;
    border-top:#a7a0a0 1px solid;
}
</style>
