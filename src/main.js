import Vue from 'vue'
import App from './App'
import router from './router'
// 引入公共样式
import './assets/public.css'
import './assets/icon/iconfont.css'
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
