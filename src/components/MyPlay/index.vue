<!--  -->
<template>
  <div
    class="mysvg cursor-pointer"
    :style="{ height: fontSize, width: fontSize }"
  >
    <svg
      v-if="isPlay"
      :style="{ fontSize }"
      class="svg-"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="20px"
      height="18px"
      viewBox="0 0 24 30"
      style="enable-background: new 0 0 50 50"
      xml:space="preserve"
    >
      <rect x="0" y="13" width="2" height="5" fill="#fbc2eb">
        <animate
          attributeName="height"
          attributeType="XML"
          values="5;21;5"
          begin="0.3s"
          dur="0.6"
          repeatCount="indefinite"
        ></animate>
        <animate
          attributeName="y"
          attributeType="XML"
          values="13; 5; 13"
          begin="0.3s"
          dur="0.6"
          repeatCount="indefinite"
        ></animate>
      </rect>
      <rect x="5" y="13" width="2" height="5" fill="#e5b5e5">
        <animate
          attributeName="height"
          attributeType="XML"
          values="5;21;5"
          begin="0.4s"
          dur="0.75"
          repeatCount="indefinite"
        ></animate>
        <animate
          attributeName="y"
          attributeType="XML"
          values="10; 5; 13"
          begin="0.4s"
          dur="0.75"
          repeatCount="indefinite"
        ></animate>
      </rect>
      <rect x="10" y="13" width="2" height="5" fill="#dbafe2">
        <animate
          attributeName="height"
          attributeType="XML"
          values="4;21;5"
          begin="0.15s"
          dur="0.75"
          repeatCount="indefinite"
        ></animate>
        <animate
          attributeName="y"
          attributeType="XML"
          values="17; 5; 13"
          begin="0.15s"
          dur="0.75"
          repeatCount="indefinite"
        ></animate>
      </rect>
      <rect x="15" y="13" width="2" height="5" fill="#a18cd1">
        <animate
          attributeName="height"
          attributeType="XML"
          values="5;21;5"
          begin="0.3s"
          dur="0.75"
          repeatCount="indefinite"
        ></animate>
        <animate
          attributeName="y"
          attributeType="XML"
          values="13; 5; 13"
          begin="0.3s"
          dur="0.75"
          repeatCount="indefinite"
        ></animate>
      </rect>
    </svg>
    <i
      class="i-line-md-pause-to-play-transition inline-block"
      :style="{ fontSize }"
      v-else
    ></i>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import store from "@/store";
const P = defineProps<{
  id: number;
  size: string;
}>();
const isPlay = computed(() => {
  return (
    P.id === store.state.song.curPlaySong?.id &&
    store.state.song.Player?.playStatus
  );
});
const fontSize = computed(() => {
  return {
    mini: "18px",
    small: "22px",
    default: "24px",
    large: "28px",
    maxlarge: "38px",
  }[P.size || "default"];
});
</script>
<style scoped lang="scss">
.mysvg {
  .svg- {
    transform: scale(1.3);
  }
  svg {
    color: initial;
  }
}
</style>
