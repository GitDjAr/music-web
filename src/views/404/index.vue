<!--  -->
<template>
  <div class="flex flex-col  justify-center items-center">
    <img :style="{ width: '1200px' }" src="../../assets/404.png" alt="" />
    <div>
      <a-button type="primary" @click="go('/Music/Home')" class=" mr-2">回到首页</a-button>
      <a-button type="primary" @click="go('')">回到上一页</a-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
const Router = useRouter()
const go = (path: string) => {
  if (path === '') {
    Router.go(-1)
  } else {
    Router.replace(path)
  }
}
</script>
