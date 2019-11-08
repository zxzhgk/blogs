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
      // 文章列表
      path: '/',
      component: () => import('@/views/article/list.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: Layout,
      redirect: 'noRedirect',
      children: [
        {
          path: 'test',
          name: 'test',
          component: () => import('@/views/article/home')
        }
      ]
    },
    {
      // 文章详情
      path: '/article/detail/:id',
      component: () => import('@/views/article/detail.vue')
    },
    {
      // 关于我
      path: '/about',
      component: () => import('@/views/about/index.vue')
    }
  ]
})
