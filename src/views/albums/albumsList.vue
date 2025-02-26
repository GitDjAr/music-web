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
        <div class="flex justify-between items-center mr-20">
          <div class="leading-10">
            <p>
              发布时间:
              {{ formatformat(albumInfo.publishTime, DateFormat.ymd) }}
            </p>
            <p>播放次数:{{ albumInfo.playCount }}</p>
          </div>
          <likeBut
            ><div :class="`px-4 `">
              收 藏
              <component
                :is="`icon-heart${
                  albumInfo?.album?.info?.liked ? '-fill' : ''
                }`"
                :class="`cursor-pointer text-4xl`"
                @click.stop="linkTo"
              /></div
          ></likeBut>
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
    <div class="overscroll-y-auto hybull">
      <div
        v-for="item in albumInfo.songs"
        :key="item.id"
        @click="play(item)"
        class="flex h-14 my-1 px-4 mx-40 justify-between bg-white bg-opacity-50 backdrop-filter backdrop-blur-sm items-center hover:shadow-xl hover:border-gray-300 cursor-pointer transition-all rounded-md border border-b"
      >
        <div class="flex-1 mx-2 text-left inline-block truncate">
          {{ item.name }}
        </div>
        <div class="w-40 flex justify-around mr-2">
          <MyPlay :id="item.id" />
          <span> {{ formatTime(item.dt) || "00:00:00" }}</span>
        </div>
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
async function getAlbumContent() {
  const obj = await albumContent({ id });
  const songIds = obj.songs.map((e: any) => e.id);
  const songList = await getMusicDetail(songIds);
  Object.assign(albumInfo, obj);
  albumInfo.songs = songList;
}
getAlbumContent();

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
