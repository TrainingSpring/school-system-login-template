<template>
  <div class="t-result">
    <div v-if="type==='empty'">
      <img src="../../assets/img/empty.png" :alt="text" />
      <p class="t-text">{{ text||"暂无数据" }}</p>
    </div>
    <div v-if="type==='404'">
      <img src="../../assets/img/404.png" :alt="text" />
      <p class="t-text">{{ text||" 唔...页面跑丢了 o(╥﹏╥)o" }}</p>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  name: "t-result",
  props:{
    type:{
      type: String,
      default(){
        return "empty"
      }
    },
    text:String
  }
}
</script>

<style scoped lang="scss">
.t-result{
  padding: 100px 0;
  width: 100%;
  text-align: center;
  >div{
    .t-text{
      font-size: 14px;
      margin-top: 20px;
      color: #666666;
    }
  }
}
</style>
