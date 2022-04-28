<!--  -->
<template>
  <div class='myclass grid  select-none'>
    <div class="grid name items-center justify-center">
      <a-image style="width: 50px;" class="rounded-lg"
        src="http://p2.music.126.net/R5fsMgpLHC9mJbLLA6EKLA==/109951164561120345.jpg"></a-image>
      <div>
        <h2>{{ state.songsList.songs[0].name }}</h2>
        <p>{{ state.copywriter }}</p>
      </div>
      <icon-heart-fill class=" hover:text-pink-500 cursor-pointer" extraProps="{color:red}" v-if="state.heart" />
      <icon-heart class="hover:text-pink-500 cursor-pointer" v-else />
    </div>
    <div class="grid">
      <div class="flex justify-center items-center">
        <icon-select-all class=" hover:text-violet-300" />
        <icon-backward />
        {{Player?.options?.playstatus}}
        <button @keydown.enter="Player.playFun" >
          <component @click="Player.playFun" :is="`icon-${Player.playstatus?'play':'pause'}-circle-fill`" class="  text-2xl"/>
        </button>
        <icon-forward />
        <icon-sync />
      </div>
      <div class="flex items-center justify-between ">
        <span class=" w-12">{{ a.left }}</span>
        <div
          @mousedown.self="GoTime($event)"
           class=" flex-1 mx-4 h-3 border-y-4 border-white 
           cursor-pointer _B2 rounded-md  ">
          <div 
          :style="{ width: a.left }" class=" pointer-events-none rounded-md  bg-purple-300 h-full relative transition-all ease-in-out ">
            <span 
              class=" h-3  w-3  -right-1.5 -top-1 rounded-2xl absolute _B3"></span>
          </div>
        </div>
        <span class="w-12">{{ 3.12 }}</span>
      </div>
    </div>
    <div>
      <icon-list />
      <icon-mute v-if="true" />
      <icon-sound v-else />
      <div class=" flex-1 mx-4 h-1 cursor-pointer bg-purple-300  relative">
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref, reactive, watch, computed} from 'vue'
import Store from '@/store/index'
import {mapState,useStore} from 'vuex'
const state = reactive(Store.state.app.curSongInfo)
let left = ref<string>('0%')
const a = reactive({
  left: '0%',
})
// setInterval(() => {
//   left.value = `${(Math.random() * 100).toFixed(2)}%`
// }, 3000)
// 拖动进度条
const Player = reactive(useStore().state.app.Player)
watch(Player.options, (val) => {
 debugger
})
console.log(Player);
const GoTime = (e: MouseEvent) => {
  const { clientX,target } = e || window.event || event
  const { left } = target?.getBoundingClientRect()
  const width = target?.offsetWidth
  const move = clientX - left
  a.left = `${(move / width * 100).toFixed(2)}%`
  // 拖动
  document.onmousemove = (e: MouseEvent) => {
    const { clientX } = e
    const move = clientX - left
    if (move < 0) {
      a.left = '0%'
    } else if (move > width) {
      a.left = '100%'
    } else {
      a.left = `${(move / width * 100).toFixed(2)}%`
    }
  }
  // 解绑
  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null
  }
}
</script>
<style scoped lang='scss'>
.myclass {
  grid-template-columns: 2fr 6fr 2fr;
  grid-gap: 0px 10px;

  svg {
    cursor: pointer;
    font-size: 1.3rem;
    margin: 5px 10px;
  }

  .text-2xl {
    font-size: 2rem;
  }


  .name {
    grid-template-columns: 60px 3fr 1fr;

    .rounded-lg {
      border-radius: 6px;
    }
  }
}
</style>