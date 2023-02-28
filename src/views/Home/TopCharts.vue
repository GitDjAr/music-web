<!--  -->
<template>
  <a-card class="w-4/5" :bordered="false">
  <!-- <template #title>
      <h2 class="t-lf">{{ $t('home.charts') }}</h2>
          </template> -->
  <!-- <template #extra>
      <a-button type="text" @click="showMore">{{ $t('artist.showMore') }}</a-button>
          </template>-->
    <div class="charts">
      <div :class="{ 'ul-list': true, 'ul-list-model': ListModel }" :key="index" v-for="(item, index) in TopList">
        <!-- <span>{{index.toString().padStart(2,'0')}}</span> -->
        <!-- <img :src="item.picUrl" @click="showMore(item)" alt="img" /> -->
        <a-divider :orientation="orientation[index]">
          {{ item.name }}
        </a-divider>
        <template v-if="item.tracks.length > 0">
          <div class="flex">
            <a-image width="100" class="mr-2" :src="item.coverImgUrl"></a-image>
            <div class="w-full flex flex-col">
              <div :class="{ 'li-box': true }" :key="first" class="t-lf items-center flex-grow justify-between flex"
                v-for="{ first, second, id } in item.tracks" @dblclick="playMusic(first)">
                <p class="w-40">{{ first }}</p>
                <span>{{ second }}</span>
                <MyPlay :id="id" @click="playMusic(first)" />
              </div>
            </div>
          </div>
        </template>
        <a-empty v-else />
      </div>
    </div>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import { useRouter } from "vue-router";
import { toplist } from "@/api/Home";
import { IdOps } from "../utils/type/id";
export default defineComponent({
  components: {},
  props: {
    model: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const state = reactive({
      ListModel: props.model,
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
    // 获取榜单信息
    onMounted(async () => {
      // console.log(await toplist());
      const { list = [] } = await toplist();
      state.TopList = list.filter((e: any) =>
        [19723756, 180106, 60198].includes(e.id)
      );
    });
    const router = useRouter();
    const showMore = ({ id }: IdOps) => {
      router.push({ path: `${id}` });
    };
    const playMusic = ({ id }: IdOps) => {
      router.push({ path: `${id}` });
    };

    const orientation = ["left", "center", "right"];
    return {
      ...toRefs(state),
      orientation,
      showMore,
      playMusic,
    };
  },
});
</script>
<style scoped lang="scss">
.charts {
  width: 100%;

  .ul-list-model {}
}
</style>
