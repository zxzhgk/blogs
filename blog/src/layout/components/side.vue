<template>
  <section class="layout-side" :class="{'side-open':showSide}">
    <div class="avatar"></div>
    <el-input v-model="search" class="search" placeholder="搜点啥吧,万一有惊喜呢..."></el-input>
    <ul class="css1d2cc83689209bc nav">
      <router-link tag="li" to="/"><svg-icon icon-class="lovely" class="lovely"></svg-icon>首页</router-link>
      <!-- <li></li> -->
      <li><svg-icon icon-class="lovely" class="lovely"></svg-icon>介绍</li>
    </ul>
  </section>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'layoutSide',
  data(){
    return {
      search:""
    }
  },
  computed: {
    ...mapState({
      showSide: state => state.layout.showSide,
    }),
  },
}
</script>

<style lang="scss" scoped>
.layout-side{
  min-height:100vh;
  width:300px;
  margin-left: -300px;
  position: relative;
  overflow: hidden;
  background:#fff;
  flex: none;
  transition: margin-left .5s ease-out;
  border-right: 1px solid #efefef;
  & /deep/ .el-input__inner{
    border:none;
    text-align: center
  }
  .avatar{
    width: 150px;
    height: 150px;
    border-radius: 150px;
    background: #000;
    margin: 20px auto;
    box-shadow: 1px 5px 5px #666;
    overflow: hidden;
    background: url("../../assets/logo.png") no-repeat;
    background-size:100%;
  }
  .nav{
    // margin-top: 30px;
    text-align: center;
    font-size: 22px;
    line-height: 40px;
    color: #555555;
    cursor: pointer;
    // & li{
    //   margin-bottom: 10
    // }
    .lovely{
      color: #dfd9d9;
    }
  }
}
.side-open{
	margin-left: 0px;
}
</style>
