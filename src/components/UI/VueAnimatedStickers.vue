<template>
  <div class="sticker-container" :style="containerStyle">
    <transition-group :name="transitionName" tag="div">
      <img
        v-for="(sticker, index) in visibleStickers"
        :key="sticker.id"
        :src="currentStickerSrc"
        alt=""
        class="sticker"
        :style="{
          zIndex: stickers.length - index,
          ...stickerStyle,
        }"
        loading="lazy"
        @load="onImageLoaded"
      />
    </transition-group>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import type Sticker from "./Sticker";

const props = defineProps<{
  stickers: Sticker[];
  interval?: number;
  position?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end" | "unset";
  width?: string;
  height?: string;
  containerHeight?: string;
}>();

const emit = defineEmits(["sticker-changed"]);

const activeIndex = ref(0);
const visibleStickers = ref<Sticker[]>([]);
const currentStickerSrc = ref("");
const isCurrentImageLoaded = ref(false);
let intervalId: number;

// Стили и маппинги (остаются без изменений)
const containerStyle = computed(() => ({
  height: props.containerHeight || "120px",
  justifyContent: alignMap[props.align || "end"],
  alignItems:
    props.position === "left" || props.position === "right"
      ? alignMap[props.align || "center"]
      : "unset",
}));

const stickerStyle = computed(() => ({
  width: props.width || "100px",
  height: props.height || "auto",
  [positionMap[props.position || "right"].prop]: 0,
  [oppositePositionMap[props.position || "right"]]: "unset",
}));

const transitionName = computed(
  () => `sticker-animation-${props.position || "right"}`
);

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

// Загрузка текущего изображения
const loadCurrentImage = () => {
  isCurrentImageLoaded.value = false;
  currentStickerSrc.value = props.stickers[activeIndex.value]?.src || "";
};

// Обработчик загрузки изображения
const onImageLoaded = () => {
  isCurrentImageLoaded.value = true;
};

// Переключение на следующий стикер
const nextSticker = () => {
  if (!isCurrentImageLoaded.value) return;

  activeIndex.value = (activeIndex.value + 1) % props.stickers.length;
  visibleStickers.value = [props.stickers[activeIndex.value]];
  emit("sticker-changed", activeIndex.value);
  loadCurrentImage();
};

// Запуск анимации
const startAnimation = () => {
  stopAnimation();
  if (props.stickers.length > 1) {
    intervalId = setInterval(nextSticker, props.interval ?? 3000);
  }
};

const stopAnimation = () => {
  if (intervalId) {
    clearInterval(intervalId);
  }
};

// Инициализация
const initStickers = () => {
  if (props.stickers.length > 0) {
    activeIndex.value = 0;
    visibleStickers.value = [props.stickers[0]];
    loadCurrentImage();
    startAnimation();
  }
};

watch(
  () => props.stickers,
  (newStickers) => {
    if (newStickers.length > 0) {
      initStickers();
    }
  },
  { immediate: true }
);

onMounted(() => {
  initStickers();
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
