<template>
  <div class="left-menu">
    <!-- logo -->
    <div class="logo" @click="goHome">
      <!--			<img src="../../assets/img/logo-3.png" alt />-->
      <!--			<span class="title">鸿鹄教育信息化</span>-->
      <img src="../../assets/img/left-logo.png" alt="" style="width: 100%;margin-left: -20px">
    </div>

    <!--		<el-menu v-show="$info.name !== 'home'" text-color="#1D2088" ref="leftMenu" :default-active="defaultActive" unique-opened router class="menu">
          <el-submenu v-for="(item,i) in menuConfig[rightMenuIndex].child" :axios="routerMap[item.name]||item.id" :key="'submenu_'+Date.now()+i" >
            <template slot="title">
              <span class="menu">
                <b>{{ item.name}}</b>
              </span>
            </template>
            <el-menu-item-group>
              <el-menu-item v-for="(sub,axios) in item.child" :axios="routerMap[sub.name]||sub.id" :key="'menu_'+Date.now()+axios" class="menuitem">{{ sub.name }}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>-->
    <t-menu v-show="$route.name !== 'home'" v-model="defaultActive" unique-opened router class="menu" v-if="menuConfig.length>0 && rightMenuIndex>=0">
      <t-submenu v-for="(item,i) in menuConfig[rightMenuIndex].child" :index="routerMap[item.name]||item.id" :key="'sub_'+i">
        <template slot="title">
					<span class="sub_menu">
            {{ item.name }}
					</span>
        </template>
        <t-menu-item-group>
          <t-menu-item v-for="(sub,index) in item.child" :index="routerMap[sub.name]||sub.id">{{ sub.name }}</t-menu-item>
        </t-menu-item-group>
      </t-submenu>
    </t-menu>
  </div>
</template>

<script>
import config from "../../router/config.js"
import {mapGetters, mapState} from "vuex"

export default {
  computed: {
    ...mapState(["rightMenuIndex"]),
    ...mapGetters(["menuConfig", "routerMap", "menuNames"]),
    // defaultActive(){
    //   return this.$info.matched[this.$info.matched.length-2].path;
    // }
  },
  watch: {
    rightMenuIndex(n, o) {
      this.$forceUpdate()
    },
    "$route"(n, o) {
      let len = n.matched.length;
      this.defaultActive = n.matched[len - 2].path;
    },
  },
  data() {
    return {
      menus: config,
      defaultActive: this.$route.matched[this.$route.matched.length - 2].path
    }
  },
  beforeRouteLeave(to, form, next) {
  },
  mounted() {
  },
  methods: {
    goHome() {
      if (this.menuNames.includes("首页")) {
        this.$router.push('/main')
      } else
        this.$router.push('/home')
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  cursor: pointer;
  height: 64px;
  padding-left: 20px;
  align-items: center;
  font-weight: 500;

  img {
    width: 50px;
    margin-right: 18px;
  }

  .title {
    color: #1d2088;
    font-weight: 700;
  }
}

.sub_menu {
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #1d2088;
  height: 100%;
  width: 100%;
}

.menu {
  border-right: 1px solid #eee;
}

.menuitem {
  font-size: 16px;
  font-family: Microsoft YaHei, serif;
  font-weight: 400;
  line-height: 24px;
  color: #383fa0;
}

.el-menu-item.menuitem.is-active {
  background-color: #e8edff;
  border-right: 2px solid #0b055b;
}
</style>
