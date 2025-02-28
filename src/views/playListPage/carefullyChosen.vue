<template>
  <div>
    <div class="flex justify-between items-center my-5">
      <p class="text-xl text-left">{{ Props.name }}</p>
      <div class="gap-5">
        <IconDoubleLeft @click="pageChange(-1)" />
        <IconDoubleRight @click="pageChange(1)" />
      </div>
    </div>
    <div class="items-center justify-center flex group no-scroll pr-1">
      <div class="w-full">
        <TransitionGroup
          name="fade"
          tag="div"
          class="relative transition-all gap-10 grid grid-cols-2"
        >
          <div
            v-for="item in playlistItems"
            :key="item.id"
            class="ccc relative"
          >
            <div class="content">
              <Image
                @click="() => router.push(`/Music/playlist/${item.id}`)"
                class="rounded-md cursor-pointer h-full w-full"
                :alt="item.name"
                :src="`${item.coverImgUrl}?param=300y300`"
              />
              <p class="my-1 w-full truncate">{{ item.name }}</p>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { highQualityPlaylist, T } from "../../api/playlist";
import { useRouter } from "vue-router";
import { reactive, computed } from "vue";
import { watch } from "vue";
import { Notification } from "@arco-design/web-vue";

interface Props {
  type: string;
  name?: string;
  PropList?: Array<T.MusicPlayList>;
}
const Props = defineProps<Props>();

const router = useRouter();

// 网友精选
const page = ref(1);
const numberSize = 2;
const playlistItems = computed(() => {
  const endIndex = page.value * numberSize;

  return hig.playlist.slice(endIndex, endIndex + numberSize * 2);
});

const hig = reactive<{ playlist: T.MusicPlayList[]; total: number }>({
  playlist: [],
  total: 0,
});

async function getPlayGather({ name }: { name: string | undefined }) {
  const { playlists, total = 0 } = Props.PropList
    ? { playlists: Props.PropList, total: Props.PropList.length }
    : await highQualityPlaylist({ cat: name });

  hig.playlist = playlists;
  hig.total = total;
  page.value = 1;
}

// Initialize the component with the initial request
getPlayGather({ name: Props.name });

// Method to handle page changes
const pageChange = (num: number) => {
  if (
    page.value + num > 0 &&
    page.value + num <= Math.floor(hig.total / (numberSize * 2))
  ) {
    page.value += num;
  } else {
    Notification.info("真的一滴都没有了...");
  }
};
</script>
<style scoped lang="scss">
.ccc {
  height: 0px;
  padding-bottom: 100%;

  .content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}

/* 1. 声明过渡效果 */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 1s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 1.1 离开前 */
.fade-leave-enter {
  opacity: 0;
}

/* 2. 声明进入和离开的状态 */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
  z-index: -1;
}

/* 3. 确保离开的项目被移除出了布局流
    以便正确地计算移动时的动画效果。 */
.fade-leave-active {
  position: absolute;
}
</style>
