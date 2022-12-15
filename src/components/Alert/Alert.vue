<template>
  <div class="t-alert" :class="color" :style="{justifyContent:align==='left'?'flex-start':align==='center'?'center':'flex-end'}">
    <div class="t-icon">
      <i :class="icon"></i>
    </div>
    <div class="t-text">
      <span class="t-title">{{title}}</span>
      <span class="t-subTitle">{{subTitle}}</span>
    </div>
  </div>
</template>

<script>
export default {
name: "Alert",
  props:{
    align:{
      type:String,
      default:()=>'left'
    },
    type:{
      type:String,
      default:()=>"info"
    },
    title:String,
    subTitle:String
  },
  computed:{
    icon(){
      let type = this.type;
      switch (type){
        case "success":
          return "el-icon-check"
        case 'info':
          return ""
        case 'error':
          return "el-icon-close"
      }
    },
    color(){
      let type = this.type;
      switch (type){
        case "success":
          return "t-success"
        case 'info':
          return "t-info"
        case 'error':
          return "t-error"
      }

    }
  }
}
</script>

<style scoped lang="scss">
.t-alert{
  min-height: 54px;
  display: flex;
  border-radius: 4px;
  align-items: center;
  padding: 10px;
  .t-icon{
    width: 24px;
    height: 24px;
    border-radius: 50%;
    text-align: center;
    line-height: 24px;
    margin-right: 15px;
  }
  .t-text{
    font-size: 16px;
    color: #666666;
    //flex: 1;
    //display: inline-block;
    .t-subTitle{
      color: #999999;
      margin-left: 15px;
      font-size: 14px;
    }
  }
}
.t-success{
  background: #E5F1FF;
  border: 1px solid #3491FA;
  .t-icon{
    border:1px solid #3491FA;
    color: #3491FA;
  }
}
.t-error{
  background: #FFECE8;
  border: 1px solid #F53F3F;
  .t-icon{
    border:1px solid #F53F3F;
    color: #F53F3F;
  }
}
.t-info{
  background: #F5F7FA;
  .t-icon{
    border:1px solid #666666;
  }
}
</style>