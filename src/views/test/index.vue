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
    <a-button
      @click="
        imgUrl = imgUrl
          ? ''
          : 'http://p1.music.126.net/Av80q6vSEPaOIei6JJGkiw==/109951164851214848.jpg?param=200y200'
      "
      >img</a-button
    >
    <div style="width: 300px; height: 300px">
      <Transition name="fade" mode="out-in">
        <img
          ref="refImg"
          :class="`w-full h-full  `"
          loading="lazy"
          :src="imgUrl"
          decoding="async"
          v-if="imgUrl"
        />
        <a-skeleton v-else :animation="true" class="w-full h-full">
          <a-skeleton-shape class="pb-[100%]" style="width: 100%" />
        </a-skeleton>
      </Transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import ids from "virtual:svg-icons-names";
import { Notification } from "@arco-design/web-vue";
const icons = ids.map((item) => item.split("icon-")[1]);

const copy = (item: string) => {
  navigator.clipboard.writeText(item);
  Notification.success("复制成功");
};

// img
const imgUrl = ref(
  "http://p1.music.126.net/Av80q6vSEPaOIei6JJGkiw==/109951164851214848.jpg?param=200y200"
);
</script>
<style scoped lang="scss">
.mycs {
  font-size: 24px;
  &:hover {
    color: red;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0.5;
}

/******************/

.slide-fade-enter-active {
  transition: all 0.3s ease-in-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0.5;
}
</style>
