<!--  -->
<template>
  <div class="flex flex-wrap justify-center items-center">
    <div
      v-for="item in icons"
      :key="item"
      @click="copy(item)"
      class="mycs w-20 h-20 flex justify-center items-center"
    >
      <MyIcon :name="item"></MyIcon>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ids from "virtual:svg-icons-names";
import { Notification } from "@arco-design/web-vue";
const icons = ids.map((item) => item.split("icon-")[1]);

const copy = (item: string) => {
  navigator.clipboard.writeText(item);
  Notification.success("复制成功");
};
</script>
<style scoped lang="scss">
.mycs {
  font-size: 24px;
  &:hover {
    color: red;
  }
}
</style>
