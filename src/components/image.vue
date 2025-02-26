<!--  -->
<template>
  <div class="overflow-hidden">
    <Transition name="fade" mode="out-in">
      <img
        :class="`w-full h-full  ${objectify}`"
        :alt="P.alt"
        :src="imgSrc"
        :key="imgSrc"
        loading="lazy"
        decoding="async"
        v-if="imgSrc"
      />
      <a-skeleton v-else :animation="true" class="w-full h-full">
        <a-skeleton-shape class="pb-[100%]" style="width: 100%" />
      </a-skeleton>
    </Transition>
    <slot> </slot>
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
    unit?: string;
    fit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  }>(),
  {
    lazy: true,
    wh: null,
    unit: "px",
    fit: "cover",
  },
);

const objectify = ref("object-" + P.fit);
const Immure = computed(() => {
  if (P.src) {
    // imgSrc.value = P.src?.split("?param=")[0] + "?param=120y120";
    // let key = P.src.includes("?param=") ? "param=" : "?param=";
    if (P.src.includes("?param=")) {
      return P.src;
    } else {
      let value = P.wh ? `${P.wh[0]}y${P.wh[1]}` : "";
      return P.src + "?param=" + value;
    }
  } else {
    return window.rendomImgUrl;
  }
});

// 懒加载

const imgSrc = ref("");
watchEffect(() => {
  const img = new Image();
  img.src = Immure.value;
  console.log(Immure.value);
  img.onload = () => {
    imgSrc.value = Immure.value;
  };
});
</script>
<style scoped lang="scss"></style>
