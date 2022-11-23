<!--  -->
<template>
  <div class="flex flex-col w-full overflow-scroll relative">
    <div class="absolute  w-full overflow-hidden h-full -z-10">
      <!-- <img class="w-full object-cover" :src="rendomImgurl" /> -->
      <img class="object-cover  -top-1/4 " :src="singerInfo?.user?.backgroundUrl" />
    </div>
    <MadelVue :title="singerInfo?.artist?.name" v-model:visible="visible">
      <template #default>
        <p class=" text-sm">{{ singerInfo?.artist?.briefDesc }}</p>
        <ul class="my-4">
          <li class="mr-2 inline-block cursor-pointer" :key="index"
            v-for="(item, index) in singerInfo.secondaryExpertIdentiy">
            <a-tag :color="colorFun()"> {{ item.expertIdentiyName }} </a-tag>
          </li>
        </ul>
      </template>
    </MadelVue>
    <div class="text-lg text-left flex justify-around text-white mix-blend-normal py-10 ">
      <div class="mytitleBox relative w-full flex-1 overflow-hidden ml-24 p-2 my-8  ">
        <h1 class="select-none relative">
          {{ singerInfo?.artist?.name }}
          <icon-check v-if="true" class="iconcheck" />
        </h1>

        <div class="flex cursor-pointer items-center ">
          <div @click="followSinger" class=" py-1 px-12 m-2 rounded-full" :style="{ background: 'rgb(205, 216, 252)' }">
            <icon-heart v-if="follow.isFollow" />
            <icon-heart-fill v-else />
            {{ follow.isFollow ? $t('artist.follow') : $t('artist.following') }}
          </div>
          <icon-more class="iconmore" :style="{ fontSize: '22px' }" @click="moreFun" />
        </div>
        <p @click="openMadol" class="truncate w-2/3 text-sm mt-4 cursor-pointer">{{ singerInfo?.artist?.briefDesc }}</p>
      </div>
      <div class="select-none mr-5  self-end mix-blend-hard-light">
        {{ $t('artist.Attention') }} <p>{{ follow.fansCnt }}</p>
      </div>
    </div>


  </div>
</template>

<script lang='ts' setup>
import { ImgProportion } from '@/utils/gFn'
import MadelVue from '@/components/Madel.vue';
import { _artist_follow_count, _follow, _artist_detail } from '@/api/user';
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const Router = useRoute();
const id = Router.params.id;

onMounted(() => {
  get_artist_follow_count();
  get_artist_detail();
});
const containerRef = ref();
// 歌手信息
const singerInfo = ref({});
async function get_artist_detail() {
  const { data } = await _artist_detail({ id });
  data.user.backgroundUrl = await ImgProportion(data.user?.backgroundUrl)
  singerInfo.value = data;
}
// 关注
const follow = ref(false);
async function followSinger() {
  await _follow({ id: singerInfo.value.user.userId, t: follow.value ? 1 : 99 })
  follow.value = !follow.value
}

async function get_artist_follow_count() {
  const { data } = await _artist_follow_count({ id });
  follow.value = data;
}
function moreFun() { }
// 弹框 visible
const visible = ref(false)
function openMadol() {
  visible.value = !visible.value
}
// 随机颜色
const color = computed(() => store?.state?.app?.tagColor)
const colorFun = () => {
  let i = Math.floor(Math.random() * 14);
  return color.value[i];
};

</script>
<style scoped lang='scss'>
// .mytitleBox {
//   width: 300px;

//   &::after {
//     content: "";
//     position: absolute;
//     z-index: 1;
//     display: block;
//     width: 100%;
//     height: 100%;
//     top: 0;
//     left: 0;
//     background: #fff url('https://img.2eka.cloud/api/random?type=pc') no-repeat fixed;
//     position: absolute;
//     filter: blur(5px);
//     -webkit-filter: blur(5px);
//     display: block;
//     width: 100%;
//     height: 100%;
//     z-index: -1;
//     top: 0;
//     left: 0;
//   }
// }

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