<!--  -->
<template>
  <div>
    <h1 class="text-xl text-left" ref="singerDom">
      {{ $t("home.recommendArtist") }}
    </h1>
    <div class="grid grid-cols-6 items-center justify-between gap-6">
      <div
        class="mx-1.5 truncate rounded-full group/singer transition-all"
        :alt="item.reason"
        :key="index"
        v-for="(item, index) in artistsList"
        @click="CheckSinger(item.id)"
        :style="{ '--stagger': index }"
      >
        <div class="nils-css">
          <img
            class="rounded-full cursor-pointer"
            :src="`${item.img1v1Url}?param=180y180`"
          />
        </div>

        <!-- <p
          class="group-hover/singer:opacity-100 group-hover/singer:translate-y-0 -translate-y-1 opacity-0 my-1 w-full"
        >
          {{ item.name }}
        </p> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useIntersectionObserver } from "@vueuse/core";
import { ref, watch } from "vue";

import { artists as Getartists } from "@/api/Home";
import { useRouter } from "vue-router";
const router = useRouter();

const artistsList = ref<any>({});

// 是否可预见
const singerDom = ref();
const targetIsVisible = ref(false);
const { stop } = useIntersectionObserver(
  singerDom,
  ([{ isIntersecting }], observerElement) => {
    targetIsVisible.value = isIntersecting;
  },
);
watch(() => targetIsVisible.value, getArtists);

// 热门歌手
async function getArtists() {
  const { artists } = await Getartists({});
  artistsList.value = artists.splice(0, 6);
  console.log(
    "🚀 ~ file: singer.vue:58 ~ getArtists ~ artistsList.value:",
    artistsList.value,
  );
  stop();
}

// 去歌手主页
function CheckSinger(id: number) {
  router.push(`/Music/singer/${id}`);
}
</script>
<style scoped lang="scss">
.nils-svg {
  width: 300px;
}

$hexagon: polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%);
$hexagonStart: polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%);

@keyframes hexagonAnim {
  0% {
    clip-path: $hexagonStart;
  }
  100% {
    clip-path: $hexagon;
  }
}

.nils-css {
  position: relative;
  width: 100%;
  height: 100%;

  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    clip-path: $hexagon;
  }

  &:before {
    z-index: 1;
    background-color: rgba(black, 0.03);
    transform: translate(-7px, -8px);
  }

  &:after {
    z-index: 2;
    background-color: rgba(black, 0.02);
    transform: translate(4px, -5px);
  }

  img {
    position: relative;
    z-index: 3;
    display: block;
    width: 100%;
    /* clip-path: $hexagonStart; */
    animation: hexagonAnim 0.5s ease-in forwards;
  }
}
</style>
