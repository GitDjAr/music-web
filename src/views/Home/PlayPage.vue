<!--  -->
<template>
  <div
    class="palyPage overflow-hidden"
    v-if="curPlaySong"
    :style="{ 'background-image': `url(${curPlaySong.img})` }"
  >
    <div class="backdrop-filter backdrop-blur-xl w-full h-full flex flex-col">
      <div
        class="pageh overflow-hidden h-full grid grid-cols-2 items-center md:px-4 xl:px-24 grid-flow-col justify-center"
      >
        <div class="flex justify-center items-center">
          <img :src="curPlaySong.img" class="w-3/5 object-cover" />
        </div>
        <div class="lyricsItem overflow-scroll h-full mr-3" style="">
          <ul class="my-10" :style="styleImg">
            <li
              class="transition-all text-xl mx-6 py-3 px-6 font-bold rounded-lg cursor-pointer select-none text-slate-300"
              :class="{ line: index == active }"
              v-for="(item, index) in curPlaySong.lrc"
              :id="item.time"
              @click="tickLyrices(item, index)"
            >
              {{ item.txt }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStorage } from "@vueuse/core";
import { ref, reactive, computed, watch, onMounted } from "vue";
import { useStore, mapGetters } from "vuex";
import { getImgeColor } from "@/utils/getImgeColor";

const Store = useStore();
const curPlaySong = computed(() => Store.getters.curPlaySong);
const Player = computed(() => Store.state.song.Player);
const styleImg = ref("--ImgColor:#fff");
const $emit = defineEmits(["cancel"]);

// 移动播放节点
const active = useStorage("lrcActive", 0);
onMounted(() => {
  tickLyrices(undefined, active.value);
});

watch(curPlaySong, (v) => {
  getImgeColor(v.picUrl, true).then((res: string) => {
    styleImg.value = `--ImgColor:${res}`;
  });
  tickLyrices(undefined, 0);
});

// 歌词滚动
setInterval(() => {
  const currentTime = Player.value?.getHow()?.seek();
  const lineTime = curPlaySong.value.lrc[active.value + 1]?.time;

  if (lineTime && currentTime >= lineTime) {
    tickLyrices(undefined, active.value + 1);
  }
}, 100);

function tickLyrices(item: Object | undefined, index: number) {
  const el = document.querySelector(".lyricsItem");
  if (!el) return;
  el.scrollTo({
    top:
      (el.scrollHeight / curPlaySong.value.lrc.length) * index -
      el.clientHeight / 2 +
      50,
    behavior: "smooth",
  });
  active.value = index;
  item && Player.value.SetSeeks(item.time);
}
</script>
<style scoped lang="scss">
svg.transform.myfont {
  font-size: 2rem;
  inlien-height: 2rem;
}

.line {
  color: var(--ImgColor);
  transform-origin: left center;
  transform: scale(1.1);
  transform: translateX(-10px);
  transition: all;
  color: #cbcb86;
  font-size: 1.7rem;
  span {
    filter: invert(1);
  }
}

.lyricsItem li:hover {
  background: rgba(255, 255, 255, 0.1);
}

// 高斯模糊背景
.palyPage {
  // background-image: var(--BgImg);
  background-size: cover;
  background-position: center;
  background-blend-mode: multiply;
  position: relative;
  height: 100%;
  width: 100%;

  background-color: rgba(0, 0, 0, 0.4);

  .pageh {
    height: calc(100% - 80px);
    margin: 10px 0;
  }
}

.lyricsItem::-webkit-scrollbar {
  display: none;
}
</style>
