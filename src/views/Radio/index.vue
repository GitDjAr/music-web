<!--  -->
<template>
  <div class="">
    <div class="flex ml-2">
      <div class="">模式</div>
      <a-switch
        v-model="modeStr"
        checked-color="#F53F3F"
        unchecked-color="#14C9C9"
      />
    </div>
    <div class="overflow-y-scroll no-scroll flex ml-2">
      <a-tag
        v-for="(tag, index) of tags"
        :key="tag"
        :closable="index !== 0"
        @close="handleRemove(tag)"
      >
        {{ tag }}
      </a-tag>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useStorage } from "@vueuse/core";
const tags = ref(["Tag 1", "Tag 2", "Tag 3"]);
const handleRemove = (key: string) => {
  tags.value = tags.value.filter((tag) => tag !== key);
};

// 模式
const modeStr = useStorage("mode", true);
</script>
<style scoped lang="scss"></style>
