<template>
  <div @click="toggleDark">toggleDark</div>
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
import { useDark, useToggle } from "@vueuse/core";
import { ref } from "vue";
import store from "./store";
const first = ref(localStorage.getItem("info"));
const user: string = "Hello " + localStorage.getItem("user");
const firstF = () => {
  localStorage.setItem("info", "true");
  first.value = "true";
};

if (first.value) {
  store.dispatch("initQueryDataa");
  window.$store = store;
}

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:ital@0;1&display=swap");
body {
  transition: all 0.5s;
  --my-white: var($Bcolor);
  --image-url:url("./assets/albums-bg.png")
}
html.dark body {
  --image-url:url(''),
  --color-fill-2: rgba(255, 255, 255, 0.35);
  --my-white: #ffffff29;
  --color-bg-2: #ffffff7a;
  --color-fill-2: #ffffff7a;
  background-image: linear-gradient(
    -20deg,
    #ddd6f3 0%,
    #faaca8 100%,
    #faaca8 100%
  );
  & span[class^="arco-"] {
    border-radius: 4px;
  }
}
#app {
  font-family: "Nunito Sans", sans-serif, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
