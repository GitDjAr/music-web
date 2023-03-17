<!--专辑 -->
<template>
  <div ref="rootRef" class="MYroot flex h-full flex-col flex-wrap overflow-scroll box-border justify-around">
    <template v-for="item in searchList">
      <albumVue :item="item"></albumVue>
    </template>
    <p class="absolute bottom-0 left-0 hidden">
      试试:<span class="text-sky-500">shift+滚轮</span>
    </p>
  </div>
</template>

<script lang="ts" setup>
import albumVue from "@/components/album/index.vue";
import { ref, watch } from "vue";
import { cloudsearch } from "@/api/Home";

const { Activated, params } = defineProps<{
  params: {
    activation: boolean;
    keysCode: string;
  };
  Activated: boolean;
}>();
const Emit = defineEmits<{
  (e: "update", activation: boolean): void;
}>();

// 激活周期
watch(
  () => Activated,
  () => {
    if (!params.activation && Activated === true) {
      searchSuggest();
    }
  }
);
const arr = ref([]);
arr.value = Array.from({ length: 8 });
// 专辑 搜索
const searchList = ref([]);
const searchSuggest = async (key?: string) => {
  const {
    result: { albums },
  } = await cloudsearch({ keywords: key || params?.keysCode, type: 10 });
  searchList.value = albums;
  // 更新激活标记
  Emit("update", true);
};
searchSuggest();
</script>
<style scoped lang="scss">
.MYroot {
  height: 100%;
  overflow: scroll;

  &:hover p {
    display: block;
  }
}
</style>
