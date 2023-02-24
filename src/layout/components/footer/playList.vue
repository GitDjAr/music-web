<!--  -->
<template>
  <div
    @click.stop
    ref="playDom"
    class="playlistCss overflow-hidden h-full flex flex-col select-none"
  >
    <div class="p-2">
      <h3>播放队列:</h3>
      <div>{{ playlist.length }}首歌曲</div>
    </div>
    <div class="overflow-scroll relative" id="playId">
      <p
        class="fixed bottom-16 right-4 bg-sky-400 cursor-pointer w-10 h-10 rounded-full flex justify-center align-middle items-center"
      >
        <icon-pushpin @click.stop="pushpin" style="color: white" />
      </p>
      <div
        v-for="item in playlist"
        :key="item.id"
        @click="play(item.id)"
        :class="`${
          item.id === playCurrent.id ? 'text-yellow-400 bg-green-100' : ''
        }`"
        class="group hover:bg-gray-100 cursor-pointer p-2"
      >
        <div class="overflow-ellipsis whitespace-nowrap overflow-hidden">
          {{ item.name }}
        </div>
        <div class="flex justify-between">
          <p class="overflow-ellipsis whitespace-nowrap overflow-hidden">
            {{ item.user }}
          </p>
          <div class="flex items-center w-36 justify-between">
            <MyLike
              :id="item.id"
              class="none group-hover:opacity-100 group-hover:block"
            />
            <icon-play-arrow />
            <p>{{ formatTime(item?.dt) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { formatTime } from "@/utils/format";
import { computed, ref, onDeactivated, nextTick } from "vue";
import store from "@/store";

const emit = defineEmits(["change"]);

const playlist = computed(() => {
  return store.state.song.playList;
});
const playCurrent = computed(() => {
  return store.state.song.curPlaySong;
});

const play = (id: number) => {
  store.dispatch("ToggleSong", id);
  emit("change", false);
};
const pushpin = () => {
  // 选中元素滚动到中间
  const el = document.getElementById("playId");
  if (el) {
    el.scrollTo({
      top:
        (el.scrollHeight / playlist.value.length) *
          playlist.value.findIndex((e) => e.id === playCurrent.value.id) -
        el.clientHeight / 2 +
        50,
      behavior: "smooth",
    });
  }
};

const playDom = ref<HTMLDivElement>();
window.addEventListener("click", () => {
  emit("change", false);
});
// nextTick(() => {
//   playDom.value?.addEventListener("mouseenter", () => {
//     playDom.value?.addEventListener("mouseleave", () => {
//       emit("change", false);
//     });
//   });
// });

// onDeactivated(() => {
//   playDom.value?.removeEventListener("mouseenter", () => {});
//   playDom.value?.removeEventListener("mouseleave", () => {});
// });
</script>
<style scoped lang="scss">
.playlistCss {
  border-left: 1px solid #e6e6e6;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    filter: blur(50px);
  }
}
</style>
