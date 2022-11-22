<template>
  <a-button @click="handleClick">Open Draggable Modal</a-button>
  {{ visible }}
  <a-modal v-model:visible="visible" @ok="handleOk" @cancel="handleCancel" draggable>
    <template #title>
      Title
    </template>
    <div>You can cusstomize modal body text by the current situation. This modal will be closed immediately once you
      press the OK button.</div>
  </a-modal>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const visible = ref(false);

    const handleClick = () => {
      visible.value = true;
    };
    const handleOk = () => {
      visible.value = false;
    };
    const handleCancel = () => {
      console.log(111);
      visible.value = true;
    }

    return {
      visible,
      handleClick,
      handleOk,
      handleCancel
    }
  },
}
</script>