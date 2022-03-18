<!--  -->
<template>
  <div class="parent" :attrs="$attrs">
    <header class="title-play flex">
      <ul class="title-nav-ul flex fx-center">
        <li
          class="title-nav"
          v-for="(item, index) in titleList"
          :key="index"
          :style="{ background: item.c }"
          @click="item.on"
        ></li>
      </ul>
      <div class="right-part flex fx-center-a">
        <a-input
          size="medium"
          :style="{ width: '220px', marginRight: '10px' }"
          placeholder="搜索"
          allow-clear
        >
          <template #prefix>
            <!-- <icon-search /> -->
          </template>
        </a-input>
        <a-button type='text' v-if="!loginStatus" @click="loginPage">{{$t('login.login')}}</a-button>
        <a-popover v-else trigger="click">
          <a-avatar shape="square">
            <img alt="avatar" :src="userInfo?.profile?.avatarUrl" />
          </a-avatar>
          <template #content>
            <p @click="outin">{{$t('login.outin')}}</p>
          </template>
        </a-popover>
      </div>
    </header>
    <main class="layout-content padding10">
      <div class="left-list">
        <Logo />
        <nav v-for="(item, index) in NavList" :key="index">
          <p
            :class="{
              'Nav-list': true,
              transtion: true,
              NavActive: active === index,
            }"
            @click="NavPath(item, index)"
          >
            <i class></i>
            {{ $t(item.name) }}
          </p>
        </nav>
      </div>
      <div class="right-box">
        <Suspense>
          <router-view v-slot="{ Component, route }">
            <transition :name="route.meta.transition || 'fade'" mode="out-in">
              <!-- <keep-alive> -->
                <component
                  :is="Component"
                  :key="route.meta.usePathKey ? route.path : undefined"
                />
              <!-- </keep-alive> -->
            </transition>
          </router-view>
        </Suspense>
      </div>
    </main>
    <footer class="footer-play padding10">{{userInfo}}</footer>
  </div>
  <loginVue v-model:visible='visible' />
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted,getCurrentInstance } from "vue"
import { useRoute, useRouter } from "vue-router"
import loginVue from "./components/login.vue"
import store from "../store"
import {mapGetters} from 'vuex'

export default defineComponent({
  components: {loginVue},
  computed:{
    ...mapGetters(['userInfo','loginStatus'])
  },
  mounted(){
  },
  setup() {
    const state = reactive({
      titleList: [
        { c: "#CDD8FC", on: () => {} },
        { c: "#DED5FC", on: () => {} },
        { c: "#E3E9FC", on: () => {} },
      ],
      visible:false,
      active: 0,
      NavList: [
        { to: "/home", name: "nav.home" },
        { to: "/radio", name: "nav.radio" },
        { to: "/alboms", name: "nav.alboms" },
        { to: "/favorite", name: "nav.favorite" },
        { to: "/history", name: "nav.history" },
        { to: "/settings", name: "nav.settings" },
      ],
    })
    const Router = useRouter()
    
    // 导航
    const NavPath = (path: object, index: number) => {
      state.active = index
      Router.push({ path: path?.to })
      
    }
    const loginPage = ()=>{
      state.visible = !state.visible
    }
    const outin = () =>{
      store.dispatch('UserOutin')
    }
    return {
      ...toRefs(state),
      NavPath,
      outin,
      loginPage
    }
  },
})
</script>
<style scoped lang="scss">
.parent {
  display: grid;
  grid-template-rows: auto 1fr auto;

  /* Just for parent demo size */
  height: 100vh;
}
.padding10 {
  padding: 0 10%;
}
.title-play {
  padding: 10px 10%;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  background: $Bcolor;
  .title-nav-ul {
    .title-nav {
      height: 10px;
      width: 10px;
      margin-right: 10px;
      border-radius: 50px;
    }
    .right-part {
    }
  }
}
.layout-content {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: grid;
  grid-template-columns: minmax(180px, 15%) 1fr;
  .left-list {
    padding: 10px 0;
    background: $Bcolor;
    .flex-cancer {
      padding: 0 10px;
    }
    .NavActive {
      color: $T3;
      background: rgb(245, 246, 248);
      font-weight: bold;
    }
    .Nav-list {
      font-size: 1.2rem;
      padding: 5px 0;
      line-height: 26px;
      margin: 10px 0;
      cursor: pointer;
    }
  }
  .right-box {
    padding: 5px 10px;
    overflow:hidden  auto;
    border-radius: 5px;
  }
}
.footer-play {
  overflow: hidden;
  height: 60px;
  background: $Bcolor;
}
</style>
