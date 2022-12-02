<!-- 歌手 -->
<template>
  <div class="overflow-scroll h-full flex flex-wrap justify-between" v-infinite-scroll="scrollLoad">
    <ModalVue to="body" :class="`${proportion ? 'h-full' : ''}`" :empty="true" v-model:visible="visible">
      <vue-plyr v-loading="loading" :options="VideoOptions" ref="videoRef">
        <video :src="videoSrc"></video>
      </vue-plyr>
    </ModalVue>
    <div @click="get_mv_url(item)" v-for="item in mvList" :key="item.id"
      class="mybox relative cursor-pointer w-1/3 p-3 box-border overflow-hidden mb-4 flex-col flex justify-center items-center">
      <div class="box-div w-full relative group overflow-hidden rounded-md">
        <Image class="h-48" :src="item.imgurl" :wh="[16 * 30, 12 * 30]" :alt="item.publishTime" />
        <p class="absolute top-1/3 left-1/2 -translate-x-1/2 opacity-0 transition-all group-hover:opacity-100">
          <icon-play-arrow style="font-size: 34px; color: #fff" />
        </p>
        <p
          class="absolute bottom-0 w-full flex p-3 transition-all justify-between text-white opacity-0 group-hover:opacity-100">
          <span>{{ item.playCount }}</span>
          <span>{{ item.publishTime }}</span>
        </p>
      </div>
      <div class="mt-4 w-full overflow-hidden">
        <div class="flex w-full justify-between items-center">
          <span class="truncate flex-1 mr-2 text-left">{{ item.name }}</span>
          <!-- <span>{{ item.publishTime }}</span> -->
        </div>
        <!-- <p class=" pt-2 truncate text-left ">{{ item.name }}</p> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ModalVue from "@/components/Modal.vue"
import videoInstance from "@/components/MyVideo/type"
import { ref, watch, reactive, computed, toRef, Ref, nextTick, onMounted, RendererElement } from "vue"
import type { Router, RouteLocationNormalizedLoaded } from "vue-router"
import type { StoreOptions } from "vuex"
import { vInfiniteScroll } from '@vueuse/components'
import store from "src/store"
import { _artist_mv, _mv_url } from "@/api/user"

const P = defineProps<{
  props: {
    id: string
    router: Router
    singerInfo: object
    route: RouteLocationNormalizedLoaded
    store: StoreOptions<typeof store>
  }
  Activated: boolean
}>()

// 激活周期
watch(
  () => P.Activated,
  () => {
    if (P.Activated === true) {
      searchSuggest()
    }
  }
)

// 滚动加载
function scrollLoad({ pageNum: number }: { pageNum: 1 }) {
  ++query.pageNum
  searchSuggest()
}

const loading = ref(true)
const visible = ref(false)
const videoRef = ref<videoInstance>({})
const videoSrc = ref("")
const VideoOptions = {
  quality: { default: "1080p" },
  i18n: {
    //https://github.com/sampotts/plyr/blob/master/src/js/config/defaults.js
  },
}
// mv
const mvList = ref([])
const offset = computed(() => query.limit * query.pageNum)
const query = reactive({
  id: P.props.id,
  limit: 15,
  pageNum: 1
})
const searchSuggest = async (id?: string) => {
  const { mvs = [] } = await _artist_mv({ ...query, offset: offset.value })
  mvList.value.push(...mvs)
  // 更新激活标记
  // Emit('update', true)
  // console.log(params);
}
const get_mv_url = async (row: { id: string }) => {
  const { data } = await _mv_url({ id: row.id })
  videoSrc.value = data.url
  visible.value = true
}

// 视频api
const player: Ref<videoInstance> = computed(() => {
  return videoRef.value.player
})
watch(visible, () => {
  if (player?.value?.playing) {
    player.value.pause()
  }
})
const proportion = ref(false)
onMounted(() => {
  player.value.on('loadedmetadata', () => {
    const { videoWidth, videoHeight } = player.value.media
    let seep = videoWidth / videoHeight
    proportion.value = !(seep > 1.3 && seep < 2)
  })
  searchSuggest()
})




</script>
<style scoped lang="scss">
.mybox .box-div {
  &::before {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: black;
    z-index: 0;
  }

  &:hover::before {
    content: "";
    opacity: 0.5;
    transition: all 0.3;
  }
}
</style>
