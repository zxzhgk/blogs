<template>
  <div class="app-wrapper">
    <layoutSide></layoutSide>
    <layoutMain></layoutMain>
  </div>
</template>

<script>
import { layoutMain, layoutSide} from './components'
import { mapState } from 'vuex'
export default {
  name: 'Layout',
  components: {
    layoutMain,
    layoutSide,
  },
  mixins: [],
  computed: {
    ...mapState({
      
    }),
    classObj() {
      return {
        
      }
    }
  },
  methods: {
    
  }
}
</script>
<style lang="scss" scoped>
  .app-wrapper {
    position: relative;
    height: 100vh;
    width: 100vw;
    display: flex;
  }
</style>
