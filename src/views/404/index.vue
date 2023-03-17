<!--  -->
<template>
  <div class="flex flex-col justify-center items-center">
    <img :style="{ width: '780px' }" :src="url" alt="" />
    <div class="mt-5">
      <a-button type="primary" @click="go('/Music/home')" class="mr-2"
        >回到首页</a-button
      >
      <a-button type="primary" @click="go('')">回到上一页</a-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const Router = useRouter();
const go = (path: string) => {
  if (path === "") {
    Router.go(-1);
  } else {
    Router.replace(path);
  }
};

const url: string = ref(window.rendomImgUrl);
</script>
