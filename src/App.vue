<template>
  <div v-if="first" :msg="user" @contextmenu.prevent>
    <!-- <Suspense>
      <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.transition || 'fade'" mode="out-in">
          <keep-alive>
          <component :is="Component" :key="route.meta.usePathKey ? route.path : undefined" />
          </keep-alive>
        </transition>
      </router-view>
    </Suspense> -->
    <router-view></router-view>
  </div>
  <div v-else class="h-full flex justify-center items-center">
    <transition name="slide-fade">
      <div class="justify-center items-center">
        <Logo />
        <h1 class="text-center">新一代 音乐播放器</h1>
        <a-button type="primary" @click="firstF">Let's Go!</a-button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { useMagicKeys, useFullscreen } from "@vueuse/core";
import { ref, watch } from "vue";
import store from "./store";
const first = ref(localStorage.getItem("info"));
const user: string = "Hello " + localStorage.getItem("user");
const firstF = () => {
  localStorage.setItem("info", "true");
  first.value = "true";
};

if (first.value) {
  store.dispatch("initQueryData");
  window.$store = store;
}

const { toggle } = useFullscreen();

//监听快捷键 方向键 ArrowUp, ArrowDown, ArrowLeft 和 ArrowRight 来表示
const { space, ArrowUp, ArrowDown, Ctrl_ArrowLeft, Ctrl_ArrowRight, F, M } =
  useMagicKeys();

watch(M, (v) => {
  v && toggle();
});
watch(F, (v) => {
  v && toggle();
});
watch(space, (v) => {
  if (v) {
    store.state.song.Player.pause();
  }
});
watch(Ctrl_ArrowLeft, (v) => {
  v && store.state.song?.Player?.prevSong();
});
watch(Ctrl_ArrowRight, (v) => {
  v && store.state.song?.Player?.nextSong();
});
watch(ArrowUp, (v) => {
  v &&
    store.state.song.Player._setvolume(store.state.song.Player._volume + 0.1);
});
watch(ArrowDown, (v) => {
  v &&
    store.state.song?.Player?._setvolume(store.state.song.Player._volume - 0.1);
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:ital@0;1&display=swap");
body {
  transition: all 0.5s ease-in-out;
  position: relative;
  --my-white: var($Bcolor);
  --my-color: #2c3e50;
  --image-url: url("./assets/albums-bg.png");
  &::after {
    transition: all 0.5s ease-in-out;
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    height: 0;
    opacity: 0;
    background-image: linear-gradient(
      -20deg,
      #ddd6f3 0%,
      #faaca8 100%,
      #faaca8 100%
    );
  }
}
html.dark body {
  --my-color: #fff !important;
  --image-url: url("");
  --color-fill-2: rgba(255, 255, 255, 0.35);
  --my-white: #ffffff29;
  --color-bg-2: #ffffff7a;
  --color-fill-2: #ffffff7a;

  &::after {
    top: 0;
    left: 0;
    height: 100vh;
    right: 0;
    opacity: 1;
  }
  & span[class^="arco-"] {
    border-radius: 4px;
  }
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  position: relative;
  overflow: hidden;
  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    height: 0;
    transition: all 1s ease-in-out;
    opacity: 0;
    background-image: linear-gradient(
      -20deg,
      #ddd6f3 0%,
      #faaca8 100%,
      #faaca8 100%
    );
  }
  &:hover {
    /* &::after {
      top: 0;
      left: 0;
      height: 100vh;
      right: 0;
      opacity: 1;
    } */
  }
}
</style>
