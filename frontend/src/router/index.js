import Vue from 'vue';
import Router from 'vue-router';
import IndexPage from '../components/IndexPage';
import ShowPage from '../components/ShowPage';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'indexPage',
      component: IndexPage
    },
    {
      path: '/:id',
      name: 'showPage',
      component: ShowPage
    }
  ]
});
