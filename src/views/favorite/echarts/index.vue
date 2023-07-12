<!--  -->
<template>
  <div class="">
    <!-- <div @click="is = !is">click</div> -->
    <proportionVue v-if="is" ref="refEcharts" />
    <relationshipVue v-else ref="refEcharts" />
  </div>
</template>

<script lang="ts" setup>
import proportionVue from "./proportion.vue";
import relationshipVue from "./relationship.vue";

import { ref, reactive } from "vue";
const is = ref(false);
const refEcharts = ref(null);

document.addEventListener("resize", () => {
  refEcharts?.value && refEcharts.value.resize();
});
</script>
<style scoped lang="scss"></style>
