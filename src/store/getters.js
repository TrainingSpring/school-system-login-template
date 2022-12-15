import tools from "../utils/tools"
const {loginInfo, schoolList, token, loginType, userInfo,userRole,menuConfig,routerMap,menuNames} = tools.constants;
const {getSession, getStorage} = tools;
export default {
    // 获取token
    token: (state) => {
        return state.token || getSession(token);
    },
    // 登录的信息
    loginInfo: state => state.loginInfo || getStorage(loginInfo),
    // 第三方登录的类型: 1 微信 2 企业微信 3 钉钉
    loginType: state => state.loginType || getSession(loginType),
    // 用户信息
    userInfo: state => state.userInfo || getSession(userInfo),
    // 用户可用菜单列表
    menuConfig:state => state.menuConfig.length === 0 ? getSession(menuConfig):state.menuConfig ,
    // 用户本地菜单配置
    routerMap:state=>state.routerMap || getSession(routerMap),
    // 用户端的菜单名列表
    menuNames:state=>state.menuNames || getSession(menuNames),
    // 用户的当前角色校区列表
    schoolList: state=>state.schoolList || getSession(schoolList),
}