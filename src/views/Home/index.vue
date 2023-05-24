<!--  -->
<template>
  <div class="box-bg">
    <div class="home-box flex">
      <PanelLeftVue />
      <PanelRightVue />
    </div>
    <TopChartsVue :id="1" class="pb-1" />
  </div>
</template>

<script lang="ts" setup>
import TopChartsVue from "./TopCharts.vue";
import PanelLeftVue from "./PanelLeft.vue";
import PanelRightVue from "./PanelRight.vue";
</script>
<style scoped lang="scss">
.box-bg {
  padding: 0 10px;
  border-radius: 6px;
  // background: var(--my-white);
}
.home-box {
  height: 100%;
  align-items: flex-start;
}
</style>
