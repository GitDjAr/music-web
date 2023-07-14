<!-- 单曲 -->
<template>
  <div class="singlesBox select-none h-full overflow-y-scroll">
    <template v-for="(item, index) in searchList" :key="item.id">
      <song
        :id="item.id"
        :dt="item.dt"
        :songName="item.name"
        :singer="item?.ar?.[0]?.name"
        :orgin="item?.al?.name"
        :url="item?.al?.picUrl"
        data-animate
        :style="{ '--stagger': index }"
        @click="play(item)"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch ,onActivated} from "vue";
import { cloudsearch, T } from "@/api/playlist";
import { useStore } from "vuex";
const store = useStore();

const { params, Activated } = defineProps<{
  params: {
    activation: boolean;
    keysCode: string;
  };
  Activated: boolean;
}>();
const Emit = defineEmits<{
  (e: "update", activation: boolean): void;
}>();

// 激活周期
watch(
  () => Activated,
  () => {
    if (!params.activation && Activated === true) {
      searchSuggest();
    }
  }
);

function play(item: { id: any }) {
  store.dispatch("ToggleSong", {
    id: item.id,
    playListId: params.keysCode,
    list: searchList.value,
  });
}

// 单曲 搜索
const searchList = ref<T.Track[] &  T.MusicPlayList[]>([]);
// 激活之前清空
onActivated(()=>{
  searchList.value =[]
})
const searchSuggest = async (key?: string) => {
  const {
    result: { songs },
  } = await cloudsearch({ keywords: key || params.keysCode });
  searchList.value = songs;
  // 更新激活标记
  Emit("update", true);
};
searchSuggest();
// 暴露
defineExpose({
  searchSuggest,
});


</script>
<style scoped lang="scss"></style>
