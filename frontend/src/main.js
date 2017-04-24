// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Axios from 'axios';
import router from './router';
import App from './App';
// Adding jQuery
import 'expose-loader?$!expose-loader?jQuery!jquery';
// Adding Bootstrap
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.config.productionTip = false;
Vue.prototype.$http = Axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});