<!--  -->
<template>
  <div class=''>
    <vue-plyr v-loading="loading" class="" :options='VideoOptions' ref="videoRef">
      <video class="w-fill" :src="videoSrc"></video>
    </vue-plyr>
  </div>
</template>

<script lang='ts' setup>
import { ref, reactive, } from 'vue'
const state = reactive({
  count: 0,
})

</script>
<style scoped lang='scss'>

</style>