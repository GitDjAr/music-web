<!--  -->
<template>
  <div class="" ref="refBox">
    <!-- <div
      :class="`text-left  pl-5  pb-4  transition-all w-full flex flex-col justify-between  h-52 `"
    >
      <h1 class="font-bold">{{ Albums.name }}</h1>
      <p>创建日期: {{ formatformat(Albums.createTime, DateFormat.ymd) }}</p>
      <p>播放次数: {{ Albums.playCount }}</p>
      <p @click="visible = true" class="cursor-pointer truncate w-11/12">
        {{ Albums.description }}
      </p>
      <div>
        <a-tag
          :color="tagColor()"
          :checked="true"
          :default-checked="true"
          v-for="item in Albums.tags"
          :style="{ marginRight: '10px' }"
        >
          {{ item }}</a-tag
        >
      </div>
    </div> -->
    <div
      class="hybull pl-5 bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm flex flex-col overflow-y-auto"
    >
      <div
        v-for="({ data: item }, index) in playList"
        :key="item.id"
        @click="play(item)"
        :style="{ '--stagger': index }"
        data-animate
        class="flex justify-between items-center p-2 px-4 mb-3 hover:shadow-xl hover:border-gray-300 cursor-pointer transition-all rounded-md border border-b"
      >
        <Image
          :src="item?.al?.picUrl"
          :wh="[120, 120]"
          class="w-14 h-14 rounded-md"
        />
        <div class="flex-1 mx-2 text-left inline-block truncate">
          {{ item.name }}
        </div>
        <div>{{ item?.ar?.[0]?.name }}</div>
        <div class="w-40 flex justify-around mr-2">
          <MyPlay :id="item.id" />
          <MyLike :id="item.id" />
        </div>
        <span> {{ formatTime(item.dt) || "00:00:00" }}</span>
      </div>
      <!-- <p v-show="playListEnd" class="text-center text-sky-300">到底辣 ~ ~ ~</p> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { formatTime } from "@/utils/format";
import { songHistory, T } from "@/api/playlist";

const store = useStore();
const route = useRoute();

// const tagColor = () => store.getters.tagColor;

const playList = ref<Partial<T.PlayObj>>({});
async function getList() {
  playList.value = (await songHistory({})).data.list;
}
getList();
function play(item: { id: any }) {
  store.dispatch("ToggleSong", {
    id: item.id,
    playListId: "播放历史",
    list: playList.value,
  });
}
</script>
<style scoped lang="scss"></style>
