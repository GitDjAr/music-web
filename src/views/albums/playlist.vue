<!--  -->
<template>
  <div
    class="myclass box-border flex select-none overflow-hidden h-full w-full relative"
    v-bind="$attrs"
  >
    <div class="w-1/5 pt-5 mr-5" style="min-width: 160px">
      <Image
        :src="Albums.coverImgUrl"
        class="rounded-lg ml-2 mb-5"
        :wh="[500, 500]"
      />
      <!-- <Button @click="collect" :collectFlag="collectFlag">
        {{ $t("nav.collect") + $t("playlist.playlist") }}
        <icon-heart-fill
          v-if="collectFlag"
          :style="{ color: 'red' }"
          class="cursor-pointer"
        />
        <icon-heart v-else class="hover: text-pink - 500 cursor - pointer" />
      </Button> -->
      <div>
        <icon-heart-fill
          v-if="collectFlag"
          :style="{ color: 'red' }"
          class="cursor-pointer"
        />
        <icon-heart v-else class="hover: text-pink - 500 cursor - pointer" />
      </div>
    </div>
    <div class="flex-1 w-0" ref="refBox">
      <div
        v-if="Albums.name"
        :class="`text-left   pb-4  transition-all w-full flex flex-col justify-between  h-52 `"
        style="color: var(--my-color)"
      >
        <h1 class="fleetingTime">{{ Albums.name }}</h1>
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
            @click="goPlayPage(item)"
            v-for="item in Albums.tags"
            :style="{ marginRight: '10px' }"
          >
            {{ item }}</a-tag
          >
        </div>
      </div>

      <a-skeleton v-else :animation="true" class="h-52 pt-5">
        <div class="mb-5">
          <a-skeleton-line :rows="1" :widths="['90%']" :line-height="35" />
        </div>
        <a-skeleton-line
          :rows="3"
          :widths="['40%', '50%', '80%']"
          :line-height="22"
        />
      </a-skeleton>
      <div
        class="hybull bg-opacity-90 backdrop-filter backdrop-blur-sm flex flex-col overflow-y-auto"
        v-infinite-scroll="[scrollLoad, { distance: 12 }]"
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
// import { delay } from "@/utils/delay";
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
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { DateFormat } from "@/utils/type/funType";

const store = useStore();
const route = useRoute();
const router = useRouter();
const tagColor = () => store.getters.tagColor;
const id: number = +route.params?.id;

const visible = ref(false);

const params = reactive({ id, limit: 50, pageNum: 0, offset: 0 });
const Albums = ref<Partial<T.PlayObj>>({});
async function get_playlist_detail() {
  const { playlist } = await _playlist_detail({ id });
  Albums.value = playlist;
}

//去歌单页面
const goPlayPage = (v: string) => {
  router.push({ path: "/Music/playListPage", query: { tag: v } });

  console.log("v", v);
};

type alb = T.MusicPlayList & {
  ar?: { name: string }[];
  al?: { picUrl: string };
  dt: number;
};
const AlbumsList = ref<alb[]>(Array(8).fill({}));

async function get_playlist_track_all() {
  if (Albums.value?.trackCount === AlbumsList.value.length) return;
  const { songs = [] } = await _playlist_track_all(params);
  // await delay(3000);
  AlbumsList.value = AlbumsList.value.filter((e) => e.id);
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

  .hybull {
    height: calc(100% - 208px);
    background: var(--color-bg-2);
    border-radius: 4px;
  }
}
</style>
