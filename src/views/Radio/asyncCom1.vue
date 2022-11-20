<!--  -->
<template>
  <div class=''>{{it}}</div>
</template>

<script lang='ts' setup>
import { ref, onActivated, } from 'vue'
onActivated(()=>{
  console.log(111);
  it.value = 225
})
const it = ref(55)
</script>
<style scoped lang='scss'>

</style>