<!--  -->
<template>
  <div @click.stop ref="playDom" class="playlistCss overflow-hidden h-full flex flex-col select-none px-3">
    <div class="p-2 flex">
      <h3>播放队列 :&nbsp;&nbsp; </h3>
      <div> <span class="text-[#b0b0fb]">{{ playlist.length }}</span> 首歌曲</div>
    </div>
    <div class="overflow-y-scroll relative" id="playId">
      <p class="pushpinCss">
        <icon-pushpin @click.stop="pushpin" />
      </p>
      <div v-for="item in playlist" :key="item.id" @click="play(item.id)"
        :class="`${item.id === playCurrent.id ? 'activeCss' : ''}`" class="group cursor-pointer p-2">
        <div class="overflow-ellipsis whitespace-nowrap w-4/5 overflow-hidden">
          {{ item.name }} - {{ item?.ar?.[0]?.name }}
        </div>
        <div class="flex justify-end px-4">
          <div class="flex items-center w-36 justify-between">
            <MyLike :id="item.id" class="" />
            <MyPlay :id="item.id" />
            <p>{{ formatTime(item?.dt) }}</p>
          </div>
          <div class="w-6 group-hover:w-10 transition-all">
            <icon-close @click.stop="() => Store.dispatch('deleteSong', item.id)"
              class="scale-110 group-hover:-translate-y-3 -translate-y-14 translate-x-7 group-hover:opacity-100 opacity-0 transition-all" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { formatTime } from "@/utils/format";
import { computed, ref } from "vue";
import { useStore } from "vuex";

const Store = useStore();

const emit = defineEmits(["change"]);

const playlist = computed(() => {
  return Store.state.song.playList;
});
const playCurrent = computed(() => {
  return Store.state.song.curPlaySong;
});

const play = (id: number) => {
  Store.dispatch("ToggleSong", { id, playListId: Store.state.song.playListId });
  emit("change", false);
};
const pushpin = () => {
  // 选中元素滚动到中间
  const el = document.getElementById("playId");
  if (el) {
    el.scrollTo({
      top:
        (el.scrollHeight / playlist.value.length) *
        playlist.value.findIndex((e: any) => e.id === playCurrent.value.id) -
        el.clientHeight / 2 +
        50,
      behavior: "smooth",
    });
  }
};

const playDom = ref<HTMLDivElement>();
</script>
<style scoped lang="scss">
.activeCss {
  background: #99bfff1c;
  color: #fbc2eb;
}

.playlistCss .group:hover {
  background: #ebedee;
}

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

.pushpinCss {
  color: #fff;
  position: fixed;
  bottom: 60px;
  right: 24px;
  cursor: pointer;
  width: 46px;
  height: 46px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -2;
  }

  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #fbc2eb;
    border-radius: 500px;
    z-index: -1;
    filter: blur(5px);
  }
}
</style>
