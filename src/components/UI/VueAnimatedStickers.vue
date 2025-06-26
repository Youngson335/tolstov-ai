<template>
  <div class="sticker-container" :style="containerStyle">
    <transition-group :name="transitionName" tag="div">
      <img
        v-for="(sticker, index) in visibleStickers"
        :key="sticker.id"
        :src="sticker.src"
        alt=""
        class="sticker"
        :style="{
          zIndex: stickers.length - index,
          ...stickerStyle,
        }"
      />
    </transition-group>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";

interface Sticker {
  id: number | string;
  src: string;
}

const props = defineProps<{
  stickers: Sticker[];
  interval?: number; // время между переходами в ms
  position?: "left" | "right" | "top" | "bottom"; // позиция появления
  align?: "start" | "center" | "end" | "unset"; // выравнивание
  width?: string; // ширина стикера
  height?: string; // высота стикера
  containerHeight?: string; // высота контейнера
}>();

const emit = defineEmits(["sticker-changed"]);

const activeIndex = ref(0);
const visibleStickers = ref<Sticker[]>([]);
const imagesLoaded = ref(false);

let intervalId: number;

// Стили контейнера
const containerStyle = computed(() => ({
  height: props.containerHeight || "120px",
  justifyContent: alignMap[props.align || "end"],
  alignItems:
    props.position === "left" || props.position === "right"
      ? alignMap[props.align || "center"]
      : "unset",
}));

// Стили стикера
const stickerStyle = computed(() => ({
  width: props.width || "100px",
  height: props.height || "auto",
  [positionMap[props.position || "right"].prop]: 0,
  [oppositePositionMap[props.position || "right"]]: "unset",
}));

// Название анимации в зависимости от позиции
const transitionName = computed(
  () => `sticker-animation-${props.position || "right"}`
);

// Маппинги для удобства
const positionMap = {
  left: {
    prop: "left",
    enterFrom: "translateX(-100%)",
    leaveTo: "translateX(100%)",
  },
  right: {
    prop: "right",
    enterFrom: "translateX(100%)",
    leaveTo: "translateX(-100%)",
  },
  top: {
    prop: "top",
    enterFrom: "translateY(-100%)",
    leaveTo: "translateY(100%)",
  },
  bottom: {
    prop: "bottom",
    enterFrom: "translateY(100%)",
    leaveTo: "translateY(-100%)",
  },
};

const oppositePositionMap = {
  left: "right",
  right: "left",
  top: "bottom",
  bottom: "top",
};

const alignMap = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  unset: "unset",
};

// Функция для предзагрузки изображений
const preloadImages = async () => {
  const promises = props.stickers.map((sticker) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = sticker.src;
      img.onload = resolve;
      img.onerror = resolve;
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
  overflow: hidden;
  display: flex;
}

.sticker {
  position: absolute;
  opacity: 1;
}

/* Анимации для разных направлений */
.sticker-animation-left-enter-active,
.sticker-animation-left-leave-active {
  transition: all 1s ease;
}

.sticker-animation-left-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.sticker-animation-left-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.sticker-animation-left-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.sticker-animation-right-enter-active,
.sticker-animation-right-leave-active {
  transition: all 1s ease;
}

.sticker-animation-right-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.sticker-animation-right-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.sticker-animation-right-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.sticker-animation-top-enter-active,
.sticker-animation-top-leave-active {
  transition: all 1s ease;
}

.sticker-animation-top-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}

.sticker-animation-top-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.sticker-animation-top-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.sticker-animation-bottom-enter-active,
.sticker-animation-bottom-leave-active {
  transition: all 1s ease;
}

.sticker-animation-bottom-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.sticker-animation-bottom-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.sticker-animation-bottom-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
