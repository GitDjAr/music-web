<!--  -->
<template>
  <div class="home-right h-full flex items-center flex-col">
    <h1 class="text-xl">{{ title }}</h1>
    <ul class="right-ul w-11/12 overflow-y-scroll no-scroll">
      <template v-for="item in list">
        <li
          class="ul-li text-left flex items-center mb-5"
          :alt="item.reason"
          @click="palySong(item)"
        >
          <img
            class="li-img"
            :src="`${item?.album?.picUrl || item?.al?.picUrl}?param=100y100`"
          />
          <section class="w-full overflow-hidden">
            <span class="songName truncate">{{ item.name }}</span>
            <spanl
              @click.stop="CheckSinger(item.id || item?.ar?.[0]?.id)"
              class="songAr truncate text-slate-500"
              >{{ item.name || item?.ar?.[0]?.name }}</spanl
            >
          </section>
          <MyPlay :id="item.id" class="iconplay" />
          <MyLike :id="item.id" class="iconplay" />
        </li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { topSong } from "@/api/track";
const { t } = useI18n();
const router = useRouter();
const Store = useStore();
const isLoging = computed(() => Store.getters.loginStatus);
const list = computed(() => {
  // 每日推薦
  const v = isLoging.value ? Store.state.song.recommendSong : topSongList.value;
  return v.length > 10 ? v.splice(0, 10) : v;
});
const title = computed(() => {
  return isLoging.value ? t("home.dayList") : t("home.newSongExpress");
});
//新歌速递
const topSongList = ref<any[]>([]);
const getInit = async () => {
  topSong(96).then((res) => {
    topSongList.value = res.data;
  });
};
getInit();

const palySong = async (item: any) => {
  Store.dispatch("ToggleSong", {
    id: item.id,
    playListId: title.value,
    list: list.value,
  });
};

// 去歌手主页
function CheckSinger(id: number) {
  router.push(`/Music/singer/${id}`);
}
</script>
<style scoped lang="scss">
.home-right {
  .right-ul {
    max-width: 600px;
    // background: var(--color-fill-2);
    border-radius: 10px;

    .ul-li {
      cursor: pointer;

      section {
        flex-grow: 1;
      }

      .li-img {
        width: 50px;
        height: 50px;
        border-radius: 5px;
        margin-right: 5px;
      }

      .songName {
        font-size: 1.05rem;
        margin-bottom: 5px;
        display: block;
      }
    }
  }

  .iconplay {
    min-width: 40px;
  }
}
</style>
