<!--  -->
<template>
  <ul class="title-nav-ul flex fx-center">
    <li class="title-nav" v-for="(item, index) in titleList" :key="index" :style="{ background: item.c }"
      @click="item.on"></li>
  </ul>
  <div class="flex">
    <searchVue />
    <div class="ml-3">
      <a-button type="text" v-if="!loginStatus" @click="loginPage">{{
        $t("login.login")
      }}</a-button>
      <a-popover v-else trigger="click">
        <Image :src="userInfo.title" style="width: 40px ;height: 40px;" class=" rounded-md" :wh="[80, 80]"></Image>
        <template #content>
          <p @click="Putin">{{ $t("login.outing") }}</p>
        </template>
      </a-popover>
    </div>
  </div>
  <loginVue v-model:visible="state.visible" />
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import { ref, reactive, computed } from "vue";
import searchVue from "./seach.vue";
import loginVue from "@/layout/components/login.vue";

const store = useStore();
let userInfo = computed(() => store.getters.userInfo);
let loginStatus = computed(() => store.getters.loginStatus);


const state = reactive({
  visible: false,
});
const titleList = ref([
  { c: "#CDD8FC", on: () => { } },
  { c: "#DED5FC", on: () => { } },
  { c: "#E3E9FC", on: () => { } },
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
    height: 10px;
    width: 10px;
    margin-right: 10px;
    border-radius: 50px;
  }
}
</style>
