<!--  -->
<template>
  <div class=''>
    <a-button @click="change">click me</a-button>
    <Transition name="fade" mode="out-in">
      <img :src="imgSrc" alt="" v-if="ff" />
      <img :src="imgSrc2" alt="" v-else />
    </Transition>
    <elme></elme>

  </div>
</template>

<script lang='ts' setup>

import elme from './eltree/index.vue'
import { _login_qr_key, _login_qr_create, _login_qr_check, _user_account } from '@/api/user'
import { ref, reactive, shallowReactive, triggerRef, Ref, shallowRef, toRefs, defineAsyncComponent, AsyncComponentLoader } from 'vue'
const imgSrc: Ref<string> = ref('https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp')
const imgSrc2: Ref<string> = ref('https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp')
const ff = ref(false)

async function change() {
  // console.log(await _user_account());
  ff.value = !ff.value

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
