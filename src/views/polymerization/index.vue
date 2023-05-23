<!--  -->
<template>
  <div class="flex flex-wrap mb-2">
    <a-tag
      v-for="item in urlList"
      :key="item"
      @click.native="navToggler(item)"
      class="mr-2 py-1 px-4 cursor-pointer"
      :color="item?.name === actives ? 'pinkpurple' : 'cyan'"
      size="large"
    >
      {{ item?.meta?.title }}
    </a-tag>
  </div>
  <div class="h-full">
    <router-view> </router-view>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { routes } from "@/router/index";
import { useRouter } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const Router = useRouter();

const urlList = routes[0]?.children?.filter(
  (e) => e.name === "polymerization"
)[0]?.children;

const actives = ref("");

onMounted(() => {
  actives.value = Router.currentRoute.value.path.split("/")?.at(-1) || "";
});

function navToggler(item: RouteRecordRaw) {
  console.log(item);
  actives.value = item.name || "";
  Router.push({ name: item.name });
}
</script>
<style scoped lang="scss"></style>
