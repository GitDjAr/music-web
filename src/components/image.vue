<!--  -->
<template>
  <div class=" overflow-hidden">
    <img :src="Immure" :class='`w-full h-full  object-${fit}`' :alt="P.alt" />
    <slot></slot>
  </div>
</template>

<script lang='ts' setup>
import { computed, withDefaults } from 'vue';

const P = withDefaults(defineProps<{
  src?: string
  alt?: string,
  wh: Array<number>,
  slots: boolean
  unit?: string
  fit?: string
}>(), {
  slots: false,
  wh: [100, 100],
  unit: 'px',
  fit: 'contain',
})

const Immure = computed(() => {
  if (P.src) {
    return P.src + (P.wh[0] ? `?param=${P.wh[0]}y${P.wh[1]}` : '')
  } else {
    return window.rendomImgurl
  }
})
</script>
<style scoped lang='scss'>

</style>