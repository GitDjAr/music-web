<!--  -->
<template>
  <svg v-if="isPlay" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="24px" viewBox="0 0 24 30"
    style="enable-background:new 0 0 50 50;" xml:space="preserve">
    <rect x="0" y="13" width="2" height="5" fill="#2c3e50">
      <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0s" dur="0.75" repeatCount="indefinite">
      </animate>
      <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0s" dur="0.75" repeatCount="indefinite">
      </animate>
    </rect>
    <rect x="10" y="13" width="2" height="5" fill="#2c3e50">
      <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.15s" dur="0.75"
        repeatCount="indefinite"></animate>
      <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.15s" dur="0.75" repeatCount="indefinite">
      </animate>
    </rect>
    <rect x="20" y="13" width="2" height="5" fill="#2c3e50">
      <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.3s" dur="0.75"
        repeatCount="indefinite"></animate>
      <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.3s" dur="0.75" repeatCount="indefinite">
      </animate>
    </rect>
  </svg>
  <icon-play-arrow v-else></icon-play-arrow>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import store from '@/store'
const P = defineProps<{
  id: number;
}>()
const isPlay = computed(() => {
  return P.id === store.state.song.curPlaySong?.id && store.state.song.Player?.playStatus;
})
</script>
<style scoped lang="scss"></style>
