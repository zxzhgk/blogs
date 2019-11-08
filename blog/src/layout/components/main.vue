<template>
  <section class="layout-main">
    <svg-icon icon-class="side-menu" @click="toggleSide"></svg-icon>
    <transition name="fade-transform" mode="out-in">
      <router-view/>
    </transition>
  </section>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'layoutMain',
  methods:{
	...mapActions({
	  toggleSide: 'layout/toggleSide',
	}),
  }
  
}
</script>

<style scoped>
.layout-main{
  flex: auto;
  position: relative;
  overflow: hidden;
  background:#fff;
  width: 100vw;
  min-height: 100vh;
  /* transition: width .3s ease-in; */
}
</style>
