<!--  -->
<template>
  <icon-heart-fill
    v-if="isLike"
    v-bind="$attrs"
    :style="{ color: 'red' }"
    class="cursor-pointer"
    @click.stop="linkTo"
  /><icon-heart
    v-else
    v-bind="$attrs"
    @click.stop="linkTo"
    class="hover:text-pink-500 cursor-pointer"
  />
</template>

<script lang="ts" setup>
import { like } from "@/api/like";
import { withDefaults, computed } from "vue";
import store from "@/store";

const P = withDefaults(
  defineProps<{
    id: string | number;
  }>(),
  {}
);

async function linkTo() {
  const { code } = await like({
    id: P.id,
    like: !isLike.value,
    timestamp: Date.now(),
  });
  if (code === 200 && !isLike.value) {
    store.state.song.myLikeList.push(P.id);
  } else if (code === 200) {
    store.state.song.myLikeList = store.state.song.myLikeList.filter(
      (e: number) => e !== P.id
    );
  }
}
// 计算是否收藏
const isLike = computed(() => {
  return store.state.song.myLikeList.includes(P.id);
});
</script>
<style scoped lang="scss"></style>
