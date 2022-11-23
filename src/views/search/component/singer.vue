<!-- 歌手 -->
<template>
  <div class=' overflow-scroll h-full flex flex-wrap justify-between'>
    <div @click="toPage(item)" v-for="item in singerList"
      class=" group cursor-pointer w-48 h-40 mb-4 flex-col flex justify-center items-center">
      <a-image class=" rounded-full w-28 h-28 group-hover:scale-105  transition-all" :src="item.img1v1Url" alt="" />
      <p class="mt-4">{{ item.name || item?.alias?.[0] || item?.alia?.[0] }}</p>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref, watch, } from 'vue'
import { cloudsearch } from '@/api/Home'
import { useRouter } from 'vue-router'
const Router = useRouter()
const { params, Activated } = defineProps<{
  params: {
    activetion: boolean,
    keysCode: string
  },
  Activated: boolean
}>()
const Emit = defineEmits<{
  (e: 'update', activetion: boolean): void
}>()

// 激活周期
watch(() => Activated, () => {
  if (!params.activetion && Activated === true) {
    searchSuggest()
  }
})

// 歌手 搜索
const singerList = ref([])
const searchSuggest = async (key?: string) => {
  const { result: { artists } } = await cloudsearch({ keywords: key || params.keysCode, type: 100 })
  singerList.value = artists
  singerList.value.push(...artists)
  // 更新激活标记
  Emit('update', true)
  console.log(params);

}
searchSuggest()

const toPage = (row: { id: number }) => {
  Router.push(`/Music/singer/${row.id}`)
}

</script>
<style scoped lang='scss'>

</style>