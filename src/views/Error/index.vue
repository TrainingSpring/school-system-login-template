<template>
<div class="LoginError">
  <div>
    <el-result v-if="type === 0" icon="warning" title="警告" subTitle="此账号不可登录系统，请联系管理员">
      <template slot="extra">
        <el-button type="primary" size="medium" @click="back">返回</el-button>
      </template>
    </el-result>
    <el-result v-else-if="type === 1" icon="error" title="警告" subTitle="暂无权限，请联系管理员">
      <template slot="extra">
        <el-button type="primary" size="medium" @click="back">返回</el-button>
      </template>
    </el-result>
    <el-result v-else-if="type === 2" icon="error" title="网络错误" subTitle="网络连接失败 , 请检查网络设置!">
      <template slot="extra">
        <el-button type="primary" size="medium" @click="back">返回</el-button>
      </template>
    </el-result>
    <t-result v-else-if="type===404" type="404">
      <template slot="footer">
        <el-button style="margin-top: 20px" type="primary" @click="back" size="medium">返回</el-button>
      </template>
    </t-result>
  </div>
</div>
</template>

<script>
export default {
  name: "login_error",
  data(){
    return{
      type:1
    }
  },
  mounted() {
    this.type = parseInt(this.$route.query.type+"");
  },
  methods:{
    back(){
      this.$router.back();
    }
  }
}
</script>

<style scoped>
  .LoginError{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
</style>
