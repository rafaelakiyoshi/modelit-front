import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import IStar from '@/components/IStar'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
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
