<!--  -->
<template>
  <div class>
    <a-select
      :style="{ width: '160px' }"
      placeholder="Select"
      @change="I18nChange"
      v-model="$i18n.locale"
      :trigger-props="{ autoFitPopupMinWidth: true }"
    >
      <a-option
        v-for="(item, index) in langList"
        :value="item.lang"
        :label="item.lang"
        :key="index"
      ></a-option>
    </a-select>
    <h1>{{ $t('nav.home') }}</h1>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import store from '../../store';
export default defineComponent({
  components: {},
  methods: {},

  setup(props) {
    const state = reactive({
      langList: [{ lang: 'zh-CN' }, { lang: 'en' }],
    });
    const I18nChange = (v: string | Event) => {
      store.dispatch('setLocale', v);
    };
    return {
      ...toRefs(state),
      I18nChange,
    };
  },
});
</script>
<style scoped lang='scss'>
</style>