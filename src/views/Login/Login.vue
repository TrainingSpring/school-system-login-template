<template>
  <div class="login">
    <div class="header-box t-color-primary">
      <div class="header t-main">
        <img class="logo" src="../../assets/img/logo_main.png" alt=""/>
        <div class="title">欢迎登录</div>
      </div>
    </div>
    <div class="content t-bg-color-primary">
      <div class="box t-main">
        <div class="img">
          <img src="../../assets/img/img_1.png" alt=""/>
        </div>
        <div class="login-box">
          <div class="t-bg-color-primary-1" style="height: 12px"></div>
          <div class="input-top" v-if="type !== 2">
            <div class="top t-color-primary">
              <img src="../../assets/img/left-logo.png" alt="" style="width:90%">
              <!--							<span>鸿鹄教育信息化</span>-->
            </div>
            <div v-if="type === 0" :style="{ opacity: errorDisplay }" class="alert">
              <el-alert :title="errorText" type="error" center :closable="false" show-icon></el-alert>
            </div>
          </div>
          <div v-if="type === 0" class="input-type input-type-0">
            <div class="input">
              <div class="item">
                <el-input type="text" placeholder="请输入账号" @enter="signIn" v-model="account">
                  <template slot="prepend"><i class="el-icon-user"></i></template>
                </el-input>
              </div>
              <div class="item">
                <el-input type="password" @enter="signIn" placeholder="请输入密码" v-model="password">
                  <template slot="prepend"><i class="el-icon-lock"></i></template>
                </el-input>
              </div>
              <div class="item">
                <el-checkbox v-model="remember" style="font-size: 10px !important" class="el-checkbox__label" size="mini">记住密码</el-checkbox>
              </div>
              <div class="item">
                <div class="btn">
                  <el-button type="primary" size="medium" style="width: 100%" @click="signIn" :loading="btnLoading">登&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
                </div>
              </div>
            </div>
            <div class="otherLogin">
              <div class="login-type t-color-font-2" v-for="(item, index) in OtherLogin" @click="checkScanLogin(index)">
                <img :src="item.src" alt="logo"/>
                <span>{{ item.text }}扫码</span>
              </div>
            </div>
          </div>
          <div v-if="type === 1" class="input-type input-type-1" style="padding: 0">
            <iframe
                :src="iframeUrl"
                id="iframe"
                frameborder="0"
                width="300px"
                :height="OtherLoginType.text === '企微' ? '380px' : '300px'"
            ></iframe>
            <div class="text t-text-center t-color-font-3">
              <!--                <p><router-link class="t-color-info" to="#">无法显示二维码?</router-link></p>-->
              <p class="t-color-info t-cursor" @click="type = 0">使用账号密码登录</p>
            </div>
          </div>
          <div v-if="type === 2" class="input-type input-type-2">
            <div class="scanState">
              <img src="../../assets/img/success.png" alt="success"/>
              <div class="text">
                <h3 class="t-color-font">扫码成功</h3>
                <h6 class="t-color-font-1">初次登录需绑定账户</h6>
              </div>
            </div>
            <div class="input">
              <div class="item">
                <el-input placeholder="请输入账号" v-model="account">
                  <template slot="prepend"><i class="el-icon-user"></i></template>
                </el-input>
              </div>
              <div class="item">
                <el-input type="password" placeholder="请输入密码" v-model="password">
                  <template slot="prepend"><i class="el-icon-lock"></i></template>
                </el-input>
              </div>
              <div class="btn">
                <el-button type="primary" size="medium" style="width: 100%" @click="bindAccount" :loading="btnLoading">绑定账号</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'

export default {
  name: 'login',
  data() {
    return {
      // 按钮加载状态
      btnLoading: false,
      // iframe的url
      iframeUrl: null,
      // 账号
      account: null,
      // 密码
      password: null,
      // 记住密码
      remember: false,
      // 错误提示文本
      errorText: '错误提示',
      errorDisplay: 0,
      type: 0,
      RQCodeSrc: '',
      openid: null,
      OtherLogin: [
        /*{
                src:require('../../assets/img/wechat.png'),
                text:"微信"
              },*/
        {
          src: require('../../assets/img/wechat_firm.png'),
          text: '企微'
        },
        {
          src: require('../../assets/img/ding.png'),
          text: '钉钉'
        }
      ],
      OtherLoginType: {
        src: require('../../assets/img/wechat.png'),
        text: '微信'
      }
    }
  },
  mounted() {
    this.init()
    // document.onkeydown = e => {
    // 	var keycode = document.all ? event.keyCode : e.which
    // 	if (keycode == 13) {
    // 		this.signIn()
    // 		return false
    // 	}
    // }
  },
  computed: {
    ...mapGetters(['token', 'loginInfo', 'loginType'])
  },
  methods: {
    ...mapMutations(['setToken', 'setLoginInfo', 'setLoginType', 'setUserInfo', 'setMenuConfig', 'setSchoolList']),
    ...mapActions(['analyseRouter']),
    /**
     *  初始化
     * */

    init() {
      this.$utils.loginApi.clearLoginData()
      // 获取用户保存的账号和密码信息
      let loginInfo = this.loginInfo
      // 链接上的query数据 (用于第三方登录)
      // 包含code,state,appid
      let query = this.$route.query
      // 判断是否获取到用户的登录code等信息
      if (!!query.state) {
        let loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(255, 255, 255, 0.7)'
        })
        let loginType = this.loginType === '企微' ? 2 : this.loginType === '钉钉' ? 3 : 1
        this.$utils.loginApi
            .getLoginCallback(query.code, loginType)
            .then(res => {

              loading.close()
              let {data, error} = res.data
              // 是否需要绑定
              if (data.is_binding === 1) {
                this.type = 2
                this.openid = data.openid
              } else if (data.is_binding === 0) {
                this.setLoginState(res)
              }
            })
            .catch(() => {
              this.$router.replace('/login')
              loading.close()
            })
      }
      // 判断用户是否有记住密码
      if (loginInfo == null) return
      let {username, password} = loginInfo
      this.account = username
      this.password = password
      this.remember = true
    },
    /**
     * @desc 当按钮点击扫码登录的时候触发
     * @param index
     * @constructor
     */
    checkScanLogin(index) {
      this.iframeUrl = ''
      let msg = this.OtherLogin[index].text
      this.setLoginType(msg)
      this.$nextTick(() => {
        this.$utils.loginApi.getQRCode(msg).then(res => {
          this.iframeUrl = res
        })
        this.type = 1
        this.OtherLoginType = this.OtherLogin[index]
      })
    },
    /**
     * 绑定账号按钮点击事件
     */
    bindAccount: function () {
      if (!this.checkLogin()) return this.$message.warning({message: "请输入账号和密码", duration: 2000});
      let loginType = this.loginType === '企微' ? 2 : this.loginType === '钉钉' ? 3 : 1
      this.$utils.loginApi.bindAccount(loginType, this.openid, this.account, this.password).then(res => {
        let {data, error} = res.data
        if (error.errorCode === 0) {
          this.$message.success({message: error.errorUserMsg, showClose: true})
          this.signIn()
        }
      })
    },
    /**
     * @description 检测登录信息是否完整
     * @return {boolean} true 完整 false 不完整
     * */
    checkLogin() {
      this.errorDisplay = 0
      let {account, password} = this;
      let msg = null
      if (account == null || account === "") {
        msg = '账号不允许为空! '
      } else if (password == null || password === "") {
        msg = '密码不允许为空! '
      }
      if (msg != null) {
        this.errorDisplay = 1
        this.errorText = msg
        return false
      }
      return true
    },
    // 登录成功后设置保存登录的状态信息
    setLoginState(res) {
      this.setUserInfo(res.data.data)
      this.$message({
        message: '登录成功',
        type: 'success',
        showClose: true
      })
      // 保存token
      this.setToken(res.data.data.token)
      this.analyseRouter()
          .then(res => {
            this.$router.push('/')
            this.btnLoading = false
          })
          .catch(err => {
            this.$router.push('/')
            this.btnLoading = false
          })
    },
    /**
     * 登录按钮点击事件
     */
    signIn() {
      if (!this.checkLogin() || this.btnLoading) return
      let {account, password} = this
      this.btnLoading = true
      this.$utils.loginApi
          .login(account, password)
          .then(res => {
            // this.setUserRole(res.data.data.user_role);
            this.setLoginState(res)
            // 保存账号密码
            if (this.remember) {
              this.setLoginInfo({
                username: account,
                password,
                id: res.data.data.userinfo.id
              })
            } else {
              this.setLoginInfo(null)
            }
          })
          .catch(res => {
            let msg = res.message;
            let text = "";
            if (!!msg) {
              msg = msg.toLowerCase();
              if (msg.indexOf("timeout") > -1) {
                text = "请求超时";
              } else if (msg.indexOf("network") > -1) {
                text = "网络连接错误";
              }
            } else {
              text = res.data.error.errorUserMsg
            }
            this.btnLoading = false
            this.errorText = text;
            this.errorDisplay = 1
          })
    }
  }
}
</script>

<style lang="scss" scoped>
.t-main {
  width: 900px !important;
}

.login {
  .header-box {
    display: flex;
    align-items: center;
    height: 116px;

    .header {
      display: flex;
      align-items: center;

      .logo {
        width: 308px;
        padding: 0 20px 0 80px;
      }

      .title {
        font-size: 24px;
        font-weight: bold;
        border-left: 1px solid #ccc;
        padding: 0 18px;
      }
    }
  }

  .content {
    .box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 560px;
      padding: 70px 0;

      .img {
        img {
          width: 384px;
          height: 298px;
        }
      }

      .login-box {
        background-color: white;
        width: 300px;

        .top {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 22px 0 0;

          img {
            width: 50px;
          }

          span {
            font-size: 18px;
            margin-left: 16px;
            font-weight: bold;
          }
        }

        .alert {
          opacity: 0;
          transition: 200ms;
          margin-bottom: 10px;
        }

        .input-type {
          padding: 0 16px;

          .item {
            margin-bottom: 16px;
          }

          .otherLogin {
            display: flex;
            align-items: center;
            justify-content: space-around;
            padding: 14px 0 34px 0;

            .login-type {
              display: flex;
              cursor: pointer;
              align-items: center;
              font-size: 12px;
              //flex: 1;
              img {
                width: 28px;
                height: 28px;
                margin-right: 8px;
              }

              span {
                transform: scale(0.833333);
              }
            }
          }
        }

        .input-type-1 {
          .code {
            padding: 10px;
            width: 160px;
            height: 160px;
            margin: 0 auto;
            border: 1px solid #ccc;

            img {
              width: 140px;
              height: 140px;
            }
          }

          .text {
            padding: 24px 0 31px 0;
            font-size: 12px;

            p {
              margin-bottom: 5px;
            }
          }
        }

        .input-type-2 {
          .scanState {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px 0;

            img {
              width: 41px;
              margin-right: 8px;
            }

            h3 {
              font-size: 20px;
              font-weight: 500;
            }
          }

          .input {
            padding: 36px 0 65px 0;
            border-top: 1px solid #ccc;

            .btn {
              margin-top: 24px;
            }
          }
        }
      }
    }
  }
}

.el-checkbox__label {
  font-size: 12px !important;
}
</style>
