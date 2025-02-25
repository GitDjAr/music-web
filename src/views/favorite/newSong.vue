<template>
  <div class="snap-x flex items-center overflow-x-scroll py-5">
    <div class="snap-start" v-for="item in newSongList">
      <div
        class="rounded-xl overflow-hidden bg-base-100 shadow-sm w-64 mr-10 bg-opacity-50 bg-white"
      >
        <Image
          :src="item.picUrl"
          class="rounded-xl"
          :alt="item.name"
          wh="[200, 200]"
        />
        <div class="flex items-center justify-between text-base p-2">
          <div class="overflow-hidden flex-1 text-left">
            <p class="truncate font-bold">{{ item.name }}</p>
            <p class="text-gray-500 text-sm">
              {{ item.song.artists?.[0]?.name }}
            </p>
          </div>
          <MyPlay @click="palySong(item)" :id="item.id" size="large" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { T, newSong } from "@/api/playlist";
import { useStore } from "vuex";
const Store = useStore();

onMounted(() => {
  getNewSong();
});

//推荐新音乐
const newSongList = ref<any>([]);
async function getNewSong() {
  const { result } = await newSong();
  newSongList.value = result.splice(0, 8);
}
const palySong = async (item: any) => {
  Store.dispatch("ToggleSong", {
    id: item.id,
    playListId: "推荐新音乐",
    list: newSongList.value,
  });
};
</script>

<style scoped></style>
