<!--  -->
<template>
  <Transition name="fade" mode="out-in">
    <div
      v-if="songInfo.url"
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
      <div @click.stop="goUser(songInfo)">{{ songInfo?.singer }}</div>
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
    <div v-else class="p-2 px-4 mb-3 cursor-pointer">
      <a-skeleton :animation="true" class="h-[50px] flex w-full">
        <div class="flex flex-start w-full">
          <a-skeleton-shape class="w-[70px] h-[70px]" />
          <div class="flex-1 ml-4">
            <a-skeleton-line :rows="1" :widths="['100%']" :line-height="45" />
          </div>
        </div>
      </a-skeleton>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { formatTime } from "@/utils/format";
import { withDefaults } from "vue";
import {useRouter} from 'vue-router'
import { GetSongDetail } from "@/api/play";
const router = useRouter()

interface songInfo {
    url?: string;
    singer?: string;
    songName?: string;
    id: number;
    dt?: number;
    orgin?: string;
}
const songInfo = withDefaults(
  defineProps<songInfo>(),
  {
    url: "",
    dt: 0,
  }
);
// console.log('songInfo',songInfo);

async function goUser(row:songInfo) {
const id=(await GetSongDetail({ ids: row.id }))?.songs[0]?.ar[0]?.id
  if(id){
    router.push({ name: "singer", params: { id } });
  }
}
</script>
<style scoped lang="scss"></style>
