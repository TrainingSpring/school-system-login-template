import axios from 'axios'
import tools from "@/utils/tools";
import router from "@/router";
import elem from "element-ui";
import vuex from "../store";



let axiosObj = axios.create({
    baseURL: process.env.VUE_APP_API_LOGIN_URL
});
axiosObj.defaults.timeout = 10000;//配置超时时间10秒
//配置请求拦截器
axiosObj.interceptors.request.use(config => {
    //取出token 鉴权。 token相当于人的身份证 一个角色的信息 权限全部存在这个加密的字符串里面
    let token = tools.getSession(tools.constants.token);
    let { isErrorMessage } = config;
    let traceid = tools.getSession('traceId');
    if (token) {
        config.headers.authorization = 'Bearer ' + token;
        if (!!traceid)
            config.headers.traceid = traceid;
    }
    config.isErrorMessage = isErrorMessage == null ? true : isErrorMessage;
    return config
}, err => {
    return Promise.reject(err)
})

/**
 * @description 相应拦截器  当errorCode == 100时为token失效 会跳转至登录页面
 *  当为1时  为错误状态 , 弹出错误提示
 *  且不为0时  走promise的catch 否则在then中
 */
axiosObj.interceptors.response.use((response) => {
    //解构数据
    let { isErrorMessage, isLogin } = response.config;
    let tid = response.data.traceId;
    let { error } = response.data;
    if (!error) return Promise.resolve(response);
    console.log(error);
    if (error.errorCode === 100 && !isLogin) {
        router.replace("/login").then(res=>{
            elem.Message.error({ message: error.errorUserMsg, showClose: true });
        }).catch(err=>{
            // router.go(0)
        });
        return Promise.reject(response)
    }
    tools.setSession("traceId", tid);
    if (error.errorCode === 103) {
        router.replace("/error?type=1")
    } else if (error.errorCode !== 0) {
        if (!!isErrorMessage) {
            elem.Message.error({ message: error.errorUserMsg, showClose: true });
        }
        return Promise.reject(response);
    } else {
        return Promise.resolve(response)
    }
},(err)=>{
    tools.networkHandle(err,vuex.state.showNetError);
    return Promise.reject(err);
})

//暴露配置好的axios
export default axiosObj
