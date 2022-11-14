<!--  -->
<template>
  <ul class="title-nav-ul flex fx-center">
    <li class="title-nav" v-for="(item, index) in titleList" :key="index" :style="{ background: item.c }"
      @click="item.on"></li>
  </ul>
  <div class="right-part flex fx-center-a">
    <a-input size="medium" :style="{ width: '220px', marginRight: '10px' }" placeholder="搜索" allow-clear>
      <template #prefix>
        <!-- <icon-search /> -->
      </template>
    </a-input>
    <a-button type='text' v-if="!loginStatus" @click="loginPage">{{ $t('login.login') }}</a-button>
    <a-popover v-else trigger="click">
      <a-avatar shape="square">
        <img alt="avatar" :src="userInfo?.profile?.avatarUrl" />
      </a-avatar>
      <template #content>
        <p @click="outin">{{ $t('login.outin') }}</p>
      </template>
    </a-popover>
  </div>
  <loginVue v-model:visible='state.visible' />
</template>
<!-- vue3-vite\vite-project\src\layout\components\login.vue -->
<script lang="ts">
import loginVue from "@/layout/components/login.vue"
console.log(loginVue);

import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['userInfo', 'loginStatus'])
  },
  mounted() {
  },
};
</script>
<script lang='ts' setup>
import { useStore } from 'vuex';
import { ref, reactive, } from 'vue'
const state = reactive({
  visible: false,
})
const titleList = ref([
  { c: "#CDD8FC", on: () => { } },
  { c: "#DED5FC", on: () => { } },
  { c: "#E3E9FC", on: () => { } },
])
const store = useStore()
const loginPage = () => {
  state.visible = !state.visible
}
const outin = () => {
  store.dispatch('UserOutin')
}

</script>
<style scoped lang='scss'>
.title-nav-ul {
  .title-nav {
    height: 10px;
    width: 10px;
    margin-right: 10px;
    border-radius: 50px;
  }

  .right-part {}
}
</style>
