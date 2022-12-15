import tools from "../utils/tools"

const {loginInfo, token, schoolList, loginType, userInfo, menuConfig, routerMap,menuNames} = tools.constants;
const {getSession, getStorage, setSession, setStorage} = tools;
export default {
    // 设置token数据
    setToken(state, payload) {
        state.token = payload;
        setSession(token, payload);

    },
    // 设置登录的数据: 账号和密码
    setLoginInfo(state, payload) {
        state.loginInfo = payload;
        setStorage(loginInfo, payload);

    },
    // 设置第三方登录方式
    setLoginType(state, payload) {
        state.loginType = payload;
        setSession(loginType, payload);

    },
    // 写入用户信息
    setUserInfo(state, payload) {
        state.userInfo = payload;
        setSession(userInfo, payload);

    },
    // 设置右侧菜单的索引
    setRightMenuIndex(state, payload) {
        state.rightMenuIndex = payload;

    },
    // 写入用户可用菜单列表
    setMenuConfig(state, payload) {
        state.menuConfig = payload;
        setSession(menuConfig, payload);

    },
    // 写入路由映射
    setRouterMap(state, payload) {
        state.routerMap = payload;
        setSession(routerMap, payload);
    },
    // 写入菜单名字列表
    setMenuNames(state, payload) {
        state.menuNames = payload;
        setSession(menuNames, payload);
    },
    // 写入当前角色的校区列表
    setSchoolList(state, payload) {
        state.schoolList = payload;
        setSession(schoolList, payload);
    },
    // 设置页面的风格
    setPageStyle(state,payload){
        state.pageStyle = payload;
    },
    // 设置页面的风格
    setPageCustomStyle(state,payload){
        state.pageCustomStyle = payload;
    },
    setBreadStyle(state,payload){
        state.breadStyle = payload;
    },
    // 设置列表的当前页面
    setPage(state,payload){
        state.page = payload;
    },
    // 设置水印状态
    setWatermark(state,payload){
        state.watermark = {
            ...state.watermark,
            ...payload
        };
    },
    // 设置网络问题是否提示
    setShowNetError(state,payload){
        state.showNetError = payload;
    }
}
