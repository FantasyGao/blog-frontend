<template>
    <div class="col">
        <span class="leftS">{{option}}</span>
        <div class="right">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
  props: ['option']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.col{
    margin-top: 20px;
}
.col span{
    position: absolute;
    line-height:40px;
    font-weight: 600;
}
.leftS{
    float:left;
}
.right{
    margin-left: 60px;
}
</style>
