<!--  -->
<template>
  <div class="myImg">
    <canvas
      v-if="isSupport"
      height="100%"
      width="100%"
      ref="refCanvas"
    ></canvas>
    <img v-else :src="url" alt="" />
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import { computed } from "vue";
import { ref } from "vue";
import { watch } from "vue";
import { onMounted } from "vue";

interface ImageDecoderInstance {
  decode(options: { frameIndex: number }): Promise<any>;
  tracks: { selectedTrack: any };
  complete: boolean;
}

const props = defineProps<{
  src: string;
}>();

const store = useStore();
const url = computed(() => {
  return props.src;
});

const isSupport = computed(() => {
  return typeof window?.ImageDecoder === "function";
});

const refCanvas = ref();
if (isSupport.value) {
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
let imageDecoder: ImageDecoderInstance | null = null;
let imageIndex = 0;
let paused = false;
const gifData = ref();

async function animation() {
  if (!gifData.value) {
    gifData.value = await fetch(props.src);
  }

  // 检查浏览器是否支持 ImageDecoder
  if (!window.ImageDecoder) {
    console.error("当前浏览器不支持 ImageDecoder API");
    return;
  }

  // 检查 body 是否是 ReadableStream
  if (!gifData.value.body || !(gifData.value.body instanceof ReadableStream)) {
    console.error("fetch 返回的 body 不是 ReadableStream");
    return;
  }

  // 初始化 ImageDecoder
  try {
    imageDecoder = new window.ImageDecoder({
      data: gifData.value.body,
      type: "image/gif",
    });

    // 解码第一帧
    imageDecoder.decode({ frameIndex: imageIndex }).then((res) => {
      refCanvas.value.nextResult = res;
      renderImage(res); // 开始渲染
    });
  } catch (error) {
    console.error("ImageDecoder 初始化失败:", error);
  }
}

function renderImage(result: { image: { duration: number } }) {
  if (!imageDecoder) {
    console.error("imageDecoder 未初始化");
    return;
  }

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
        if (imageDecoder) {
          imageDecoder.decode({ frameIndex: imageIndex }).then(renderImage);
        } else {
          console.error("imageDecoder 未初始化");
        }
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
    width: 50px;
    height: 50px;
    min-width: 50px;
    min-height: 50px;
    top: 0px;
    right: -20px;
    transform: translateY(-56%);
  }
}
</style>
