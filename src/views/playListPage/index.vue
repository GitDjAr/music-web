<template>
  <div class="select-none h-full ">
    <div class="flex items-center">
      <a-radio-group class="flex ml-2" type="button" size="large" v-model="modeStr">
        <a-radio value="menu" style="line-height: 22px;">
          <MyIcon name="menu" size="16rem" />
        </a-radio>
        <a-radio value="report" style="line-height: 22px;">
          <MyIcon name="report-columns" />
        </a-radio>
      </a-radio-group>
      <div class="flex relative justify-end flex-1">

        <div id="scrollTag" class="overflow-hidden transf flex ml-2 w-11/12 h-6" :class="{ model: showModel }"
          ref="target">
          <div v-for="(tag, index) of tags" class="mr-5 w-20 inline-block cursor-pointer"
            :class="{ 'text-[#b0b0fb]': selectedTag === tag.name }" :key="tag.id" :id="tag.name" :closable="index !== 0"
            @click="handleTag(tag)">
            <p class="w-full whitespace-nowrap text-base">{{ tag.name }}</p>
          </div>
        </div>
        <a-button @click="showModel = !showModel" class="ml-4 float-right dropdownMenu" type="text" size="mini"
          status="warning">
          更多
        </a-button>
      </div>
    </div>
    <div class="w-full overflow-y-scroll" style="height: calc(100% - 45px)">
      <template v-if="modeStr === 'menu'">
        <div v-for="(item, index) of tagList" :key="item.name" class="mt-8" :style="{ '--stagger': index }">
          <h3 class="text-xl font-bold">{{ item.name }}</h3>
          <PlayList :name="item.tag" :prop-list="item.list" />
        </div>
      </template>
      <template v-else>
        <div v-for="(item, index) in recPlayList" :key="item.id" class="w-1/5 relative inline-block overflow-hidden"
          data-animate :style="{ '--stagger': index }">
          <div class="content p-4">
            <Image @click="() => router.push(`/Music/playlist/${item.id}`)"
              class="rounded-md cursor-pointer h-full w-full" :alt="item.name"
              :src="`${item.picUrl || item.coverImgUrl}?param=300y300`" />
            <p class="my-1 w-full truncate">{{ item.name }}</p>
          </div>
        </div>
        <div class="w-1/5" v-for="item in 5 - (recPlayList.length % 5)"></div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PlayList from "./listcnp.vue";
import { useStorage, onClickOutside } from "@vueuse/core";
import { ref } from "vue";
import Store from "@/store";
import { useRouter } from "vue-router";
import {
  highQualityPlaylistTags,
  userPlaylist,
  recommendPlaylist,
  highQualityPlaylist,
  T,
} from "../../api/playlist";
import * as P from "../../api/playlist";

const router = useRouter();

//tags
const tags = ref<T.tags[]>([]);
async function tagsList() {
  tags.value = (await highQualityPlaylistTags()).tags?.filter(
    (e) => e.name !== "粤语"
  );
  tags.value.unshift({
    name: "默认推荐",
    id: -1,
  });
}
tagsList();

// 模式
const modeStr = useStorage<"menu" | "report">("mode", "report");
const selectedTag = ref("默认推荐");
// const filterList = ref("粤语");

// 我的
const myList = ref<T.MusicPlayList[]>();
async function getUserPlaylist(params: P.userPlaylist) {
  myList.value = (await userPlaylist(params)).playlists;
}
getUserPlaylist({ limit: 1, uid: Store.getters.userInfo.uid });

// 推荐歌单
const recPlayList = ref<T.MusicPlayList[]>([]);
async function getRecommendPlaylist() {
  recPlayList.value = (await recommendPlaylist({ limit: 50 }))?.result || [];
}
getRecommendPlaylist();

async function getPlayGather(name: string) {
  recPlayList.value = (
    (await highQualityPlaylist({
      cat: name,
      limit: 30,
    })) as any
  ).playlists;
}


// 标签
const showModel = ref(false);
const target = ref(null)
onClickOutside(target, (event) => showModel.value = false);

async function handleTag(tag: T.tags) {
  const { name } = tag;
  selectedTag.value = name;
  showModel.value = false;

  // element?.scrollTo({
  //   left: 300,
  //   behavior: "smooth",
  // });
  if (name === "默认推荐") {
    getRecommendPlaylist();
  } else {
    selectedTag.value = name;
    getPlayGather(name);
  }
}

// 更多
// 监听文档上的所有点击事件
const dropdownMenu = document.querySelector(".dropdownMenu");
document.addEventListener("click", (event: any) => {
  // 如果点击事件发生在下拉菜单内，则不做任何操作
  if (dropdownMenu?.contains(event?.target)) {
    return;
  }
  // 否则，关闭下拉菜单
  // showModel.value = false;
});

const tagList = ref<{ name: string; list?: T.MusicPlayList[]; tag?: string }[]>(
  [
    {
      name: "精品歌单",
      tag: selectedTag.value,
    },
    {
      name: "歌单 ( 网友精选碟 )",
      tag: "粤语",
    },
    {
      name: "我的歌单",
      list: myList.value,
    },
  ]
);
</script>
<style lang="scss">
.arco-radio-button-content {
  padding: 0 6px;
}

.transf {
  transition: all 0.3s;
  position: absolute;
  z-index: 50;
  left: 0;
}

.model {
  padding: 5px;
  color: black;
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(14px);
  background: #ffffffba;
  border-radius: 6px;
  height: 200px;
  flex-wrap: wrap;
}
</style>
