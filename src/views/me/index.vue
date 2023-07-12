<!--  -->
<template>
  <a-list :max-height="500" @reach-bottom="get_notice">
    <a-list-item v-for="(item, idx) in User_notices" :key="idx">
      <a-list-item-meta
        @click="showModel(item)"
        :title="
          item.notice?.user?.nickname +
          typeMap[item?.type] +
          ' 你的 ' +
          trackMap[item.notice?.type]
        "
      >
        <template #avatar>
          <Image
            alt="avatar"
            :src="item.notice?.user?.avatarUrl"
            :wh="[50, 50]"
          />
        </template>
        <template #description>
          <div class="truncate w-[370px] overflow-hidden">
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
        </template>
      </a-list-item-meta>
    </a-list-item>
  </a-list>
</template>

<script lang="ts" setup>
import { _notice } from "@/api/user";
import { ref, onMounted, reactive } from "vue";

function showModel() {
  console.log("showModel-开发中");
}

const User_notices = ref([]);

const typeMap = {
  0: "赞了",
  // 2: "转发了",
  // 3: "评论了",
  4: "收藏了",
};
const trackMap = {
  1: "动态",
  2: "歌单",
  6: "评论",
};

function get_notice() {
  _notice({
    limit: 15,
    lasttime: User_notices.value.at(-1)?.time || -1,
  }).then((res) => {
    User_notices.value.push(
      ...res.notices
        .map((e) => {
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
        .filter((e) => e.notice.type !== 10)
    );
    console.log(User_notices.value);
  });
}
</script>
<style scoped lang="scss"></style>
