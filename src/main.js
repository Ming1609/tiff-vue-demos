import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import 'common/stylus/index.styl'
import VueLazyload from 'vue-lazyload'
fastclick.attach(document.body)
// 解决所有div点击延迟3秒的问题

Vue.config.productionTip = false

Vue.use(VueLazyload, {
  loading: require('common/image/default.gif')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
