<!--  -->
<template>
  <ul class="title-nav-ul flex fx-center">
    <li class="title-nav" v-for="(item, index) in titleList" :key="index" :style="{ background: item.c }"
      @click="item.on"></li>
  </ul>
  <div class="flex">
    <a-select :loading="loading" :style="{ width: '320px' }" @keyup.enter="searchFun" :placeholder="Hot"
      @change="searchFun" v-model="searchKey" @search="searchSuggest" @blur="searchReset" :filter-option="false"
      allow-clear allow-search>
      <template #empty>
        <div class=" flex flex-wrap p-2">
          <p class="rounded-full bg-sky-100 curp m-1 mycolor " @click="searchFun(first)"
            v-for="({ first }) in firstHot">
            {{ first }}</p>
        </div>
      </template>
      <a-optgroup :label="group" :key="index" v-for="(group, index) in  searchList.order">
        <a-option v-for="item of searchList[group]" :value="item" class="flex justify-between">
          {{ item.name }}
          <span>{{ item?.artists?.[0].name || item?.artist?.name }}</span>
        </a-option>
      </a-optgroup>
    </a-select>
    <div class="ml-3">
      <a-button type='text' v-if="!loginStatus" @click="loginPage">{{ $t('login.login') }}</a-button>
      <a-popover v-else trigger="click">
        <a-avatar shape="square">
          <img alt="avatar" :src="userInfo?.profile?.avatarUrl" />
        </a-avatar>
        <template #content>
          <p @click="outin">{{ $t('login.outin') }}</p>
        </template>
      </a-popover>
    </div>
  </div>
  <loginVue v-model:visible='state.visible' />
</template>

<script lang="ts">
import loginVue from "@/layout/components/login.vue"
import { mapGetters } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  computed: {
    ...mapGetters(['userInfo', 'loginStatus'])
  },
  mounted() {
  },
};
</script>
<script lang='ts' setup>
import { throttle } from '../../utils/gFn'
import { _search_suggest, _search_hot } from '@/api/Home'
import { useStore } from 'vuex';
import { ref, reactive, } from 'vue'

const router = useRouter()
const state = reactive({
  visible: false,
})
const titleList = ref([
  { c: "#CDD8FC", on: () => { } },
  { c: "#DED5FC", on: () => { } },
  { c: "#E3E9FC", on: () => { } },
])
const store = useStore()
const loginPage = () => {
  state.visible = !state.visible
}
const outin = () => {
  store.dispatch('UserOutin')
}


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
      console.log(f, el);
      return { ...f, $$type: el }
    })
    console.log(result);
  });
  searchList.value = result

}, 300)

interface searchF {
  (key?: string): void,
  (key?: object): void,
}
const searchFun: searchF = (Rows?: string | object) => {
  if (typeof Rows === 'string') {
    const str = Rows || searchKey.value || Hot.value
    router.push({ path: 'search', query: { searchKey: str } })
  } else {
    let Never: never
    console.log(Rows);

    switch (Rows.$$type) {
      case 'albums':
        router.push({ path: 'albums', query: { searchKey: Rows.id } })
      case 'artists':
        router.push({ path: 'artists', query: { searchKey: Rows.id } })
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
.title-nav-ul {
  .title-nav {
    height: 10px;
    width: 10px;
    margin-right: 10px;
    border-radius: 50px;
  }
}

.mycolor.mycolor {
  color: #3171ff;
  padding: 0.25rem 6px !important;
}

.flex :deep(.arco-select-dropdown) {
  background: rgb(255 255 255 / 60%);
  backdrop-filter: blur(10px);
}
</style>
