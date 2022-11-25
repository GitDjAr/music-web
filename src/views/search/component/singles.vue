<!-- 单曲 -->
<template>
  <div class=' singlesBox select-none h-full overflow-scroll'>
    <div v-for="(item, index) in searchList" :key="index"
      class="flex m-2  px-2 py-6 h-12  items-center hover:shadow-lg transition-all rounded-md  border border-b">
      <div class=" cursor-pointer w-96 text-left text-ellipsis overflow-hidden whitespace-nowrap">
        <img class=" mr-2 rounded-md" :src="item  .img" alt="" />
        {{ item.name }}
      </div>
      <div class=" flex-grow  ">
        <div class=" w-40 flex  justify-between">
          <p>{{ item?.ar  [0]?.name }}</p>
          <icon-heart />
        </div>
      </div>
      <div class=" cursor-pointer flex">
        <div class=" w-24">{{ forma  tTime(item?.  dt) || '00:00:00' }}</div>
        <div class=" w-40 text-ellipsis overflow-hidden whitespace-nowrap">{{ item?.al  ?.name }}</div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { formatTime } from '../../../utils/format'
import { ref, watch, } from 'vue'
import { cloudsearch } from '@/api/Home'

const { params, Activated } = defineProps<{
  params: {
    activation: boolean,
    keysCode: string
  },
  Activated: boolean
}>()
const Emit = defineEmits<{
  (e: 'update', activation: boolean): void
}>()

// 激活周期
watch(() => Activated, () => {
  if (!params.activation && Activated === true) {
    searchSuggest()
  }
})

// 单曲 搜索
const searchList = ref([])
const searchSuggest = async (key?: string) => {
  const { result: { songs } } = await cloudsearch({ keywords: key || params.keysCode })
  searchList.value = songs
  // 更新激活标记
  Emit('update', true)
}
searchSuggest()
// 暴露
defineExpose({
  searchSuggest
})
</script>
<style scoped lang='scss'>

</style>