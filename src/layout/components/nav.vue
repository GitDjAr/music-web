<!--  -->
<template>
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
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const Router = useRouter();

interface NavItem {
  to: string;
  name: string;
}
const NavList = ref<Array<NavItem>>([
  { to: "/Music/home", name: "nav.home" },
  { to: "/Music/radio", name: "nav.radio" },
  { to: "/Music/playListPage", name: "nav.playlist" },
  { to: "/Music/favorite", name: "nav.favorite" },
  { to: "/Music/playHistory", name: "nav.history" },
  { to: "/Music/settings", name: "nav.settings" },
  { to: "/Gtp/Guitar", name: "nav.guitar" },
  { to: "/Music/polymerization", name: "nav.polymerization" },
]);

// 导航
const active = ref(-1);
const NavPath = (path: NavItem, index: number) => {
  Router.push({ path: path.to });
};
onMounted(() => {
  NavMatch(Router.currentRoute.value.path);
});
watch(
  () => Router.currentRoute.value.path,
  (newVal) => {
    NavMatch(newVal);
  }
);

// 匹配路由索引
function NavMatch(path: string) {
  const index = NavList.value.findIndex((item) => item.to === path);
  active.value = index;
  return index;
}
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
