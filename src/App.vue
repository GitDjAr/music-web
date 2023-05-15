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
import { ref } from "vue";
import store from "./store";
const first = ref(localStorage.getItem("info"));
const user: string = "Hello " + localStorage.getItem("user");
const firstF = () => {
  localStorage.setItem("info", "true");
  first.value = "true";
};

store.dispatch("initQueryDataa");
window.$store = store;
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:ital@0;1&display=swap");
</style>
<style>
#app {
  font-family: "Nunito Sans", sans-serif, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
