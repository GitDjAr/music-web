<!--  -->
<template>
  <Logo />
  <nav v-for="(item, index) in NavList" :key="index">
    <p :class="{
      'Nav-list': true,
      transtion: true,
      NavActive: active === index,
    }" @click="NavPath(item, index)">
      <i class></i>
      {{ $t(item.name) }}
    </p>
  </nav>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const NavList = ref([
  { to: "/Music/home", name: "nav.home" },
  { to: "/Music/radio", name: "nav.radio" },
  { to: "/Music/playlist", name: "nav.playlist" },
  { to: "/Music/favorite", name: "nav.favorite" },
  { to: "/Music/history", name: "nav.history" },
  { to: "/Music/settings", name: "nav.settings" },
  { to: "/Gtp/Guitar", name: "nav.guitar" },
]);
const active = ref(-1);

const Router = useRouter();
const store = useStore();

// 导航
const NavPath = (path: object, index: number) => {
  store.active = index;
  Router.push({ path: path?.to });
};
</script>
<style scoped lang="scss">
.Nav-list {
  font-size: 1.2rem;
  padding: 5px 0;
  line-height: 26px;
  margin: 10px 0;
  cursor: pointer;
}

.NavActive {
  color: $T3;
  background: rgb(245, 246, 248);
  font-weight: bold;
}
</style>
