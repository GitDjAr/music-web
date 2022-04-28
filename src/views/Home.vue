<!--  -->
<template>
<div>
  <div class="home-box flex">
    <div class="home-left">
      <h2 class="t-lf pad-l-10">{{ $t('home.recommendMv') }}</h2>
      <a-carousel class="carousel" :auto-play="true" animation-name="fade" show-arrow="never" indicator-type="slider">
        <a-carousel-item v-for="(item, index) in personalized" :key="index">
          <img :src="item.picUrl" :alt="item.copywriter" @click="GoPlay(item)" :style="{
            width: '100%',
            height: '100%',
            'object-fit': 'cover'
          }" />
        </a-carousel-item>
      </a-carousel>
      <h2 class="t-lf pad-l-10">{{ $t('home.recommendPlaylist') }}</h2>
      <div class="Nouvea">
        <div class="NouList" :key="index" v-for="(item, index) in recommendPlaylist">
          <img class="list-img curp" :src="item.picUrl" :alt="item.copywriter" @click="albumOver(item)" />
          <p>{{ item.name }}</p>
          <!-- <a-tag :color="resourceColor(item.id)" size="mini">{{item.creator.expertTags}}</a-tag> -->
        </div>
      </div>
    </div>
    <div class="home-right flex fx-center-a fx-c">
      <h2>{{ $t('home.dayList') }}</h2>
      <ul class="right-ul w-4/5 w-11/12 ">
        <li class="ul-li t-lf flex fx-center-a" 
        :alt="item.reason" :key="index" 
        v-for="(item, index) in dayinPush"
          @click="palySong(item)">
          <img class="li-img" :src="item.al.picUrl" />
          <section>
            <span class="songName">{{ item.name }}</span>
            <span class="songAr">{{ item.ar[0].name }}</span>
          </section>
          <icon-play-arrow />
        </li>
      </ul>
      <div class="mt-2 mx-4">
        <h2>{{ $t('home.recommendArtist') }}</h2>
        <div class="singer items-center justify-center">
          <div class="singer-list mx-1.5" :alt="item.reason" :key="index" v-for="(item, index) in artistsList"
            @click="Checksinger(item)">
            <img class="rounded-full w-full" :src="item.img1v1Url" />
            <p class="singer-name my-1">{{ item.name }}</p>
          </div>
        </div>
      </div>
      <div class="newAlbum">
        <h2>{{ $t('home.newAlbum') }}</h2>
        <div class="newAlbum-list" v-for="item in 10"></div>
      </div>
    </div>
  </div>
  <TopChartsVue />
  </div>
</template>

<script lang='ts'>
import TopChartsVue from './TopCharts.vue';
import { defineComponent, reactive, toRefs, onMounted, } from 'vue';
import { useRouter } from 'vue-router'
import * as Home from '@/api/Home'
import store from '../store';
import type { IdOps } from '../utils/type/id';
export default defineComponent({
  components: {TopChartsVue},
  methods: {},

  setup(props) {
    const router = useRouter()
    const state = reactive({
      personalized: [
        { picUrl: '' },
        { copywriter: '' },
      ],
      dayinPush: [
        {
          name: '',
          ar: [
            {
              name: '',
            },
          ],
          reason: '',
          al: {
            picUrl: ''
          }
        }
      ],
      recommendPlaylist: [
        {
          name: '',
          id: '',
          picUrl: '',
          copywriter: ''
        }
      ],
      artistsList: [
        {
          reason: '',
          name: '',
          img1v1Url: '',
        },
      ]
    });
    // 每日推薦
    async function getDayinPush() {
      const { data: { dailySongs } } = await Home.songs({})
      state.dayinPush = dailySongs.splice(0, 6)
    }
    const palySong = (song: Object) => {
      store.dispatch('ToggleSong', song)
    }
    // 推薦mv
    async function getPersonalized() {
      const { result } = await Home.personalizedMV()
      state.personalized = result.splice(0, 6)
    }
    // 播放
    const GoPlay = (path: object) => {
      console.log(path);
      // router.push({path:path.to})
    };
    // 推荐歌单
    async function recommendPlaylist() {
      const { recommend } = await Home.resource({})
      state.recommendPlaylist = recommend
    }
    // 查看明细
    const CheckDetails = (Details: any) => {
      // router.push()
    }
    const albumOver = ({ id }: IdOps) => {
      router.push({
        path: `/playlist/${id}`
      })
    }
    const resourceColor = (v: string | number) => {
      return `#cdd${v.toString().slice(0, 3)}`
    }
    // 热门歌手
    async function getArtists() {
      const { artists } = await Home.artists({})
      state.artistsList = artists.splice(0, 8)
    }
    const Checksinger = (singer: any) => {
      // router.push()
    }
    onMounted(() => {
      getArtists()
      recommendPlaylist()
      getDayinPush()
      getPersonalized()
    })

    return {
      ...toRefs(state),
      GoPlay,
      palySong, CheckDetails, Checksinger, resourceColor, albumOver

    };
  },
});
</script>
<style scoped lang='scss'>
.home-box {
  height: 100%;
  align-items: flex-start;

  h2 {
    font-size: 1rem;
    margin: 10px 0;

  }

  .home-left {
    flex-grow: 1;
    width: 200px;
    margin-right: 10px;

    .carousel {
      height: 260px;
      border-radius: 30px;
      overflow: hidden;
    }

    .Nouvea {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      align-items: start;
      justify-items: center;

      .NouList {
        flex: 1;
        width: 85%;
        p{
          padding: 5px 0;
          text-align:left;
        }
      }

      .list-img {
        border-radius: 10px;
      }
    }
  }

  .home-right {
    width: 35%;

    .right-ul {
      max-width: 600px;
      padding: 8px 0;
      background: rgb(242 243 245);
      border-radius: 10px;

      .ul-li {
        padding: 5px;
        margin: 2px 10px;
        cursor: pointer;

        section {
          flex-grow: 1;
        }

        svg {
          color: $T1;
        }

        .li-img {
          width: 45px;
          height: 45px;
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

    .newAlbum {}
  }
}
</style>