<!--  -->
<template>
  <div class=''>
    <a-button>click me</a-button>
    <a-tabs position="right" @change="activeFun" :active-key="active" lazy-load animation>
      <a-tab-pane :key="item.id" :title="item.title" v-for="item in searchList">
        <KeepAlive :key="item.id">
          <component :ref="itemRef" :is="item.Com" :params="item.params"
            @update="(v: boolean) => item.params.activetion = v">
          </component>
        </KeepAlive>
      </a-tab-pane>
      <a-tab-pane :key="item.id" :title="item.title" v-for="item in searchList">
        <KeepAlive :key="item.id">
          <component :ref="itemRef" :is="item.Com" :params="item.params"
            @update="(v: boolean) => item.params.activetion = v">
          </component>
        </KeepAlive>
      </a-tab-pane>
    </a-tabs>

  </div>
</template>

<script lang='ts' setup>
import { ref, markRaw } from 'vue'
import asyncComVue from './asyncCom.vue';
import asyncCom1Vue from './asyncCom.vue';
const searchList = ref([
  { id: '1', title: '单曲', Com: markRaw(asyncComVue), params: { keysCode: 'searchKey', activetion: false } },
  { id: '2', title: '专辑', Com: markRaw(asyncCom1Vue), params: { keysCode: 'searchKey', activetion: false } },
])
// 激活 tabs
const active = ref('1')
const activeFun = (id: string) => {
  active.value = id
}
function itemRef() {

}
</script>
<style scoped lang='scss'>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
