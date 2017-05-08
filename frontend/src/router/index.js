import Vue from 'vue';
import Router from 'vue-router';
import Main from '../components/main/Main.vue';
import Detail from '../components/detail/Detail.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/HomeLedger/',
      name: 'main',
      component: Main
    },
    {
      path: '/HomeLedger/detail',
      name: 'detail',
      component: Detail,
      props: true
    }
  ]
});
