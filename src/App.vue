<template>
  <div id="app">
    <watermark position="absolute" :config="watermark"/>
    <!-- 一级路由出口 -->
    <router-view></router-view>
  </div>
</template>
<script>
import {mapGetters, mapState} from "vuex";
import Watermark from "./components/Watermark/Watermark";

export default {
  computed:{
    ...mapGetters(["userInfo"]),
    ...mapState(["watermark"]),
    // 水印文字
    watermarkText(){
      let {userinfo,school_arr} = this.userInfo;
      let date = (new Date()).Format("yyyy-MM-dd");
      let school = []
      school_arr = ["达州市鸿鹄高中"]
      for (let k in school_arr){
        if (school.length === 0)
          school.push(school_arr[k]+"    ");
        else {
          school = [];
          break;
        }
      }
      return  `${school[0]||""}${userinfo.username === "admin" ?"admin":userinfo.username.slice(-4)}    ${date}`
    },
  },
  mounted() {

  },
  data(){
    return {
      watermarkInfo:{
        size:24,
        angle:30,
        color:"#ccc",
        between:[200,100]
      },
      text:""
    }
  },
  components:{
    watermark:Watermark
  }
}
</script>
<style lang="scss"  >
#app {
  height: 100%;
}
</style>
