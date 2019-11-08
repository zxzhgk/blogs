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
import '@/icons'
import '@/permission'
Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.use(mavonEditor)
Vue.use(VueLocalStorage);
Vue.use(VueLazyLoad, {
  error: '../static/boblog.png',
  loading: '../static/boblog.png'
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
