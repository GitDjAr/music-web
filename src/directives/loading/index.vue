<!--  -->
<template>
  <div>
    <Teleport :to="prop.to" :disabled="!prop.to">
      <div class='loading-container'>
        <slot>
          <IconLoading />
          <p>{{ prop.text }}</p>
        </slot>
      </div>
    </Teleport>
  </div>
</template>
<script lang='ts' setup>
import { IconLoading } from '@arco-design/web-vue/es/icon';
import { RendererElement, withDefaults } from 'vue'
const prop = withDefaults(defineProps<{
  to: string | RendererElement | null | undefined
  text: string
}>(), {
  to: null,
  text: '加载中....'
})

</script>
<style scoped lang='scss'>
.loading-container {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background: rgba($color: #ffffff, $alpha: 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  color: #335dfd;
}
</style>