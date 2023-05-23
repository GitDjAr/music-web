<template>
  <div class="content">
    <!-- 嵌入 iframe -->
    <iframe :src="url"></iframe>
  </div>
</template>

<script>
export default {
  name: "WebpageEmbed",
  props: {
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      //https://cc.ai55.cc/
      urlList: [
        "https://chatbot.theb.ai/#/chat/",
        "https://chat23.yqcloud.top/",
        "https://chatbot.theb.ai/#/",
        "https://free.anzz.top/",
        "https://www.aitianhu.com/",
        "https://chat.aidutu.cn/#/chat/1002",
        "https://chat.wobcw.com/",
        "https://greengpt.app/",
        "https://chat13.xeasy.me/",
        "https://chat.extkj.cn/",
        "https://chat.zhuleixx.top/",
        "https://chat.68686.ltd/#/chat",
        "https://a.mydog.buzz/",
        "https://freegpt.one/",
      ],
      url: "https://chatbot.theb.ai/#/chat/",
    };
  },
  mounted() {
    Promise.race(this.urlList.map((url) => fetch(url).then((_) => url))).then(
      (e) => {
        this.url = e;
      }
    );
  },
};
</script>

<style scoped>
.content {
  display: flex;
  height: calc(100% - 20px);
}

iframe {
  width: 100%;
  height: calc(100% - 20px);
  border: none;
}
</style>
