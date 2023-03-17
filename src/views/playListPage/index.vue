<template>
  <div class="  select-none">
    <div class="flex ml-2">
      <div class="">模式</div>
      <a-switch v-model="modeStr" checked-color="#F53F3F" unchecked-color="#14C9C9" />
    </div>
    <div>
      <a-input v-if="modeStr" v-model:value="filterList"></a-input>
      <div class='' v-else>
        <div class="overflow-scroll scroll-none flex ml-2 w-full">
          <div v-for="(tag, index) of tags" class="mr-5 w-20 inline-block cursor-pointer " :key="tag.id"
            :closable="index !== 0" @click="() => selectedTag = tag.name">
            <p class="w-full whitespace-nowrap">{{ tag.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h3 class=" text-xl font-bold">精品歌单</h3>
      <PlayList :name="selectedTag" />
    </div>
    <div class=" mt-8">
      <h3 class="text-xl font-bold">歌单 ( 网友精选碟 )</h3>
      <PlayList name="粤语" />
    </div>
    <div class=" mt-8">
      <h3 class="text-xl font-bold">我的歌单</h3>
      <PlayList :prop-list="myList" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import PlayList from "./listcnp.vue";
import { useStorage } from '@vueuse/core';
import { ref } from "vue";
import Store from "@/store";

import { highQualityPlaylistTags, userPlaylist, T } from "../../api/playlist";
import * as P from "../../api/playlist";

//tags
const tags = ref<T.tags[]>([]);
async function tagsList() {
  tags.value = (await highQualityPlaylistTags()).tags?.filter(e => e.name !== '粤语');
}
tagsList();

// 模式
const modeStr = useStorage('mode', true);
const selectedTag = ref("流行");
const filterList = ref("粤语");


// 我的
const myList = ref<T.MusicPlayList[]>()
async function getUserPlaylist(params: P.userPlaylist) {
  myList.value = (await userPlaylist(params)).playlists

}
getUserPlaylist({ limit: 1, uid: Store.getters.userInfo.uid })
</script>
