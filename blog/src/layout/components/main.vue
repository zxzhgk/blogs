<!--
 * @Author: your name
 * @Date: 2019-11-09 15:02:06
 * @LastEditTime: 2019-11-09 16:40:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \simpleDemoe:\blogs\blog\src\layout\components\main.vue
 -->
<template>
  <section class="layout-main">
    <svg-icon icon-class="side-menu" class="side-menu" :class="{'sild-open':showSide}" @click="toggleSide"></svg-icon>
    <transition name="fade-transform" mode="out-in">
      <router-view/>
    </transition>
  </section>
</template>

<script>
import {mapActions,mapState} from 'vuex'
export default {
  name: 'layoutMain',
  computed: {
    ...mapState({
      showSide: state => state.layout.showSide,
    }),
  },
  methods:{
	...mapActions({
	  toggleSide: 'layout/toggleSide',
	}),
  }
  
}
</script>

<style lang="scss" scoped>
.layout-main{
  flex: auto;
  position: relative;
  overflow-y:scroll;
  background:#fff;
  width: 100vw;
  height: 100vh;
  .side-menu{
    width: 30px;
    height: 30px;
    position: fixed;
    top: 10px;
    left: 10px;
    color: #dedede;
    transition: color,left .5s;
    cursor: pointer;
    &:hover{
      color: #000;
    }
  }
  .sild-open{
    left:310px;
  }
  /* transition: width .3s ease-in; */
}
</style>
