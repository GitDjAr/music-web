<!--  -->
<template>
  <!--
    在Tailwind CSS中，您可以使用以下类名来实现 grid-template-columns: auto 1fr; 的效果：
    <div class="grid grid-cols-2 gap-4">
      <div class="col-span-1">...</div>
      <div class="col-span-2">...</div>
    </div>
   -->
  <div
    class="max-h-[500px] overflow-y-scroll divide-y divide-purple-800"
    v-infinite-scroll="[get_notice, { distance: 12 }]"
  >
    <div
      v-for="(item, idx) in User_notices"
      class="grid gap-2 grid-cols-2 py-1 mb-1"
      style="grid-template-columns: auto 1fr"
      :key="idx"
      @click="showModel(item)"
    >
      <div class="w-12 h-12 grid-cols-1">
        <Image
          alt="avatar"
          class="rounded-full"
          :src="item.notice?.user?.avatarUrl"
          :wh="[50, 50]"
        />
      </div>
      <div class="grid-cols-2">
        <div class="text-base text-black">
          {{
            item.notice?.user?.nickname +
            typeMap[item?.type] +
            " 你的 " +
            trackMap[item.notice?.type]
          }}
        </div>
        <div class="truncate w-[370px] overflow-hidden text-sm">
          {{
            `${
              item?.notice?.track?.song?.name ||
              item?.notice?.track?.video?.title ||
              item?.notice?.track?.album?.title ||
              item?.notice?.playlist?.name ||
              item?.notice?.comment?.content
            }  - ${item?.notice?.track?.msg ? item?.notice?.track?.msg : ""}`
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { _notice } from "@/api/user";
import { ref } from "vue";
import { vInfiniteScroll } from "@vueuse/components";

function showModel(item: any) {
  console.log("showModel-开发中");
}

const User_notices = ref<Array<any>>([]);

const typeMap: Record<number, string> = {
  0: "赞了",
  // 2: "转发了",
  // 3: "评论了",
  4: "收藏了",
};
const trackMap: Record<number, string> = {
  1: "动态",
  2: "歌单",
  6: "评论",
};

get_notice();
function get_notice() {
  _notice({
    limit: 15,
    lasttime: User_notices.value.at(-1)?.time || -1,
  }).then((res: any) => {
    User_notices.value.push(
      ...res.notices
        .map((e: { notice: string }) => {
          let obj = JSON.parse(e.notice);
          let track = JSON.parse(obj?.track?.json || "{}");
          return {
            ...e,
            notice: {
              ...obj,
              track,
            },
          };
        })
        .filter((e: { notice: { type: number } }) => e.notice.type !== 10),
    );
    console.log(User_notices.value);
  });
}
</script>
<style scoped lang="scss"></style>
