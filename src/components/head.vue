<template>
    <div class="head">
        <div class="wrap">
            <div class="site-branding-text">
                <p class="site-title"><a href="/" rel="home">FantasyGao's BLOG</a></p>
                <p class="site-description">Trying to find the truth</p>
            </div>
	    </div>
    </div>
</template>
<style scoped>
.head {
    width:100%;
    background:url('/static/images/1.jpg') no-repeat;
    box-shadow: 1px 1px 1px 1px;
}
.wrap {
    position: relative;
    color:white
}
@media screen and (min-width: 1600px){
   .site-title {
       font-size: 36px;
       font-weight: 800;
   }
   .wrap {
        top: 60px;
    }
    .head{
        height:160px;
    }
}
@media screen and (min-width: 800px ) and (max-width: 1600px){
   .site-title {
       font-size: 30px;
       font-weight: 700;
   }
    .wrap {
        top: 45px;
    }
    .head{
        height:120px;
    }
}
@media screen and (max-width: 800px){
   .site-title {
       font-size: 20px;
       font-weight: 600;
   }
   .wrap {
        top: 40px;
    }
    .head{
        height:100px;
    }
}
.site-title {
    clear: none;
    line-height: 1.25;
    margin: 0;
    padding: 0;
    text-transform: uppercase;
    color:white;
    letter-spacing: 0 !important;
    text-shadow:2px -2px #8FC5D9;
}
.site-title a{
    color:white
}
.site-description {
    font-size:16px;
    margin-top:5px;
}
@media screen and (min-width: 48em){
    .wrap {
        max-width: 1000px;
        padding-left: 3em;
        padding-right: 3em;
        margin:auto
    }
}
@media screen and (max-width: 48em){
    .wrap {
        padding-left: 3em;
        padding-right: 3em;
    }
}
</style>
