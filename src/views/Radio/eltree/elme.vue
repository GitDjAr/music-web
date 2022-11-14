<!--  -->
<template>
  <div class='text-left'>
    <div v-for="itrm in data" class=" ml-1 my-2" :key="itrm.id">
      {{ itrm.name }}
      <icon-caret-right :key="itrm.id" :class="state.transf" @click.stop="tran(itrm)" />
      <elmetree v-if="itrm?.children?.length" :data="itrm?.children"></elmetree>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'elmetree'
}
</script>
<script lang='ts' setup>
import { reactive, ref } from 'vue'
import { Message } from '@arco-design/web-vue'
// import elme from './elme.vue'

type Props = {
  data?: eltree[]
}
defineProps<Props>()
const state = reactive({
  transf: '',
})
const flag = ref('')
const tran = (P: eltree) => {
  Message.info(P?.name || "")
  flag.value = P.id

  state.transf = state.transf == '' ? 'rotate-90' : ''
}

type eltree = {
  id: string,
  name?: string,
  children?: eltree[] | []
}

</script>
<style scoped lang='scss'>
</style>

