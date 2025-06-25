<template>
  <div class="vue-response">
    {{ displayedText }}
    <span class="cursor" :class="{ 'cursor-blink': isTyping }">|</span>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useResponsesAIStore } from "../../store/responsesAIStore";

const props = defineProps<{
  response: string;
}>();

const displayedText = ref("");
const isTyping = ref(false);
let typingInterval: number;
let currentIndex = 0;

const aiStore = useResponsesAIStore();

const startTyping = () => {
  isTyping.value = true;
  setTimeout(() => {
    displayedText.value = "";
    currentIndex = 0;

    clearInterval(typingInterval);

    typingInterval = setInterval(() => {
      if (currentIndex < props.response.length) {
        displayedText.value += props.response[currentIndex];
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        isTyping.value = false;
        aiStore.toggleProcess();
      }
    }, 50);
  }, 1500);
};

onMounted(startTyping);

watch(() => props.response, startTyping);

onUnmounted(() => {
  clearInterval(typingInterval);
});
</script>

<style scoped>
.cursor {
  color: inherit;
  opacity: 1;
}

.cursor-blink {
  animation: blink 0.7s infinite;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
