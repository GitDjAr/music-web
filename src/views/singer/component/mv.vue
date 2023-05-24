<!-- 歌手 -->
<template>
  <div
    class="overflow-y-scroll h-full flex flex-wrap justify-between"
    v-infinite-scroll="scrollLoad"
  >
    <MyVideo :id="videoId" v-model:show="VideoShow"></MyVideo>
    <div
      @click="handleVideo(item)"
      v-for="item in mvList"
      :key="item.id"
      class="mybox relative cursor-pointer w-1/3 p-3 box-border overflow-hidden mb-4 flex-col flex justify-center items-center"
    >
      <div class="box-div w-full relative group overflow-hidden rounded-md">
        <Image
          class="h-48"
          :src="item.imgurl"
          :wh="[16 * 30, 12 * 30]"
          :alt="item.publishTime"
        />
        <p
          class="absolute top-1/3 left-1/2 -translate-x-1/2 opacity-0 transition-all group-hover:opacity-100"
        >
          <IconPlayArrow style="font-size: 34px; color: #fff" />
        </p>
        <p
          class="absolute bottom-0 w-full flex p-3 transition-all justify-between text-white opacity-0 group-hover:opacity-100"
        >
          <span>{{ item.playCount }}</span>
          <span>{{ item.publishTime }}</span>
        </p>
      </div>
      <div class="mt-4 w-full overflow-hidden">
        <div class="flex w-full justify-between items-center">
          <span class="truncate flex-1 mr-2 text-left">{{ item.name }}</span>
          <!-- <span>{{ item.publishTime }}</span> -->
        </div>
        <!-- <p class=" pt-2 truncate text-left ">{{ item.name }}</p> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, reactive, computed } from "vue";
import { vInfiniteScroll } from "@vueuse/components";
import { _artist_mv } from "@/api/user";

const P = defineProps<{
  props: { id: number };
  Activated: boolean;
}>();

// 激活周期
watch(
  () => P.Activated,
  () => {
    console.log(111);

    if (P.Activated === true) {
      searchSuggest();
    }
  }
);
const Emit = defineEmits<{
  (e: "updateId", v: string): void;
}>();

// 滚动加载
function scrollLoad() {
  ++query.pageNum;
  searchSuggest();
}

// mv
const mvList = ref<Array<any>>([]);
const offset = computed(() => query.limit * query.pageNum);
const query = reactive({
  id: P.props.id,
  limit: 15,
  pageNum: 1,
});
const searchSuggest = async (id?: string) => {
  const { mvs = [] } = await _artist_mv({ ...query, offset: offset.value });
  mvList.value.push(...mvs);
  // 更新激活标记
  Emit("update", true);
};

const videoId = ref("");
const VideoShow = ref(false);
function handleVideo({ id }: any) {
  videoId.value = id;
  VideoShow.value = true;
}
</script>
<style scoped lang="scss">
.mybox .box-div {
  &::before {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: black;
    z-index: 0;
  }

  &:hover::before {
    content: "";
    opacity: 0.5;
    transition: all 0.3;
  }
}
</style>
