<!--  -->
<template>
  <div class=''>
    <Image />
    <div class="ccc  border-2 w-full h-96 ">
      asdf
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref, reactive, } from 'vue'
const state = reactive({
  count: 0,
})

</script>
<style scoped lang='scss'>
.ccc {
  transform: translateY(-300px);
  position: relative;

}

.ccc::after {
  content: '';
  position: absolute;
  z-index: 100;
  background: url('https://img.2eka.cloud/api/random?type=pc');
  left: 0;
  top: 0;

  width: 500px;
  height: 500px;
  filter: blur(5px);
}
</style>