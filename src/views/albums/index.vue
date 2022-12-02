<!--  -->
<template>
  <div class="flex select-none overflow-hidden h-full" v-bind="$attrs">
    <div class="w-1/4" ref="refBox">
      <Image :src="Albums.coverImgUrl" :wh="[500, 500]" @click="(disabled = false)" />
    </div>
    <div v-infinite-scroll="scrollLoad" class="flex-1 ml-5 overflow-scroll">
      <div class="text-left w-full flex flex-col justify-between h-52">
        <h1 class="font-bold">{{ Albums.name }}</h1>
        <p>{{ formatTime(Albums.createTime, "YYYY-mm-dd") }}</p>
        <p>播放次数:{{ Albums.playCount }}</p>
        <p @click="visible = true" class=" cursor-pointer truncate">{{ Albums.description }}</p>
        <div>
          <a-tag :color="tagColor()" :checked="true" :default-checked="true" v-for="item in Albums.tags"
            :style="{ marginRight: '10px' }">
            {{ item }}</a-tag>
        </div>
      </div>
      <div>
        <div v-for="(item, index) in AlbumsList" :key="item.id"
          class="flex justify-between items-center p-2 px-4 mb-3 hover:shadow-xl hover:border-gray-300 cursor-pointer transition-all rounded-md border border-b">
          <Image :src="item.al.picUrl" :wh="[120, 120]" class="w-14 h-14 rounded-md" />
          <!-- <span>{{ index + 1 }}</span> -->
          <span class="flex-1 mx-2 text-left inline-block truncate">
            {{ item.name }}</span>
          <div class="w-20 flex justify-around mr-2">
            <icon-play-arrow />
            <icon-heart />
          </div>
          <span> {{ formatTime(item?.dt) || "00:00:00" }}</span>
        </div>
      </div>
    </div>
  </div>

  <ModalVue v-model:visible="visible" :title="Albums.name">
    <p>{{ Albums.description }}</p>
  </ModalVue>
  <a-back-top target-container="#custom-demo" :style="{ position: 'absolute' }">
    <icon-double-up />
  </a-back-top>
</template>

<script lang="ts" setup>
import ModalVue from "@/components/Modal.vue"
import { ref, reactive } from "vue"
import { vInfiniteScroll } from "@vueuse/components"
import { formatTime } from "@/utils/format"
import { _playlist_detail, _playlist_track_all } from "@/api/Home"
import { useRoute } from "vue-router"
import { useStore } from "vuex"
const store = useStore()
const route = useRoute()
const tagColor = () => store.getters.tagColor
const id: string = <string>route.params?.id

const visible = ref(false)

const params = reactive({
  id,
  limit: 35,
  pageNum: 1,
  offset: 0,
})
const Albums = ref({})
const AlbumsList = ref<object[]>([])
async function get_playlist_detail() {
  const { playlist } = await _playlist_detail(params)
  Albums.value = playlist
}
async function get_playlist_track_all() {
  const { songs = [] } = await _playlist_track_all(params)
  AlbumsList.value.push(...songs)
}
get_playlist_detail()
get_playlist_track_all()

// 滚动加载
function scrollLoad({ pageNum: number }: { pageNum: 1 }) {
  ++params.pageNum
  params.offset = params.limit * params.pageNum
  get_playlist_track_all()
}

const refBox = ref(null)
const disabled = ref(true)

</script>
<style scoped lang="scss">

</style>
