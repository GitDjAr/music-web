<!--  -->
<template>
  <div
    @click="toPage"
    class="mybox select-none cursor-pointer group hover:bg-sky-50 hover:shadow-lg transition-all flex w-96 h-36 px-3 m-2 text-center shadow rounded-md items-center"
  >
    <div class="relative w-32 h-32">
      <Image
        :wh="[200, 200]"
        :src="P.item?.blurPicUrl"
        alt=""
        class="rounded-md w-32 h-32 absolute -translate-y-1/2 top-1/2 z-10"
      />
      <div
        class="group-hover:translate-x-14 -translate-y-1/2 top-1/2 transition-all absolute"
      >
        <img
          class="changping w-28 h-28"
          src="../../assets/changpian.png"
          alt=""
        />
      </div>
    </div>
    <div
      class="h-4/5 text-left ml-14 flex flex-1 flex-col justify-around overflow-hidden"
    >
      <p class="truncate text-xl text-black">{{ P.item?.name }}</p>
      <span class="truncate inline-block text-gray-100">{{
        P.item?.artist?.name
      }}</span>
      <li v-if="P.item?.publishTime || P.item.createTime" class="text-gray-600">
        {{
          formatformat(P.item?.publishTime || P.item.createTime, "yyyy-MM-dd")
        }}
      </li>
      <li v-if="P.item.playCount" class="text-gray-500">
        {{ P.item.trackCount }}首-播放{{ P.item.playCount }}次
      </li>

      <li class="flex items-center">
        <a-tag :color="tagColor()" v-if="P.item.type">{{ P.item.type }}</a-tag>
        <template v-else-if="P.item.tags">
          <a-tag :color="tagColor()" v-for="tag in P.item.tags" class="mr-2">{{
            tag
          }}</a-tag>
        </template>
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
  item: any;
  mode: string;
}>();

function toPage() {
  if (P.mode === "playlist") {
    router.push({ name: "playlist", params: { id: P.item.id } });
  } else {
    router.push({ name: "albums", params: { id: P.item.id } });
  }
}
</script>
<style scoped lang="scss">
.mybox {
  background: var(--color-fill-2);
  &:hover {
    background-color: rgb(240 249 255 / var(--tw-bg-opacity));
  }
  &:hover .changping {
    -webkit-animation: rotate-center 5s linear infinite;
    animation: rotate-center 5s linear infinite;
  }
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
