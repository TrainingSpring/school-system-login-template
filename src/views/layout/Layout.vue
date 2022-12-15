<template>
	<div class="layout">
		<!-- 左侧使用菜单组件 -->
		<left-menu class="left-menu" :menu-index="currentMenu"></left-menu>
		<!-- 右侧内容部分 -->
		<div :class="['right-main', 'right-main-' + pageStyle]" :style="pageCustomStyle">
			<!-- 右侧头部 -->
			<right-header class="right-header" @changeMenu="changeMenu"></right-header>
			<div class="breadNav" :style="breadStyle">
				<!-- 右侧中间 -->
				<el-col class="breadcrumb">
					<el-breadcrumb>
						<el-breadcrumb-item
							v-for="(item, index) in breadList1"
							:key="item.path"
							:to="index > 1 ? item.path : null"
							class="breadcrumb-item"
              :class="{'breadcrumb-last':index === breadList1.length-1}"
							>{{ item.meta.title }}
						</el-breadcrumb-item>
					</el-breadcrumb>
				</el-col>
			</div>
			<!-- 二级路由出口 -->
			<div v-if="isReloadView" class="content" ref="content">
				<keep-alive>
					<router-view v-if="$route.meta.keepAlive" class="router-view"></router-view>
				</keep-alive>
				<router-view class="router-view" v-if="!$route.meta.keepAlive"></router-view>
			</div>
		</div>
	</div>
</template>

<script>
// 引入组件
import LeftMenu from './LeftMenu.vue'
import RightHeader from './RightHeader.vue'
import { mapState } from 'vuex'
import { debounce } from '../../utils/tools'

export default {
	// 注册组件
	components: {
		LeftMenu,
		RightHeader
	},
	data() {
		return {
			//面包屑导航数据
			breadList1: [],
			currentMenu: 0,
      isReloadView: true
		}
	},
	computed: {
		...mapState(['pageStyle','pageCustomStyle','breadStyle'])
	},
  provide() {
    return {
      reload: this.reload
    }
  },
	methods: {
		changeMenu(index) {
			this.currentMenu = index
		},
		//计算面包屑方法
		calcBread() {
			let temp = []
			//便利matched找到meta获取需要的数据
			this.$route.matched.forEach(v => {
				//判断当前路由对象里面是否有meta 且有path title值
				if (v.meta.title) {
					temp.push(v)
				}
			})
			//计算出来的面包屑导航复制给breadList1
			this.breadList1 = temp
		},
    reload() {
      // console.log('reload!!!')
      this.isReloadView = false;
      this.$nextTick(() => {
        this.isReloadView = true
      })
    }
	},
	created() {
		this.calcBread()
	},
	beforeRouteUpdate(to, from, next) {
		next()
		this.$refs.content.scrollTo(0, 0)
	},
	//侦听器
	watch: {
		'$route.path'() {
			//改变路由地址时，再计算一次面包屑导航
			this.calcBread()
		}
	}
}
</script>

<style lang="scss" scoped>
.layout {
	display: flex;
	height: 100%;
	min-width: 1440px;
	overflow: hidden;
}
.left-menu {
	flex: none;
	//border: 1px solid #eeeeee;
	width: 255px;
}
.right-main {
	flex: auto;
	display: flex;
	flex-direction: column;
	width: calc(100% - 255px);
	.right-header {
		flex: none;
		width: 100%;
		height: 64px;
		background-color: white;
		box-shadow: 3px 1px 4px #e2e2e2;
	}
	.breadNav {
		padding: 12px 0;
		opacity: 1;
		display: flex;
		align-items: center;
		background-color: #f7f7f7;
    position: relative;
    z-index: 2000;
	}
	.content {
		position: relative;
		flex: auto;
		height: 100%;
		overflow-y: auto;
		.router-view {
			padding-bottom: 20px;
			background-color: #fff;
		}
	}
}
// 风格 0
.right-main-0 {
	background-color: #f7f7f7;
	.router-view {
		width: calc(100% - 16px);
		margin-left: 16px;
		min-height: 100%;
	}
}
// 风格 1
.right-main-1 {
	background-color: white;
	.breadNav {
		background-color: #ffffff !important;
	}
	.content {
		.router-view {
		}
	}
}
.breadcrumb {
	margin-left: 20px;
}
::v-deep .breadcrumb-item {
	font-size: 12px !important;
	font-family: Microsoft YaHei, serif !important;
}
::v-deep {
	.el-breadcrumb__inner {
		font-size: 12px !important;
		font-family: Microsoft YaHei, serif !important;
    color: #999999 !important;
    font-weight: normal  !important;
	}
}
::v-deep .breadcrumb-last .is-link{
  color: #666666 !important;
  font-weight: normal !important;
}
.breadtitle {
	margin-left: 47px;
	margin-top: 8px;
	font-size: 16px;
	font-family: Microsoft YaHei, serif;
	font-weight: bold;
	line-height: 24px;
	color: #333333;
	letter-spacing: 3.5px;
}
</style>
