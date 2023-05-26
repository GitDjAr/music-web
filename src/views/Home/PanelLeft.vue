<!--  -->
<template>
  <div class="home-left">
    <h2 class="text-left px-3">{{ $t("home.recommendMv") }}</h2>
    <a-carousel
      class="carousel"
      :auto-play="true"
      animation-name="fade"
      show-arrow="never"
      indicator-type="slider"
    >
      <a-carousel-item
        v-for="(item, index) in state.personalizedMV"
        :key="index"
      >
        <Image
          :src="item.picUrl"
          :wh="[1000, 600]"
          :alt="item.copywriter"
          @click="GoPlay(item)"
          class="w-full h-full object-cover"
        />
      </a-carousel-item>
    </a-carousel>
    <MyVideo :id="videoId" v-model:show="VideoShow"></MyVideo>

    <template v-if="Store.getters.loginStatus">
      <h1 class="text-xl text-left">{{ $t("home.recommendPlaylist") }}</h1>
      <div class="Nouvea">
        <div
          class="NouList mb-2"
          :key="index"
          v-for="(item, index) in recommendPlaylist"
        >
          <div class="rounded-lg overflow-hidden relative cursor-pointer group">
            <Image
              class="list-img transition-all"
              :src="item.picUrl"
              :wh="[200, 200]"
              :alt="item.copywriter"
              @click="albumOver(item)"
            >
              <div class="playCss">
                <MyPlay :id="item.id" />
              </div>
            </Image>
          </div>
          <p class="line-clamp-2 leading-tight text-base">
            {{ item.name }}
          </p>
          <!-- <a-tag :color="resourceColor(item.id)" size="mini">{{item.creator.expertTags}}</a-tag> -->
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { personalizedMV } from "@/api/Home";
import { useStore } from "vuex";
import { computed } from "vue";

const Store = useStore();
const router = useRouter();
const state = reactive({
  personalizedMV: [{ picUrl: "", id: 0, copywriter: "" }],
});

const recommendPlaylist = computed(() => {
  return Store.state.song.recommendPlaylist;
});

// 推薦mv
async function getPersonalized() {
  const { result } = await personalizedMV();
  state.personalizedMV = result?.splice(0, 6);
}
// 推荐歌单

// 播放
const videoId = ref("");
const VideoShow = ref(false);
const GoPlay = (item: { id: number }) => {
  videoId.value = item.id + "";
  VideoShow.value = true;
};

const albumOver = ({ id }: { id: number }) => {
  router.push({ name: "playlist", params: { id } });
};
onMounted(() => {
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

      .playCss {
        height: 101%;
        width: 101%;
        background: #ffffff6b;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: all 0.3s;
        div {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(1.5);
          border-radius: 100px;
          color: #fff;
        }
        &:hover {
          opacity: 1;
        }
      }
    }
  }
}
</style>
