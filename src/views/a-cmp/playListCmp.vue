<!--  -->
<template>
  <div
    class="myclass box-border flex select-none overflow-hidden h-full w-full relative"
    v-bind="$attrs"
  >
    <div class="w-1/5 pt-5" style="min-width: 160px">
      <Image
        :src="Albums.coverImgUrl"
        class="rounded-lg ml-2"
        :wh="[500, 500]"
      />
      <Button @click="collect" v-show="props.isShowCollect" class="mt-10">
        {{ $t("nav.collect") + $t("playlist.playlist") }}
        <icon-heart-fill
          v-if="collectFlag"
          :style="{ color: 'red' }"
          class="cursor-pointer"
        />
        <icon-heart v-else class="hover: text-pink - 500 cursor - pointer" />
      </Button>
    </div>
    <div class="w-4/5" ref="refBox">
      <div
        :class="`text-left  pl-5  pb-4  transition-all w-full flex flex-col justify-between  h-52 `"
      >
        <h1 class="font-bold">{{ Albums.name }}</h1>
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
        class="hybull pl-5 bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm flex flex-col overflow-y-auto"
        v-infinite-scroll="scrollLoad"
      >
        <div
          v-for="item in AlbumsList"
          :key="item.id"
          @click="play(item)"
          class="flex justify-between items-center p-2 px-4 mb-3 hover:shadow-xl hover:border-gray-300 cursor-pointer transition-all rounded-md border border-b"
        >
          <Image
            :src="item?.al?.picUrl"
            :wh="[120, 120]"
            class="w-14 h-14 rounded-md"
          />
          <div class="flex-1 mx-2 text-left inline-block truncate">
            {{ item.name }}
          </div>
          <div>{{ item?.ar?.[0]?.name }}</div>
          <div class="w-40 flex justify-around mr-2">
            <MyPlay :id="item.id" />
            <MyLike :id="item.id" />
          </div>
          <span> {{ formatTime(item.dt) || "00:00:00" }}</span>
        </div>
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
import { formatTime, formatformat } from "@/utils/format";
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
const emit = defineEmits<["scroll"]>();
const props = withDefaults(defineProps<{ isShowCollect: boolean }>(), {
  isShowCollect: true,
});

const tagColor = () => store.getters.tagColor;
const id: number = +route.params?.id;

const visible = ref(false);

const params = reactive({ id, limit: 35, pageNum: 0, offset: 0 });
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
    AlbumsList.value.length > 35 &&
    Albums.value?.trackCount === AlbumsList.value.length
  );
});

const refBox = ref<HTMLElement | null>(null);

function play(item: { id: any }) {
  store.dispatch("ToggleSong", {
    id: item.id,
    playListId: id,
    list: AlbumsList.value,
  });
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
