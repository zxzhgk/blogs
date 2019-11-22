<template>
  <section class="layout-main" :class="{'main-open':showSide}">
    <svg-icon icon-class="side-menu" class="side-menu" @click="toggleSide"></svg-icon>
    <transition name="fade">
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
  // padding-right: 300px;
  // transform:translateX(-310px);
  height: 100vh;
  transition: all .8s;
  .side-menu{
    width: 30px;
    height: 30px;
    position: fixed;
    top: 10px;
    left: 0px;
    color: #a7a7a7;
    transform:translateX(10px);
    transition: all .8s;
    z-index: 100;
    cursor: pointer;
    &:hover{
      color: #000;
    }
  }
  .sild-open{
    // transform:translateX(310px);
    // left:310px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
.main-open{
  // width:300px;
  transform:translateX(300px);
  padding-right: 300px;
  // left:310px;
}
</style>
