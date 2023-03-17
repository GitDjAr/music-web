<!--  -->
<template>
  <div class="w-full">
    <div class="px-2 mb-4" :key="index" v-for="(item, index) in state.TopList">
      <a-divider :orientation="(orientation[index] as OrientationType)" :margin="20">
        {{ item.name }}
      </a-divider>
      <template v-if="item.tracks.length > 0">
        <div class="flex px-2">
          <Image :wh="[130, 130]" class="mr-2 w-28 cursor-pointer" :src="item.coverImgUrl" @click="
            () => router.push({ name: 'playlist', params: { id: item.id } })
          " />
          <div class="w-full flex flex-col">
            <div :class="{ 'li-box': true }" :key="index" class="t-lf items-center flex-grow justify-between flex"
              v-for="(tms, index) in item.tracks">
              <p class="w-40">{{ tms.first }}</p>
              <span>{{ tms.second }}</span>
              <!-- <MyPlay class="w-10" :id="id" @click="playMusic(first, item)" /> -->
            </div>
          </div>
        </div>
      </template>
      <a-empty v-else />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { toplist } from "@/api/Home";

type OrientationType = "left" | "right" | "center"

interface First {
  name: string;
  id: string;
}

interface Track {
  first: First;
  second: string;
}

interface RootObject {
  picUrl: string;
  id: string;
  tracks: Track[];
  name: string;
  coverImgUrl: string;
}
const state = reactive<{ TopList: Array<RootObject> }>({
  TopList: []
});
const router = useRouter();
// 获取榜单信息
onMounted(async () => {
  const { list = [] } = await toplist();
  state.TopList = list.splice(0, 3);
});
// const showMore = ({ id }: { id: number }) => {
//   router.push({ path: `${id}` });
// };

const orientation = ["left", "center", "right"];
</script>
<style scoped lang="scss"></style>
