<!--  -->
<template>
  <div>
    <inputCss
      type="checkbox"
      checked="checked"
      id="favorite"
      class="inputCss"
      name="favorite-checkbox"
      value="favorite-button"
    />
    <label for="favorite" class="container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-heart"
      >
        <path
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        ></path>
      </svg>
      <div class="action">
        <span class="option-1">Add to Favorites</span>
        <span class="option-2">Added to Favorites</span>
      </div>
    </label>
  </div>
</template>

<script lang="ts" setup>
const p = defineProps<{ collectFlag: boolean }>();
</script>
<style scoped lang="scss">
.container {
  background-color: white;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 15px 10px 10px;
  cursor: pointer;
  user-select: none;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  color: black;
}

.inputCss {
  display: none;
}

.inputCss:checked + .container svg {
  fill: hsl(0deg 100% 50%);
  stroke: hsl(0deg 100% 50%);
  animation: heartButton 1s;
}

@keyframes heartButton {
  0% {
    transform: scale(1);
  }

  25% {
    transform: scale(1.3);
  }

  50% {
    transform: scale(1);
  }

  75% {
    transform: scale(1.3);
  }

  100% {
    transform: scale(1);
  }
}

.inputCss + .container .action {
  position: relative;
  overflow: hidden;
  display: grid;
}

.inputCss + .container .action span {
  grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 1;
  grid-row-end: 1;
  transition: all 0.5s;
}

.inputCss + .container .action span.option-1 {
  transform: translate(0px, 0%);
  opacity: 1;
}

.inputCss:checked + .container .action span.option-1 {
  transform: translate(0px, -100%);
  opacity: 0;
}

.inputCss + .container .action span.option-2 {
  transform: translate(0px, 100%);
  opacity: 0;
}

.inputCss:checked + .container .action span.option-2 {
  transform: translate(0px, 0%);
  opacity: 1;
}
</style>
