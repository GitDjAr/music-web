<!--  -->
<template>
  <!-- <playListCmp class="" :api="likelist" :isShowCollect="false"></playListCmp> -->
</template>

<script lang="ts" setup>
// import playListCmp from "./playListCmp.vue";
import { ref } from "vue";
import { likelist } from "@/api/user";
const state = ref(0);

async function scrollLoad() {
  ++params.pageNum;
  params.offset = params.limit * params.pageNum;
  await likelist({});
  store.dispatch("SetPlayList", { playListId: id, list: AlbumsList.value });
}
</script>
<style scoped lang="scss"></style>
