<!--  -->
<template>
  <div class="h-full overflow-hidden" v-loading="loading">
    <titleVue :props="Aprons" />
    <a-tabs
      class="My-space"
      position="right"
      @change="activeFun"
      justify
      :active-key="active"
      lazy-load
      animation
    >
      <a-tab-pane :key="item.id" :title="item.title" v-for="item in tabsList">
        <component
          class="overflow-y-scroll h-full"
          :ref="itemRef"
          :is="item.Com"
          :props="Aprons"
          :Activated="active === item.id"
          @updateId="updateSinger"
          :name="item.title"
        >
        </component>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts" setup>
import titleVue from "./component/title.vue";
import infoVue from "./component/info.vue"; //歌手
import mvVue from "./component/mv.vue";
import albumVue from "./component/album.vue"; //专辑
import { t } from "@/locale/index";
import { _artist_follow_count, _follow, _artist_detail } from "@/api/user";
import {
  onMounted,
  ref,
  Ref,
  reactive,
  markRaw,
  nextTick,
  onBeforeUpdate,
} from "vue";
import { useRoute } from "vue-router";
import type { Component } from "vue";
import type { tabsType } from "./type";

const route = useRoute();
const id = <string>route.params.id;

const Aprons = reactive<{
  id: string;
  singerInfo?: Object;
}>({
  id,
  singerInfo: {},
});

onMounted(() => {
  get_artist_detail();
});

// 激活 tabs
const active = ref("1");
const activeFun = (id: string | number) => {
  active.value = "" + id;
};

const tabsList: Ref<tabsType[]> = ref([
  {
    id: "1",
    title: t("library.playlists"),
    Com: markRaw(infoVue),
    activation: false,
  },
  {
    id: "2",
    title: t("library.albums"),
    Com: markRaw(albumVue),
    activation: false,
  },
  { id: "3", title: t("library.mvs"), Com: markRaw(mvVue), activation: false },
]);

const updateSinger = (v: string) => {
  Aprons.id = v;
  tabsList.value = tabsList.value.map((e) => {
    return {
      ...e,
      activation: true,
    };
  });
  if (active.value !== "1") {
    activeFun("0");
  }
  get_artist_detail();
};

const loading = ref(false);
async function get_artist_detail() {
  loading.value = true;
  const { data } = await _artist_detail({ id });
  Aprons.singerInfo = data;
  loading.value = false;
}

// 处理子组件 引用
const itemRefList: Ref<Component[]> = ref([]);
const itemRef = (ref: Component) => {
  itemRefList.value.push(ref);
};
// 更新之前置空
onBeforeUpdate(() => {
  itemRefList.value = [];
});
</script>
<style scoped lang="scss">
.My-space {
  padding-top: 6px;
  overflow: hidden;
  height: calc(100% - 200px);

  :deep(.arco-tabs-content-list) {
    .arco-tabs-pane {
      height: 100%;
    }

    height: 100%;
  }
}
</style>
