<!--  -->
<template>
  <div @click="toPage"
    class="mybox cursor-pointer group hover:bg-sky-50 hover:shadow-lg transition-all flex w-96 h-36 px-3 m-2 text-center shadow rounded-md items-center">
    <div class="relative w-32 h-32 ">
      <Image :wh="[200, 200]" :src="P.item?.blurPicUrl" alt=""
        class="rounded-md w-32 h-32 absolute -translate-y-1/2 top-1/2 z-10" />
      <div class="group-hover:translate-x-14 -translate-y-1/2 top-1/2 transition-all absolute">
        <img class="changping w-28 h-28" src="../../assets/changpian.png" alt="" />
      </div>
    </div>
    <div class="h-4/5 text-left ml-14 flex flex-col justify-around">
      <p>{{ P.item?.name }}</p>
      <span>{{ P.item?.artist?.name }}</span>
      <li>发布时间:{{ formatformat(P.item?.publishTime, "yyyy-MM-dd") }}</li>
      <li class="flex items-center">
        <a-tag :color="tagColor()">{{ P.item.type }}</a-tag>
        <!-- <MyLike /> -->
      </li>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { formatformat } from "@/utils/format";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();
let tagColor = () => store.getters.tagColor;

const P = defineProps<{
  item: {};
}>();

function toPage() {
  router.push({ name: "albums", params: { id: P.item.id } });
}
</script>
<style scoped lang="scss">
.mybox:hover .changping {
  -webkit-animation: rotate-center 5s linear infinite;
  animation: rotate-center 5s linear infinite;
}

@keyframes rotate-center {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
