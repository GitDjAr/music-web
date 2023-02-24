<!--  -->
<template>
  <div
    class="myclass flex select-none overflow-hidden h-full relative"
    v-bind="$attrs"
  >
    <div class="w-1/5 pt-5" style="min-width: 160px">
      <Image
        :src="Albums.coverImgUrl"
        class="rounded-lg ml-2"
        :wh="[500, 500]"
      />
    </div>
    <div class="flex-1 ml-5" ref="refBox">
      <div
        :class="`text-left transition-all w-full flex flex-col justify-between  pb-4  h-52 `"
      >
        <h1 class="font-bold">{{ Albums.name }}</h1>
        <p>{{ formatTime(Albums.createTime, "YYYY-mm-dd") }}</p>
        <p>播放次数:{{ Albums.playCount }}</p>
        <p @click="visible = true" class="cursor-pointer truncate">
          {{ Albums.description }}
        </p>
        <div>
          <a-tag
            :color="tagColor()"
            :checked="true"
            :default-checked="true"
            v-for="item in Albums.tags"
            :style="{ marginRight: '10px' }"
          >
            {{ item }}</a-tag
          >
        </div>
      </div>
      <div
        class="hybull bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm flex flex-col overflow-scroll"
        v-infinite-scroll="scrollLoad"
      >
        <div
          v-for="item in AlbumsList"
          :key="item.id"
          @click="play(item)"
          class="flex justify-between items-center p-2 px-4 mb-3 hover:shadow-xl hover:border-gray-300 cursor-pointer transition-all rounded-md border border-b"
        >
          <Image
            :src="item.al.picUrl"
            :wh="[120, 120]"
            class="w-14 h-14 rounded-md"
          />
          <span class="flex-1 mx-2 text-left inline-block truncate">
            {{ item.name }}</span
          >
          <div class="w-40 flex justify-around mr-2">
            <icon-play-arrow />
            <MyLike :id="item.id" />
          </div>
          <span> {{ formatTime(item?.dt) || "00:00:00" }}</span>
        </div>
        <p v-show="playListEnd" class="text-center text-sky-300">
          到底辣 ~ ~ ~
        </p>
      </div>
    </div>
  </div>

  <ModalVue v-model:visible="visible" :title="Albums.name">
    <p>{{ Albums.description }}</p>
  </ModalVue>
  <a-back-top target-container="#custom-demo" :style="{ position: 'absolute' }">
    <icon-double-up />
  </a-back-top>
</template>

<script lang="ts" setup>
import ModalVue from "@/components/Modal.vue";
import { ref, computed, reactive, watch } from "vue";
import { vInfiniteScroll } from "@vueuse/components";
import { formatTime } from "@/utils/format";
import { _playlist_detail, _playlist_track_all } from "@/api/Home";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const route = useRoute();
const tagColor = () => store.getters.tagColor;
const id: string = <string>route.params?.id;

const visible = ref(false);

const params = reactive({
  id,
  limit: 35,
  pageNum: 0,
  offset: 0,
});
const Albums = ref({});
async function get_playlist_detail() {
  const { playlist } = await _playlist_detail(params);
  Albums.value = playlist;
}

const AlbumsList = computed(() => {
  return store.state.song.playList;
});
async function get_playlist_track_all(v?: boolean) {
  if (Albums.value.trackCount === AlbumsList.value.length) return;
  const { songs = [] } = await _playlist_track_all(params);
  store.dispatch("SetPlayList", v ? songs : AlbumsList.value.concat(songs));
}
get_playlist_detail();
get_playlist_track_all(true);

// 滚动加载
const playListEnd = computed(() => {
  return (
    AlbumsList.value.length > 35 &&
    Albums.value.trackCount === AlbumsList.value.length
  );
});
function scrollLoad() {
  ++params.pageNum;
  params.offset = params.limit * params.pageNum;
  get_playlist_track_all();
}
const refBox = ref<HTMLElement | null>(null);

function play(item) {
  store.dispatch("ToggleSong", item.id);
}
</script>
<style scoped lang="scss">
.myclass {
  background-image: url("../../assets/albums-bg.png");
  background-repeat: no-repeat;
  background-size: 105% auto;
  .hybull {
    height: calc(100% - 192px);
  }
}
</style>
