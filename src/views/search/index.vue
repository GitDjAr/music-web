<!--  -->
<template>
  <div class='w-full h-full'>
    <div class=" h-1/5">
      <div>
        img
        {{ searchList[0] }}
      </div>
      <div>
        <img src="" alt="">
      </div>
    </div>
    <h1>根据<span class=" text-sky-300   inline-block px-1">{{ searchKey }}</span>搜索显示 </h1>
    <a-space direction="vertical" class="My-space">
      <a-tabs position="right" @change="activeFun" :active-key="active" lazy-load animation>
        <a-tab-pane :key="item.id" :title="item.title" v-for="item in searchList">
          <KeepAlive :key="item.id">
            <component :ref="itemRef" :key="item.id" :is="item.Com" :params="item.params"
              @update="(v: boolean) => item.params.activetion = v">
            </component>
          </KeepAlive>
        </a-tab-pane>
      </a-tabs>
    </a-space>
  </div>
</template>

<script lang='ts' setup>
import albumVue from './component/album.vue';
import singerVue from './component/singer.vue';
import singlesVue from './component/singles.vue';
import { ref, Ref, onBeforeUpdate, nextTick } from 'vue'
import {  useRoute, useRouter } from 'vue-router';
import type { Component } from 'vue'

const route = useRoute()
const router = useRouter()

// 前置路由 获取searchkey
const searchKey = ref(<string>route.query.searchKey)
router.beforeEach(to => {
  console.log(to);
  searchKey.value = <string>to.query.searchKey
  activeFun(<string>to.query.searchType || '1')
  searchList.value = searchList.value.map(e => {
    return {
      ...e,
      params: {
        keysCode: searchKey.value,
        activetion: false
      }
    }
  })
  nextTick(() => {
    console.log(itemRefList.value, searchList);
    itemRefList.value?.[0]?.searchSuggest()
  })
})

interface searchType {
  title: string,
  id: string,
  Com: Component,
  params: {
    keysCode: string,
    activetion: boolean
  }
}
const searchList: Ref<searchType[]> = ref([
  { id: '1', title: '单曲', Com: singlesVue, params: { keysCode: searchKey, activetion: false } },
  { id: '2', title: '专辑', Com: albumVue, params: { keysCode: searchKey, activetion: false } },
  { id: '3', title: '歌手', Com: singerVue, params: { keysCode: searchKey, activetion: false } },
])

// 处理子组件 引用
const itemRefList: Ref<Component[]> = ref([])
const itemRef = (ref: Component) => {
  itemRefList.value.push(ref)
}
// 更新之前置空
onBeforeUpdate(() => {
  itemRefList.value = []
})

// 激活 tabs
const active = ref('1')
const activeFun = (id: string) => {
  active.value = id
}


</script>
<style scoped lang='scss'>
.My-space {
  height: 100%;
  overflow-y: scroll;
}
</style>