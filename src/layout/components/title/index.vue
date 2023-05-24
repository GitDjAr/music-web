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
        @click="item.on"
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
import { Notification } from "@arco-design/web-vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref, reactive, computed } from "vue";
import searchVue from "./seach.vue";
import loginVue from "@/layout/components/login.vue";

const store = useStore();
const Router = useRouter();
let userInfo = computed(() => store.getters.userInfo);
let loginStatus = computed(() => store.getters.loginStatus);

const state = reactive({
  visible: false,
});
const titleList = ref([
  {
    c: "#CDD8FC",
    on: () => {
      Router.go(-1);
    },
  },
  {
    c: "#DED5FC",
    on: () => {
      Router.go(1);
    },
  },
  {
    c: "#E3E9FC",
    on: () => {
      Notification.info({
        content: "暂没有功能...0-0",
        showIcon: false,
      });
    },
  },
]);

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
