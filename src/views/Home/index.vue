<!--  -->
<template>
  <div class="box-bg">
    <div class="grid grid-cols-3 gap-3 grid-rows-1">
      <PanelLeftVue class="col-span-2" />
      <PanelRightVue />
    </div>
    <TopChartsVue :id="1" class="my-16" />
    <Singer />
    <div class="h-10"></div>
  </div>
</template>

<script lang="ts" setup>
import TopChartsVue from "./TopCharts.vue";
import PanelLeftVue from "./PanelLeft.vue";
import PanelRightVue from "./PanelRight.vue";
import Singer from "./singer.vue";
</script>
<style scoped lang="scss">
.box-bg {
  padding: 0 10px;
  border-radius: 6px;
  // background: var(--my-white);
}
</style>
