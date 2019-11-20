<template>
  <section class="layout-main">
    <svg-icon icon-class="side-menu" class="side-menu" :class="{'sild-open':showSide}" @click="toggleSide"></svg-icon>
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
  height: 100vh;
  .side-menu{
    width: 30px;
    height: 30px;
    position: fixed;
    top: 10px;
    left: 10px;
    color: #a7a7a7;
    transition: all .8s;
    cursor: pointer;
    &:hover{
      color: #000;
    }
  }
  .sild-open{
    left:310px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
</style>
