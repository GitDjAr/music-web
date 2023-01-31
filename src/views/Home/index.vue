<!--  -->
<template>
  <div>
    <div class="home-box flex">
      <PanelLeftVue />
      <PanelRightVue />
    </div>
    <TopChartsVue />
  </div>
</template>

<script lang="ts" setup>
import TopChartsVue from "./TopCharts.vue";
import PanelLeftVue from "./PanelLeft.vue";
import PanelRightVue from "./PanelRight.vue";
</script>
<style scoped lang="scss">
.home-box {
  height: 100%;
  align-items: flex-start;
}
</style>
