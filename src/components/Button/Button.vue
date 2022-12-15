<template>
    <el-button v-bind="$attrs" v-on="$listeners"
    ><slot></slot></el-button>
</template>

<script>
import {Button} from "element-ui"
import {debounce} from "@/utils/tools";

export default {
  name: "t-button",
  props:{
    // 防抖
    debounce:Boolean
  },
  data(){
    return {
      debounceFunc:debounce
    }
  },
  components:{
    "el-button":Button
  },
  beforeMount() {
    if (this.debounce){
      this.$listeners.click = debounce(this.$listeners.click,false,500);
    }
  }
}
</script>

<style scoped>
</style>
