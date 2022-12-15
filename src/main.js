import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import utils from "./utils/utils"
import "./assets/css/reset.css"
import "./assets/css/theme/index.css"
// import VueCropper from 'vue-cropper';
import myComponents from "./components/index";
import {message} from "./components/rewriteComponents";
//引入重置样式
import '@/assets/css/reset.css'
//注册全局过滤器
import tools from "./utils/tools";
// import 'element-ui/lib/theme-chalk/axios.css';
tools.listenPromiseCatch()
Vue.use(ElementUI);
// Vue.use(VueCropper);
Vue.use(myComponents);
Vue.config.productionTip = false
Vue.use(utils);
Vue.prototype.$message = message;
Vue.prototype.$OssAddress = process.env.VUE_APP_OSS_URL;

// 禁用缩放
// tools.disableMousewheel();
// Vue.http.options.credentials = true
// 兼容360
// import 'babel-polyfill'
// Vue.http.options.credentials = true

// Vue.prototype.$verify = Verify
export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
