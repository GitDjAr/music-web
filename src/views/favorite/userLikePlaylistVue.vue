<template>
  <div class="likeList">
    <div class="snap-start rounded-md" v-for="item in list">
      <albumVue
        mode="playlist"
        :item="{ ...item, blurPicUrl: item.coverImgUrl, name: item.name }"
      ></albumVue>
    </div>
    <div
      class="snap-start"
      style="height: 160px"
      v-if="list?.length"
      v-for="item in list?.length % 4"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import albumVue from "../singer/component/item.vue";
import { T, userPlaylist } from "@/api/playlist";

import { useStore } from "vuex";
const Store = useStore();

onMounted(() => {
  initData();
});

const list = ref<T.MusicPlayList[]>();
const initData = () => {
  userPlaylist({ uid: Store.getters.userInfo.uid }).then((res) => {
    list.value = res.playlist || [];
  });
};
</script>

<style scoped>
.likeList {
  @apply snap-x flex items-center overflow-x-scroll h-full flex-col flex-wrap box-border justify-around;
}
</style>
