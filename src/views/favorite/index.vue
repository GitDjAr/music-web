<!--  -->
<template>
  <div class="w-full h-52 flex">
    <div class="container-1">Container 1</div>
    <div class="flex-1 bg-slate-500">
      <!-- <div
        class="text-left pl-5 pb-4 transition-all w-full flex flex-col justify-between h-52"
      >
        asdfasd
      </div> -->
      <div class="hybull container-2 flex">
        <div>Div 1</div>
        <div>Div 2</div>
        <div>Div 3</div>
        <div class="long-text">
          This is a very long text that should be hidden if it overflows.
        </div>
      </div>
    </div>
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
<style scoped lang="scss">
.hybull div {
  margin: 5px 10px;
}

.container-2 {
  flex: 1;
  background-color: lightgreen;
  overflow: hidden;
}
.container-1 {
  width: 20%;
  min-width: 160px;
  background-color: lightblue;
}
.long-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
