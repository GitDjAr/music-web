<!--  -->
<template>
  <div class=''>
    <img src="https://tva2.sinaimg.cn/large/0072Vf1pgy1foxkjbqfwjj31hc0u0000.jpg" alt="">
  </div>
</template>

<script lang='ts' setup>
import { getImg } from '@/api/api-free/index'
import { ref, reactive, } from 'vue'
const state = reactive({
  count: 0,
})

// 随机图片
let IMGFun
try {
  IMGFun = async () => {
    try {
      const data = await getImg()
      console.log(data);
    } catch (error) {
      const rep = /(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%$#_]*)?/
      console.log(error.err.stack.match(rep));
    }
  }
} catch (error) {
  console.log(error);
}
IMGFun && IMGFun()
</script>
<style scoped lang='scss'>

</style>