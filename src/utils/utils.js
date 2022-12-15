import loginAxios from "@/axios/login"
import axios from "@/axios/login"
import axiosNative from "axios"
import tools from "./tools"
import store from "../store"
import router from "../router";

const { error } = tools;
/**
 * @desc 登录接口
 * @param username 用户名
 * @param password  密码
 * @returns {Promise<AxiosResponse<any>>}
 */
const login = (username = tools.error("username"), password) => {
  return loginAxios.post("/auth/login", {
    login_type:2,
    username,
    password
  },{
    isLogin:true
  })
}
/**
 * @description 获取登录二维码
 * @param  type
 */
const getQRCode = (type = error("type")) => {
  let host = window.location.origin;
  let redirect = encodeURIComponent(host + `/login`);

  return new Promise((resolve, reject) => {
    switch (type) {
      case "微信":
        break;

      case "企微":
        // 218.89.142.132:8000
        resolve("https://open.work.weixin.qq.com/wwopen/sso/qrConnect?login_type=jssdk&appid=ww47d0ecb228c2ed20&agentid=1000011&redirect_uri=" + redirect + "&state=sip_Wxlogin&href=&lang=zh&version=1.2.5");
        break;
      case "钉钉":
        // 回调 URL
        let goto = encodeURIComponent('https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=dingrmvtrcdhdmaeykd8&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=' + redirect)
        const config = {
          goto: goto, //请参考注释里的方式
          style: "border:none;background-color:#FFFFFF;margin:0;",
        }
        let d = "https://login.dingtalk.com/login/qrcode.htm?goto=" + config.goto;
        d += config.style ? "&style=" + encodeURIComponent(config.style) : "";
        d += config.href ? "&href=" + config.href : "";
        resolve(d)
        let handleMessage = function (event) {
          let origin = event.origin;
          if (origin == "https://login.dingtalk.com") { //判断是否来自ddLogin扫码事件。
            let loginTmpCode = event.data;
            window.location.href = "https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=ww47d0ecb228c2ed20&response_type=code&scope=snsapi_login&state=Dinglogin&redirect_uri=" + redirect + "&loginTmpCode=" + loginTmpCode;
          }
        };
        if (typeof window.addEventListener != 'undefined') {
          window.addEventListener('message', handleMessage, false);
        } else if (typeof window.attachEvent != 'undefined') {
          window.attachEvent('onmessage', handleMessage);
        }
        break;
    }
  })
}

/**
 * @description 获取登录回调
 * @param code
 * @param type 1.微信 2.企微 3.钉钉
 * @returns {Promise<AxiosResponse<any>>}
 */
function getLoginCallback (code = null, type = 1) {
  return loginAxios.get("/auth/callback?code=" + code + "&type=" + type);
}

/**
 * @description 绑定账号
 * @param type 1.微信 2.企微 3.钉钉
 * @param openid 第三方唯一标识
 * @param username 用户名
 * @param password 用户密码
 * @returns {Promise<AxiosResponse<any>>}
 */
function bindAccount (type = 1, openid = error("openid"), username = error("username"), password = error("password")) {
  return loginAxios.post("/auth/binding", {
    type,
    openid,
    username,
    password
  });
}

/**
 * @description 退出登录
 * @return {Promise<AxiosResponse<any>>}
 */
function logout () {
  return loginAxios.post("/auth/logout");
}

/**
 * @description 切换角色
 * @param id
 */
function toggleRole (id = error("id")) {
  return loginAxios.get("/site/switch?id=" + id);
}

/**
 * @description 清空缓存的登录信息
 */
function clearLoginData () {
  store.commit("setUserInfo", null);
  store.commit("setToken", null);
  store.commit("setRouterMap", null);
  store.commit("setMenuConfig", []);
  store.commit("setMenuNames", null)
}

/**
 * @description 修改密码
 * @param old_password 旧密码
 * @param password 新密码
 * @param re_password 确认密码
 * @return {Promise<AxiosResponse<any>>}
 */
function modifyPassword ({ old_password, password, re_password }) {
  return loginAxios.post("/auth/changepwd", {
    old_password, password, re_password
  })
}

/**
 * @description 获取菜单权限
 * @return {Promise<AxiosResponse<any>>}
 */
function getMenu () {
  return loginAxios.get("/site/index");
}

let browser = tools.GetBrowser();
if (browser.name === "IE") {

}

/**********************************************************登录 End  角色 Start*******************************************************************/
/**
 * @description 获取角色类型
 * @return {Promise<AxiosResponse<any>>}
 */
function getRoleType () {
  return loginAxios.get("/site/role-type");
}

/**
 * @description 获取菜单权限配置列表 (角色管理处)
 * @return {Promise<AxiosResponse<any>>}
 */
function getMenuConfigList (type) {
  return loginAxios.get("/site/menu", {
    params: {
      type
    }
  });
}

/**
 * @description 校区列表 (角色管理处)
 * @return {Promise<AxiosResponse<any>>}
 */
function getCampusList () {
  return loginAxios.get("/site/school");
}

/**
 * @description 按校区获取班级数据
 * @param {string} school_ids 校区id集合 逗号隔开
 * @return {Promise<AxiosResponse<any>>}
 */
function getClassesList (school_ids, menu_ids) {
  return loginAxios.post("/site/classes", { school_ids, menu_ids });
}

/*****************************************************公用api********************************************************************/
/**
 * @description 获取年级列表
 * @return {Promise<AxiosResponse<any>>}
 */
function getGradeList () {
  return loginAxios.get("/site/grades");
}
/**
 * @description 获取班级
 * */
function getClassList(class_type,school_id,grade_id){
  return loginAxios.post("/attendance/get-class-list",{
    class_type,
    school_id,
    grade_id
  })
}
/**
 * @description 获取校区列表
 * @return {Promise<AxiosResponse<any>>}
 */
function getSchoolList () {
  return new Promise((resolve, reject) => {
    let userinfo = tools.getSession("USER_INFO");
    resolve(userinfo.school_arr)
  })
}
function uploadToOSS(file){
  return new Promise(((resolve, reject) => {
    axios.post("/api/upload/get-upload-addr").then(res=>{
      let {upload_addr} = res.data.data;
      axiosNative.put(upload_addr, file,{
        headers:{
          "Content-Type":file.type
        }
      }).then(_=>{
        resolve(upload_addr.split("?")[0])
      }).catch(err=>{
        // 上传失败的原因可能是上传链接失效, 但是这个可能性几乎不会出现
        reject({
          data:"",
          msg:"上传失败",
          status:403
        })
      })
    }).catch(err=>{
      // 获取上传链接失败
      reject(err)
    })
  }))
}

// 角色相关的api
const roleApi = {
  getRoleType,
  getMenuConfigList,
  getCampusList,
  getClassesList
}
// 登录相关的api
const loginApi = {
  login,
  getQRCode,
  getLoginCallback,
  bindAccount,
  logout,
  clearLoginData,
  toggleRole,
  getMenu,
  modifyPassword
}
// 公共api
const commonApi = {
  getGradeList,
  getSchoolList,
  getClassList
}
export const utils = {
  loginApi,
  roleApi,
  commonApi
}
export default {
  install (vue, option) {
    vue.prototype.$utils = utils;
    vue.prototype.$loginAxios = loginAxios;
    vue.prototype.$axios = axios;
    vue.prototype.$tools = tools;
    vue.prototype.$uploadToOSS = uploadToOSS;
  }
}
