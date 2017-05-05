// Adding external css / script files
import './lib/css.js'
import './lib/script.js'

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import router from './router'
import App from './App'

Vue.config.productionTip = false
Vue.prototype.$http = axios.create({ baseURL: '/HomeLedger' })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})