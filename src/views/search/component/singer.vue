<!-- 歌手 -->
<template>
  <div class='flex flex-wrap justify-between'>
    <div v-for="item in singerList"
      class=" group cursor-pointer w-48 h-40 mb-4 flex-col flex justify-center items-center">
      <a-image class=" rounded-full w-28 h-28 group-hover:scale-105  transition-all" :src="item.img1v1Url" alt="" />
      <p class="mt-4">{{ item.name || item?.alias?.[0] || item?.alia?.[0] }}</p>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref, onActivated, } from 'vue'
import { cloudsearch } from '@/api/Home'
const { params } = defineProps<{
  params: {
    activetion: boolean,
    keysCode: string
  }
}>()
const Emit = defineEmits<{
  (e: 'update', activetion: boolean): void
}>()

// 激活周期
onActivated(() => {
  console.log(121);
  if (!params.activetion) {
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
// searchSuggest()

</script>
<style scoped lang='scss'>

</style>