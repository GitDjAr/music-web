<!--  -->
<template>
  <ModalVue
    to="body"
    :class="`${proportion ? 'h-full' : ''} transition-all`"
    :empty="true"
    :visible="P.show"
    @close="handleClose"
  >
    <vue-plyr
      v-loading="loading"
      :options="VideoOptions"
      ref="videoRef"
      class="transition-all"
    >
      <video :src="videoSrc"></video>
    </vue-plyr>
  </ModalVue>
</template>

<script lang="ts" setup>
import { _mv_url } from "@/api/user";
import vuePlyr from "@/components/playVideo/index.vue";
import videoInstance from "@/components/MyVideo/type";
import { onMounted } from "vue";
import { watch, withDefaults, computed, ref, Ref } from "vue";
import Store from "@/store";

const emit = defineEmits<{
  (on: "open", flag: boolean): void;
  (on: "close", flag: boolean): void;
  (on: "update:show", flag: boolean): void;
}>();

const P = withDefaults(
  defineProps<{
    id: number;
    show: boolean;
  }>(),
  {
    show: false,
  },
);

// 视频api
//https://github.com/sampotts/plyr/blob/master/src/js/config/defaults.js
const videoRef = ref<videoInstance>();
const VideoOptions = {
  quality: { default: "1080p" },
  i18n: {},
};
const player: Ref<videoInstance> = computed(() => {
  return videoRef.value!.player;
});
function VideoPlay() {
  player.value.play();
  Store.dispatch("PlayStop");
}

watch(
  () => P.show,
  () => {
    if (player?.value?.playing && !P.show) {
      player.value.pause();
    } else if (P.show) {
      VideoPlay();
    }
  },
);
watch(
  () => P.id,
  () => {
    get_mv_url();
  },
);

// 计算 比例
const proportion = ref(false);
onMounted(() => {
  player.value.on("loadedmetadata", () => {
    const { videoWidth, videoHeight } = player.value.media;
    let seep = videoWidth / videoHeight;
    proportion.value = !(1.5 < seep && seep < 2);
  });
});

// 地址
const videoSrc = ref("");
const loading = ref(false);
async function get_mv_url() {
  loading.value = true;
  const { data } = await _mv_url({ id: P.id });
  videoSrc.value = data.url;
  loading.value = false;
}

function handleClose() {
  emit("close", false);
  emit("update:show", false);
}
</script>
<style scoped lang="scss"></style>
