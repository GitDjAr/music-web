<!--  -->
<template>
  <div
    class="myclass box-border flex select-none overflow-hidden h-full w-full relative"
    v-bind="$attrs"
  >
    <div class="w-1/5 pt-5 mr-5" style="min-width: 160px">
      <Image
        :src="Albums.coverImgUrl"
        class="rounded-lg ml-2"
        :wh="[500, 500]"
      />
      <Button @click="collect" :collectFlag="collectFlag" class="mt-10">
        {{ $t("nav.collect") + $t("playlist.playlist") }}
        <icon-heart-fill
          v-if="collectFlag"
          :style="{ color: 'red' }"
          class="cursor-pointer"
        />
        <icon-heart v-else class="hover: text-pink - 500 cursor - pointer" />
      </Button>
    </div>
    <div class="flex-1 w-0" ref="refBox">
      <div
        :class="`text-left   pb-4  transition-all w-full flex flex-col justify-between  h-52 `"
        style="color: var(--my-color)"
      >
        <h1 class="font-bold titleCss">{{ Albums.name }}</h1>
        <p>创建日期: {{ formatformat(Albums.createTime, DateFormat.ymd) }}</p>
        <p>播放次数: {{ Albums.playCount }}</p>
        <p @click="visible = true" class="cursor-pointer truncate w-11/12">
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
        class="hybull bg-opacity-90 backdrop-filter backdrop-blur-sm flex flex-col overflow-y-auto"
        v-infinite-scroll="scrollLoad"
      >
        <template v-for="item in AlbumsList" :key="item.id">
          <song
            :id="item.id"
            :dt="item.dt"
            :songName="item.name"
            :singer="item?.ar?.[0]?.name"
            :url="item?.al?.picUrl"
            @click="play(item)"
          />
        </template>
        <p v-show="playListEnd" class="text-center text-sky-300">
          到底辣 ~ ~ ~
        </p>
      </div>
    </div>
  </div>

  <ModalVue v-model:visible="visible" :title="Albums?.name">
    <p>{{ Albums.description }}</p>
  </ModalVue>
</template>
<script lang="ts">
export default { name: "playlist" };
</script>

<script lang="ts" setup>
import Button from "@/components/button/index.vue";
import ModalVue from "@/components/Modal.vue";

import { ref, computed, reactive } from "vue";
import { vInfiniteScroll } from "@vueuse/components";
import { formatformat } from "@/utils/format";
import {
  _playlist_detail,
  _playlist_track_all,
  subscribePlaylist,
  T,
} from "@/api/playlist";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { DateFormat } from "@/utils/type/funType";

const store = useStore();
const route = useRoute();
const tagColor = () => store.getters.tagColor;
const id: number = +route.params?.id;

const visible = ref(false);

const params = reactive({ id, limit: 100, pageNum: 0, offset: 0 });
const Albums = ref<Partial<T.PlayObj>>({});
async function get_playlist_detail() {
  const { playlist } = await _playlist_detail({ id });
  Albums.value = playlist;
}

type alb = T.MusicPlayList & {
  ar?: { name: string }[];
  al?: { picUrl: string };
  dt: number;
};
const AlbumsList = ref<alb[]>([]);

async function get_playlist_track_all() {
  if (Albums.value?.trackCount === AlbumsList.value.length) return;
  const { songs = [] } = await _playlist_track_all(params);
  AlbumsList.value.push(...(songs as alb[]));
}
get_playlist_detail();
get_playlist_track_all();

// 收藏
const collectFlag = computed(() => {
  return store.state.song?.collectList?.ids?.includes(id);
});
const collect = async () => {
  const { code } = await subscribePlaylist({
    t: collectFlag.value ? 2 : 1,
    id,
  });
  code == 200 && store.dispatch("getUserPlaylist");
};

// 滚动加载
const playListEnd = computed(() => {
  return (
    AlbumsList.value.length > 100 &&
    Albums.value?.trackCount === AlbumsList.value.length
  );
});
async function scrollLoad() {
  ++params.pageNum;
  params.offset = params.limit * params.pageNum;
  await get_playlist_track_all();
  store.dispatch("SetPlayList", { playListId: id, list: AlbumsList.value });
}
const refBox = ref<HTMLElement | null>(null);

function play(item: { id: any }) {
  const inTheDay =
    new Date().toISOString().split("T")[0].split("-").at(-1) + "";
  store.dispatch("ToggleSong", {
    id: item.id,
    playListId: id + inTheDay,
    list: AlbumsList.value,
  });
}
</script>
<style scoped lang="scss">
.myclass {
  background-image: var(--image-url);
  background-repeat: no-repeat;
  background-size: 105% auto;
  .titleCss {
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 300%;
    background-image: linear-gradient(
      45deg,
      rgb(255, 178, 64),
      rgb(255, 100, 106),
      rgb(211, 118, 247),
      rgb(55, 75, 249)
    );
    position: relative;
    z-index: 1;
    animation: 5s ease-in-out 0s infinite normal none running TextFlow;
  }
  .hybull {
    height: calc(100% - 208px);
    background: var(--color-bg-2);
    border-radius: 4px;
  }
}
</style>
