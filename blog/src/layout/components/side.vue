<template>
  <section class="layout-side" :class="{'side-open':showSide}">
    layout-side
  </section>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'layoutSide',
  computed: {
    ...mapState({
      showSide: state => state.layout.showSide,
    }),
  },
}
</script>

<style scoped>
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
}
.side-open{
	margin-left: 0px;
}
</style>
