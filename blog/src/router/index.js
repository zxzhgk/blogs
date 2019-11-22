import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'
Vue.use(Router)
export default new Router({
  // mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    // 兼容
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  },
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: 'home',
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('@/views/article/home')
        }
      ]
    },
    {
      path: '/article',
      name: 'article',
      component: Layout,
      redirect: 'noRedirect',
      children: [
        {
          path: 'detail/:id',
          name: 'detail',
          component: () => import('@/views/article/detail.vue')
        }
      ]
    },
    {
      path: '/about',
      component: Layout,
      redirect: 'chat',
      children: [
        {
          path: 'chat',
          name: 'chat',
          component: () => import('@/views/about/Home.vue')
        }
      ]
    },
    {
      // 关于我
      path: '/about',
      component: () => import('@/views/about/index.vue')
    }
  ]
})
