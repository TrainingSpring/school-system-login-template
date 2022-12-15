<template>
  <div class="t-card" :style="{borderRadius:shape==='rect'?0:'10px'}">
    <slot name="header"></slot>
    <div class="t-card-title" :style="{textAlign:titleAlign}">
      <span style="display: inline-block;font-weight: 700;font-size: 16px;" :style="{...titleStyle}">{{title}}</span>
      <slot name="header-right"></slot>
    </div>
    <div class="t-card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "t-card",
  props:{
    // 标题
    title:String,
    // 标题对其方式  left,center,right
    titleAlign:{
      type:String,
      default(){
        return "left"
      }
    },
    // 形状  , rect , round
    shape:{
      type:String,
      default:"rect"
    },
    // 标题的样式
    titleStyle:Object,
    // Card的背景颜色
    /*bgColor: {type:String,default() {
        return "white";
      }},*/
  }
}
</script>

<style scoped lang="scss">
.t-card{
  overflow: hidden;
}
</style>
