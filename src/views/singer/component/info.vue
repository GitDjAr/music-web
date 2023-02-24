<!--  -->
<template>
  <div class="flex justify-between">
    <div class="">
      <h2>{{ "最新专辑" }}</h2>
      <div class="flex items-center">
        <Image class="w-32 h-32 rounded-md shadow-md" src="" alt="" />
        <div class="flex-1">
          <span>title</span>
          <p>content</p>
          <p>mo</p>
          <div>
            <icon-plus v-if="true" />
            <icon-check v-else />
            收藏
          </div>
          <UsesDesc></UsesDesc>
        </div>
      </div>
    </div>
    <div class="w-1/3">
      <h2>{{ "最多播放" }}</h2>
      <ul class="p-2 rounded-md bg-white">
        <li
          class="flex mb-2 justify-between items-center text-ellipsis overflow-hidden leading-5"
          @click="Musicianly"
          :key="item.id"
          v-for="item in artistsSing"
        >
          <Image class="rounded-t w-14 h-14" :src="item?.al?.picUrl" alt="" />
          <span class="inline-block w-1/3 px-2 text-left">{{
            item?.name
          }}</span>
          <p class="flex-1">{{ item?.privilege?.playMaxbr }}次</p>
          <icon-play-arrow />
          <!-- <div class="w-12">
            <MyLike />
          </div> -->
        </li>
      </ul>
    </div>
    <div>
      <h2>{{ "相关艺人" }}</h2>
      <ul>
        <li
          class="flex items-center mt-2"
          @click="singerReps(item.id)"
          :key="item.id"
          v-for="(item, index) in simiartist"
        >
          <Image class="rounded-full w-16 h-16" :src="item?.img1v1Url" alt="" />
          <span class="inline-block flex-1 pl-2 box-border text-left">{{
            item?.name
          }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import type { Router, RouteLocationNormalizedLoaded } from "vue-router";
// import type { StoreOptions } from 'vuex'
// import store from 'src/store'
import { _simi_artist, _artists, _simi_playlist } from "@/api/user";
import UsesDesc from "../../uses_Desc/index.vue";
type Idtype = string | number;

const P = defineProps<{
  props: {
    id: string;
    router: Router;
    singerInfo: object;
    route: RouteLocationNormalizedLoaded;
    // store: StoreOptions<typeof store>
  };
}>();
const Emit = defineEmits<{
  (e: "updateId", v: string): void;
}>();

function Musicianly() {}

// 相似歌手
const simiartist = ref([]);
async function get_simi_artist(id: Idtype) {
  const { artists } = await _simi_artist({ id });
  simiartist.value = artists.splice(0, 4);
}
function singerReps(id: string) {
  P.props.router.push(`/Music/singer/${id}`);
  Emit("updateId", id);
}

// 相似歌单
const simiplaylist = ref([]);
async function get_simi_playlist(id: Idtype) {
  const { playlists } = await _simi_playlist({ id });
  simiplaylist.value = playlists;
}
// 部分信息和热门歌曲
const artistsSing = ref([]);
async function get_artists(id: Idtype) {
  const { hotSongs, artist } = await _artists({ id });
  artistsSing.value = hotSongs.splice(0, 6);
}

watch(
  () => P.props.id,
  () => {
    init();
  }
);
function init() {
  get_simi_artist(P.props.id);
  get_simi_playlist(P.props.id);
  get_artists(P.props.id);
}
init();
</script>
<style scoped lang="scss">
h2 {
  font-size: 1.4rem;
  padding: 8px 0px;
}
</style>
