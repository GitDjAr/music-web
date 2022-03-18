<!--  -->
<template>
  <div class="flex fx-center">
    <img alt="muisc play logo" :style="style" :src="src" />
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import palylogo from '../assets/play-logo.png'
import logo from '../assets/logo.png'
export default defineComponent({
  components: {},
  props: {
    width:String,
    height: String,
    logo:{
      type:String || Number,
      default:0
    }
  },
  setup(props) {
    const state = reactive({
      style: {
        width: '100%',
        height: '100%'
      },
      src:''
    })
    const srcMap = {
      '0': palylogo,
      '1': logo
    }
    let a = props.logo
    state.src = srcMap[a]
    console.log(state.src);
    
    state.style.width = props?.width || '100%'
    state.style.height = props?.height || '100%'

    return {
      ...toRefs(state)
    }
  }
})

</script>
<style scoped lang='scss'>
</style>