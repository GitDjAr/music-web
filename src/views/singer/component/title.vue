<!--  -->
<template>
  <div class="flex flex-col relative box-border overflow-hidden">
    <img class="object-cover absolute w-full -top-1/4 -z-10" :src="Img" />
    <ModalVue
      :title="singerInfo?.artist?.name"
      v-model:visible="visible"
      to="body"
    >
      <template #default>
        <p class="text-sm">{{ singerInfo?.artist?.briefDesc }}</p>
        <ul class="my-4">
          {{
            singerInfo?.imageDesc
          }}
          <li
            class="mr-2 inline-block cursor-pointer"
            :key="index"
            v-for="(item, index) in singerInfo?.imageDesc?.split('、')"
          >
            <a-tag :color="tagColor()"> {{ item }} </a-tag>
          </li>
        </ul>
      </template>
    </ModalVue>
    <ModalVue title="提示" v-model:visible="visibleInfo">
      <p>{{ visibleStr.blockText }} , 手机app打开连接</p>
      <div class="flex">
        <a-input v-model="visibleStr.url" allow-clear />
        <a-button @click="copyText(visibleStr.url)">拷贝地址</a-button>
      </div>
    </ModalVue>
    <div
      class="myimg text-lg text-left flex justify-around text-white mix-blend-normal py-10"
    >
      <div
        class="mytitleBox relative w-full flex-1 overflow-hidden ml-24 p-2 my-8"
      >
        <h1 class="select-none relative">
          {{ singerInfo?.artist?.name }}
          <icon-check v-if="true" class="iconcheck" />
        </h1>

        <div class="flex cursor-pointer items-center">
          <div
            @click="followSinger"
            class="py-1 px-12 m-2 rounded-full"
            :style="{ background: 'rgba(205, 216, 252,0.8)' }"
          >
            <MyLike v-if="follow.isFollow" style="color: red" />
            <MyLike v-else />
            {{ follow.isFollow ? $t("artist.following") : $t("artist.follow") }}
          </div>
          <icon-more
            class="iconmore"
            :style="{ fontSize: '22px' }"
            @click="moreFun"
          />
        </div>
        <p
          @click="openMadol"
          class="truncate w-2/3 text-sm mt-4 cursor-pointer"
        >
          {{ singerInfo?.artist?.briefDesc }}
        </p>
      </div>
      <div class="select-none mr-5 self-end mix-blend-hard-light">
        {{ $t("artist.Attention") }}
        <p>{{ follow.fansCnt }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ImgProportion } from "@/utils/gFn";
import { _artist_follow_count, _follow, _artist_detail } from "@/api/user";
import { ref, Ref, watch, nextTick } from "vue";
import { copyText } from "../../../utils/gFn";
import { Notification } from "@arco-design/web-vue";
import { useStore } from "vuex";
import { reactive } from "vue";

const P = defineProps<{
  props: {
    id: string;
    singerInfo: object;
    // router: Router,
    // route: RouteLocationNormalizedLoaded,
    // store: StoreOptions<typeof store>
  };
}>();

const store = useStore();
let id = P.props.id;

const resetImgFlag = ref(true);
watch(
  () => P.props.id,
  () => {
    id = P.props.id;
    init();
    resetImgFlag.value = !resetImgFlag.value;
  }
);
function init() {
  get_artist_follow_count();
  get_artist_detail();
}
init();
// 歌手信息
const Img = ref("");
const singerInfo = ref({});
async function get_artist_detail() {
  const { data } = await _artist_detail({ id });
  Img.value = await ImgProportion(data?.user?.backgroundUrl);
  singerInfo.value = data;
}

// 关注
let visibleInfo = ref(false);
let visibleStr = ref({});
let follow: Ref<{
  isFollow?: boolean;
  fansCnt?: number;
  followCnt?: number;
  followDay?: string;
  follow?: boolean;
}> = ref({ isFollow: false });

async function followSinger() {
  _follow({
    id: singerInfo.value.user.userId,
    t: follow.value.isFollow ? 99 : 1,
  })
    .then(({ followContent = "" }) => {
      follow.value.isFollow = !follow.value.isFollow;
      Notification.info(followContent || "取消关注");
    })
    .catch((e: any) => {
      visibleStr.value = e.err.response.data.data;
      visibleInfo.value = true;
    });
}
//歌手粉丝数量
async function get_artist_follow_count() {
  const { data } = await _artist_follow_count({ id });
  follow.value = data;
}

// 更多
function moreFun() {}

// 弹框 visible
const visible = ref(false);
function openMadol() {
  visible.value = !visible.value;
}

// 随机颜色
let tagColor = () => store.getters.tagColor;
</script>
<style scoped lang="scss">
.myimg {
  &::before {
    content: "";
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #000;
    opacity: 0.3;
  }
}

.iconcheck {
  position: absolute;
  top: -15px;
  color: red;
  background: #fff;
  border-radius: 50px;
  padding: 2px;
}

.iconmore {
  border: 1px solid;
  padding: 2px;
  border-radius: 50px;
}
</style>
