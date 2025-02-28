<!--  -->
<template>
  <div class="flex">
    <Logo style="width: 180px" />
    <ul class="title-nav-ul flex items-center gap-3 ml-3">
      <li
        class="title-nav"
        v-for="(item, index) in titleList"
        :key="index"
        :style="{ background: item.c }"
        @click="item.handler"
        v-hover:300="item.tip"
      >
        <!-- <i :class="item.icon" class="text-white w-full h-full block"></i> -->
      </li>
    </ul>
  </div>
  <div class="flex items-center gap-3">
    <div v-if="loginStatus" class="flex mx-3 h-[40px] items-center">
      <a-popover position="bottom" trigger="click">
        <a-badge :count="9" dot :offset="[2, -2]">
          <IconNotification
            :style="{ color: '#888', fontSize: '18px', verticalAlign: '-3px' }"
          />
        </a-badge>
        <template #content>
          <div class="text-xl mb-2">消息</div>
          <meMsg />
        </template>
      </a-popover>
    </div>
    <searchVue />
    <div class="ml-3">
      <a-button type="text" v-if="!loginStatus" @click="loginPage">{{
        $t("login.login")
      }}</a-button>
      <a-popover v-if="userInfo.title">
        <Image
          v-show="isNotFavorite"
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
import meMsg from "@/views/me/index.vue";
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

const isNotFavorite = computed(() => {
  return Router.currentRoute.value.name !== "favorite";
});
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
      icon: "i-line-md-arrow-small-left",
      handler: () => {
        1;
        Router.go(-1);
      },
    },
    {
      c: "#DED5FC",
      tip: vueInstance?.ctx?.$t?.("nav.tools.nextPage"),
      icon: "i-line-md-arrow-small-right",
      handler: () => {
        Router.go(1);
      },
    },
    {
      c: "#E3E9FC",
      tip: vueInstance?.ctx?.$t?.("nav.tools.theme"),
      icon: "i-line-md-moon",
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
    height: 22px;
    width: 22px;
    border-radius: 50px;
  }
}
.arco-trigger-content {
  border-radius: 20px;
}
</style>
