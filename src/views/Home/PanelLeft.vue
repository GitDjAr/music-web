<!--  -->
<template>
  <div class="home-left">
    <h2 class="t-lf pad-l-10">{{ $t("home.recommendMv") }}</h2>
    <a-carousel class="carousel" :auto-play="true" animation-name="fade" show-arrow="never" indicator-type="slider">
      <a-carousel-item v-for="(item, index) in state.personalized" :key="index">
        <Image :src="item.picUrl" :wh="[1000, 600]" :alt="item.copywriter" @click="GoPlay(item)"
          class="w-full h-full object-cover" />
      </a-carousel-item>
    </a-carousel>
    <h1 class="text-xl  text-left   ">{{ $t("home.recommendPlaylist") }}</h1>
    <div class="Nouvea">
      <div class="NouList" :key="index" v-for="(item, index) in state.recommendPlaylist">
        <div class="rounded-lg overflow-hidden relative curp group">
          <Image class="list-img group-hover:scale-110 group-hover:duration-500 transition-all" :src="item.picUrl"
            :wh="[200, 200]" :alt="item.copywriter" @click="albumOver(item)" />
          <p
            class="z-10 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 opacity-0 flex group-hover:opacity-100 transition-all justify-center items-center bg-slate-300 bg-opacity-50 rounded-3xl scale-150">
            <MyPlay :id="item.id" />
          </p>
        </div>
        <p class=" mb-2">{{ item.name }}</p>
        <!-- <a-tag :color="resourceColor(item.id)" size="mini">{{item.creator.expertTags}}</a-tag> -->
      </div>
    </div>
    <MyVideo :id="videoId" v-model:show="VideoShow"></MyVideo>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { personalizedMV, resource } from "@/api/Home";
import type { IdOps } from "@/utils/type/id";

const router = useRouter()
const state = reactive({
  personalized: [{ picUrl: "" }, { copywriter: "" }],
  recommendPlaylist: [
    {
      name: "",
      id: "",
      picUrl: "",
      copywriter: "",
    },
  ],
});

// 推薦mv
async function getPersonalized() {
  const { result } = await personalizedMV();
  state.personalized = result.splice(0, 6);
}
// 推荐歌单
async function recommendPlaylist() {
  const { recommend } = await resource({});
  state.recommendPlaylist = recommend.splice(0, 8);
}

// 播放
const videoId = ref("");
const VideoShow = ref(false);
const GoPlay = (item: object) => {
  videoId.value = item.id
  VideoShow.value = true
};
// 查看明细
const CheckDetails = (Details: any) => {
  // router.push()
};
const albumOver = ({ id }: IdOps) => {
  router.push({ name: "playlist", params: { id } });
};
const resourceColor = (v: string | number) => {
  return `#cdd${v.toString().slice(0, 3)}`;
};
const Checksinger = (singer: any) => {
  // router.push()
};
onMounted(() => {
  recommendPlaylist();
  getPersonalized();
});
</script>
<style scoped lang="scss">
.home-left {
  h2 {
    font-size: 1rem;
    margin: 10px 0;
  }

  flex-grow: 1;
  width: 200px;
  margin-right: 10px;

  .carousel {
    height: 260px;
    border-radius: 30px;
    overflow: hidden;
  }

  .Nouvea {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    align-items: start;
    justify-items: center;

    .NouList {
      flex: 1;
      width: 85%;

      p {
        padding: 5px 0;
        text-align: left;
      }
    }
  }
}
</style>
