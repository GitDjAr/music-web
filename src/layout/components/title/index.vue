<!--  -->
<template>
  <div class="flex">
    <Logo style="width: 180px" />
    <ul class="title-nav-ul flex items-center ml-3">
      <li
        class="title-nav"
        v-for="(item, index) in titleList"
        :key="index"
        :style="{ background: item.c }"
        @click="item.handler"
        v-hover="item.tip"
      ></li>
    </ul>
  </div>
  <div class="flex">
    <searchVue />
    <div class="ml-3">
      <a-button type="text" v-if="!loginStatus" @click="loginPage">{{
        $t("login.login")
      }}</a-button>
      <a-popover v-else trigger="click">
        <Image
          :src="userInfo.title"
          style="width: 40px; height: 40px"
          class="rounded-md"
          :wh="[80, 80]"
        ></Image>
        <template #content>
          <p @click="Putin">{{ $t("login.outing") }}</p>
        </template>
      </a-popover>
    </div>
  </div>
  <loginVue v-model:visible="state.visible" />
</template>

<script lang="ts" setup>
import { useDark, useToggle } from "@vueuse/core";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref, reactive, getCurrentInstance, computed, nextTick } from "vue";
import searchVue from "./seach.vue";
import loginVue from "@/layout/components/login.vue";

const store = useStore();
const Router = useRouter();
let userInfo = computed(() => store.getters.userInfo);
let loginStatus = computed(() => store.getters.loginStatus);

const vueInstance = getCurrentInstance();
window.vueInstance = vueInstance;

// 主题
const isDark = useDark();
const state = reactive({
  visible: false,
});

const titleList = ref();
nextTick(() => {
  titleList.value = [
    {
      c: "#CDD8FC",
      tip: vueInstance?.ctx?.$t?.("nav.tools.prevPage"),
      handler: () => {
        Router.go(-1);
      },
    },
    {
      c: "#DED5FC",
      tip: vueInstance?.ctx?.$t?.("nav.tools.nextPage"),
      handler: () => {
        Router.go(1);
      },
    },
    {
      c: "#E3E9FC",
      tip: vueInstance?.ctx?.$t?.("nav.tools.theme"),
      handler: useToggle(isDark),
    },
  ];
});

const loginPage = () => {
  state.visible = !state.visible;
};
const Putin = () => {
  store.dispatch("UserOuting");
};
</script>
<style scoped lang="scss">
.title-nav-ul {
  .title-nav {
    cursor: pointer;
    height: 15px;
    width: 15px;
    margin-right: 10px;
    border-radius: 50px;
  }
}
</style>
