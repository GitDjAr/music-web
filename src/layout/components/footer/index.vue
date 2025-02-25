<!--  -->
<template>
  <div
    style="height: 60px"
    class="relative w-full overflow-hidden"
    @click.stop="toggle(2)"
    v-if="curPlaySong.id"
  >
    <div
      class="myclass h-full w-full grid items-center select-none padding10"
      :class="visible ? 'absolute padding10' : ''"
    >
      <div
        class="grid items-center justify-center"
        style="grid-template-columns: 60px 3fr 1fr"
        @click.stop
      >
        <Image
          style="width: 50px"
          class="rounded-lg object-cover cursor-pointer"
          :src="curPlaySong.img"
        />
        <div class="w-48">
          <h2
            class="cursor-pointer text-ellipsis whitespace-nowrap overflow-hidden"
          >
            {{ curPlaySong?.songName }}
          </h2>
          <p class="cursor-pointer pt-1" @click="goUser">
            {{ curPlaySong?.user }}
          </p>
        </div>
        <MyLike :id="curPlaySong.id" />
      </div>
      <div class="grid" @click.stop>
        <div class="flex items-center justify-between" style="height: 25px">
          <span class="w-12">{{ formatTime(Player._progress * 1000) }}</span>
          <div class="mx-4 flex-1 rounded-md">
            <div
              @mousedown.self="drag($event, 'progress')"
              class="border-white cursor-pointer _B2 rounded-md"
              style="height: 6px"
            >
              <div
                :style="{ width: CurTimeTack }"
                class="progress-bar-inner relative transition-all pointer-events-none bg-purple-300 h-full rounded-l-md"
              >
                <palyGif :src="Store.state.app.iconPse" alt="" ref="myImg" />
              </div>
            </div>
          </div>
          <span class="w-12">{{
            curPlaySong.song?.fee === 1
              ? "试听中"
              : formatTime(curPlaySong.duration)
          }}</span>
        </div>
        <div class="flex justify-center items-center" style="height: 35px">
          <MyIcon
            name="playlist"
            @click.stop="toggle(1)"
            :class="{ ' invisible': visible }"
          />
          <icon-backward @click.stop="Player.prevSong" />
          <button @keydown.enter="Player.pause()">
            <component
              @click.stop="Player.pause()"
              :is="`icon-${Player.playStatus ? 'pause' : 'play'}-circle-fill`"
              style="font-size: 2rem"
            />
          </button>
          <icon-forward @click.stop="Player.nextSong" />
          <component
            @click.stop="Store.dispatch('SetPlaybackMode')"
            :is="`icon-${mode}`"
          />
          <div
            @click.stop
            class="w-40 group relative cursor-pointer flex items-center"
          >
            <!-- <icon-mute v-if="Player._volume === 0" @click="Player?._setvolume(0.6)" /> -->
            <MyIcon
              :name="iconSvg"
              @click="Player?._setvolume(Player._volume == 0 ? 0.6 : 0)"
            />
            <!-- <div class="flex-1 mx-4 h-1 cursor-pointer bg-purple-300 relative"></div> -->
            <div
              @mousedown.self="drag($event, 'volume')"
              class="group-hover:opacity-100 opacity-0 overflow-hidden transition-all flex-1 h-1 _B2 rounded-md"
              style="height: 6px"
            >
              <div
                :style="{ width: Player._volume * 100 + '%' }"
                class="h-full relative pointer-events-none bg-purple-300 rounded-l-md"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex">
        <p class="flex-1"></p>
        <img class="w-10 h-10" src="@/assets/img/sds.gif" />
      </div>
    </div>
    <a-drawer
      class="drawer"
      :visible="visible"
      :closable="false"
      :mask="false"
      :mask-closable="false"
      :render-to-body="true"
      :footer="false"
      :header="false"
      height="100%"
      :width="typeDrawer ? '100%' : '400px'"
      :placement="placement"
      :style="{ zIndex: typeDrawer ? '100' : '9999999' }"
    >
      <PlayPage
        v-show="typeDrawer"
        ref="playPageRef"
        @cancel="visible = false"
      />
      <playListVue v-show="!typeDrawer" @change="visible = false" />
    </a-drawer>
  </div>
</template>

<script lang="ts" setup>
import playListVue from "./playList.vue";
import palyGif from "@/components/playGfi.vue";
import PlayPage from "./PlayPage.vue";
import { formatTime } from "@/utils/format";
import { ref, computed, RendererElement, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const router = useRouter();
const Store = useStore();
Store.dispatch("initializePlayer");
const Player = computed(() => Store.state.song.Player);
console.log("🚀 ~ file: index.vue:145 ~ Player:", Player);

const curPlaySong = computed(() => Store.getters.curPlaySong);
const myProcess = ref();
let CurTimeTack = computed(() => {
  let tack =
    ((Player.value._progress * 1000) / curPlaySong.value.duration) * 100;
  return `${myProcess.value || tack}%`;
});

// visible
const visible = ref(false);
const placement = ref<"right" | "top">("right");
const typeDrawer = computed(() => placement.value === "top");
// 切换展示页
const toggle = (v: number) => {
  placement.value = v === 1 ? "right" : "top";
  visible.value = !visible.value;
  playPageRef?.value?.SetTickLyrics();
};
document.body.addEventListener("click", () => {
  // playList 面板
  if (!typeDrawer.value && visible.value) {
    visible.value = false;
  }
});

function goUser() {
  router.push({ name: "singer", params: { id: curPlaySong.value.userId } });
}

// 模式
const map = {
  random: "strikethrough",
  order: "sync",
  loop: "循环播放",
  one: "单曲循环",
};
const mode = computed(() => {
  let key = Store.state.song.playbackMode as unknown as string;
  return map[key];
});

const playPageRef = ref<RendererElement>();
const drag = (e: MouseEvent, id: string) => {
  const { clientX, target } = e || window.event || event;
  const { left } = (target as HTMLDivElement)?.getBoundingClientRect();
  const width = (target as HTMLDivElement)?.offsetWidth;
  const move = clientX - left;
  let wff: number = +((move / width) * 100).toFixed(2);
  // 拖动
  document.onmousemove = (e: MouseEvent) => {
    const { clientX } = e;
    const move = clientX - left;
    if (move < 0) {
      wff = 0;
    } else if (move > width) {
      wff = 100;
    } else {
      wff = +((move / width) * 100).toFixed(2);
    }
    if (id === "volume") {
      Player.value?._setvolume(wff / 100);
    } else if (id === "progress") {
      myProcess.value = wff;
    }
  };
  // 解绑
  document.onmouseup = () => {
    if (id === "progress") {
      let seek = (wff / 100) * curPlaySong.value.duration;

      Player.value.SetSeeks(seek / 1000);
      playPageRef?.value?.SetTickLyrics();
      myProcess.value = null;
    } else if (id === "volume") {
      Player.value?._setvolume(wff / 100);
    }

    document.onmousemove = null;
    document.onmouseup = null;
  };
};

const iconSvg = computed(() => {
  let v = Player.value._volume;
  let icon = null;
  if (v === 0) {
    icon = "sound-off";
  } else if (0 < v && v <= 0.3) {
    icon = "sound-min";
  } else if (0.3 < v && v <= 0.6) {
    icon = "sound-low";
  } else {
    icon = "sound-high";
  }

  return icon;
});
</script>
<style>
.drawer {
  .arco-drawer {
    background-color: #ffffff91;
    backdrop-filter: blur(10px);
  }
}
</style>
<style scoped lang="scss">
.myclass {
  grid-template-columns: 2fr 7fr 1fr;
  background: rgba(255, 255, 255, 0.6);
  grid-gap: 0px 10px;
  z-index: 10000;
  overflow: hidden;
  border-radius: 8px;

  svg {
    cursor: pointer;
    font-size: 1.3rem;
    margin: 5px 10px;
  }
}
</style>
