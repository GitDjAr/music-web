<!--  -->
<template>
  <div class="w-full ">
    <div class="px-2 mb-4" :class="{ 'ul-list-model': ListModel }" :key="index" v-for="(item, index) in TopList">
      <!-- <span>{{index.toString().padStart(2,'0')}}</span> -->
      <!-- <img :src="item.picUrl" @click="showMore(item)" alt="img" /> -->
      <a-divider :orientation="orientation[index]" :margin="20">
        {{ item.name }}
      </a-divider>
      <template v-if="item.tracks.length > 0">
        <div class="flex px-2 ">
          <Image :wh="[130, 130]" class="mr-2 w-28 cursor-pointer" :src="item.coverImgUrl"
            @click="() => router.push({ name: 'playlist', params: { id: item.id } })" />
          <div class="w-full flex flex-col">
            <div :class="{ 'li-box': true }" :key="first" class="t-lf items-center flex-grow justify-between flex"
              v-for="{ first, second } in item.tracks">
              <p class="w-40">{{ first }}</p>
              <span>{{ second }}</span>
              <!-- <MyPlay class="w-10" :id="id" @click="playMusic(first, item)" /> -->
            </div>
          </div>
        </div>
      </template>
      <a-empty v-else />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import { useRouter } from "vue-router";
import { toplist } from "@/api/Home";
import { IdOps } from "../utils/type/id";
import Store from "@/store/index";
export default defineComponent({
  components: {},
  props: {
  },
  setup(props) {
    const state = reactive({
      TopList: [
        {
          picUrl: "",
          id: "",
          tracks: [
            {
              first: {
                name: "",
                id: "",
              },
              second: "",
            },
          ],
        },
      ],
    });
    const router = useRouter();
    // 获取榜单信息
    onMounted(async () => {
      // console.log(await toplist());
      const { list = [] } = await toplist();
      state.TopList = list.splice(0, 3)
    });
    const showMore = ({ id }: IdOps) => {
      router.push({ path: `${id}` });
    };
    const playMusic = ({ id }, list) => {
      Store.dispatch('ToggleSong', { id, playlistId: list.id })
    };

    const orientation = ["left", "center", "right"];
    return {
      ...toRefs(state),
      orientation,
      showMore,
      playMusic,
      router
    };
  },
});
</script>
<style scoped lang="scss"></style>
