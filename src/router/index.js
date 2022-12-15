import Vue from 'vue'
import VueRouter from 'vue-router'
import config from "./config"
import tools from "../utils/tools"
import vuex from "../store/index";
import Element from "element-ui"
import axios from "@/axios";
//阻止原地跳转的错误提示
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function (location) {
  return originalPush.call(this, location).catch(err => err)
}
//引入页面级别组件  首屏只加载必要的两个页面级别组件 登录&框架
import Login from '@/views/Login/Login.vue'
import Layout from '@/views/layout/Layout.vue'
import LoginError from "@/views/Error/index.vue"

Vue.use(VueRouter)
let root  = [];
// 对config进行依次正确的修改
tools.DFS(config,(res)=>{
  if (res._tier < 2){
    delete res.redirect
  }
},{child:"children"})
let routes = [
  {
    path: '/Login',
    name:"login",
    meta:{title:"登录"},
    component: Login
  },
  {
    name: "error",
    meta:{title:"错误"},
    path: "/error",
    component: LoginError,
  },
  {
    path:"/",
    name:"root",
    component: Layout,
    children:config
  },
];
const router = new VueRouter({
  mode: "history",
  routes
});


function getMenuIndex(route , title){
  for (let i = 0;i<route.length;i++){
    let item = route[i];
    if (item.name === title){
      return i;
    }
  }
  return -1;
}
let first = true;
router.beforeEach((to,from,next)=>{
  let matched = to.matched;
  let menuNames = vuex.getters.menuNames;
  let menuConfig = vuex.getters.menuConfig;
  let menuMap = vuex.getters.routerMap;
  let len = matched.length;
  let style = to.meta.style || 0;
  let customStyle = to.meta.customStyle || {};
  let breadStyle = to.meta.breadStyle || {};
  let token = vuex.getters.token;
  let mustLogin = to.meta.mustLogin;
  if (mustLogin === false){
    return next();
  }
  let com = matched[len-1].components.default;

  // 优化第一次加载数据 多次请求问题
  if (first && !!com.activated) {
    let ac = com.activated;
    com.activated = function() {
      first = false;
      this.$options.activated[0] = ac;
    }
  }
  try{
    Element.MessageBox.close()
  }catch (e){
  }
  if (!token && to.name!=='login')return next({path:"/login"});
  vuex.commit("setPageStyle",style);
  vuex.commit("setPageCustomStyle",customStyle);
  vuex.commit("setBreadStyle",breadStyle);
  if(to.name === "root"){
    if (!!menuNames && menuNames.includes("首页")){
      return next({
        path:"/main"
      })
    }
    if (from.name === "home")location.reload();
    next({
      path:"/home"
    })
    return;
  }else if (to.name === "home"){
    if (!!menuNames && menuNames.includes("首页")){
      return next({
        path:"/main"
      })
    }
    next();
    return;
  }
  if (len === 0){
    next({
      path:"/error",
      name:"error",
      query:{type:404}
    });
    return;
  }else if(len === 1){
    next();
    return;
  }
  let topMenu = matched[1].meta.title;
  let menuIndex = getMenuIndex(menuConfig,topMenu);
  vuex.dispatch("actionRightMenuIndex",menuIndex);
  // if ()
  if (len !== 5){
    let title = to.meta.title;
    tools.DFS(menuConfig,item=>{
      if (item.name === title){
        let first_child = item.child[0].name;
        let url = menuMap[first_child];
        if (!url){
          next({
            path:"/error",
            name:"error",
            query:{type:404}
          })
        }else{
          next({
            path:url
          })
        }
      }
    },{child:"child"});
  }else{
    let title = matched[len-2].meta.title;
    if (menuNames.includes(title) ){
      next();
    }else {
      next({
        path:"/error",
        name:"error",
        query:{type:1}
      })
    }
    next();
  }
});
router.afterEach((to,from)=>{
  if (to.name !== "login" && to.name !== "dataVisualization"){
    axios.get("/api/tool/watermark/index").then(res=>{
      let watermark = vuex.state.watermark;
      if (res.data.status === 0){
        let {school_name,
          name,
          time,
          color,
          opacity,
          on_off,
          font_size,
          portrait,
          username,
          transverse} = res.data.data;
        let text = `${school_name||""}    ${name}${username}    ${time}`;
        let result = {
          color,
          size:font_size,
          text,
          between:[transverse,portrait],
          opacity,
          power:on_off === 1,
          fullscreen:to.matched.length === 1
        };
        let flag = false;
        for (let k in result){
          const item = result[k],
              _item = watermark[k];
          if (item !== _item && k !== "image") {
            flag = false;
            break;
          }
        }
        if (!flag){
          vuex.commit("setWatermark",result);
        }

      }
    })
  }else{
    vuex.commit("setWatermark",{power:false})
  }
})
export default router
