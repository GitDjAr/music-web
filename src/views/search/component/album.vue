<!--专辑 -->
<template>
  <div ref="rootRef" class='MYroot flex h-full  flex-col flex-wrap  overflow-scroll box-border justify-around'>
    <div v-for="(item, index) in searchList" :key="index"
      class="mybox  cursor-pointer group hover:bg-sky-50 hover:shadow-lg transition-all flex w-96  h-36  px-3 m-2 text-center shadow rounded-md items-center ">
      <div class="  relative  w-32 h-32  ">
        <img class=" rounded-md  w-32 h-32 absolute -translate-y-1/2 top-1/2 z-10 " :src="item?.blurPicUrl" alt=""
          :lazy="true" />
        <div class="group-hover:translate-x-14 -translate-y-1/2 top-1/2  transition-all absolute">
          <img class="changping w-28 h-28 " src="../../../assets/changpian.png" alt="" />
        </div>
      </div>
      <div class=" h-4/5 text-left ml-14  flex flex-col justify-around">
        <p>{{ item?.name }}</p>
        <span>{{ item?.artist?.name }}</span>
        <li>发布时间:{{ formatformat(item?.publishTime, 'yyyy-MM-dd') }}</li>
        <li class="flex items-center">
          <a-tag :color="colorFun">{{ item.type }}</a-tag>
          <icon-heart />
        </li>
      </div>
    </div>
    <p class="absolute bottom-0 left-0 hidden">试试:<span class=" text-sky-500">shift+滚轮</span></p>
  </div>
</template>

<script lang='ts' setup>
import { formatformat } from '../../../utils/format'
import { ref, watch, computed, onMounted } from 'vue'
import { cloudsearch } from '@/api/Home'
import store from "@/store"

const { Activated, params } = defineProps<{
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
const arr = ref([])
arr.value = Array.from({ length: 8 })
// 专辑 搜索
const searchList = ref([])
const searchSuggest = async (key?: string) => {
  const { result: { albums } } = await cloudsearch({ keywords: key || params.keysCode, type: 10 })
  searchList.value = albums
  // 更新激活标记
  Emit('update', true)
}
searchSuggest()

// tag 颜色
const colorFun = computed(() => {
  let i = Math.floor(Math.random() * 14)
  return store?.state?.app?.tagColor?.[i]
})
</script>
<style scoped lang='scss'>
.mybox:hover .changping {
  -webkit-animation: rotate-center 5s linear infinite;
  animation: rotate-center 5s linear infinite;
}

.MYroot {
  height: 100%;
  overflow: scroll;

  &:hover p {
    display: block;
  }
}

@keyframes rotate-center {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>