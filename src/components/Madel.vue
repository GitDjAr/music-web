<!--  -->

<template>
  <Teleport :to="props.to">
    <div v-show="props.visible" @click.self="beforeClose"
      :class='`flex transition-all  justify-center overflow-hidden items-center top-0 left-0 right-0 bottom-0 absolute bg-black bg-opacity-${props.visible ? 30 : 0}`'>
      <div :style="{ width: props.width }" :class="` bg-white  p-5 rounded-xl mt-${props.visible ? 50 : 0}`">
        <div class="flex justify-between items-center mb-4 ">
          <p calss="title" :class="`text-${props.center} text-2xl font-bold`">
            <slot name="title">
              {{ props.title }}
            </slot>
          </p>
          <icon-close @click="beforeClose" :style="{ fontSize: '26px' }" />
        </div>
        <div class="body">
          <slot>
            {{ context }}11
          </slot>
        </div>
        <div class="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang='ts' setup>
import { ref, reactive, withDefaults, computed } from 'vue'
interface PropsType {
  width?: string,
  title?: string | number,
  visible?: boolean,
  center?: 'center' | 'left' | 'right',
  beforeClose?: Function | null,
  context: string,
  to: string
}
const props = withDefaults(defineProps<PropsType>(), {
  width: '75%',
  title: '',
  center: 'center',
  context: '',
  visible: false,
  beforeClose: null,
  to: 'body'
})

const Emit = defineEmits<{
  (on: 'close', flag: boolean): void,
  (on: 'update:visible', flag: boolean): void,
}>()

function beforeClose() {
  if (typeof props.beforeClose === 'function') {
    props.beforeClose(Close)
  } else {
    Close()
  }
}

function Close() {
  Emit('update:visible', false)
}
</script>
<style scoped lang='scss'>

</style>