import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import IStar from '@/components/IStar'
import Register from '@/components/Register'
import Diagram_list from '@/components/Diagram_list'

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
      path: '/mydriagrams',
      name: 'Diagram_list',
      component: Diagram_list
    },
    {
      path: '/istar',
      name: 'istar',
      component: IStar
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})
