import Vue from 'vue'
import Router from 'vue-router'

import jdi from '@/components/page/justdoit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'jdi',
      component: jdi
    }
  ]
})
