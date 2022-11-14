<!--  -->
<template>
  <div class=''>
    {{ R }}
    {{ msg }}
    <p>姓名:{{ obj.name }}</p>
    <a-button @click="change">click me</a-button>
    <a-divider></a-divider>
    <!-- <asyncComVue></asyncComVue> -->
    <Suspense>
      <template #default>
        <asyncCom></asyncCom>
      </template>
      <template #fallbakc>
        loading...
      </template>
    </Suspense>
    <a-divider></a-divider>
    <elme></elme>

  </div>
</template>

<script lang='ts' setup>

import elme from './eltree/index.vue'
import { ref, reactive, shallowReactive, triggerRef, Ref, shallowRef, toRefs, defineAsyncComponent, AsyncComponentLoader } from 'vue'
// import asyncComVue from './asyncCom.vue';
var as = async (): Promise<AsyncComponentLoader> => {
  return new Promise((resolve, reactive) => {
    setTimeout(() => {
      resolve(() => import('./asyncCom.vue'))
    }, 3000);
  })
}
const asyncCom = defineAsyncComponent(as)
const state = reactive({
  count: 0,
})
const R: Ref<string> = ref('no')
const msg = shallowRef({
  foo: 'test'
})
const Rchange = (T) => {
  //1, 通过自动更新,可以更新视图
  setTimeout(() => {
    R.value = 'yes'
  }, 1000);
  // 2, 通过手动更新亦可
  // triggerRef(T)
}
const change = async () => {
  Rchange(msg)//至于为什么可以写在更新数据之前,猜想肯能是更新视图为异步操作,待同步任务完成以后,更新视图,当msg 赋值以后,及更新视图开始,一次性更新,提升效率
  msg.value.foo = 'update test'
  // shallowRef 不会更新视图
  // 可以配合 triggerRef 进行手动触发更新
}






// reactive 使用
const obj = reactive({
  name: 'xie'
})
const obj2 = reactive({
  name: '中文'
})
toRefs(obj)


</script>
<style scoped lang='scss'>
</style>
