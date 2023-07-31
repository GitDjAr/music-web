<!--  -->
<template>
  <div class="w-full h-52">
    <div class="w-full flex justify-between mb-3">
      <div
        :class="`w-1/3 mx-4 p-2 rounded-md h-52 overflow-hidden relative bg-gradient-to-r from-[${randomColor()}] text-white text-left text-xl`"
        v-for="item in titleList"
        :key="item.id"
      >
        <div class="">
          <div class="mb-8">{{ item.name }}</div>
          <div v-if="typeof item.content === 'string'" class="text-2xl">
            {{ item.content }}
          </div>
          <div v-else class="flex">
            <Image :src="item.img" :wh="[300, 300]"></Image>
            <div class="ml-2">
              <p>{{ item.content.songName }}</p>
              <span>{{ item.content.singer }}</span>
            </div>
          </div>
        </div>
        <Image
          :src="item.url"
          :wh="[300, 300]"
          class="absolute top-0 right-0 bottom-0 -z-10"
        ></Image>
        <!-- <div>{{ item. }}</div> -->
      </div>
    </div>
    <div class="flex h-96">
      <div class="w-2/3 mx-4">
        <h3 class="text-xl mb-2">推荐新音乐</h3>
        <div class="bg-[#f2f3f5] rounded-md px-2">
          <Song
            v-for="(item, index) in newSongList"
            class="border-none"
            :id="item.id"
            :dt="item.dt"
            :songName="item.name"
            :singer="item?.song?.artists.map((e) => e.name).join('/')"
            :url="item?.picUrl"
            @click="play(item)"
            :style="{ '--stagger': index }"
            data-animate
          />
        </div>
      </div>
      <!-- <echarts class="w-1/3 mx-4" :randomColor="randomColor" /> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
// import echarts from "./echarts/index.vue";
import Song from "@/components/song.vue";
import { newSong } from "@/api/playlist";
// import { useRouter } from "vue-router";
import { ref } from "vue";
import { useStore } from "vuex";
import { rgbToHex } from "@/utils/getImgsColor";

// const router = useRouter();
const store = useStore();

const randomColor = () => {
  let color = getComputedStyle(document.body)
    .getPropertyValue(`--${store.getters?.tagColor}-6`)
    ?.split(",")
    .map((e) => +e);
  return rgbToHex(color[0], color[1], color[2]);
};
const titleList = ref<{}>([
  {
    id: 1,
    name: "歌曲",
    color: randomColor(),
    content: "30044",
    url: "https://imgapi.cn/api.php",
  },
  {
    id: 2,
    name: "喜欢",
    color: randomColor(),
    content: {
      songName: "songName",
      singer: "singer",
      img: "https://imgapi.cn/api.php",
    },
    url: "https://imgapi.cn/api.php",
  },
  {
    id: 3,
    name: "艺术家",
    color: randomColor(),
    content: "周杰伦",
    url: "https://imgapi.cn/api.php",
  },
]);

const newSongList = ref<any>([]);
async function getNewSong() {
  const { result } = await newSong();
  newSongList.value = result.splice(0, 6);
}
getNewSong();

function play(item: { id: any }) {
  store.dispatch("ToggleSong", {
    id: item.id,
    playListId: "推荐新音乐",
    list: newSongList.value,
  });
}
</script>
<style scoped lang="scss"></style>
