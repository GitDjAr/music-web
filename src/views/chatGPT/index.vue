<template>
  <div class="content">
    <!-- 嵌入 iframe -->
    <iframe src="https://chat.yqcloud.top/"></iframe>
  </div>
</template>

<script>
export default {
  name: 'WebpageEmbed',
  props: {
    url: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
}
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
