import Vue from 'vue'
import router from './router'
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