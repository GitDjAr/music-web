<!--  -->
<template>
  <a-select :loading="loading" :style="{ width: '320px' }" @keyup.enter="searchFun('')" :placeholder="Hot"
    @change="searchFun(undefined)" v-model="selectSong" @search="searchSuggest" @blur="searchReset" :filter-option="false"
    :default-active-first-option="false" value-key="id" allow-clear allow-search>
    <template #empty>
      <div v-if="firstHot?.length" class="flex flex-wrap p-2">
        <p class="rounded-full bg-sky-100  cursor-pointer m-1 mycolor" @click="searchFun(first)"
          v-for="{ first } in firstHot">
          {{ first }}
        </p>
      </div>
      <a-empty v-else />
    </template>
    <a-optgroup :label="group" :key="index" v-for="(group, index) in searchList.order">
      <a-option v-for="item of searchList[group]" :value="item" :key="item.id" class="flex justify-between">
        {{ item.name }}
        <span>{{ item?.artists?.[0].name || item?.artist?.name }}</span>
      </a-option>
    </a-optgroup>
  </a-select>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { _search_suggest, _search_hot } from "@/api/Home";
import { useRouter } from "vue-router";

const router = useRouter();
type song = { TYPE: string; id: number; name: string };
// 搜索
const selectSong = ref("");
const searchKey = ref("");
const searchList = ref([]);
const firstHot = ref([]);
const Hot = ref("");
const loading = ref(false);
const searchSuggest = async (key: string) => {
  if (key) searchKey.value = key;
  const { result } = await _search_suggest({
    keywords: selectSong.value || Hot.value,
  });
  result.order.forEach((el: string) => {
    result[el].map((f: song) => {
      f["TYPE"] = el;
      return f;
    });
  });
  searchList.value = result;
};

// 搜索跳转
type Key = string | song;
interface searchF {
  (key?: Key): void;
}
const searchFun: searchF = (Rows) => {
  const str = Rows || searchKey.value || Hot.value;
  if (typeof Rows === "string") {
    router.push({
      path: "/Music/search",
      query: { searchKey: <string>str },
    });
  } else if (Rows.TYPE === "artists" || Rows.TYPE === "albums") {
    router.push({ path: `/Music/${Rows.TYPE}/${Rows.id}` });
  } else if (Rows.TYPE === "playlists") {
    router.push({ path: `/Music/${Rows.TYPE}/${Rows.id}` });
  } else {
    router.push({
      path: "/Music/search",
      query: { searchKey: (Rows?.name || str) as string },
    });
  }
};

// 热搜 歌曲
const getHot = async () => {
  const { result } = await _search_hot();
  firstHot.value = result.hots;
  autoScrollHot();
};
getHot();
const autoScrollHot = () => {
  let idx = 0;
  setInterval(() => {
    Hot.value = firstHot.value[idx]?.first;
    idx++;
    if (idx > firstHot.value.length) {
      idx = 0;
    }
  }, 3000);
};
// 重置
function searchReset() {
  searchList.value = [];
  selectSong.value = "";
}
</script>
<style scoped lang="scss">
.mycolor.mycolor {
  color: #3171ff;
  padding: 0.25rem 6px !important;
}
</style>
