<!--  -->
<template>
  <div class="grid gap-2 grid-cols-4">
    <div
      :key="item.name"
      v-for="item in iconList"
      @click="store.dispatch('setIcon', item.name)"
      :class="` w-16 h-16 cursor-pointer    ${
        store.state.app.iconPse === item.name
          ? 'border-b-4 border-purple-800  rounded'
          : ''
      }`"
    >
      <img :src="item.name" :alt="item.name" srcset="" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { iconGif } from "@/utils/gFn";

const store = useStore();
const iconList = ref();
iconGif().then((res) => {
  console.log("iconGif", res);
  iconList.value = res;
});
</script>
<style scoped lang="scss"></style>
