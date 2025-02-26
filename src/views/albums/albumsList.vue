<!--  -->
<template>
  <div
    class="myclass box-border flex flex-col select-none overflow-hidden h-full w-full relative"
    v-bind="$attrs"
  >
    <div class="flex h-52 w-full my-5 px-3">
      <Image
        class="h-52 w-52 rounded-lg"
        :src="albumInfo?.album?.picUrl"
        :wh="[500, 500]"
      />
      <div
        class="text-left pl-5 pb-4 flex flex-1 flex-col justify-between w-full overflow-hidden"
      >
        <h1 class="font-bold">
          {{ albumInfo.album.name }} - {{ albumInfo.album.company }}
        </h1>
        <div class="flex justify-between items-center">
          <div class="leading-10">
            <p>
              发布时间:
              {{ formatformat(albumInfo.publishTime, DateFormat.ymd) }}
            </p>
            <p>播放次数:{{ albumInfo.playCount }}</p>
          </div>
          <div class="flex gap-16">
            <button
              @click="play(albumInfo.songs[0])"
              class="flex items-center rounded-3xl bg-white bg-opacity-40 border border-gray-300"
            >
              <div :class="`px-5 text-base w-32 leading-10 `">播 放</div>
            </button>
            <button
              class="flex items-center rounded-3xl bg-white bg-opacity-40 border border-gray-300"
            >
              <div :class="`px-5 text-base w-32 leading-10 `">
                <component
                  :is="`icon-heart${
                    albumInfo?.album?.info?.liked ? '-fill' : ''
                  }`"
                  :class="`cursor-pointer text-4xl`"
                  @click.stop="linkTo"
                />
                收 藏
              </div>
            </button>
          </div>
        </div>
        <p @click="visible = true" class="cursor-pointer truncate">
          {{ albumInfo.album.description }}
        </p>
        <div>
          <a-tag
            :color="tagColor()"
            :checked="true"
            :default-checked="true"
            v-for="item in albumInfo.tags"
            :style="{ marginRight: '10px' }"
          >
            {{ item }}</a-tag
          >
        </div>
      </div>
    </div>
    <div class="flex justify-between gap-4 px-3 overscroll-y-auto">
      <div class="hybull w-1/2">
        <h2 class="h-4"></h2>
        <div
          v-for="item in albumInfo.songs"
          :key="item.id"
          @click="play(item)"
          class="flex h-14 my-1 px-4 justify-between backdrop-blur-sm items-center hover:shadow-xl hover:border-gray-300 cursor-pointer transition-all rounded-md"
        >
          <div class="flex-1 mx-2 text-left inline-block truncate">
            {{ item.name }}
          </div>
          <div class="w-40 flex justify-around">
            <MyPlay :id="item.id" />
            <span> {{ formatTime(item.dt) || "00:00:00" }}</span>
          </div>
        </div>
      </div>
      <div class="w-1/2">
        <h2 class="text-xl">mv影视</h2>
        <MovieCard
          class="m-6 mx-auto"
          v-for="item in mvList"
          :key="item.id"
          :item="item"
        ></MovieCard>
      </div>
    </div>
  </div>

  <ModalVue v-model:visible="visible" :title="albumInfo.album.name">
    <p>{{ albumInfo.album.description }}</p>
  </ModalVue>
</template>

<script lang="ts" setup>
import likeBut from "@/components/button/like.vue";
import ModalVue from "@/components/Modal.vue";
import { reactive, ref } from "vue";
import { formatTime, formatformat } from "@/utils/format";
import { albumContent } from "@/api/playlist";
import { getMusicDetail } from "@/api/music";
import { mvDetail } from "@/api/mv";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { DateFormat } from "@/utils/type/funType";

const store = useStore();
const route = useRoute();
const tagColor = () => store.getters.tagColor;
const id: number = +route.params?.id;

// 详情
const visible = ref(false);
const albumInfo = reactive<any>({
  songs: {},
  album: {},
  publishTime: "",
  tags: [],
});
const mvList = ref<Array<any>>([]);
getAlbumContent();
async function getAlbumContent() {
  const obj = await albumContent({ id });
  const songIds = obj.songs.map((e: any) => e.id);
  const songList = await getMusicDetail(songIds);
  Object.assign(albumInfo, obj);
  albumInfo.songs = songList.songs;
  const arr = songList.songs.map((e: any) => e.mv).filter(Boolean);
  for (let i = 0; i < arr.length; i++) {
    if (i < 3) {
      getMv(arr[i]);
    }
  }
}
async function getMv(mvid: number) {
  const f = await mvDetail(mvid);
  mvList.value.push(f.data);
}

// 播放
function play(item: { id: any }) {
  store.dispatch("ToggleSong", {
    id: item.id,
    playListId: id,
    list: albumInfo.songs,
  });
}
// like
async function linkTo() {}
</script>
<style scoped lang="scss">
.myclass::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 300px;
  z-index: -1;
  // background-image: url("../../assets/albums-bg.png");
  background-repeat: no-repeat;
  background-size: 105%;
  transform: rotate(10deg);

  .hybull {
    &::-webkit-scrollbar {
      display: none;
    }

    height: calc(100% - 270px);
  }
}
</style>
