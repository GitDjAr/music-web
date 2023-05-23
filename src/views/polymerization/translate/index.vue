<!--  -->
<template>
  <div class="flex">
    <div class="w-1/2">
      <a-select
        :style="{ width: '320px' }"
        class="mb-2"
        v-model="source_lang"
        placeholder="源语言类型"
        allow-clear
        allow-search
      >
        <a-option
          v-for="(item, index) in langList"
          :key="index"
          :value="item.code"
          :label="item.name"
        >
        </a-option>
      </a-select>
      <a-textarea
        @blur="translate"
        v-model="source_lang_text"
        placeholder="Please enter something"
        :max-length="3000"
        allow-clear
        show-word-limit
        :auto-size="{
          minRows: 12,
          maxRows: 20,
        }"
      />
    </div>
    <div class="mt-2" @click="reverse">
      <MyIcon name="coins-swap" />
    </div>
    <div class="flex-1">
      <a-select
        class="mb-2"
        :style="{ width: '320px' }"
        v-model="target_lang"
        placeholder="翻译语言类型"
        allow-clear
        allow-search
      >
        <a-option
          v-for="(item, index) in langList"
          :key="index"
          :value="item.code"
          :label="item.name"
        >
        </a-option>
      </a-select>
      <a-textarea
        v-model="target_lang_text"
        placeholder=""
        :auto-size="{
          minRows: 12,
          maxRows: 20,
        }"
        show-word-limit
      />
    </div>
  </div>
  <a-button
    @click="translate"
    :loading="loading"
    type="primary"
    class="w-52 mt-5"
  >
    翻译
  </a-button>
</template>

<script lang="ts" setup>
import { translateAPI } from "@/api/uta";
import { ref } from "vue";

const source_lang = ref("en");
const source_lang_text = ref("Please enter something");
const target_lang = ref("zh");
const target_lang_text = ref("");
const loading = ref(false);

function reverse() {
  [source_lang.value, target_lang.value] = [
    target_lang.value,
    source_lang.value,
  ];
}
const translate = async () => {
  try {
    loading.value = true;
    const { alternatives, data } = await translateAPI({
      text: source_lang_text.value,
      source_lang: source_lang.value.toLocaleUpperCase(),
      target_lang: target_lang.value.toLocaleUpperCase(),
    });
    target_lang_text.value = alternatives?.[0] || data;
  } catch (err) {
    console.log("err", err);
  } finally {
    loading.value = false;
  }
};

const langList = [
  { code: "en", name: "英语" },
  { code: "zh", name: "简体中文" },
  { code: "ar", name: "العربية" },
  { code: "bn", name: "বাংলা" },
  { code: "cs", name: "čeština" },
  { code: "da", name: "dansk" },
  { code: "de", name: "Deutsch" },
  { code: "es", name: "español" },
  { code: "fr", name: "français" },
  { code: "hi", name: "हिन्दी" },
  { code: "id", name: "Bahasa Indonesia" },
  { code: "it", name: "italiano" },
  { code: "ja", name: "日本語" },
  { code: "ko", name: "한국어" },
  { code: "ms", name: "Bahasa Melayu" },
  { code: "nl", name: "Nederlands" },
  { code: "no", name: "norsk" },
  { code: "pl", name: "polski" },
  { code: "pt", name: "português" },
  { code: "ro", name: "română" },
  { code: "ru", name: "русский" },
  { code: "sv", name: "svenska" },
  { code: "th", name: "ไทย" },
  { code: "tr", name: "Türkçe" },
  { code: "uk", name: "українська" },
  { code: "vi", name: "Tiếng Việt" },
  { code: "af", name: "Afrikaans" },
  { code: "bg", name: "български" },
  { code: "ca", name: "català" },
  { code: "el", name: "Ελληνικά" },
  { code: "et", name: "eesti" },
  { code: "fa", name: "فارسی" },
  { code: "fi", name: "suomi" },
  { code: "he", name: "עִבְרִית" },
  { code: "hr", name: "hrvatski" },
  { code: "hu", name: "magyar" },
  { code: "is", name: "íslenska" },
  { code: "lt", name: "lietuvių" },
  { code: "lv", name: "latviešu" },
  { code: "mk", name: "македонски" },
  { code: "nb", name: "norsk bokmål" },
  { code: "nn", name: "nynorsk" },
  { code: "pt-BR", name: "português do Brasil" },
  { code: "sk", name: "slovenčina" },
  { code: "sl", name: "slovenščina" },
  { code: "sr", name: "српски" },
  { code: "tl", name: "Tagalog" },
  { code: "ta", name: "தமிழ்" },
  { code: "te", name: "తెలుగు" },
  { code: "ur", name: "اردو" },
  { code: "uz", name: "Oʻzbekcha" },
];
</script>
<style scoped lang="scss"></style>
