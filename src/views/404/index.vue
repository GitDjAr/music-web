<!--  -->
<template>
  <div class="flex flex-col justify-center items-center">
    <div class="my-5 mt-10">
      <a-button type="primary" @click="go('/Music/home')" class="mr-2"
        >回到首页</a-button
      >
      <a-button type="primary" @click="go('')">回到上一页</a-button>
    </div>
    <MyIcon
      name="404"
      class="mr-2"
      :style="{ height: '80vh', width: '100%' }"
    />
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
</script>
