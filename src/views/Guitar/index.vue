<!--  -->
<template>
  <div class="geter-box flex flex-row" :class="{ 'justify-center items-center': isActive }">
    <div :class="`${isActive ? 'w-3/5 ' : 'w-2/5'} `"
      class="right flex pt-2 flex-col transition-all h-screen overflow-hidden">
      <a-space class="rg-apace w-full">
        <a-select @change="activeF" :style="{ width: '320px' }" :loading="loading" placeholder="搜索谱子" allow-search
          allow-clear @search="handleSearch" :filter-option="false" v-model="state.activeItem">
          <a-option v-for="item of SearchList" :value="item" :key="item.song">{{
            item.song
          }}</a-option>
        </a-select>
        <a-button @click="cleraList">重置</a-button>
      </a-space>
      <div :class="`${isActive ? 'h-full' : 'hidden '} my-1`">
        <a-carousel autoPlay indicator-type="line" class="w-full h-full">
          <a-carousel-item v-for="(image, index) in images" :key="index">
            <!-- @click="viewImg(image)" -->
            <img :src="image()" :style="{
              width: '100%',
            }" />
          </a-carousel-item>
        </a-carousel>
        <div class="singer-list" :alt="item.reason" :key="index" v-for="(item, index) in singers"
          @click="handleSearch(item.reason)">
          <img class="tx cursor-pointer" :src="item.img1v1Url" />
          <p class="singer-name">{{ item?.name }}</p>
        </div>
      </div>
      <ul class="h-full overflow-y-scroll">
        <li :class="{ 'text-blue-500': state.active === index }"
          class="flex cursor-pointer hover:text-blue-500 h-12 text-sm justify-between" :key="index"
          v-for="(item, index) in Hot" @click="activeF(index, item)">
          <!-- <span>{{ item.artist }}</span> -->
          <span class="text-ellipsis whitespace-nowrap overflow-hidden">{{
            item?.song
          }}</span>
          <span class="whitespace-nowrap">{{ item?.upload_date }}</span>
          <!-- <span>热度:{{ item.downloads }}</span> -->
        </li>
      </ul>
    </div>
    <div id="image-demo-preview-popup-container" :class="`${isActive ? ' w-0 hidden' : 'w-3/5'} `"
      class="left-view h-full ml-6">
      <a-page-header title="Home" :subtitle="state?.activeItem?.song" @back="cleraList"></a-page-header>
      <div class="  overflow-scroll h-full">
        <a-image-preview-group v-if="empty" :preview-props="{
          popupContainer: '#app',
        }">
          <Image lazy class="view-img" :src="src" :key="src" v-for="{ src } in listImg" />
        </a-image-preview-group>
        <a-empty v-else />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getNewTabs, getUrlById, search } from "../../api/Guitar";
import { ref, reactive, onMounted, toRefs, computed } from "vue";
// import { IconImageClose } from "@arco-design/web-vue/es/icon";
// import { delay } from "../../utils/delay";

const state = reactive<{ activeItem: { song?: string } }>({
  active: -1,
  singers: [
    {
      name: "",
      reason: "",
      img1v1Url: "",
    },
  ],
  activeItem: '',
  searchvaule: "",
  searchfalse: false,
  images: [
    () => 'https://cdn.seovx.com/?mom=302',
    () => 'https://cdn.seovx.com/?mom=302',
    () => 'https://cdn.seovx.com/?mom=302',
  ],
});
const { singers, images, searchvaule: searchable } = toRefs(state);
// 搜索
const loading = ref(false);
const SearchList = ref<{ song: string; upload_date: string }[]>([]);
const handleSearch = async (v: string) => {
  //type 1 | 3
  SearchList.value = (await search(v || searchable.value)).filter(
    (item: { type: string }) => item.type === "3"
  );
  Hot.value = [...SearchList.value];
};
function cleraList() {
  state.active = -1;
  SearchList.value = [];
  Hot.value = [...backHot];
}
// 预览视图
const src = ref("");
const listImg = ref([{ src: "" }]);
const empty = ref(true);
const loadingImg = ref(false);
const viewImg = async (res: string) => {
  if (isUrl(res)) {
    src.value = res;
  } else {
    try {
      listImg.value = [];
      let url = await getUrlById(res);
      // await delay(2000)
      // 第一个 / 以前的内容
      const host = url.split("/")[0];
      url.split("|").forEach((item: string) => {
        listImg.value.push({
          src: `https://${item.includes(host) ? item : `${host}/${item}`}`,
        });
      });
    } catch (error) {
      empty.value = false;
    }
  }
};
// 获取home banner
// const getHome = async () => {
//   const { data } = await getHomelist();
//   state.images = data.banner;
//   state.singers = data.singers;
// };
// 获取新tabs
const Hot = ref<any[]>([]);
const backHot: Object[] = [];
const NewTabs = async () => {
  Hot.value = (await getNewTabs()).filter((item) => item.type === "3");
  backHot.push(...Hot.value);
};
// 判断字符串 是否是链接
const isUrl = (str: string) => {
  const reg = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/;
  return reg.test(str);
};
// 选中当前
function activeF(index: number, item: Object): void;
function activeF(e: Object): void;
function activeF(e: Object | number, item?: { song: string }) {
  if (typeof e === "number") {
    state.active = e;
    state.activeItem = item;
  } else {
    state.activeItem = e;
    state.active = SearchList.value.findIndex((v) => v.song === e.song);
  }
  viewImg(state.activeItem.id);
}
// 是否选中
const isActive = computed(() => {
  return state.active === -1;
});
onMounted(async () => {
  // getHome()
  NewTabs();
});
</script>
<style>
#app .arco-image-preview-toolbar {
  bottom: 0;
  background: #e3e9fc;
}
</style>
<style scoped lang="scss">
.geter-box {
  margin: 0 10px;
}

.singer-list {
  .tx {
    width: 80%;
    border-radius: 50px;
  }
}

.right {
  .rg-space {
    margin-bottom: 10px;
  }
}

.left-view {
  .view-img {
    width: 100%;
    // height: 100%;
    border-radius: 10px;
  }
}
</style>
