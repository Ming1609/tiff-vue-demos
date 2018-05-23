import * as types from './mutation-types'
// 方便引入大量的types常量，我把所有types常量放到单独的一个文件中,以后用types.常量名取就ok.

const mutations = {
	// mutations对象用来存放一些修改方法
  [types.SET_SINGER](state, singer) {
  	// 方法名：[types.SET_SINGER]
    state.singer = singer
  }
}

export default mutations