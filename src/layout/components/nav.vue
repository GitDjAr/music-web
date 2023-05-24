<!--  -->
<template>
  <nav v-for="(item, index) in NavList" :key="index">
    <div
      :class="{
        'Nav-list': true,
        transtion: true,
        NavActive: active === index,
      }"
      @click="NavPath(item, index)"
    >
      <MyIcon :name="item.icon" class="mr-2" />
      {{ $t(item.name) }}
    </div>
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
  icon: string;
}
const NavList = ref<NavItem[]>([
  { to: "/Music/home", name: "nav.home", icon: "home-simple" },
  { to: "/Music/radio", name: "nav.radio", icon: "voice-ok" },
  { to: "/Music/playListPage", name: "nav.playlist", icon: "activity" },
  { to: "/Music/favorite", name: "nav.favorite", icon: "bright-crown" },
  { to: "/Music/playHistory", name: "nav.history", icon: "emoji" },
  { to: "/Music/settings", name: "nav.settings", icon: "settings" },
  { to: "/Gtp/Guitar", name: "nav.guitar", icon: "guitar" },
  {
    to: "/Music/polymerization",
    name: "nav.polymerization",
    icon: "frame-tool",
  },
]);
if (import.meta.env.MODE === "development") {
  NavList.value.push({
    to: "/Music/test",
    name: "测试工具",
    icon: "report-columns",
  });
}

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
  color: var(--my-color);
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  padding: 5px 10px;
  line-height: 26px;
  margin: 10px 0;
  cursor: pointer;
  text-align: left;
}

.NavActive {
  color: $T3;
  background: var(--color-fill-2);
  font-weight: bold;
  border-radius: 4px;
}
</style>
