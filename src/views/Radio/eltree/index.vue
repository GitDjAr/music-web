<!--  -->
<template>
  <elmecom class="a" :data="E"></elmecom>
</template>

<script lang='ts' setup>
import elmecom from './elme.vue'
import { ref, reactive, } from 'vue'

type EList = {
  id: string,
  name?: string,
  children?: EList[] | []
}
const E = reactive<EList[]>(
  [
    {
      id: '1',
      name: '1',
      children: []
    },
    {
      id: '2',
      name: '2',
      children: [{
        id: '2-1',
        name: '2-1',
        children: [{
          id: '2-1-1',
          name: '2-1-1',
          children: []
        }]
      }]
    },
    {
      id: '3',
      name: '3',
      children: []
    },
    {
      id: '4',
      name: '4',
      children: [{
        id: '4-1',
        name: '4-1',
        children: [{
          id: '4-1-1',
          name: '4-1-1',
          children: []
        }]
      }]
    },
  ]
)
</script>
<style scoped lang='scss'>
</style>
