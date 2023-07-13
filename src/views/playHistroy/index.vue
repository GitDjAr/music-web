<!--  -->
<template>
  <div class="" ref="refBox">
    <template v-if="playList.length > 0">
      <template v-for="({ data: item }, index) in playList" :key="item.id">
        <song :id="item.id" :dt="item.dt" :songName="item.name" :singer="item?.ar?.[0]?.name" :url="item?.al?.picUrl"
          @click="play(item)" :style="{ '--stagger': index }" data-animate />
      </template></template>
    <template>
      <p>暂无历史</p>
    </template>

  </div>
</template>

<script lang="ts" setup>
// import svg from "@/assets/empty.svg";
// import { delay } from "@/utils/delay";
import { ref } from "vue";
import { useStore } from "vuex";
import { songHistory, T } from "@/api/playlist";

const store = useStore();

const playList = ref<Partial<T.PlayObj>[]>(Array(12).fill({ data: {} }));
async function getList() {
  playList.value = (await songHistory({})).data.list;
}
getList();
function play(item: { id: any }) {
  store.dispatch("ToggleSong", {
    id: item.id,
    playListId: "播放历史",
    list: playList.value,
  });
}
</script>
<style scoped lang="scss">
</style>
