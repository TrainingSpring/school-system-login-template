<template>
  <li class="t-menu-item" :class="{'t-menu-item-active':rootMenu.currentActive===index}" :style="rootMenu.currentActive===index?activeStyle:''" @click="onChange">
    <slot></slot>
  </li>
</template>

<script>
export default {
  name: "MenuItem",
  inject:['rootMenu'],
  props:{
    index:String,
    activeStyle:String|Object
  },
  mounted() {

  },
  methods:{
    onChange(){
      let {router} = this.rootMenu;
      if (router){
        this.$router.push(this.index);
        this.rootMenu.$emit('change',this.index);
      }
    }
  }
}
</script>

<style lang="scss">

.t-menu-item{
  height: 48px;
  line-height: 48px;
  padding: 0 20px;
  cursor: pointer;
}
.t-menu-item.t-menu-item-active{
  color: #F8BF5D;
  border-bottom: 4px solid #F8BF5D;
}
.t-menu .t-submenu{
  .t-menu-item{
    padding-left: 40px;
  }
}
</style>
