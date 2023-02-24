<!--  -->
<template>
  <div
    ref="rootRef"
    v-infinite-scroll="scrollLoad"
    class="MYroot flex flex-wrap h-full overflow-scroll box-border justify-around"
  >
    <template v-for="item in albumsList">
      <albumVue :item="item"></albumVue>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { vInfiniteScroll } from "@vueuse/components";
import albumVue from "@/components/album/index.vue";
import { _artist_album } from "@/api/user";
import { ref, Ref, computed, reactive } from "vue";

const P = defineProps<{
  props: {
    id: number;
  };
}>();

const offset = computed(() => params.limit * params.pageNum);
const params = reactive({
  id: P.props.id,
  limit: 12,
  pageNum: 1,
});
const albumsList: Ref<object[]> = ref([]);
async function get_artist_album() {
  try {
    const { hotAlbums = [] } = await _artist_album({
      ...params,
      offset: offset.value,
    });
    albumsList.value.push(...hotAlbums);
    if (hotAlbums.length == 0 && albumsList.value.length % 2 == 1) {
      albumsList.value.push({});
    }
  } catch (error) {
    console.log(error);
  }
}
get_artist_album();

// 滚动加载
function scrollLoad({ pageNum: number }: { pageNum: 1 }) {
  ++params.pageNum;
  get_artist_album();
}
</script>
<style scoped lang="scss">
.MYroot {
  height: 100%;
  overflow: scroll;

  &:hover p {
    display: block;
  }
}
</style>
