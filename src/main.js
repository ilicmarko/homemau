import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueFilterDateFormat from 'vue-filter-date-format'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueFilterDateFormat)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
