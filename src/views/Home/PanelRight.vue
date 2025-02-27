<!--  -->
<template>
  <div class="home-right h-full flex items-center flex-col">
    <template v-if="Store.getters.loginStatus">
      <h1 class="text-xl">{{ $t("home.dayList") }}</h1>
      <ul class="right-ul w-11/12 overflow-y-scroll no-scroll">
        <template v-for="item in recommendSong">
          <li
            class="ul-li text-left flex items-center mb-5"
            :alt="item.reason"
            @click="palySong(item)"
          >
            <img class="li-img" :src="`${item.al.picUrl}?param=100y100`" />
            <section class="w-full overflow-hidden">
              <span class="songName truncate">{{ item.name }}</span>
              <span
                @click.stop="CheckSinger(item.ar[0].id)"
                class="songAr truncate text-slate-500"
                >{{ item.ar[0].name }}</span
              >
            </section>
            <MyPlay :id="item.id" class="iconplay" />
            <MyLike :id="item.id" class="iconplay" />
          </li>
        </template>
      </ul>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const router = useRouter();
const Store = useStore();
// 每日推薦
const recommendSong = computed(() => {
  let v = Store.state.song.recommendSong;
  return v.length > 10 ? Store.state.song.recommendSong.splice(0, 10) : v;
});

const palySong = async (item: any) => {
  Store.dispatch("ToggleSong", {
    id: item.id,
    playListId: "推荐",
    list: recommendSong.value,
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
