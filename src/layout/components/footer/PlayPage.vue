<!--  -->
<template>
  <div
    class="palyPage overflow-hidden"
    v-if="curPlaySong"
    :style="{ 'background-image': `url(${curPlaySong.img})` }"
  >
    <div class="backdrop-filter backdrop-blur-3xl w-full h-full flex flex-col">
      <div
        class="pageh overflow-hidden h-full grid grid-cols-2 items-center md:px-4 xl:px-24 grid-flow-col justify-center"
      >
        <div
          class="flex justify-center items-center rounded-md overflow-hidden"
        >
          <Image
            :src="curPlaySong.img"
            class="w-3/5 rounded-md overflow-hidden object-cover"
          />
        </div>
        <div
          class="lyricsItem overflow-x-hidden overflow-y-scroll h-full mr-3 no-scroll"
          :class="curPlaySong.lrc.length <= 10 ? `flex items-center` : ''"
        >
          <!--     :style="{
                filter: `blur(${
                  (Math.abs(active - index) * 2) / 10 < 1.5
                    ? (Math.abs(active - index) * 2) / 10
                    : 1.5
                }px)`,
              }" -->
          <ul class="my-10" :style="styleImg" @click="handleClick">
            <li
              class="lrcLi"
              :class="{
                line: index == active,
              }"
              v-for="(item, index) in curPlaySong.lrc"
              :id="item.time + ''"
              :data-index="index"
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
import type { CurSongInfo } from "@/store/module/song";
import { ref, onBeforeUnmount, computed, watch, onMounted } from "vue";
import { getImgsColor, findClosestColor } from "@/utils/getImgsColor";
import { nextTick } from "vue";
import { useStore } from "vuex";
import { useDebounceFn } from "@vueuse/core";

const Store = useStore();

const curPlaySong = computed<CurSongInfo>(() => Store.getters.curPlaySong);
const Player = computed(() => Store.state?.song?.Player);
const lyricColor = computed(() => Store.state?.app?.lyricColor);
const styleImg = ref("--ImgColor:#FDCF41");
// const $emit = defineEmits(["cancel"]);

// 修改歌词滚动检查间隔，从100ms改为200ms
const tickScroll = () => {
  if (!Player.value?.getHow()) return; // 添加空值检查
  const currentTime = Player.value.getHow().seek();
  const lineTime = curPlaySong?.value?.lrc[active?.value + 1]?.time;

  if (lineTime && currentTime >= lineTime) {
    tickLyrics(undefined, active?.value + 1);
  }
};

// 使用 ref 存储定时器，方便清理
const timer = ref<number | null>(null);
onMounted(() => {
  timer.value = setInterval(tickScroll, 200) as unknown as number;
});

onBeforeUnmount(() => {
  if (timer.value) {
    clearInterval(timer.value);
    timer.value = null;
  }
});

// 优化图片颜色计算，添加防抖
const updateImgColor = useDebounceFn(async (img: string) => {
  try {
    const color = await getImgsColor(img);
    styleImg.value = `--ImgColor:${
      lyricColor.value ? findClosestColor(color) : "#FDCF41"
    }`;
  } catch (error) {
    console.error("Failed to get image color:", error);
  }
}, 300);

watch([curPlaySong, lyricColor], ([curV, prevV]) => {
  if (curV.img !== prevV.img) {
    updateImgColor(curV.img);
    tickLyrics(undefined, 0);
  }
});

const handleClick = () => {
  const index = Number((event?.target as HTMLElement)?.dataset.index);
  tickLyrics(curPlaySong.value.lrc[index], index);
};

// 移动播放节点
const active = useStorage("lrcActive", 0);
function tickLyrics(item: { time: any } | undefined, index: number) {
  const el = document.querySelector(".lyricsItem");
  if (!el) return;
  el.scrollTo({
    top:
      (el.scrollHeight / curPlaySong.value.lrc.length) * index -
      el.clientHeight / 2 +
      180,
    behavior: "smooth",
  });
  active.value = index;
  item && Player.value.SetSeeks(item.time);
}
function SetTickLyrics() {
  let acv = 0;
  let currentTime = Player.value?.SetSeeks();
  curPlaySong.value.lrc.forEach((e) => {
    const lineTime = e.time;
    if (lineTime && currentTime >= lineTime) {
      acv++;
    }
  });
  nextTick(() => tickLyrics(undefined, acv));
}

// 暴露方法  手动校验
defineExpose({
  SetTickLyrics,
});
</script>

<style scoped lang="scss">
svg.transform.myfont {
  font-size: 2rem;
  inlien-height: 2rem;
}

.lyricsItem .line {
  filter: blur(0) !important;
  color: var(--ImgColor);
  transform-origin: left center;
  transform: scale(1.1) translateX(-10px);
  transition: all;
  font-size: 1.7rem;
  will-change: transform;
  -webkit-backface-visibility: hidden;
}

.lyricsItem {
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  will-change: scroll-position;

  li {
    @apply transition-all text-xl mx-6 py-3 px-6 font-bold rounded-lg cursor-pointer select-none text-slate-300;
    will-change: transform, opacity;
    &:hover {
      filter: blur(0) !important;
      background: rgba(255, 255, 255, 0.1);
    }
  }
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
  transition: background-image 1s;

  background-color: rgba(0, 0, 0, 0.18);

  .pageh {
    height: calc(100% - 80px);
    margin: 10px 0;
  }
}
</style>
