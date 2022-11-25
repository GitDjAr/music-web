<!--  -->
<template>
  <a-spin style="width: 100%" :loading="loading" tip="网络有点波动......">
    <titleVue :props='Fprops' />
    <a-tabs class="My-space" position="right" @change="activeFun" justify :active-key="active" lazy-load animation>
      <a-tab-pane :key="item.id" :title="item.title" v-for="item in tabsList">
        <component :ref="itemRef" :is="item.Com" :props="Fprops" :Activated="active === item.id"
          @updateId="updateSinger">
        </component>
      </a-tab-pane>
    </a-tabs>
  </a-spin>
</template>

<script lang="ts">
export default { name: 'singer' }
</script>
<script lang='ts' setup>
import infoVue from './component/info.vue';
import mvVue from './component/mv.vue'
import albumVue from '../search/component/album.vue';
import titleVue from './component/title.vue';
import { _artist_follow_count, _follow, _artist_detail } from '@/api/user';
import { onMounted, ref, Ref, reactive, markRaw, nextTick, onBeforeUpdate } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import type { Component } from 'vue'
import type { Props, tabsType } from './type';

const store = useStore();
const route = useRoute();
const router = useRouter();
const id = <string>route.params.id;

const Fprops = reactive({
  id,
  singerInfo: {},
  store,
  route,
  router
})

onMounted(() => {
  get_artist_detail();
});

const updateSinger = (v: string) => {
  Fprops.id = v
  // (v: boolean) => item.params.activation = v
  tabsList.value = tabsList.value.map(e => {
    return {
      ...e,
      activation: true
    }
  })
  if (active.value !== '1') {
    activeFun('1')
  } else {
    nextTick(() => {
      // itemRefList.value[0].searchSuggest()
    })
  }
  get_artist_detail()
}

const loading = ref(false)
async function get_artist_detail() {
  loading.value = true
  const { data } = await _artist_detail({ id });
  Fprops.singerInfo = data
  loading.value = false
}

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

const tabsList: Ref<tabsType[]> = ref([
  { id: '1', title: '歌手', Com: markRaw(infoVue), activation: false, },
  { id: '2', title: '专辑', Com: markRaw(albumVue), activation: false, },
  { id: '3', title: 'MV', Com: markRaw(mvVue), activation: false, },
])
</script>
<style scoped lang='scss'>

</style>