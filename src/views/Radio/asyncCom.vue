<!--  -->
<template>
<div class=''>
  <div v-for="item in res">{{item.name}}</div>
  <a-divider></a-divider>
  <div v-for="item in a">{{item.name}}</div>
</div>
</template>

<script setup lang='ts'>
import axios, { AxiosResponse } from 'axios'
import { defineComponent, reactive, toRefs, onMounted, ref, defineAsyncComponent } from 'vue'

type user = {
    "name": string,
    "price": number,
    "quantity": number
  }
  const ax = async ()=>{
    return new Promise((resolve,reactive)=>{
      setTimeout(async () => {
        const d = await axios.post('../public/data.json')
        resolve(d)
      }, 3000);
    })
  }
const res = ref<user[]>()
  const A = await ax()
  res.value = A.data
  const a = await Promise.resolve([{name:.11}])
  



</script>
<style scoped lang='scss'>

</style>
