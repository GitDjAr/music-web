<!--  -->

<template>
  <Teleport :to="props.to">
    <Transition name="modal">
      <div v-show="props.visible" @click.self="maskClose"
        :class="`flex transition-all  justify-center overflow-hidden items-center top-0 left-0 right-0 bottom-0 absolute z-10 bg-black bg-opacity-30`">
        <div :style="{ width: props.width, maxHeight: '85vh' }" v-bind="$attrs"
          :class="` ${classContext} modal-container flex flex-col  transition-all bg-white  overflow-hidden rounded-xl `">
          <template v-if="props.empty">
            <slot>空模板</slot>
          </template>
          <template v-else>
            <div class="flex justify-between items-center mb-4">
              <p class="title" :class="`text-${props.center} text-2xl font-bold`">
                <slot name="title">
                  {{ props.title }}
                </slot>
              </p>
              <icon-close @click="beforeClose" :style="{ fontSize: '26px' }" />
            </div>
            <div class="classBody leading-relaxed w-full overflow-y-scroll overflow-x-hidden">
              <slot>
                {{ context }}
              </slot>
            </div>
            <div class="footer">
              <slot name="footer"></slot>
            </div>
          </template>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { withDefaults, computed, } from "vue";
import { RendererElement } from "vue";
interface PropsType {
  width?: string;
  title?: string | number;
  visible: boolean;
  center?: "center" | "left" | "right";
  beforeClose?: Function | null;
  context?: string;
  maskClosable?: boolean;
  to?: string | RendererElement;
  empty?: boolean;
}
const props = withDefaults(defineProps<PropsType>(), {
  width: "75%",
  title: "",
  empty: false,
  center: "center",
  context: "",
  visible: false,
  maskClosable: true, //点击面罩可关闭
  beforeClose: null,
  to: "body",
});

const Emit = defineEmits<{
  (on: "open", flag: boolean): void;
  (on: "close", flag: boolean): void;
  (on: "update:visible", flag: boolean): void;
}>();

//关闭之前
function beforeClose() {
  if (typeof props.beforeClose === "function") {
    props.beforeClose(props.visible, Close);
  } else {
    Close();
  }
}
// 遮罩事件
function maskClose() {
  props.maskClosable && beforeClose();
}
// 关闭事件
function Close() {
  Emit("update:visible", false);
  Emit("close", false);
}

// 监听 visible 状态
// watch(
//   () => props.visible,
//   () => {
//     if (props.visible) {
//       Emit("open", true);
//     } else {
//       Close();
//     }
//   }
// );

// 动态css
const classContext = computed(() => {
  return `${props.empty ? "p-0" : "p-5"} ${props.visible ? "mt-50" : "mt-0"} `;
});
</script>
<style scoped lang="scss">
.modal-container {
  transition: all 0.3s ease;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
