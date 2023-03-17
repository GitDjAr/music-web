<!--  -->
<template>
  <div class="flex justify-between">
    <div class="">
      <h2>{{ "最新专辑" }}</h2>
      <div class="flex items-center">
        <Image
          class="w-32 h-32 rounded-md shadow-md"
          src=""
          :wh="[220, 220]"
          alt=""
        />
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
        <template v-for="(item, index) in artistsSing">
          <li
            class="flex mb-2 justify-between items-center overflow-hidden cursor-pointer leading-5"
            @click="Musicianly(item)"
            v-if="index < 6"
            :key="item.id"
          >
            <Image
              class="rounded-t w-14 h-14"
              :src="item?.al?.picUrl"
              :wh="[80, 80]"
              alt=""
            />
            <span class="flex-1 inline-block px-3 items-center truncate">{{
              item?.name
            }}</span>
            <!-- <p class="flex-1">{{ item?.privilege?.playMaxbr }}次</p> -->
            <MyPlay :id="item.id" class="mx-4" />
            <MyLike :id="item.id" />
          </li>
        </template>
      </ul>
    </div>
    <div>
      <h2>{{ "相关艺人" }}</h2>
      <ul>
        <li
          class="flex items-center mt-2"
          @click="singerReps(item.id)"
          v-for="item in simiartist"
          :key="item.id"
        >
          <Image
            class="rounded-full w-16 h-16"
            :src="item?.img1v1Url"
            :wh="[80, 80]"
            alt=""
          />
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
import Store from "@/store";
import { useRouter } from "vue-router";
import { _simi_artist, _artists, _simi_playlist } from "@/api/user";

import UsesDesc from "../../uses_Desc/index.vue";
type IdType = string | number;
const router = useRouter();

const P = defineProps<{
  props: {
    id: string;
    singerInfo?: object;
  };
}>();
const Emit = defineEmits<{
  (e: "updateId", v: string): void;
}>();

function Musicianly(item) {
  Store.dispatch("ToggleSong", {
    id: item.id,
    playListId: user.value + "-最多播放",
    list: artistsSing.value,
  });
}

// 相似歌手
const simiartist = ref([]);
async function get_simi_artist(id: IdType) {
  const { artists } = await _simi_artist({ id });
  simiartist.value = artists.splice(0, 4);
}
function singerReps(id: string) {
  router.push(`/Music/singer/${id}`);
  Emit("updateId", id);
}

// 相似歌单
const simiplaylist = ref([]);
async function get_simi_playlist(id: IdType) {
  const { playlists } = await _simi_playlist({ id });
  simiplaylist.value = playlists;
}
// 部分信息和热门歌曲
const artistsSing = ref([]);
const user = ref("");
async function get_artists(id: IdType) {
  const {
    hotSongs,
    artist: { name },
  } = await _artists({ id });
  artistsSing.value = hotSongs;
  user.value = name;
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
