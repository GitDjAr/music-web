<template>
  <div
    class="card"
    :style="{
      'background-image': `url(${prop.item.cover || prop.item.coverUrl})`,
    }"
    @click="playHandle"
  >
    <div class="border"></div>
    <div class="content">
      <div class="logo mb-4">
        <div class="logo1 i-mynaui-music-hexagon text-xl"></div>
        <div class="logo2 leading-8 text-xl">
          {{ prop.item.name || prop.item.title }}
        </div>
        <span class="trail"></span>
      </div>
      <span class="logo-bottom-text">{{ prop.item.publishTime }}</span>
    </div>
    <span class="bottom-text" v-show="prop.item.playCount"
      >{{ (prop.item.playCount / 10000).toFixed(2) }}万</span
    >
    <MyVideo
      :id="prop.item.id || prop.item.vid"
      v-model:show="VideoShow"
    ></MyVideo>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const prop = defineProps(["item"]);

const VideoShow = ref(false);
const playHandle = () => {
  VideoShow.value = true;
};
</script>

<style scoped lang="scss">
/* From Uiverse.io by Smit-Prajapati */
.card {
  width: 300px !important;
  height: 200px !important;
  position: relative;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;

  display: grid;
  place-content: center;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

#logo-main,
#logo-second {
  height: 100%;
}

#logo-main {
  fill: #a8dba8;
}

#logo-second {
  padding-bottom: 10px;
  fill: none;
  stroke: #a8dba8;
  stroke-width: 1px;
}

.border {
  position: absolute;
  inset: 0px;
  border: 2px solid #a8dba8;
  opacity: 0;
  transform: rotate(10deg);
  transition: all 0.5s ease-in-out;
}

.bottom-text {
  position: absolute;
  left: 50%;
  bottom: 10px;
  transform: translateX(-50%);
  font-size: 12px;
  text-transform: uppercase;
  padding: 0px 5px 0px 8px;
  color: #a8dba8;
  background: #243137;
  opacity: 0;
  letter-spacing: 7px;
  transition: all 0.5s ease-in-out;
}

.content {
  transition: all 0.5s ease-in-out;
}

.content .logo {
  height: 35px;
  position: relative;
  width: 100px;
  text-align: right;
  overflow: hidden;
  transition: all 1s ease-in-out;
  color: #a8dba8;
  opacity: 0;
}

.content .logo .logo1 {
  height: 33px;
  position: absolute;
  width: 30px;
  left: 0;
}

.content .logo .logo2 {
  height: 33px;
  position: absolute;
  left: 33px;
}

.content .logo .trail {
  position: absolute;
  right: 0px;
  height: 100%;
  width: 100%;
  opacity: 0;
}

.content .logo-bottom-text {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin-top: 30px;
  color: #a8dba8;
  padding-left: 8px;
  font-size: 16px;
  opacity: 0;
  letter-spacing: none;
  transition: all 0.5s ease-in-out 0.5s;
}
.card {
  position: relative; /* 确保伪元素定位正确 */
  transition: transform 0.5s ease-in-out; /* 仅控制卡片缩放 */

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      rgba(0, 0, 0, 0.4) 0%,
      rgba(0, 0, 0, 1) 50%,
      rgba(0, 0, 0, 0.4) 100%
    );
    transition: opacity 0.5s ease-in-out; /* 优化：用 opacity 替代背景渐变过渡 */
    opacity: 0.01;
    will-change: opacity, transform; /* 启用硬件加速优化性能 */
  }

  &:hover {
    transform: scale(1.1);
    border-radius: 6px;

    &::before {
      opacity: 0.8; /* 通过透明度变化替代复杂渐变修改 */
    }
  }
}

.card:hover .logo {
  width: 134px;
  animation: opacity 1s ease-in-out;
  opacity: 1;
}

.card:hover .border {
  inset: 15px;
  opacity: 1;
  transform: rotate(0);
}

.card:hover .bottom-text {
  letter-spacing: 3px;
  opacity: 1;
  transform: translateX(-50%);
}

.card:hover .content .logo-bottom-text {
  opacity: 1;
  letter-spacing: 4.5px;
}

.card:hover .trail {
  animation: trail 1s ease-in-out;
}

@keyframes opacity {
  0% {
    border-right: 1px solid transparent;
  }

  10% {
    border-right: 1px solid #a8dba8;
  }

  80% {
    border-right: 1px solid #a8dba8;
  }

  100% {
    border-right: 1px solid transparent;
  }
}

@keyframes trail {
  0% {
    background: linear-gradient(
      90deg,
      rgba(189, 159, 103, 0) 90%,
      rgb(189, 159, 103) 100%
    );
    opacity: 0;
  }

  30% {
    background: linear-gradient(
      90deg,
      rgba(189, 159, 103, 0) 70%,
      rgb(189, 159, 103) 100%
    );
    opacity: 1;
  }

  70% {
    background: linear-gradient(
      90deg,
      rgba(189, 159, 103, 0) 70%,
      rgb(189, 159, 103) 100%
    );
    opacity: 1;
  }

  95% {
    background: linear-gradient(
      90deg,
      rgba(189, 159, 103, 0) 90%,
      rgb(189, 159, 103) 100%
    );
    opacity: 1;
  }
}
</style>
