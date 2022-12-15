import axios from "axios";
import tools from "@/utils/tools";
import router from "../router";
import vuex from "../store/index"

import elem from "element-ui";
let axiosObj = axios.create({
    errorToCatch:true, // 是否将请求接口中不为0的错误通过fetch传递
    showMessage:true,   // 请求接口失败时, 返回status不为0时 是否显示提示
    baseURL: process.env.VUE_APP_API_URL,
    timeout:10000
});
axiosObj.interceptors.request.use(config => {
    let token = tools.getSession(tools.constants.token);
    let traceid = tools.getSession("traceId");
    if (token) {
        config.headers.authorization = "Bearer " + token;
        if (!!traceid) config.headers.traceid = traceid;
    }
    return config;
});
axiosObj.interceptors.response.use(
    response => {
        const {errorToCatch, showMessage} = response.config;
        let {status} = response.data;

        if ([0,104].includes(status))return Promise.resolve(response.data);
        else if(status === 100)router.push("/login");
        // 错误
        if (response.data.status !== 0) {
            if (showMessage)elem.Message.error({ message: response.data.msg, showClose: true })
            if (errorToCatch)
                return Promise.reject(response.data)
            else
                return Promise.resolve(response.data);
        }

    }, (err) => {
        tools.networkHandle(err,vuex.state.showNetError);
        return Promise.reject(err);
    }
);
//暴露配置好的axios
export default axiosObj;
