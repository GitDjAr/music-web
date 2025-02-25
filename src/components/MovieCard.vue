<template>
  <div class="relative w-96 h-48 bg-white overflow-hidden mb-4 shadow-lg">
    <!-- Overlay -->
    <div
      class="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-300"
    ></div>

    <!-- Share Icons -->
    <div class="absolute top-4 right-4 flex space-x-2">
      <button
        class="text-white opacity-0 hover:opacity-100 transition-opacity duration-300"
      >
        <i class="material-icons">&#xe87d;</i>
      </button>
      <button
        class="text-white opacity-0 hover:opacity-100 transition-opacity duration-300"
      >
        <i class="material-icons">&#xe253;</i>
      </button>
      <button
        class="text-white opacity-0 hover:opacity-100 transition-opacity duration-300"
      >
        <i class="material-icons">&#xe80d;</i>
      </button>
    </div>

    <!-- Content -->
    <div class="absolute inset-0 p-4 flex flex-col justify-end">
      <h1 class="text-2xl font-bold text-white">{{ title }}</h1>
      <h4 class="text-sm text-gray-300">{{ info }}</h4>
      <p class="text-sm text-gray-200 mt-2">{{ description }}</p>
      <button
        class="mt-4 px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors duration-300"
      >
        Watch Trailer
      </button>
    </div>

    <!-- Background Image -->
    <div
      class="absolute inset-0 bg-cover bg-center"
      :style="{ backgroundImage: `url(${imageUrl})` }"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    info: String,
    description: String,
    imageUrl: String,
  },
};
</script>

<style scoped>
.material-icons {
  font-family: "Material Icons";
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
}
</style>
