<!--  -->
<template>
    {{SearchList}}
    <a-list>
      <a-list-item v-for="list in SearchList" :key="list">
        <a-list-item-meta
          :title="list.song"
          description="Beijing ByteDance Technology Co., Ltd. is an enterprise located in China."
        >
          <template #avatar>
            <a-avatar shape="square">
              <img
                alt="avatar"
                src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
              />
            </a-avatar>
          </template>
          <template #description>
            {{ list.artist }}
          </template>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
</template>

<script lang='ts' setup>
import { ref, reactive, } from 'vue'
type List = {}
const SearchList = defineProps({
  SearchList: [
  ],
})
</script>
<style scoped lang='scss'>
</style>