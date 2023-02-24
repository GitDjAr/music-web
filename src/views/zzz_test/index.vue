<!--  -->
<template>
  <vue-plyr v-loading="loading" class="" :options="VideoOptions" ref="videoRef">
    <video class="w-fill" :src="videoSrc"></video>
  </vue-plyr>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";

import { _artist_mv, _mv_url } from "@/api/user";
const loading = ref(true);
const videoRef = ref("");
const videoSrc = ref("");
const VideoOptions = {
  quality: { default: "1080p" },
  i18n: {
    //https://github.com/sampotts/plyr/blob/master/src/js/config/defaults.js
  },
};

const get_mv_url = async () => {
  loading.value = true;
  const { data } = await _mv_url({ id: 14308788 });
  videoSrc.value = data.url;

  videoRef.value.player.on("ready", () => {
    loading.value = false;
  });
};
get_mv_url();
</script>
<style scoped lang="scss"></style>
