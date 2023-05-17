<!--  -->
<template>
  <div class="w-10 h-10">
    <RouterLink :to="`/Music/favorite/t`">
        <Image
          class="rounded-md cursor-pointer h-full w-full"
          :src="`http://p1.music.126.net/Av80q6vSEPaOIei6JJGkiw==/109951164851214848.jpg?param=80y80`"
        />
    </RouterLink>
  </div>
</template>

<script lang="ts" setup>
import { RouterLink, useRouter } from "vue-router";
import { ref, getCurrentInstance, reactive, inject } from "vue";
console.log(inject("InjectionState"), getCurrentInstance());

const router = useRouter();
const state = reactive({
  count: 0,
});
</script>
<style scoped lang="scss"></style>
