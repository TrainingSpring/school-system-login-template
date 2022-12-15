<template>
  <ul class="t-menu" :class="{'t-menu-horizontal':mode==='horizontal'}">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  name: "Menu",
  provide(){
    return {
      rootMenu:this
    }
  },
  model:{
    prop:"currentActive",
    event:"change"
  },
  props:{
    // 菜单的模式 , 可选值 horizontal / vertical(默认)
    mode:{
      type:String,
      default(){
        return "vertical"
      }
    },
    // 当前激活的菜单
    currentActive:String,
    // 是否只展示一个子菜单
    uniqueOpened:Boolean,
    // router模式
    router:Boolean
  }
}
</script>

<style lang="scss">
.t-menu{
  color: #383fa0;
  .t-menu-item{
    font-weight: 500;
  }
}
.t-menu-horizontal{
  .t-menu-item{
    float: left;
  }
}
.t-menu-horizontal::after{
  clear: both;
}
</style>