<!-- 用户-歌手-动态 -->
<template>
  <div class="" @click="openMadol">111</div>
  <ModalVue v-model:visible="visible" :maskClosable="false" title="动态空间">
    <template #default>
      <div class="h-full">
        <div class="justify-between items-center mb-4">
          <div v-for="item in allDate.desc.introduction" class="mb-2">
            <p class="text-lg font-bold">{{ item.ti }}</p>
            <div>{{ item.txt }}</div>
          </div>
        </div>
        <div>
        </div>
      </div>
    </template>
  </ModalVue>
</template>

<script lang="ts" setup>
import { _artist_desc } from "@/api/user";
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";
const allDate: any = reactive({
  desc: 0,
});
const route = useRoute();

// 弹框 visible
const visible = ref(false);
function openMadol() {
  visible.value = !visible.value;
}

async function getUser_artist_desc(id?: number) {
  allDate.desc = await _artist_desc({ id: id || route.params.id });
}
getUser_artist_desc();
</script>
<style scoped lang="scss"></style>
