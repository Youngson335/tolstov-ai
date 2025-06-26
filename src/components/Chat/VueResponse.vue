<template>
  <div class="vue-response">
    <!-- Лоадер "думания" -->
    <div v-if="isLoading" class="thinking-loader">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>

    <!-- Контент -->
    <div v-show="!isLoading">
      <div v-if="isImage && showImage" class="vue-response__image">
        <img :src="props.response" alt="" />
      </div>
      <div v-else class="text-content">
        {{ displayedText }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watch, computed } from "vue";
import { useResponsesAIStore } from "../../store/responsesAIStore";

const props = defineProps<{
  response: string;
}>();

const displayedText = ref("");
const showImage = ref(false);
const isLoading = ref(true);
let typingInterval: number;
let currentIndex = 0;

const aiStore = useResponsesAIStore();

const isImage = computed(() => {
  return (
    props.response.startsWith("/assets") ||
    props.response.startsWith("/src/assets")
  );
});

const startTyping = () => {
  isLoading.value = true;
  displayedText.value = "";
  currentIndex = 0;
  clearInterval(typingInterval);

  if (isImage.value) {
    setTimeout(() => {
      showImage.value = true;
      isLoading.value = false;
      aiStore.toggleProcess();
    }, 1000);
  } else {
    // Задержка перед началом печати текста (как у картинки)
    setTimeout(() => {
      isLoading.value = false;
      typingInterval = setInterval(() => {
        if (currentIndex < props.response.length) {
          displayedText.value += props.response[currentIndex];
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          aiStore.isProcess = false;
        }
      }, 50);
    }, 1000);
  }
};

onMounted(startTyping);

watch(
  () => props.response,
  () => {
    showImage.value = false;
    startTyping();
  }
);

onUnmounted(() => {
  clearInterval(typingInterval);
});
</script>

<style scoped lang="scss">
.vue-response {
  background: #201f1f;
  padding: 12px 16px;
  border-radius: 18px;
  position: relative;
  min-height: 40px;

  .text-content {
    white-space: pre-wrap; // Сохраняем переносы строк
  }

  &__image {
    max-width: 100px;
    animation: showImage 0.4s ease-in;

    img {
      display: block;
      width: 100%;
    }

    @keyframes showImage {
      0% {
        opacity: 0;
        filter: blur(8px);
      }
      100% {
        opacity: 1;
        filter: blur(0px);
      }
    }
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -28px;
    width: 20px;
    height: 25px;
    border: 0 solid transparent;
    border-top-width: 18px;
    border-top-color: #201f1f;
    border-radius: 0 0 20px 0;
    transform: rotate(-13deg);
    transform-origin: 0 0;
    z-index: -1;
  }
}

.thinking-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  height: 20px;
  padding: 10px 0;

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #a1a1a1;
    animation: thinking-animation 1.4s infinite ease-in-out both;

    &:nth-child(1) {
      animation-delay: -0.32s;
    }

    &:nth-child(2) {
      animation-delay: -0.16s;
    }
  }
}

@keyframes thinking-animation {
  0%,
  80%,
  100% {
    transform: scale(0.6);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
