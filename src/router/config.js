import Home from "@/views/Home/Home"
// 渲染一个组件或者一个空组件
export function renderComponent(component) {
  if (component)
    return component
  else return {
    render: (e) => e("router-view")
  }
}

/**
 * @description meta参数说明:
 *     title {string} :页面的标题 ,
 *     style {number} : 页面风格(0或者不写 , 默认风格 , 1 白色风格) 如: 教师信息 就是白色风格
 *     keepAlive {boolean} : 返回是否保持原有状态, 如列表页从详情或者编辑页返回的时候保持原有的数据和分页状态
 *                           (返回使用$router.back()  不要用$router.go(-1))
 */
export default [
  {
    path: "/home",
    meta: {
      title: "主页"
    },
    component: Home,
    name: "home"
  },
  {
    path: "/data",
    meta: {
      title: "数据"
    },
    children: [],
    component: renderComponent()
  }, {
    path: "/marketing",
    meta: {
      title: "营销"
    },
    children: [],
    component: renderComponent()
  }, {
    path: "/edu",
    meta: {
      title: "教务"
    },
    children: [],
    component: renderComponent()
  }, {
    path: "/school",
    meta: {
      title: "校务"
    },
    component: renderComponent(),
    children: [],
  }, {
    path: "/logistics",
    meta: {
      title: "后勤"
    },
    redirect: "/logistics/logisticsInfo",
    component: renderComponent(),
    children: [],
  }, {
    path: "/finance",
    meta: {
      title: "财务"
    },
    redirect: "/finance/enrollment",
    component: renderComponent(),
    children: [],
  }, {
    path: "/renderComponent()s",
    meta: {
      title: "设置"
    },
    component: renderComponent(),
    children: []
  }, {
    path: "/StudentRecruitment/forecastBusiness",
    meta: {
      title: "招生"
    },
    component: renderComponent(),
    children: [  ]
  }]
