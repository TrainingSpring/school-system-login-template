
export default {
    home: "http://172.16.14.113:8080", // 当前项目部署地址
    token: null,
    loginInfo: null,    // 登录的账号和密码
    loginType: null,    // 第三方登录的类型:  微信  企微  钉钉
    userInfo: null,     // 用户信息
    rightMenuIndex:-1,   // 右侧菜单选中项下标
    menuConfig:[],      // 服务器菜单配置
    menuNames:null,      // 服务器菜单名称列表
    allRouter:null,    // 本地菜单配置
    routerMap:null,   // 路由映射
    pageStyle:0,        // 页面的风格 0 : 普通风格  1 : 面包屑导航和内容的颜色为白色
    schoolList:null,        // 校区列表
    page:1, // 列表当前页码
    pageCustomStyle:{}, // 自定义页面样式  Stylesheet对象
    breadStyle:{}, // 自定义面包屑样式
    watermark:{
        text:"", // 水印文字
        color:"#F2F1F0", // 水印颜色
        opacity:.3, // 透明度
        between:[100,200], // 间距
        size:18, // 大小
        power:true, // 开关
        fullscreen:false // 全屏展示?
    },
    showNetError:true // 网络错误提示

}
