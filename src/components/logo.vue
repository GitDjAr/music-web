<!--  -->
<template>
  <div class="flex justify-center items-center">
    <img alt="muisc play logo" :style="style" :src="src" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import palylogo from "../assets/play-logo.png";
import logo from "../assets/logo.gif";
export default defineComponent({
  components: {},
  props: {
    width: String,
    height: String,
    logo: {
      type: String,
      default: "0",
    },
  },
  setup(props) {
    const state = reactive({
      style: {
        width: "100%",
        height: "100%",
      },
      src: "",
    });
    interface srcMapOpt {
      [key: string]: string;
    }
    const srcMap: srcMapOpt = {
      "0": palylogo,
      "1": logo,
    };
    let a = props.logo;
    state.src = srcMap[a];

    state.style.width = props?.width || "100%";
    state.style.height = props?.height || "100%";

    return {
      ...toRefs(state),
    };
  },
});
</script>
<style scoped lang="scss"></style>
