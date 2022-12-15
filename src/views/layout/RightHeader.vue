<template>
  <div class="right-header">
    <div class="top-menu">
      <!--			<el-menu
              :default-active="$info.matched[1].path"
              class="el-menu-demo"
              mode="horizontal"
              router
              @select="handleSelect"
              active-text-color="rgba(246, 173, 60)"
            >
              <el-menu-item v-for="(item, axios) in menuConfig" :axios="routerMap[item.name]" @click="changeMenu(axios)" :key="'r' + axios">{{
                item.name
              }}</el-menu-item>
            </el-menu>-->
      <t-menu mode="horizontal" router style="height: 100%;padding-top: 10px;" v-model="$route.matched[1].path">
        <t-menu-item v-for="(item,index) in menuConfig" style="height:100%;margin:0 10px;font-size: 20px;" active-style="color:#1D2088;border-bottom:4px solid #1D2088;font-weight:700 !important;" :index="routerMap[item.name]">{{ item.name }}</t-menu-item>
      </t-menu>
    </div>
    <el-dropdown placement="bottom-start" @command="onDropDown">
      <div class="el-dropdown-link" style="display: flex; align-items: center; height: 100%">
        <div class="user">
          <img :src="user_info.avator === '' ? imgurl : user_info.avator" alt="头像" class="avatar" />
          <div class="info">
            <div class="name">{{ user_info.name }}</div>
            <div class="role">{{ user_info.role_name }}</div>
          </div>
        </div>
      </div>
      <el-dropdown-menu slot="dropdown" style="width: 140px; text-align: center;">
        <el-dropdown-item :command="0" v-if="!['3','0','5','6','4'].includes(user_info.type)">个人资料</el-dropdown-item>
        <el-dropdown-item :command="1" :divided="!['3','0','5','6','4'].includes(user_info.type)">切换角色</el-dropdown-item>
        <el-dropdown-item :command="4" v-if="!['3','0','5','6','4'].includes(user_info.type)" divided>问题反馈</el-dropdown-item>
        <el-dropdown-item :command="3" divided>修改密码</el-dropdown-item>
        <el-dropdown-item :command="2" divided>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog title="" :visible.sync="dialogVisible" :append-to-body="true" width="30%">
      <div class="roleTab">
        <div class="current">当前角色为: {{ user_info.role_name }}</div>
        <div class="tabRole">
          <p class="role-radio" v-for="(item, index) in userInfo.user_role" :key="'role' + index">
            <el-radio v-model="radioRole" :label="item.id"> {{ item.name }}</el-radio>
          </p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="toggleRole" :loading="loadingState">确定切换</el-button>
			</span>
    </el-dialog>
    <el-dialog title="修改密码" :visible.sync="modifyPasswordVisible" :append-to-body="true" :close-on-click-modal="false" width="350px">
      <div class="modifyPassword">
        <el-form label-width="80px">
          <el-form-item :model="form" label="原密码">
            <el-input v-model="form.oldPassword" style="width: 100% !important" placeholder="请输入原密码"></el-input>
          </el-form-item>
          <el-form-item :model="form" label="新密码">
            <el-input v-model="form.password" style="width: 100% !important" placeholder="请输入新的密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input v-model="form.confirmPassword" style="width: 100% !important" placeholder="再次输入新密码"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
				<el-button @click="modifyPasswordVisible = false">取 消</el-button>
				<el-button type="primary" @click="modifyPassword" :loading="loadingState">确认修改</el-button>
			</span>
    </el-dialog>
    <!-- 问题反馈 -->
    <el-dialog title="我要反馈" :visible.sync="feedbackShow" :close-on-click-modal="false" :append-to-body="true" width="350px">
      <div class="modifyPassword">
        <el-form ref="feedback" label-width="80px" :model="feedbackForm" :rules="feedbackRules">
          <el-form-item label="问题分类" prop="type">
            <el-select v-model="feedbackForm.type" class="feedback_type" :popper-append-to-body="false" placeholder="请选择">
              <el-option
                  v-for="item in feedbackTpeOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="情况说明" prop="content">
            <el-input
                placeholder="请填写你的问题和意见，感谢你的支持！"
                type="textarea"
                show-word-limit
                v-model.trim="feedbackForm.content"
                :autosize="{ minRows: 4, maxRows: 6}"
                maxlength="2000"></el-input>
          </el-form-item>
          <el-form-item label="上传图片">
            <el-upload
                accept="image/png, image/jpeg, image/jpg"
                ref="upload"
                action="http://www.baidu.com"
                list-type="picture-card"
                multiple
                :limit="6"
                :file-list="fileList"
                :class="isUploaded ? 'is-uploaded' : ''"
                :before-upload="imgUploadBefore"
                :headers="headers"
                :http-request="uploadImg"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-exceed="handleExceed"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="uploadDialogShow" :append-to-body="true">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            <p style="color: #999">（请上传6张及以内小于5M的png/jpg格式的图片）</p>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="feedbackSubmit" :loading="loadingState">提交</el-button>
			</span>
    </el-dialog>

    <!-- 问题反馈成功后弹框 -->
    <el-dialog :visible.sync="feedbackSuccessShow" :append-to-body="true" :close-on-click-modal="false" width="450px">
      <div style="padding: 50px 0 40px;text-align: center">
        <img src="../../assets/img/success.png" alt="" style="margin-bottom: 45px">
        <p style="margin-bottom: 15px">你反馈的关于鸿鹄教育信息化系统的建议和问题，已经提交成功！</p>
        <p style="margin-bottom: 60px">感谢你的反馈，我们收到后会尽快解决这些问题。</p>
        <el-button type="primary" @click="feedbackSuccessShow = false">返回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import img from '../../assets/img/默认头像男.png'
import config from '../../router/config'
export default {
  data() {
    // let validatePass1 = (rule, value, callback) => {
    //   let reg = new RegExp(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5/^@\-/(/)]/g)
    //   if(reg.test(value)){
    //     callback(new Error('内容包含非法字符，请查验后重试'));
    //   }else{
    //     callback()
    //   }
    // };
    return {
      headers: {
        'authorization': 'Bearer ' + sessionStorage.getItem('TOKEN')
      },
      form: {
        oldPassword: '',
        password: '',
        confirmPassword: ''
      },
      imgurl: img,
      // user: {
      // 	avatar:
      // 		'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202012%2F13%2F20201213132344_61479.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1644630495&t=f77fdadf80a71bf40954948b3d2656ad',
      // 	name: '',
      // 	role: ''
      // },
      dialogVisible: false,
      currentRole: '语文1-2-3授课教师',
      radioRole: null,
      loadingState: false,
      modifyPasswordVisible: false, // 修改密码弹窗显示
      feedbackShow: false,
      feedbackSuccessShow: false,
      feedbackTpeOptions: [],
      feedbackRules: {
        type: [{ required: true, message: '请选择反馈类型' }],
        content: [{ required: true, message: '请填写情况说明' }],
      },
      feedbackForm:{
        type: '',
        content: '',
        image: ''
      },

      uploadDialogShow: false,
      dialogImageUrl: '',
      isUploaded: false,  //是否传满6张图片
      fileList: [],
    }
  },

  computed: {
    ...mapGetters(['userInfo', 'menuConfig', 'routerMap']),
    user_info() {
      return this.userInfo.userinfo
    }
  },
  mounted() {
    this.activeIndex = this.$route.path
    this.$forceUpdate()

    this.getFeedbackConfig()
  },
  methods: {
    ...mapMutations(['setUserInfo']),
    ...mapActions(['analyseRouter']),
    /**'
     * @description 修改密码
     * */
    modifyPassword() {
      let { oldPassword, password, confirmPassword } = this.form
      this.$utils.loginApi
          .modifyPassword({
            old_password: oldPassword,
            password,
            re_password: confirmPassword
          })
          .then(res => {
            let { error } = res.data
            if (error.errorCode === 0) {
              this.$message.success({ message: error.errorUserMsg, showClose: true })
              this.$utils.loginApi.clearLoginData()
              this.$router.replace('/login')
            }
          })
    },

    changeMenu(index) {
      this.$store.commit('setRightMenuIndex', index)
    },
    /**
     * @description 切换角色
     */
    toggleRole() {
      this.loadingState = true
      if (this.radioRole == null) {
        this.loadingState = false
        return this.$message.warning('请选择角色');
      } else {
        this.$utils.loginApi.toggleRole(this.radioRole).then(res => {
          let { data, error } = res.data
          if (error.errorCode === 0) {
            this.dialogVisible = false
            let userInfo = this.userInfo
            userInfo.userinfo.role_name = data.role_name
            userInfo.userinfo.role_id = this.radioRole;
            userInfo.userinfo.current_role = this.radioRole;
            userInfo.school_arr = data.school_arr
            this.setUserInfo(userInfo)
            this.analyseRouter().then(res => {
              this.$router.push('/')
            })
          }
        })
      }
      this.loadingState = false
    },
    handleSelect(key) {
      let index
      for (let i = 0, len = config.length; i < len; i++) {
        let item = config[i]
        if (key === item.path) {
          index = i
          break
        }
      }
      this.$store.commit('setRightMenuIndex', index)
    },
    onDropDown(e) {
      switch (e) {
        case 0:
          this.$router.push('/PersonalDetails')
          break
        case 1:
          this.dialogVisible = true
          break
        case 2:
          this.$confirm('退出登录？退出后需重新登录', '提示', {
            confirmButtonText: '退出当前登录账号',
            cancelButtonText: '取消',
            type: 'warning',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                instance.confirmButtonLoading = true
                // instance.confirmButtonText = '执行中...';
                this.$utils.loginApi.logout().then((res) => {
                  this.$utils.loginApi.clearLoginData()
                  this.$message.success({ message: '退出登录成功', showClose: true })
                  this.$router.replace('/login')
                  instance.confirmButtonLoading = false
                }).catch(err=>instance.confirmButtonLoading = false)
              }
              done()
            }
          })
          break
        case 3:
          this.modifyPasswordVisible = true
          break;
        case 4:
          let id = JSON.parse(sessionStorage.getItem('USER_INFO')).user_role[0].type
          if(id == '4'){
            this.$router.push('/settings/system/feedback/list')
          }else{
            this.feedbackShow = true
          }
          break;
      }
    },

    getFeedbackConfig(){
      this.$loginAxios('/api/feedback/problem/type').then(res => {
        let data = res.data.data
        this.feedbackTpeOptions = data.teacher
      })
    },

    handleRemove(file, fileList) {
      this.isUploaded = false
      this.fileList = fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.uploadDialogShow = true;
    },

    handleExceed(){
      this.$message({
        type: 'warning',
        message: '所选文件个数超出最大上传数！',
        duration: 2000
      })
    },

    //图片上传前的回调
    imgUploadBefore(file) {

      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      // const isMP4 = file.type === 'audio/mp4' || file.type === 'video/mp4' || file.type === 'video/mpeg4';
      const isLt2M = file.size / 1024 / 1024 < 5;

      if (!isJPG) {
        this.$message({
          type: 'error',
          message: '上传图片只能是 jpg/png 格式!',
          duration: 2000
        })
      }
      if (!isLt2M) {
        this.$message({
          type: 'error',
          message: '上传图片大小不能超过 5MB!',
          duration: 2000
        })
      }
      return (isJPG) && isLt2M;
    },

    uploadImg(file) {
      let boo = this.imgUploadBefore(file.file)
      if (boo) {
        const loading = this.$loading({
          lock: true,
          text: '上传中',
          customClass: 'img-upload-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.$uploadToOSS(file.file).then(res => {
          this.feedbackForm.image += (res.split('/').slice(-1).join() + ',')
          this.fileList.push({
            name: file.filename,
            url: res
          })
          if(this.fileList.length === 6){
            this.isUploaded = true
          }
        }).finally(() => {
          loading.close()
        })
      }
    },

    feedbackSubmit(){
      this.$refs.feedback.validate().then(res => {
        let params = {...this.feedbackForm}
        if(params.image)  params.image = params.image.slice(0,-1)
        this.$loginAxios.post('/api/feedback/problem/teacher', params).then(res => {
          if (res.data.status === 0) {
            this.feedbackShow = false;
            this.feedbackSuccessShow = true
            this.$refs.feedback.resetFields()
            this.$refs.upload.clearFiles();
          }
        })
      }).catch(err => {
        // this.$message.warning("请输入完整的测评信息")
      })
    },

  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog{
  width: 644px !important;
}
::v-deep .is-uploaded .el-upload {
  display: none;
}

.el-menu.el-menu--horizontal {
  border-bottom: none;
  padding-top: 10px;
  // width:1000px;
}
.el-menu--horizontal > .el-menu-item {
  border-bottom: 4px solid transparent;
}
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 4px solid #1d2088;
}
::v-deep .el-menu--horizontal > .el-menu-item {
  font-weight: bold;
  font-size: 20px;
  margin: 0 calc(100vw * 0.0125833);
  color: #181878;
}
.right-header {
  display: flex;
  justify-content: space-between;
  position: relative;
   z-index: 2000;
  .top-menu {
    flex: 1;
    display: flex;
    justify-content: center;
  }
  .user {
    display: flex;
    align-items: center;
    .avatar {
      margin-right: 16px;
      width: 50px;
      height: 50px;
      border: 1px solid #1d2088;
      border-radius: 50%;
    }
    .info {
      font-size: 12px;
      color: #7f7f7f;
      margin-right: 40px;
      .name {
        color: #000000;
        font-weight: bold;
        font-size: 14px;
      }
    }
  }

}
.el-dialog__wrapper{
  .roleTab {
    margin-left: 20px;
  }
  .role-radio {
    margin-top: 20px;
  }
}

.feedback_type,
::v-deep.feedback_type .el-input{
  width: 100% !important;
}
</style>
