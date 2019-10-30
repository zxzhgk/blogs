import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLocalStorage from 'vue-ls';
import VueLazyLoad from 'vue-lazyload'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// 使用 ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.use(mavonEditor)
Vue.use(VueLocalStorage);
Vue.use(VueLazyLoad, {
  error: '../static/boblog.png',
  loading: '../static/boblog.png'
})
router.beforeEach(async (to, from, next) => {

  // 获取用户信息
  const BOBLOG_FE_TOKEN = Vue.ls.get('BOBLOG_FE_TOKEN');
  if (BOBLOG_FE_TOKEN) {

    const auth = {
      username: BOBLOG_FE_TOKEN
    }

    try {
      await store.dispatch('user/getUserInfo', auth);
      await next()

    } catch (e) {
      await next()
    }

    await next()

  } else {
    await next()
  }


});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
