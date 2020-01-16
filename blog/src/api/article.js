import fetch from './fetch';

export default {
  // 获取文章列表
  list(params) {
    // http://192.168.124.55:7300/mock/5dd7a3cbbf776920070da626/example/mock
    // fetch.get('http://192.168.124.55:7300/mock/5dd7a3cbbf776920070da626/example/mock', {
    //   "11":"22"
    // })
    return fetch.get('/article', params)
  },

  // 搜索文章列表
  search(params) {
    return fetch.get('/search/article', params)
  },

  // 获取文章详情
  detail(id) {
    return fetch.get('/article/' + id);
  }
}
