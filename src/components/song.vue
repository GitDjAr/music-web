<!--  -->
<template>
  <div
    class="flex justify-between items-center p-2 px-4 mb-3 hover:shadow-xl hover:border-gray-300 cursor-pointer transition-all rounded-md border border-b"
  >
    <Image
      v-show="songInfo.url"
      :src="songInfo.url"
      :wh="[120, 120]"
      class="w-14 h-14 rounded-md"
    />
    <div class="flex-1 mx-2 text-left inline-block truncate">
      {{ songInfo?.songName }}
    </div>
    <!-- tag subType=现场版 -->
    <!-- <div>{{ subType }}</div> -->
    <div>{{ songInfo?.singer }}</div>
    <div class="w-40 flex justify-around mr-2">
      <MyPlay :id="songInfo.id" />
      <MyLike :id="songInfo.id" />
    </div>
    <span v-show="songInfo.dt"> {{ formatTime(songInfo.dt) }}</span>
    <div
      v-show="songInfo?.orgin"
      class="w-40 truncate overflow-hidden whitespace-nowrap"
    >
      {{ songInfo?.orgin }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { formatTime } from "@/utils/format";
import { withDefaults } from "vue";

const songInfo = withDefaults(
  defineProps<{
    url?: string;
    singer?: string;
    songName?: string;
    id: number;
    dt?: number;
    orgin?: string;
  }>(),
  {
    url: "",
    dt: 0,
  }
);
console.log(songInfo);
</script>
<style scoped lang="scss"></style>
