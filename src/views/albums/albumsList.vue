<!--  -->
<template>
  <div class="myclass  box-border flex flex-col select-none overflow-hidden h-full w-full relative" v-bind="$attrs">
    <div class=" flex " style="min-width: 160px">
      <Image :src="Albums.coverImgUrl" class="rounded-lg ml-2" :wh="[500, 500]" />
      <div :class="`text-left  pl-5  pb-4  transition-all w-full flex flex-col justify-between  h-52 `">
        <h1 class="font-bold">{{ Albums.name }}</h1>
        <p>{{ formatTime(Albums.createTime, "YYYY-mm-dd") }}</p>
        <p>播放次数:{{ Albums.playCount }}</p>
        <p @click="visible = true" class="cursor-pointer truncate w-11/12">
          {{ Albums.description }}
        </p>
        <div>
          <a-tag :color="tagColor()" :checked="true" :default-checked="true" v-for="item in Albums.tags"
            :style="{ marginRight: '10px' }">
            {{ item }}</a-tag>
        </div>
      </div>
    </div>
    <div class="" ref="refBox">
      <div class="hybull  pl-5 bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm flex flex-col overflow-scroll">
        <div v-for="item in AlbumsList" :key="item.id" @click="play(item)"
          class="flex justify-between items-center p-2 px-4 mb-3 hover:shadow-xl hover:border-gray-300 cursor-pointer transition-all rounded-md border border-b">
          <Image :src="item.al.picUrl" :wh="[120, 120]" class="w-14 h-14 rounded-md" />
          <div class="flex-1 mx-2 text-left inline-block truncate">
            {{ item.name }}</div>
          <div class="w-40 flex justify-around mr-2">
            <MyPlay :id="item.id" />
            <MyLike :id="item.id" />
          </div>
          <span> {{ formatTime(item?.dt) || "00:00:00" }}</span>
        </div>
      </div>
    </div>
  </div>

  <ModalVue v-model:visible="visible" :title="Albums.name">
    <p>{{ Albums.description }}</p>
  </ModalVue>
</template>

<script lang="ts" setup>
import ModalVue from "@/components/Modal.vue";
import { ref, computed, reactive, watch } from "vue";
import { formatTime } from "@/utils/format";
import { _playlist_detail, _playlist_track_all } from "@/api/Home";
import { subscribePlaylist } from '@/api/playlist'
import { useRoute } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const route = useRoute();
const tagColor = () => store.getters.tagColor;
const id: string = <string>route.params?.id;

const visible = ref(false);


function play(item) {
  // store.dispatch("ToggleSong", { id: item.id, playListId: store.state.song.playListId, list: [] });
}
</script>
<style scoped lang="scss">
.myclass {
  background-image: url("../../assets/albums-bg.png");
  background-repeat: no-repeat;
  background-size: 105% auto;

  .hybull {
    height: calc(100% - 192px);
  }
}
</style>
