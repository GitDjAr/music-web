<!--  -->
<template>
  <div class="overflow-hidden">
    <img ref="refImg" :class="`w-full h-full  ${objectify}`" :alt="P.alt" />
    <slot></slot>
</div>
</template>

<script lang="ts" setup>
import { computed, ref, watchEffect, withDefaults } from "vue";

const P = withDefaults(
  defineProps<{
    src?: string;
    alt?: string;
    lazy?: boolean;
    wh?: Array<number> | null;
    slots?: boolean;
    unit?: string;
    fit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  }>(),
  {
    slots: false,
    lazy: true,
    wh: null,
    unit: "px",
    fit: "cover",
  }
);

const objectify = ref("object-" + P.fit);
const Immure = computed(() => {
  if (P.src) {
    let key = P.src.includes('?param=') ? 'param=' : '?param='
    let value = P.wh ? `${P.wh[0]}y${P.wh[1]}` : ''
    return P.src + key + value
  } else {
    return window.rendomImgurl;
  }
});

// 懒加载
const isServerRendering = (() => {
  try {
    return !(typeof window !== "undefined" && document !== undefined);
  } catch (e) {
    return true;
  }
})();

const refImg = ref<HTMLImageElement | null>(null);
watchEffect(() => {
  if (isServerRendering || !refImg.value) return;
  refImg.value.src = Immure?.value;
});
</script>
<style scoped lang="scss">
</style>
