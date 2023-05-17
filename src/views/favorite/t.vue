<!--  -->
<template>
  <div class="w-15 h-15">
    123
    <Image
      class="rounded-md cursor-pointer h-full w-full"
      :src="`http://p1.music.126.net/Av80q6vSEPaOIei6JJGkiw==/109951164851214848.jpg?param=80y80`"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
const state = reactive({
  count: 0,
});
</script>
<style scoped lang="scss"></style>
