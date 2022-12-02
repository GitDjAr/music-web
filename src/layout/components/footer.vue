<!--  -->
<template>
  <div class="myfooter relative" @click.stop="toggle" v-if="CurPlaySong.song">
    <div class="myclass h-full w-full grid select-none padding10" :class="visible ? 'absolute padding10' : ''">
      <div class="grid myname items-center justify-center" @click.stop>
        <img style="width: 50px" class="rounded-lg object-cover cursor-pointer" :disabled="true"
          :src="CurPlaySong?.song?.al?.picUrl" />
        <div class="cursor-pointer">
          <h2>{{ CurPlaySong?.song?.name }}</h2>
          <p>{{ CurPlaySong?.copywriter }}</p>
        </div>
        <icon-heart-fill class="hover:text-pink-500 cursor-pointer" extraProps="{color:red}" v-if="CurPlaySong.heart" />
        <icon-heart class="hover:text-pink-500 cursor-pointer" v-else />
      </div>
      <div class="grid">
        <div @click.stop class="flex items-center justify-between">
          <span class="w-12">{{ Player._progress }}</span>
          <div @mousedown.self="GoTime($event)" class="
              myprogress
              flex-1
              mx-4
              border-white
              cursor-pointer
              _B2
              rounded-md
            ">
            <div :style="{ width: CurTimeTack }" class="
                pointer-events-none
                rounded-md
                bg-purple-300
                h-full
                relative
                transition-all
                ease-in-out
              ">
              <span class="h-3 w-3 -right-1.5 -top-2/4 rounded-2xl absolute _B3"></span>
            </div>
          </div>
          <span class="w-12">{{ formatTime(CurPlaySong.duration) }}</span>
        </div>
        <div class="flex justify-center items-center">
          <icon-select-all class="hover:text-violet-300" />
          <icon-backward />
          <button @keydown.enter="Player.pause()">
            <component @click.stop="Player.pause()" :is="`icon-${Player.playStatus ? 'pause' : 'play'}-circle-fill`"
              class="text-2xl" />
          </button>
          <icon-forward />
          <icon-sync />
        </div>

      </div>
      <div>
        <icon-list />
        <icon-mute v-if="true" />
        <icon-sound v-else />
        <div class="flex-1 mx-4 h-1 cursor-pointer bg-purple-300 relative"></div>
      </div>
    </div>

    <a-drawer class="drawer" :visible="visible" :closable="false" :mask="false" height="100%" :footer="false"
      placement="top">
      <PlayPage @cancel="visible = false"> </PlayPage>
    </a-drawer>
  </div>
</template>

<script lang='ts' setup>
import PlayPage from '@/views/Home/PlayPage.vue';
import { formatTime } from '@/utils/format';
import { ref, reactive, watch, computed } from 'vue';
import { mapState, useStore } from 'vuex';

const Store = useStore();
const CurPlaySong = computed(() => Store.getters.CurPlaySong);
let CurTimeTack = ref<string>('0%');
// watch(CurPlaySong, (val) => {
//   setInterval(() => {
//     window.requestAnimationFrame(() => {
//       console.log('动画');
//       const a = CurPlaySong.value.duration;
//       const b = Player.progress();
//       const c = (b / a) * 100;
//       CurTimeTack.value = `${c}%`;
//     });
//   }, 1000);
// });

// visible
const visible = ref(false);
// 切换展示页
const toggle = () => {
  // if (!visible.value) {
  visible.value = !visible.value;
  // }
};
// setInterval(() => {
//   left.value = `${(Math.random() * 100).toFixed(2)}%`
// }, 3000)
// 拖动进度条
const Player = Store.state.app.Player;
window.Player = Player;

const GoTime = (e: MouseEvent) => {
  const { clientX, target } = e || window.event || event;
  const { left } = target?.getBoundingClientRect();
  const width = target?.offsetWidth;
  const move = clientX - left;
  // a.left = `${(move / width * 100).toFixed(2)}%`
  Player.progress(move / width);
  // 拖动
  document.onmousemove = (e: MouseEvent) => {
    const { clientX } = e;
    const move = clientX - left;
    if (move < 0) {
      // a.left = '0%'
    } else if (move > width) {
      // a.left = '100%'
    } else {
      // a.left = `${(move / width * 100).toFixed(2)}%`
    }
  };
  // 解绑
  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;
  };
};
</script>
<style scoped lang='scss'>

</style>
<style scoped lang='scss'>
// @include ;
.myfooter {
  height: 60px;
}

.padding10 {
  padding: 0 10%;
}

.myclass {
  grid-template-columns: 2fr 6fr 2fr;
  background: rgba(255, 255, 255, 0.6);
  grid-gap: 0px 10px;
  z-index: 10000;
  overflow: hidden;

  svg {
    cursor: pointer;
    font-size: 1.3rem;
    margin: 5px 10px;
  }

  .text-2xl {
    font-size: 2rem;
  }

  .myprogress {
    height: 6px;
  }

  .myname {
    grid-template-columns: 60px 3fr 1fr;

    .rounded-lg {
      border-radius: 6px;
    }
  }
}
</style>
