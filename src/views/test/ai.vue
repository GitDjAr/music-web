<!--  -->
<template>
  <div class="myImg">
    <!-- <canvas height="40" width="40" ref="refCanvas"></canvas> -->
    <div>
      <img :src="url" alt="" srcset="" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import defaultIcon from "@/assets/myIcon/runDag.gif";
import { useStore } from "vuex";
import { computed } from "vue";
import { ref } from "vue";
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
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.src = props.src;
  img.onload = () => {
    if (ctx) {
      // Draw only the first frame of the GIF
      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 40, 40);
    }
  };
  console.log("🚀 ~ file: ai.vue:41 ~ url ~ canvas?.toDataURL():", canvas?.toDataURL())
  return store.state.song.Player._playing ? props.src : canvas?.toDataURL();
});

const refCanvas = ref();
const flag = typeof window?.ImageDecoder === "function";
console.log("🚀 ~ file: playGfi.vue:34 ~ flag1:", flag);
if (flag) {
  watch(
    () => store.state.song.Player._playing,
    (v) => (v ? play : pause),
  );
}

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
    gifData.value = await fetch(defaultIcon);
  }
  // 设置canvas尺寸
  refCanvas.value.width = "400";
  refCanvas.value.height = "400";
  // 实际显示尺寸
  imageDecoder = new window.ImageDecoder({
    data: gifData.value.body,
    type: "image/gif",
  });
  imageDecoder.decode({ frameIndex: imageIndex }).then((res) => {
    refCanvas.value.nextResult = res;
    renderImage(res);
  });
}

function renderImage(result: {
  // 解码的图像
  image: VideoFrame;
  // 如果为true，则表示该图像包含最终的完整细节输出。
  complete: boolean;
}) {
  //清空上一张
  context.value.clearRect(0, 0, refCanvas.value.width, refCanvas.value.height);
  context.value.drawImage(result.image, 0, 0);
  // console.log("🚀 ~ file: ai.vue:84 ~ result.image:", result.image);

  const track = imageDecoder.tracks.selectedTrack;
  // console.log("🚀 ~ file: playGfi.vue:70 ~ track:", imageDecoder);

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
      // console.log("🚀 ~ file: ai.vue:107 ~ .then ~ nextResult:", nextResult);
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
    border: 1px solid red;
    position: absolute;
    background-repeat: no-repeat;
    width: 80px;
    height: 80px;
    min-width: 80px;
    min-height: 80px;
    top: 220px;
    right: 220px;
    transform: translateY(-56%);
  }
}
</style>
