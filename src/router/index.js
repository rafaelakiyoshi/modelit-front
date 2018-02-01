import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import IStar from '@/components/IStar'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/istar',
      name: 'istar',
      component: IStar
    }
  ]
})
