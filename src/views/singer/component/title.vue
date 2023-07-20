<!--  -->
<template>
  <ModalVue :title="singerInfo?.artist?.name" v-model:visible="visible" to="body">
    <template #default>
      <p class="text-sm">{{ singerInfo?.artist?.briefDesc }}</p>
      <ul class="my-4">
        <li class="mr-2 inline-block cursor-pointer" :key="index"
          v-for="(item, index) in singerInfo?.identify?.imageDesc?.split('、')">
          <ATag :color="tagColor()"> {{ item }} </ATag>
        </li>
      </ul>
    </template>
  </ModalVue>
  <ModalVue title="提示" v-model:visible="visibleInfo">
    <p>{{ visibleStr.blockText }} , 手机app打开连接</p>
    <div class="flex">
      <AInput v-model="visibleStr.url" allow-clear />
      <AButton @click="copyText(visibleStr.url || '')">拷贝地址</AButton>
    </div>
  </ModalVue>
  <div class="h-[200px] flex relative box-border overflow-hidden" v-bind="$attrs">
    <Image class="object-cover h-full rounded-xl t-2" :src="singerInfo?.user?.avatarUrl || singerInfo?.artist?.avatar"
      :wh="[320, 320]" />
    <div class="pl-4 relative overflow-hidden myimg text-lg flex flex-1 flex-col justify-around text-black">
      <h1 class="select-none relative text-left">
        {{ singerInfo?.artist?.name }}
        <level :v="singerInfo?.vipRights?.redVipLevel" class="translate-y-1 -translate-x-2" />
      </h1>
      <div class="flex justify-end cursor-pointer items-center">
        <div @click="followSinger" class="py-1 px-12 m-2 rounded-full" :style="{ background: 'rgba(205, 216, 252,0.8)' }">
          <icon-heart-fill v-if="follow.isFollow" style="color: red" />
          <icon-heart v-else />
          {{ follow.fansCnt }}
          <!-- {{ follow.isFollow ? $t("artist.following") : $t("artist.follow") }} -->
        </div>
        <!-- <IconMore
          class="iconmore"
          :style="{ fontSize: '22px' }"
          @click="moreFun"
        /> -->
      </div>
      <p @click="openMadol" class="line-clamp-2 text-sm mt-4 cursor-pointer">
        {{ singerInfo?.artist?.briefDesc }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ImgProportion } from "@/utils/gFn";
import {
  _artist_follow_count,
  _follow,
  _artist_detail,
  userT,
} from "@/api/user";
import { ref, Ref, watch } from "vue";
import { copyText } from "../../../utils/gFn";
import { Notification } from "@arco-design/web-vue";
import { useStore } from "vuex";

const P = defineProps<{
  props: {
    id: string;
    singerInfo?: object;
  };
}>();

const store = useStore();
console.log(P);

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
const singerInfo = ref<userT.RootUser>();
async function get_artist_detail() {
  const { data } = await _artist_detail({ id });
  singerInfo.value = data;
  console.log(singerInfo);
  Img.value = await ImgProportion(data?.user?.backgroundUrl);
}

// 关注
let visibleInfo = ref(false);
let visibleStr = ref<{ blockText?: string; url?: string }>({});
let follow: Ref<{
  isFollow?: boolean;
  fansCnt?: number;
  followCnt?: number;
  followDay?: string;
  follow?: boolean;
}> = ref({ isFollow: false });

async function followSinger() {
  _follow({
    id: singerInfo.value!.user.userId,
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
function moreFun() { }

// 弹框 visible
const visible = ref(false);
function openMadol() {
  visible.value = !visible.value;
}

// 随机颜色
let tagColor = () => store.getters.tagColor;
</script>
<style scoped lang="scss">
.myimg {}

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
