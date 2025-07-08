<template>
  <div
    v-show="shouldShow"
    class="vue-spinner-block"
    :class="{ 'vue-spinner-block--hiding': isHiding }"
  >
    <div class="vue-spinner"></div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, watch, nextTick } from "vue";

const props = defineProps<{
  isLoading: boolean;
}>();

const shouldShow = ref(false);
const isHiding = ref(false);

nextTick(() => {
  shouldShow.value = props.isLoading;
});

watch(
  () => props.isLoading,
  async (newVal) => {
    if (newVal) {
      // Показываем сразу
      isHiding.value = false;
      shouldShow.value = true;
    } else {
      // Запускаем анимацию скрытия
      isHiding.value = true;
      await new Promise((resolve) => setTimeout(resolve, 500)); // Ждем окончания анимации
      shouldShow.value = false;
      isHiding.value = false;
    }
  }
);
</script>

<style lang="scss">
.vue-spinner {
  width: 30px;
  height: 30px;
  border: 4px solid;
  border-color: var(--base-color) transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 0.8s linear infinite;

  &-block {
    width: 30px;
    height: 30px;
    animation: showSpinner 0.5s ease;

    &--hiding {
      animation: hiddenSpinner 0.5s ease forwards;
    }
  }
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes showSpinner {
  from {
    transform: scale(0.5);
    filter: blur(8px);
    opacity: 0;
  }
  to {
    transform: scale(1);
    filter: blur(0px);
    opacity: 1;
  }
}

@keyframes hiddenSpinner {
  from {
    transform: scale(1);
    filter: blur(0px);
    opacity: 1;
  }
  to {
    transform: scale(0.5);
    filter: blur(8px);
    opacity: 0;
  }
}
</style>
