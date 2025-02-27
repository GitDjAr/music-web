<!--  -->
<template>
  <div class="listBox">
    <div class="listItem">
      <h2>设置语言:</h2>
      <a-select
        :style="{ width: '160px' }"
        placeholder="Select"
        @change="I18nChange"
        v-model="$i18n.locale"
        :trigger-props="{ autoFitPopupMinWidth: true }"
      >
        <a-option
          v-for="(item, index) in state.langList"
          :value="item.lang"
          :label="item.lang"
          :key="index"
        ></a-option>
      </a-select>
    </div>
    <div class="listItem">
      <h2>音乐品质:</h2>
      <a-select
        :style="{ width: '160px' }"
        placeholder="Select"
        @change="(v: string) => store.dispatch('setMusicLevel', v)"
        v-model="musicLevel"
        :trigger-props="{ autoFitPopupMinWidth: true }"
      >
        <a-option
          v-for="(item, index) in level"
          :value="item.value"
          :label="item.label"
          :key="index"
        ></a-option>
      </a-select>
    </div>
    <div class="listItem">
      <h2>主题:</h2>
      <a-switch type="round" v-model="isDark" @change="toggleDark" />
    </div>
    <div class="listItem">
      <h2>歌词:</h2>
      <a-switch
        type="round"
        v-model="lyricColor"
        @change="store.commit('setLyricColor', !lyricColor)"
      />
    </div>
    <div class="listItem">
      <h2>图标:</h2>
      <iconProgressVue></iconProgressVue>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDark, useToggle } from "@vueuse/core";
import iconProgressVue from "./icon.vue";
import { reactive, Ref, ref, computed } from "vue";
import { useStore } from "vuex";
import type { levelEnum } from "./type";

const level: Ref<levelEnum> = ref([
  { value: "standard", label: " 标准" },
  { value: "higher", label: " 较高" },
  { value: "exhigh", label: "极高" },
  { value: "lossless", label: "无损" },
  { value: "hires", label: "Hi-Res" },
]);
const state = reactive({
  langList: [{ lang: "zh-CN" }, { lang: "en" }],
});

const store = useStore();

const I18nChange = (v: string | Event) => {
  store.dispatch("setLocale", v);
};

const musicLevel = computed(() => {
  return store.state?.song.musicLevel;
});

const lyricColor = computed(() => {
  return store.state?.app?.lyricColor;
});

const isDark = ref(useDark());
const toggleDark = useToggle(isDark);
</script>
<style scoped lang="scss">
.listBox {
  .listItem {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 30px;
  }
}

h2 {
  font-size: 1.5em;
}
</style>
