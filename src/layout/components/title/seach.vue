<!--  -->
<template>
  <a-select :loading="loading" :style="{ width: '320px' }" @keyup.enter="searchFun('')" :placeholder="Hot"
    @change="searchFun" v-model="searchKey" @search="searchSuggest" @blur="searchReset" :filter-option="false"
    allow-clear allow-search>
    <template #empty>
      <div v-if="firstHot?.length" class=" flex flex-wrap p-2">
        <p class="rounded-full bg-sky-100 curp m-1 mycolor " @click="searchFun(first)" v-for="({ first }) in firstHot">
          {{ first }}</p>
      </div>
      <a-empty v-else />
    </template>
    <a-optgroup :label="group" :key="index" v-for="(group, index) in  searchList.order">
      <a-option v-for="item of searchList[group]" :value="item" class="flex justify-between">
        {{ item.name }}
        <span>{{ item?.artists?.[0].name || item?.artist?.name }}</span>
      </a-option>
    </a-optgroup>
  </a-select>
</template>

<script lang='ts' setup>
import { ref, } from 'vue'
import { throttle } from '../../../utils/gFn'
import { _search_suggest, _search_hot } from '@/api/Home'
import { useRouter } from 'vue-router'

const router = useRouter()
// 搜索
const searchKey = ref('')
const searchList = ref([])
const firstHot = ref([])
const Hot = ref('')
const loading = ref(false)
const searchSuggest = throttle(async (key: string) => {
  if (key) searchKey.value = key;
  const { result } = await _search_suggest({ keywords: searchKey.value || Hot.value })
  result.order.forEach(el => {
    result[el].map(f => {
      f['$$type'] = el
      return f
    })
  });
  searchList.value = result

}, 300)

interface searchF {
  (key: string): void,
  (key: object): void,
}
const searchFun: searchF = (Rows: string | object) => {
  if (typeof Rows === 'string') {
    const str = Rows || searchKey.value || Hot.value
    router.push({ path: '/Music/search', query: { searchKey: str } })
  } else {
    router.push({ path: Rows.$$type || 'search', query: { searchKey: Rows.id } })
    let Never: never
    console.log(Rows);
    switch (Rows.$$type) {
      case 'singles':
        router.push({ path: '/Music/search', query: { searchKey: Rows.name } })
        break;
      case 'artists' || 'albums':
        router.push({ path: `/Music/${Rows.$$type}/${Rows.id}`, })
        break;
      default:
        throw new Error("没有此类型");
        break;
    }
  }
}

// 热搜 歌曲
const getHot = async () => {
  const { result } = await _search_hot()
  firstHot.value = result.hots
  autoScroll()
}
getHot()
const autoScroll = () => {
  let idx = 0
  setInterval(() => {
    Hot.value = firstHot.value[idx]?.first
    idx++;
    if (idx > firstHot.value.length) {
      idx = 0
    }
  }, 3000)
}
// 重置
function searchReset() {
  // searchList.value = []
  // searchKey.value = ''
}

</script>
<style scoped lang='scss'>
.mycolor.mycolor {
  color: #3171ff;
  padding: 0.25rem 6px !important;
}
</style>