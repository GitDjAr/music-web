<!--  -->
<template>
  <div class="text-xl inline-flex">
    <MyIcon name="level" />
    <div class="text-[#b0b0fb] -translate-x-1 text-sm font-bold pt-1">
      <slot>{{ level.v }}</slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { withDefaults } from "vue";
const level = withDefaults(
  defineProps<{
    v: string | number;
  }>(),
  {
    v: 0,
  }
);
</script>
<style scoped lang="scss"></style>
