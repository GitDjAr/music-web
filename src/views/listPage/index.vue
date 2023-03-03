<!--  -->
<template>
  <div class=''>
    <div>
      <a-input v-model:value="filterList"></a-input>
    </div>
    <div class="singer items-center justify-center">
      <div class="singer-list mx-1.5  truncate  " :alt="item.reason" :key="index" v-for="(item, index) in PlayGather"
        @click="() => router.push(`/Music/singer/${item.id}`)">
        <img class="rounded-full cursor-pointer " :src="`${item.img1v1Url}?param=100y100`" />
        <p class="singer-name my-1  w-full  ">{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref, } from 'vue'
import { highQualityPlaylist, highQualityPlaylistTags } from '@/api/playlist'
const PlayGather = ref('')

//tags
async function tags() {
  const { } = await highQualityPlaylistTags()
}
tags()

// 网友精选
async function getPlayGather() {
  const { } = await highQualityPlaylist()
}
getPlayGather()
function filterList(e: string) {

}
</script>
<style scoped lang='scss'></style>