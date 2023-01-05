```
├─src
    ├─assets            // 资源文件目录
    │  ├─css            // 样式文件目录
    │  │  └─theme       // 主题文件目录
    │  │      └─fonts   // 字体文件目录
    │  ├─img            // 图片资源
    │  └─scss           // scss文件目录
    ├─axios             // axios请求封装
    ├─components        // 组件目录
    │  ├─Alert          // 弹窗组件
    │  ├─BigDataSelect  // 大量数据选择组件(数据过多,且重复的时候使用)
    │  ├─Button         // 按钮组件 
    │  ├─Card           // 卡片组件
    │  ├─DatePicker     // 日期选择器
    │  ├─Derive         // 
    │  ├─Dialog         // 消息框组件
    │  ├─Menu           // 菜单组件
    │  ├─override       // 重写
    │  ├─Result         // 结果组件
    │  ├─SearchBlock    // 搜索栏组件
    │  ├─Table          // 表格组件
    │  ├─Textarea       // 输入框组件
    │  └─Watermark      // 水印组件
    ├─router            // 路由
    ├─store             // vuex
    ├─utils             // 工具
    └─views             // 页面视图
        ├─Error         // 错误页
        ├─Home          // 主页
        ├─layout        // 基础布局
        ├─Login         // 登录页面
        └─Settings      // 设置
```


## 目录的建设规则

 - 除了公共页面/一级路由页以外的所有页面不允许在views文件夹直接建立页面目录和文件
   - 比如> Login,Home属于一级路由页 , layout 属于公用布局页
   - 页面目录需要根据路由规则建立
   - 如路由如下: 教务->考勤管理->教师代课管理->列表
     - 则目录如下:
      
   ```
    views
      └─EDU
         └─work-manager
                  └─Settings
                        └─replace-course
                                    └─list.vue
   ```



## 关于router路由的规则

1. 路由是和菜单有关联的  需要多级路由
2. `rotuer/config.js`中 , 只有顶级路由, 因为开发工作由多人完成 , 如果写在一起 , 多了过后会产生冲突 , 导致难以维护!
3. 目前详细路由在顶级路由目录下的`route`目录中
   - `index.js` 是所有二级路由与二级以上路由的合并
   - 三级及以上路由,根据不同路由 , 存放在不同文件中 , 然后暴露出来 , 在`index.js`中解构合并

### router配置示例
一. 顶级路由 `router/config.js`
```js
import eduRoute from "../views/EDU/route/index.js"
export default [
  {
    path: "/data",
    meta: {
      title: "数据"
    },
    children: [...dataRoute],
    component: Setting
  }, {
    path: "/marketing",
    meta: {
      title: "营销"
    },
    children: [],
    component: Setting
  }, {
    path: "/edu",
    meta: {
      title: "教务"
    },
    children: [...eduaRoute],
    component: Setting
  }, {
    path: "/school",
    meta: {
      title: "校务"
    },
    component: Setting,
    children: [...schoolRoute],
  }, {
    path: "/logistics",
    meta: {
      title: "后勤"
    },
    redirect: "/logistics/logisticsInfo",
    component: Setting,
    children: [...logisticsRoute],
  }, {
    path: "/finance",
    meta: {
      title: "财务"
    },
    redirect: "/finance/enrollment",
    component: Setting,
    children: [...financeRoute],
  }, {
    path: "/settings",
    meta: {
      title: "设置"
    },
    component: Setting,
    children: [...settingsRoute]
  }, {
    path: "/StudentRecruitment/forecastBusiness",
    meta: {
      title: "招生"
    },
    component: Setting,
    children: [ ...forecastNameServiceRoute ]
  }]
```
二. 二级路由 EDU/route/index.js
```js
// 引入对应子菜单路由
import infoRoute from './info'
import scheduleRoute from './schedule'
import managementRoute from './management'
import oneToOne from "./one-to-one"
import appraisalRoute from "./appraisal";
import workManageRoute from './work-menager'
import operating from './operating'

function renderComponent (component) {
  if (component)
    return component
  else return {
    render: (e) => e("router-view")
  }
}

const route = [
  {
    path: "/edu/edu-info",
    meta: {
      title: "教务信息管理"
    },
    component: renderComponent(),
    redirect: "/edu/edu-info/student-manager",
    children: [ ...infoRoute ]
  },
  {
    path: "/edu/edu-schedule",
    meta: {
      title: "课表管理"
    },
    component: renderComponent(),
    redirect: "/edu/edu-schedule/teachers-schedule",
    children: [ ...scheduleRoute ]
  },
  {
    path: "/edu/examination-management",
    meta: {
      title: "考务管理"
    },
    component: renderComponent(),
    redirect: "/edu/examination-management/exam-type",
    children: [ ...managementRoute ]
  },
  {
    path: "/edu/one-to-one-schedule",
    meta: {
      title: "一对一辅导"
    },
    component: renderComponent(),
    redirect: "/edu/one-to-one-schedule/coaching-record",
    children: [ ...oneToOne ]
  },
  {
    path: '/edu/appraisal-management',
    meta: {
      title: "测评管理"
    },
    component: renderComponent(),
    redirect: "/edu/appraisal-management/task-manage",
    children: [ ...appraisalRoute ]
  },
  {
    path: '/edu/work-manage',
    meta: {
      title: "班主任工作管理"
    },
    component: renderComponent(),
    redirect: "/edu/work-manage/heart-to-heart-talk",
    children: workManageRoute
  }
]
export default route
```
三. 以班主任工作管理为例
```js
import heartToHeartTalkList from "@/views/EDUAdministration/work-manage/heart-to-heart-talk/list";
import heartToHeartTalkEdit from "@/views/EDUAdministration/work-manage/heart-to-heart-talk/edit";
// 工作日志
import WorkLogList from "../work-manage/work-log/list"
import WorkLogShow from "../work-manage/work-log/show"

function renderComponent (component) {
  if (component)
    return component
  else return {
    render: (e) => e("router-view")
  }
}
const route = [{
  path: "/edu/work-manage/heart-to-heart-talk",
  redirect: "/edu/work-manage/heart-to-heart-talk/list",
  meta: {
    title: "班主任交心谈话"
  },
  component: renderComponent(),
  children: [{
    path: "/edu/work-manage/heart-to-heart-talk/list",
    meta: {
      title: "列表",
      keepAlive: true
    },
    component: heartToHeartTalkList
  },
    {
      path: "/edu/work-manage/heart-to-heart-talk/edit",
      meta: {
        title: "查看",
        style: 1
      },
      component: heartToHeartTalkEdit
    },
  ]
},{
  path: "/edu/work-manage/work-log",
  redirect: "/edu/work-manage/work-log/list",
  meta: {
    title: "班主任工作日志"
  },
  component: renderComponent(),
  children: [{
    path: "/edu/work-manage/work-log/list",
    meta: {
      title: "列表",
      keepAlive: true
    },
    component: WorkLogList
  },
    {
      path: "/edu/work-manage/work-log/show",
      meta: {
        title: "详情",
      },
      component: WorkLogShow
    },
  ]
},]
export default route
```
