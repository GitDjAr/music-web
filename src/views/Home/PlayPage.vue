<!--  -->
<template>
  <div
    class="palyPage overflow-hidden"
    v-if="CurPlaySong"
    :style="{ 'background-image': `url(${CurPlaySong.picUrl})` }"
  >
    <div class="backdrop-filter backdrop-blur-xl w-full h-full flex flex-col">
      <!-- <header class="h-10 flex items-center w-full px-2 fixed justify-end">
        <icon-down @click="$emit('cancel')"
          class="transform  hover:bg-slate-300 hover:scale-110  cursor-pointer  h-full c " />
      </header> -->
      <div
        class="pageh overflow-hidden h-full grid grid-cols-2 items-center md:px-4 xl:px-24 grid-flow-col justify-center"
      >
        <div class="flex justify-center items-center">
          <img :src="CurPlaySong.picUrl" class="w-3/5 object-cover" />
        </div>
        <div class="lyricsItem overflow-scroll h-full" style="">
          <ul class="my-10" :style="styleImg">
            <li
              class="transition-all text-xl mx-6 py-3 px-6 font-bold rounded-lg cursor-pointer select-none text-slate-300"
              :class="{ line: index == active }"
              v-for="(item, index) in lyrics"
              @click="tickLyrices(item, index)"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch } from "vue";
import { useStore, mapGetters } from "vuex";
import { getImgeColor } from "@/utils/getImgeColor";
const Store = useStore();
console.log(Store);
const CurPlaySong = computed(() => Store.getters.CurPlaySong);
const styleImg = ref("--ImgColor:#fff");

watch(CurPlaySong, (v) => {
  console.log(v.picUrl);
  getImgeColor(v.picUrl, true).then((res: string) => {
    styleImg.value = `--ImgColor:${res}`;
    console.log(res);
  });
});
const $emit = defineEmits(["cancel"]);
// Store?.app?.CurPlaySong?.lyrics ||
const lyrics = Array.from({ length: 100 }).map((_, index) => `${index}`);

// 移动播放节点
const active = ref(0);
const tickLyrices = (item: Object, index: number) => {
  const el = document.querySelector(".lyricsItem");
  if (!el) return;
  el.scrollTo({
    top: (el.scrollHeight / lyrics.length) * index - el.clientHeight / 2 + 50,
    behavior: "smooth",
  });
  active.value = index;
};
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
