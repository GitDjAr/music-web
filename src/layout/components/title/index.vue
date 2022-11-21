<!--  -->
<template>
  <ul class="title-nav-ul flex fx-center">
    <li class="title-nav" v-for="(item, index) in titleList" :key="index" :style="{ background: item.c }"
      @click="item.on"></li>
  </ul>
  <div class="flex">
    <seachVue />
    <div class="ml-3">
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
  </div>
  <loginVue v-model:visible='state.visible' />
</template>

<script lang='ts' setup>
import { useStore } from 'vuex';
import { ref, reactive, onMounted, computed } from 'vue'
// import { mapGetter } from '@/utils/StoreUtils'
import seachVue from './seach.vue';
import loginVue from "@/layout/components/login.vue"

const store = useStore()
let userInfo = computed(() => store.getters.userInfo)
let loginStatus = computed(() => store.getters.loginStatus)

// let loginStatus = ref('')
// onMounted(() => {
//   [userInfo.value, loginStatus.value] = mapGetter(['userInfo', 'loginStatus'])
// })

const state = reactive({
  visible: false,
})
const titleList = ref([
  { c: "#CDD8FC", on: () => { } },
  { c: "#DED5FC", on: () => { } },
  { c: "#E3E9FC", on: () => { } },
])

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
}
</style>
