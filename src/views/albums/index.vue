<!--  -->
<template>
  <div class="">
    111
    <albumVue :item="item" v-for="item in albumList"> 111</albumVue>
  </div>
</template>

<script lang="ts" setup>
import albumVue from "@/components/album/index.vue";
import { ref } from "vue";
const albumList = ref([]);
</script>
<style scoped lang="scss"></style>
