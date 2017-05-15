import Vue from 'vue'
import Router from 'vue-router'
import authService from '../service/authService'
import Main from '../components/main/Main.vue'
import Detail from '../components/detail/Detail.vue'
import Chart from '../components/chart/Chart.vue'
import Login from '../components/auth/Login.vue'

Vue.use(Router)

const checkAuth = (to, from, next) => {
  if ( authService.isAuthenticated ) {
    next()
  } else {
    next('/HomeLedger/login')
  }
}

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/HomeLedger/',
      name: 'main',
      component: Main,
      beforeEnter: checkAuth
    },
    {
      path: '/HomeLedger/detail',
      name: 'detail',
      component: Detail,
      beforeEnter: checkAuth,
      props: true
    },
    {
      path: '/HomeLedger/chart',
      name: 'chart',
      component: Chart,
      beforeEnter: checkAuth
    },
    {
      path: '/HomeLedger/login',
      name: 'login',
      component: Login
    }
  ]
})

export default router
