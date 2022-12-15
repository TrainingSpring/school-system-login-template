<template>
  <div class="t-submenu" :class="{'t-transition':transition}" :style="{maxHeight:isShow?childrenHeight+'px':'56px'}">
    <div class="t-submenu-title" @click="onChange">
      <slot name="title"></slot>
      {{height}}
<!--      <span class="t-icon">
         <i class="el-icon-arrow-up "></i>
      </span>-->
      <span class="t-icon">
        <i v-if="!isShow" class="el-icon-arrow-down"></i>
        <i v-else class="el-icon-arrow-up"></i>
      </span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "SubMenu",
  inject:['rootMenu'],
  props:{
    index:String,
  },
  data(){
    return{
      isShow:false,
      transition:false,
      childrenHeight:1000
    }
  },
  computed:{
    height(){

      return ;
    }
  },
  mounted() {
    this.eachRouter();
    // this.getHeight();
  },
  watch:{
    index(n){
      this.rootMenu.$children.forEach((item,index)=>{
        item.transition = false;
        item.isShow = false;
        item.eachRouter();
      })
    }
  },
  methods:{
    getHeight(){
      let num = 56;
      this.$children.forEach(item=>{
        num += item.$children.length * 60;
      })

      this.childrenHeight = num;
    },
    onChange(){
      let root = this.rootMenu;
      let slots = root.$slots.default;
      let id = this._uid;
      if (root.uniqueOpened){
        slots.forEach(item=>{
          let cid = item.componentInstance._uid;
          if (cid !== id)item.componentInstance.isShow = false;
          else{
            this.transition = true;
            this.isShow = !this.isShow;
          }

        })
      }
    },
    eachRouter(){
      let matched = this.$route.matched;
      let flag = false;
      for (let i = 0,len = matched.length;i<len;i++){
        let item = matched[i];
        if (item.path === this.index) {
          this.transition = true;
          this.isShow = true;
          break;
        }
      }
    }
  }
}
</script>

<style lang="scss">
.t-submenu{
  font-weight: bold;
  overflow: hidden;
  .t-submenu-title{
    padding-left: 20px;
    height: 56px;
    line-height: 56px;
    cursor: pointer;
    .t-icon{
      float: right;
      margin-right: 20px;
    }
  }
  .t-menu-item{
    font-weight: 100;
  }
  .t-menu-item-active{
    color: #0B055B;
    border-bottom: none;
    background-color: #E8EDFF;
    border-right: 4px solid #1d2088;
  }
}
.t-transition{
  transition: 200ms all linear;
}
</style>