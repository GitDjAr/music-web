<!--  -->
<template>
  <a-card :style="{ width: '360px' }" :bordered="false">
    <template #title>
      <h2 class="t-lf">{{ $t('home.charts') }}</h2>
    </template>
    <!-- <template #extra>
      <a-button type="text" @click="showMore">{{ $t('artist.showMore') }}</a-button>
    </template>-->
    <div class="charts">
      <div :class="{ 'ul-list': true, 'ul-list-model': ListModel }" v-for="(item, index) in TopList">
        <!-- <span>{{index.toString().padStart(2,'0')}}</span> -->
        <img :src="item.picUrl" @click="showMore(item)" alt="img" srcset />
        <div
          :class="{ 'li-box': true, }"
          class="t-lf"
          v-for="({ first, second }) in item.tracks"
          @dblclick="playMusic(first)"
        >
          <p>{{ first }}</p>
          <span>{{ second }}</span>
          <icon-play-arrow @click="playMusic(first)" />
        </div>
      </div>
    </div>
  </a-card>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {toplist} from '@/api/Home'
export default defineComponent({
  components: {},
  props: {
    model: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const state = reactive({
      ListModel: props.model,
      TopList:[]
    })
    // 获取榜单信息
    onMounted(async ()=>{
      console.log(await toplist());
      
      // const {list = []} = await toplist()
      // state.TopList = list.filter(e=>[19723756,180106,60198].includes(e.id))
      // for await (const iterator of state.TopList) {
      //   console.log(iterator);
        
      // }
    })
    const router = useRouter()
    const showMore = ({ id }) => {
      router.push({ path: `${id}` })
    }
    const playMusic = ({ id }) => {
      router.push({ path: `${id}` })
    }
    const aa = async (v)=>{
      return await Promise.resolve(()=>[1,2])
      
    }
    return {
      ...toRefs(state),
      showMore,
      playMusic,
      aa
    }
  }
})

</script>
<style scoped lang='scss'>
.charts {
  width: 100%;
  .ul-list-model {
  }
}
</style>