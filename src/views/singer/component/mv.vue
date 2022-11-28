<!-- 歌手 -->
<template>
  <div class=' overflow-scroll h-full flex flex-wrap justify-between'>
    <ModalVue to="body" :empty="true" v-model:visible="visible">
      <vue-plyr v-loading="loading" class="" :options='VideoOptions' ref="videoRef">
        <video class="w-fill" :src="videoSrc"></video>
      </vue-plyr>
    </ModalVue>
    <div @click="get_mv_url(item)" v-for="item in mvList"
      class=" group cursor-pointer w-48 h-40 mb-4 flex-col flex justify-center items-center">
      <Image class=" rounded-full w-28 h-28 group-hover:scale-105  transition-all" :src="item.picUrl" alt="" />
      <p class="mt-4">{{ item.name }}</p>
    </div>
  </div>
</template>

<script lang='ts' setup>
import ModalVue from '@/components/Modal.vue'
import videoInstance from '@/components/MyVideo/type'
import { ref, watch, reactive, computed, } from 'vue'
import type { Router, RouteLocationNormalizedLoaded } from 'vue-router'
import type { StoreOptions } from 'vuex'
import store from 'src/store'
import { _artist_mv, _mv_url } from '@/api/user'

const P = defineProps<{
  props: {
    id: string,
    router: Router,
    singerInfo: object,
    route: RouteLocationNormalizedLoaded,
    store: StoreOptions<typeof store>
  },
  Activated: boolean
}>()

const Emit = defineEmits<{
  (e: 'update', activation: boolean): void
}>()

// 激活周期
watch(() => P.Activated, () => {
  if (P.Activated === true) {
    searchSuggest()
  }
})

const loading = ref(true)
const visible = ref(true)
const videoRef = ref<videoInstance>({})
const videoSrc = ref('')
const VideoOptions = {
  quality: { default: '1080p' },
  i18n: {
    //https://github.com/sampotts/plyr/blob/master/src/js/config/defaults.js
  }
}
// mv
const mvList = ref([])
const searchSuggest = async (id?: string) => {
  console.log(P.props);

  const { mvs } = await _artist_mv({ id: P.props.id })
  mvList.value = mvs
  // 更新激活标记
  // Emit('update', true)
  // console.log(params);

}
searchSuggest()
const get_mv_url = async (row: { id: string }) => {
  const { data } = await _mv_url({ id: row.id })
  videoSrc.value = data.url
  visible.value = true
}

// 视频api
const player = computed(() => {
  videoRef.value.player
})
watch(visible, () => {
})
</script>
<style scoped lang='scss'>

</style>