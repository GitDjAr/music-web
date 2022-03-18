<!--  -->
<template>
  <div class="home-box flex">
    <div class="home-left">
      <h2 class="t-lf pad-l-10">{{ $t('home.recommendMv') }}</h2>
      <a-carousel
        class="carousel"
        :auto-play="true"
        animation-name="fade"
        show-arrow="never"
        indicator-type="slider"
      >
        <a-carousel-item v-for="(item, index) in personalized" :key="index" >
          <img
            :src="item.picUrl"
            :alt="item.copywriter"
            @click="GoPlay(item)"
            :style="{
              width: '100%',
              height: '100%',
              'object-fit': 'cover'
            }"
          />
        </a-carousel-item>
      </a-carousel>
      <h2 class="t-lf pad-l-10">{{ $t('home.recommendPlaylist') }}</h2>
      <div class="Nouvea  ">
        <div class="NouList " :key="index" v-for="(item,index) in recommendPlaylist">
          <img class="list-img curp" :src="item.picUrl" :alt="item.copywriter" @click="albumOver(item)" />
          <p>{{ item.name}}</p>
          <!-- <a-tag :color="resourceColor(item.id)" size="mini">{{item.creator.expertTags}}</a-tag> -->
        </div>
      </div>
    </div>
    <div class="home-right flex fx-center-a fx-c">
      <h2>{{ $t('home.dayList') }}</h2>
      <ul class="right-ul ">
        <li
          class="ul-li t-lf flex fx-center-a"
          :alt="item.reason"
          :key="index"
          v-for="(item, index) in dayinPush"
          @click="palySong"
        >
        <img class="li-img" :src="item.al.picUrl" alt="" >
        <section>
          <span class="songName">{{item.name}}</span>
          <span class="songAr">{{item.ar[0].name}}</span>
        </section>
        <icon-play-arrow />
        </li> 
      </ul>
      <div class="singer">
        <h2>{{ $t('home.recommendArtist') }}</h2>
        <div
          class="singer-list "
          :alt="item.reason"
          :key="index"
          v-for="(item, index) in artistsList"
          @click="Checksinger(item)"
        >
        <img class="tx curp" :src="item.img1v1Url" alt="" >
        <p class="singer-name">{{item.name}}</p>
        </div> 
      </div>
      <div class="newAlbum">
        <h2>{{ $t('home.newAlbum') }}</h2>
        <div class="newAlbum-list" v-for="item in 10"></div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, onMounted, } from 'vue';
import { useRouter } from 'vue-router'
import * as Home from '@/api/Home'
import store from '../store';
export default defineComponent({
  components: {},
  methods: {},

  setup(props) {
    const router = useRouter()
    const state = reactive({
      personalized: [
        { picUrl: '' },
        { copywriter: '' },
      ],
      dayinPush: [],
      recommendPlaylist: [],
      artistsList: []
    });
    // 每日推薦
    onMounted(async () => {
      const {data:{data:{dailySongs}}} = await Home.songs({})
      state.dayinPush = dailySongs.splice(0,6)
    })
    const palySong = (song: Object) => {
      store.dispatch('ToggleSong', song)
    }
    // 推薦mv
    onMounted(async () => {
      const { data: { result }
      } = await Home.personalizedMV({})
      state.personalized = result
    })
    const GoPlay = (path: object) => {
      console.log(path);
      // router.push({path:path.to})
    };
    // 推荐歌单
    onMounted(async () => {
      const {data:{recommend}} = await Home.resource({})
      state.recommendPlaylist  = recommend
          })
    const CheckDetails = (Details) => {
      // router.push()
    }
    const resourceColor = (v:string | number)=>{
      return `#cdd${v.toString().slice(0,3)}`
    }
    // 热门歌手
    onMounted(async () => {
      const {data:{artists}}  = await Home.artists({})
      state.artistsList = artists.splice(0,8)
    })
    const Checksinger = (singer) => {
      // router.push()
    }

    return {
      ...toRefs(state),
      GoPlay,
      palySong, CheckDetails, Checksinger,resourceColor
      
    };
  },
});
</script>
<style scoped lang='scss'>
.home-box {
  height: 100%;
  align-items: flex-start;
  .home-left {
    flex-grow: 1;
    width: 200px;
    margin-right: 10px;
    .carousel {
      height: 260px;
      border-radius: 30px;
      overflow: hidden;
    }
    .Nouvea{
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      .NouList{
        flex: 1;
      }
      .list-img{
        width: 85%;
        border-radius: 10px;
      }
    }
  }
  .home-right {
    width: 35%;
    .right-ul{
    max-width: 300px;
    padding: 8px 0;
    background: rgb(242 243 245);
    border-radius: 10px;
      .ul-li{
        padding: 5px;
        margin: 2px 10px;
        cursor: pointer;
        section{
          flex-grow: 1;
        }
        svg{
          color: $T1;
        }
        .li-img{
          width: 45px;
          height: 45px;
          border-radius: 5px;
          margin-right: 5px;
        }
        .songName{
          font-size: 1.05rem;
          margin-bottom: 5px;
          display: block;
        }
      }
    }
    
      .singer{
        margin-top: 30px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        .singer-list{

          .tx{
          width: 80%;
          border-radius: 50px;
        }
          }
      }
      .newAlbum{
        
      }
  }
}
</style>