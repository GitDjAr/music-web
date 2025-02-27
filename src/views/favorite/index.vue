<!--  -->
<template>
  <div class="w-full h-52 p-4 select-none">
    <div class="mb-3 text-xl">
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center gap-10">
          <div>
            <p>{{ user.profile.followeds }}</p>
            <span>粉丝</span>
          </div>
          <div>
            <p>{{ user.profile.follows }}</p>
            <span>关注</span>
          </div>
          <div>
            <p>{{ user.level }}</p>
            <span>等级</span>
          </div>
        </div>
        <div class="flex items-end">
          <div class="mr-5">
            <p class="mb-5 text-right">{{ user.name }}</p>
            <p class="text-base truncate">
              {{ user.profile.signature }}
            </p>
          </div>
          <Image class="rounded-xl" :src="user.title" :wh="[100, 100]"></Image>
        </div>
      </div>

      <!-- <div
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
      </div> -->
    </div>
    <div class="flex mt-10" :style="{ height: '660px' }">
      <div class="w-5/12 h-full pr-5">
        <h3 class="text-xl mb-4" @click="getMyLiveList">我的喜欢</h3>
        <div
          :style="{ height: '650px' }"
          class="bg-[var(--color-fill-2)] rounded-md px-2 overflow-y-scroll"
          v-infinite-scroll="[getMyLiveList, { distance: 12 }]"
        >
          <Song
            v-for="(item, index) in myLiveList"
            class="border-none"
            :id="item.id"
            :dt="item.dt"
            :songName="item.name"
            :singer="item?.song?.artists.map((e) => e.name).join('/')"
            :url="item?.al?.picUrl"
            @click="playLike(item)"
          />
        </div>
      </div>

      <div class="w-7/12 h-full">
        <h3 class="text-xl mb-2">收藏歌单</h3>
        <userLikePlaylistVue />
      </div>
    </div>

    <newSong class="my-16 py-10" />
    <mvCard class="pb-10" />
  </div>
</template>

<script lang="ts" setup>
// import echarts from "./echarts/index.vue";
import mvCard from "./mvCard.vue";
import Song from "@/components/song.vue";
import userLikePlaylistVue from "./userLikePlaylistVue.vue";
import newSong from "./newSong.vue";
import { GetSongDetail } from "@/api/play";
import { T } from "@/api/playlist";
// import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { vInfiniteScroll } from "@vueuse/components";
import { useStore } from "vuex";
import { rgbToHex } from "@/utils/getImgsColor";

// const router = useRouter();
const store = useStore();
const user = computed(() => store.getters?.userInfo);

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

//我喜欢
let len = 0;
const myLiveList = ref<T.MusicPlayList[]>([]);
async function getMyLiveList() {
  // console.log("getMyLiveList", len);
  //每次120 叠加
  const ids = [...store.state.song.myLikeList]?.splice(len, 120)?.join(",");
  if (ids) {
    let aa = (await GetSongDetail({ ids }))?.songs || [];
    myLiveList.value.push(...aa);
    len += 120;
  }
}
getMyLiveList();

function playLike(item: { id: any }) {
  store.dispatch("ToggleSong", {
    id: item.id,
    playListId: "我的喜欢",
    list: myLiveList.value,
  });
}
</script>
<style scoped lang="scss"></style>
