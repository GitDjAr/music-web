<!-- 歌手 -->
<template>
  <div class=' overflow-scroll h-full flex flex-wrap justify-between'>
    <videoVue :options='VideoOptions' />
    <div @click="toPage(item)" v-for="item in mvList"
      class=" group cursor-pointer w-48 h-40 mb-4 flex-col flex justify-center items-center">
      <Image class=" rounded-full w-28 h-28 group-hover:scale-105  transition-all" :src="item.picUrl" alt="" />
      <p class="mt-4">{{ item.name }}</p>
    </div>
  </div>
</template>

<script lang='ts' setup>
import videoVue from 'vue-play'
import { ref, watch, reactive, } from 'vue'
import type { Router, RouteLocationNormalizedLoaded } from 'vue-router'
import type { StoreOptions } from 'vuex'
import store from 'src/store'
import { _artist_mv, _mv } from '@/api/user'

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

const VideoOptions = reactive({
  src: ''
})

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

const toPage = async (row: { id: string }) => {
  const { date } = await _mv({ mvid: row.id })
  VideoOptions.src = date
}

</script>
<style scoped lang='scss'>

</style>