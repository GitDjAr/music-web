<template>
  <div class="select-none">
    <div class="flex ml-2">
      <div class="">模式</div>
      <a-switch
        v-model="modeStr"
        checked-color="#F53F3F"
        unchecked-color="#14C9C9"
      />
    </div>
    <div>
      <a-input v-if="modeStr" v-model:value="filterList"></a-input>
      <div class="" v-else>
        <div class="overflow-scroll scroll-none flex ml-2 w-full">
          <div
            v-for="(tag, index) of tags"
            class="mr-5 w-20 inline-block cursor-pointer"
            :key="tag.id"
            :closable="index !== 0"
            @click="() => (selectedTag = tag.name)"
          >
            <p class="w-full whitespace-nowrap">{{ tag.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <div
      v-for="(item, index) of tagList"
      :key="item.name"
      class="mt-8"
      :style="{ '--stagger': index }"
    >
      <h3 class="text-xl font-bold">{{ item.name }}</h3>
      <PlayList :name="item.tag" :prop-list="item.list" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import PlayList from "./listcnp.vue";
import { useStorage } from "@vueuse/core";
import { ref } from "vue";
import Store from "@/store";

import { highQualityPlaylistTags, userPlaylist, T } from "../../api/playlist";
import * as P from "../../api/playlist";

//tags
const tags = ref<T.tags[]>([]);
async function tagsList() {
  tags.value = (await highQualityPlaylistTags()).tags?.filter(
    (e) => e.name !== "粤语"
  );
}
tagsList();

// 模式
const modeStr = useStorage("mode", true);
const selectedTag = ref("流行");
const filterList = ref("粤语");

// 我的
const myList = ref<T.MusicPlayList[]>();
async function getUserPlaylist(params: P.userPlaylist) {
  myList.value = (await userPlaylist(params)).playlists;
}
getUserPlaylist({ limit: 1, uid: Store.getters.userInfo.uid });

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
