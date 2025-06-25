<template>
  <div class="sticker-container">
    <transition-group name="sticker-animation" tag="div">
      <img
        v-for="(sticker, index) in visibleStickers"
        :key="sticker.id"
        :src="sticker.src"
        alt=""
        class="sticker"
        :style="{ zIndex: stickers.length - index }"
      />
    </transition-group>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watch } from "vue";

interface Sticker {
  id: number | string;
  src: string;
}

const props = defineProps<{
  stickers: Sticker[];
  interval?: number; // время между переходами в ms
}>();

const emit = defineEmits(["sticker-changed"]);

const activeIndex = ref(0);
const visibleStickers = ref<Sticker[]>([]);
const imagesLoaded = ref(false);

let intervalId: number;

// Функция для предзагрузки изображений
const preloadImages = async () => {
  const promises = props.stickers.map((sticker) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = sticker.src;
      img.onload = resolve;
      img.onerror = resolve; // Продолжаем даже если одно изображение не загрузилось
    });
  });

  await Promise.all(promises);
  imagesLoaded.value = true;
  initStickers();
  if (props.stickers.length > 1) {
    startAnimation();
  }
};

// Инициализация первого стикера
const initStickers = () => {
  if (props.stickers.length > 0) {
    visibleStickers.value = [props.stickers[0]];
  }
};

// Переключение на следующий стикер
const nextSticker = () => {
  if (!imagesLoaded.value) return;

  activeIndex.value = (activeIndex.value + 1) % props.stickers.length;
  visibleStickers.value = [props.stickers[activeIndex.value]];
  emit("sticker-changed", activeIndex.value);
};

// Запуск автоматического переключения
const startAnimation = () => {
  stopAnimation();
  intervalId = setInterval(nextSticker, props.interval ?? 3000);
};

// Остановка анимации
const stopAnimation = () => {
  if (intervalId) {
    clearInterval(intervalId);
  }
};

// Реакция на изменение входного массива стикеров
watch(
  () => props.stickers,
  (newStickers) => {
    imagesLoaded.value = false;
    preloadImages();
  },
  { immediate: true }
);

onMounted(() => {
  preloadImages();
});

onUnmounted(() => {
  stopAnimation();
});
</script>

<style scoped>
.sticker-container {
  position: relative;
  width: 100%;
  height: 120px; /* Фиксированная высота контейнера */
  overflow: hidden;
  display: flex;
  justify-content: flex-end;
}

.sticker {
  max-width: 100px;
  width: 100%;
  position: absolute;
  right: 0;
}

/* Анимации */
.sticker-animation-enter-active,
.sticker-animation-leave-active {
  transition: all 1s ease;
}

.sticker-animation-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.sticker-animation-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.sticker-animation-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
