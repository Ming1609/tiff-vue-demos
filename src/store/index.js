import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'
// 方便调试

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
	// 实例化
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  // 线下调试将debug设置为true，开启strict模式，线上去掉
  plugins: debug ? [createLogger()] : []
  // 控制台，打印修改state的log
})