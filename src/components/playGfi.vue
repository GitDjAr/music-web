<!--  -->
<template>
  <div class="myImg">
    <canvas height="100%" width="100%" ref="refCanvas"></canvas>
  </div>
</template>

<script lang="ts" setup>
import defaultIcon from "@/assets/myIcon/runDag.gif";
import { useStore } from "vuex";
import { computed } from "vue";
import { ref, reactive } from "vue";
import { watch } from "vue";
import { onMounted } from "vue";

interface VideoFrame {
  duration: number;
}

const props = defineProps<{
  src: string;
}>();

const store = useStore();
const url = computed(() => {
  return store.state.song.Player._playing ? props.src : "";
});

const refCanvas = ref();
const flag = typeof window?.ImageDecoder === "function";
console.log("🚀 ~ file: playGfi.vue:34 ~ flag1:", flag);
// if (flag) {
watch(
  () => store.state.song.Player._playing,
  (v) => (v ? play : pause),
);
// }

const context = ref();
onMounted(() => {
  context.value = refCanvas.value.getContext("2d");
  animation();
});

// 一些与GIF播放有关的变量
let imageDecoder = null;
let imageIndex = 0;
let paused = false;
const gifData = ref();
async function animation() {
  if (!gifData.value) {
    gifData.value = await fetch(props.src);
  }
  console.log(
    "🚀 ~ file: playGfi.vue:48 ~ animation ~ body:",
    gifData.value.body,
  );
  imageDecoder = new window.ImageDecoder({
    data: gifData.value.body,
    type: "image/gif",
  });
  imageDecoder.decode({ frameIndex: imageIndex }).then((res) => {
    refCanvas.value.nextResult = res;
  });
}

function renderImage(result: {
  // 解码的图像
  image: VideoFrame;
  // 如果为true，则表示该图像包含最终的完整细节输出。
  complete: boolean;
}) {
  context.value.drawImage(result.image, 0, 0);

  const track = imageDecoder.tracks.selectedTrack;
  console.log("🚀 ~ file: playGfi.vue:70 ~ track:", track);

  // 如果播放结束，从头开始循环
  if (imageDecoder.complete) {
    if (track.frameCount === 1) {
      return;
    }

    if (imageIndex + 1 >= track.frameCount) {
      imageIndex = 0;
    }
  }

  // 绘制下一帧内容
  imageDecoder
    .decode({ frameIndex: ++imageIndex })
    .then((nextResult) => {
      if (paused === false) {
        setTimeout(() => {
          renderImage(nextResult);
        }, result.image.duration / 1000.0);
      } else {
        refCanvas.value.nextResult = nextResult;
      }
    })
    .catch((e) => {
      // imageIndex可能超出的容错处理
      if (e instanceof RangeError) {
        imageIndex = 0;
        imageDecoder.decode({ frameIndex: imageIndex }).then(renderImage);
      } else {
        throw e;
      }
    });
}
// 播放和暂停方法
const play = function () {
  paused = false;
  renderImage(refCanvas.value.nextResult);
};

const pause = function () {
  paused = true;
};
</script>
<style scoped lang="scss">
.myImg {
  img,
  canvas {
    position: absolute;
    background-repeat: no-repeat;
    width: 40px;
    height: 40px;
    min-width: 40px;
    min-height: 40px;
    top: 0px;
    right: -20px;
    transform: translateY(-56%);
  }
}
</style>
