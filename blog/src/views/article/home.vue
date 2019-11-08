<template>
  <section class="container">
    我是home
  </section>
</template>
<script>
  import VCategory from '../../components/Category'
  import VLinks from '../../components/Links'
  import {mapState, mapActions} from 'vuex'
  import merge from 'webpack-merge'
  export default {
    components: {
      VCategory,
      VLinks
    },
    data() {
      return {
        nav: [
          {name: '最新', icon: 'el-icon-news', desc: 'created_at'},
          {name: '最热', icon: 'el-icon-box', desc: 'browse'}
        ],
        navIndex: 0,
        // 搜索关键字
        keyword: this.$route.query.keyword
      }
    },
    computed: {
      ...mapState({
        list: state => state.article.articleList,
        pagination: state => state.article.pagination
      }),
    },
    created() {
      // 获取文章
      this.getArticle();
    },
    methods: {
      ...mapActions({
        getArticleList: 'article/getArticleList',
        searchArticle: 'article/searchArticle'
      }),
      /**
       * 获取文章
       *
       * @returns 文章列表
       */
      async getArticle() {
        const {page, desc, category_id, keyword} = this.$route.query;
        await this.getArticleList({
          page,
          desc,
          keyword,
          category_id
        });
        console.log(this.list)
        console.log(this.pagination)
      },
      /**
       * 切换页码
       * @page 页码
       */
      async changePage(page) {
        this.$router.replace({
          query: merge(this.$route.query, {
            page
          })
        });
        this.getArticle();
      },

      /**
       * 切换文章排序方式
       * @desc 排序方式 created_at || browse
       * @index 排序索引
       */
      async changeArticleDesc(desc, index) {
        this.$router.replace({
          query: merge(this.$route.query, {
            desc
          })
        });
        this.navIndex = index;
        this.getArticle();
      },
      /**
       * 路由跳转
       * @param path 路由地址
       */
      toPath(path) {
        this.$router.push(path)
      },
    }
  }
</script>

<style lang="scss" scoped>
  
</style>
