import Vue from 'vue'
import Vuex from 'vuex'
import mutations from "./mutations"
import getters from "./getters"
import state from "./state"
import actions from "./action"
Vue.use(Vuex)
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {}
})
