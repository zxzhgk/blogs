<template>
  <section class="layout-side" :class="{'side-open':showSide}">
    <div class="avatar">
      <!-- <img src="../../assets/logo.png" alt="头像"> -->
    </div>
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
}
.side-open{
	margin-left: 0px;
}
</style>
