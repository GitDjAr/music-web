<template>
  <div v-if="first" :msg="user" @contextmenu.prevent>
    <router-view></router-view>
  </div>
  <div v-show="!first" class="h-full flex justify-center items-center">
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
import { useMagicKeys, useFullscreen, useActiveElement } from "@vueuse/core";
import { ref, watch } from "vue";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const first = ref(localStorage.getItem("info"));
const user: string = "Hello " + localStorage.getItem("user");
const firstF = () => {
  localStorage.setItem("info", "true");
  first.value = "true";
};

store.dispatch("initQueryData");

window.$store = store;
window.initMusicApp = () => store.dispatch("initMusicApp");
console.log("异常情况-重置,控制台输入initMusicApp()");
const Player: any = computed(() => store.state.song?.Player || {});
const { toggle } = useFullscreen();

//监听快捷键 方向键 ArrowUp, ArrowDown, ArrowLeft 和 ArrowRight 来表示
const { space, ArrowUp, ArrowDown, Ctrl_ArrowLeft, Ctrl_ArrowRight, F } =
  useMagicKeys();

// 禁止使用快捷键
const isHotKey = () => {
  const el = useActiveElement();
  console.log("el.value?.tagName", Player, el.value?.tagName);

  return (
    el.value?.tagName !== "INPUT" &&
    el.value?.tagName !== "TEXTAREA" &&
    el.value?.tagName !== "SELECT" &&
    el.value?.tagName !== "VIDEO"
  );
};

watch(F, (v) => {
  v && isHotKey() && toggle();
});
watch(space, (v) => {
  v && isHotKey() && Player.value?.pause();
});
watch(Ctrl_ArrowLeft, (v) => {
  v && isHotKey() && Player.value?.prevSong();
});
watch(Ctrl_ArrowRight, (v) => {
  v && isHotKey() && Player.value?.nextSong();
});
watch(ArrowUp, (v) => {
  v && isHotKey() && Player.value?._setvolume(Player.value?._volume + 0.1);
});
watch(ArrowDown, (v) => {
  v && isHotKey() && Player.value?._setvolume(Player.value?._volume - 0.1);
});
</script>

<style lang="scss">
body {
  transition: all 0.5s ease-in-out;
  position: relative;
  --arcoblue-6: "176,176,251";
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
  --color-bg-2: #ffffff7a !important;
  --color-fill-2: #ffffff7a !important;

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
}
</style>
