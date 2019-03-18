import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueFilterDateFormat from 'vue-filter-date-format'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueFilterDateFormat)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
