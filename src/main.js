// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueCookie from 'vue-cookie'
import App from './App'
import router from './router/index.js'
import ElementUI from 'element-ui'
import store from './store'
import echarts from 'echarts'
import 'echarts/map/js/china.js'
import '../static/ueditor/ueditor.config.js'
import '../static/ueditor/ueditor.all.js'
import '../static/ueditor/ueditor.parse.min.js'
import '../static/ueditor/lang/zh-cn/zh-cn.js'

import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI, { size: 'small' })
Vue.use(VueCookie)
Vue.config.productionTip = false
Vue.prototype.$echarts=echarts
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
