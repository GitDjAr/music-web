<!--  -->
<template>
  <div class="home-right flex items-center flex-col">
    <template v-if="Store.getters.loginStatus">
      <h2>{{ $t("home.dayList") }}</h2>
      <ul class="right-ul w-11/12">
        <template v-for="(item, index) in state.darinPush">
          <li
            class="ul-li text-left flex items-center"
            :alt="item.reason"
            :key="index"
            v-if="index < 6"
            @click="palySong(item)"
          >
            <img class="li-img" :src="`${item.al.picUrl}?param=100y100`" />
            <section class="w-full overflow-hidden">
              <span class="songName truncate">{{ item.name }}</span>
              <span
                @click.stop="CheckSinger(item.ar[0].id)"
                class="songAr truncate"
                >{{ item.ar[0].name }}</span
              >
            </section>
            <MyPlay :id="item.id" class="iconplay" />
            <MyLike :id="item.id" class="iconplay" />
          </li>
        </template>
        <!-- <li class="cursor-pointer" @click.stop="() => { router.push({ path: '/Music/playlist', params: { id: state.playlistId } }) }"> 查看更多 > </li> -->
      </ul>
    </template>
    <div class="mt-2 mx-4">
      <h2>{{ $t("home.recommendArtist") }}</h2>
      <div class="singer items-center justify-center">
        <div
          class="singer-list mx-1.5 truncate"
          :alt="item.reason"
          :key="index"
          v-for="(item, index) in state.artistsList"
          @click="CheckSinger(item.id)"
        >
          <img
            class="rounded-full cursor-pointer"
            :src="`${item.img1v1Url}?param=100y100`"
          />
          <p class="singer-name my-1 w-full">{{ item.name }}</p>
        </div>
      </div>
    </div>
    <!-- <div class="newAlbum">
      <h2>{{ $t("home.newAlbum") }}</h2>
      <div class="newAlbum-list" v-for="item in 10"></div>
      </div> -->
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from "vue";
import { artists as Getartists, songs } from "@/api/Home";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const router = useRouter();
const Store = useStore();
const state = reactive({
  artistsList: [
    {
      reason: "",
      name: "",
      img1v1Url: "",
    },
  ],
  darinPush: [
    {
      name: "",
      id: "",
      ar: [
        {
          name: "",
        },
      ],
      reason: "",
      al: {
        picUrl: "",
      },
    },
  ],
});

// 热门歌手
async function getArtists() {
  const { artists } = await Getartists({});
  state.artistsList = artists.splice(0, 8);
}
// 每日推薦
async function getDayinPush() {
  const {
    data: { dailySongs },
  } = await songs({});
  state.darinPush = dailySongs;
}
const palySong = async (item: any) => {
  Store.dispatch("ToggleSong", {
    id: item.id,
    playListId: "推荐",
    list: state.darinPush,
  });
};
// 去歌手主页
function CheckSinger(id: number) {
  router.push(`/Music/singer/${id}`);
}

onMounted(() => {
  getArtists();
  getDayinPush();
});
</script>
<style scoped lang="scss">
.home-right {
  h2 {
    font-size: 1rem;
    margin: 10px 0;
  }

  width: 35%;

  .right-ul {
    max-width: 600px;
    padding: 8px 0;
    background: rgb(242 243 245);
    border-radius: 10px;

    .ul-li {
      padding: 10px 5px;
      margin: 2px 10px;
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

  .singer {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  .iconplay {
    min-width: 40px;
  }
}
</style>
