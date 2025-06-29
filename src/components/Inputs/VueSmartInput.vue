<template>
  <div
    class="vue-smart-input"
    @click="focusTextarea"
    :class="{
      'vue-smart-input__disabled': isProcessResponse,
      'vue-smart-input__chat': props.isChatPage,
    }"
  >
    <div class="vue-smart-input__value">
      <textarea
        ref="textarea"
        v-model="currentMessage"
        @keydown.enter="handleEnter"
        @keydown.delete="handleDelete"
        @blur="isFocused = false"
        :placeholder="placeholderText"
        :disabled="isProcessResponse"
      ></textarea>

      <div
        class="vue-smart-input__button"
        @click="sendMessages"
        @keypress.enter="sendMessages"
        :class="{
          active__send: currentMessage.length > 0 || internalMessage.length > 0,
        }"
      >
        <img :src="arrow_icon" alt="Отправить" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  onMounted,
  nextTick,
  computed,
  defineProps,
  onBeforeUnmount,
} from "vue";
import { useChatStore } from "../../store/messageStore";
import { arrow_icon } from "../../assets/icons";
import { useRoute } from "vue-router";
import router from "../..";
import { useResponsesAIStore } from "../../store/responsesAIStore";

const props = defineProps<{
  isChatPage?: boolean;
}>();

const chatStore = useChatStore();
const currentMessage = ref("");
const textarea = ref<HTMLTextAreaElement>();
const isFocused = ref(false);
const internalMessage = computed(() => {
  return chatStore.currentMessages;
});
const placeholderText = "Введите сообщение...";
const route = useRoute();
const aiStore = useResponsesAIStore();

const isProcessResponse = computed(() => {
  return aiStore.isProcess;
});

const focusTextarea = () => textarea.value?.focus();

const keyboardHeight = ref(0);

const adjustTextareaHeight = () => {
  nextTick(() => {
    if (!textarea.value) return;

    textarea.value.style.height = "auto";
    const newHeight = Math.min(textarea.value.scrollHeight, 200);
    textarea.value.style.height = `${newHeight}px`;

    adjustInputPosition();
  });
};

onMounted(() => {
  textarea.value?.addEventListener("focus", () => {
    isFocused.value = true;
  });

  textarea.value?.addEventListener("input", adjustTextareaHeight);
});

onBeforeUnmount(() => {
  textarea.value?.removeEventListener("input", adjustTextareaHeight);
});

const adjustInputPosition = () => {
  if (!textarea.value) return;

  if (keyboardHeight.value > 0) {
    const inputRect = textarea.value.getBoundingClientRect();
    const inputBottom = inputRect.bottom;
    const viewportHeight = window.innerHeight;

    if (inputBottom > viewportHeight - keyboardHeight.value) {
      const offset = inputBottom - (viewportHeight - keyboardHeight.value) + 20;
      window.scrollBy({
        top: offset,
        behavior: "smooth",
      });
    }
  }
};

const handleEnter = (e: KeyboardEvent) => {
  if (!e.shiftKey) {
    e.preventDefault();
    sendMessages();
  }
};

const handleDelete = (e: KeyboardEvent) => {
  if (currentMessage.value === "" && chatStore.currentMessages.length > 0) {
    e.preventDefault();
    const lastMessage = chatStore.currentMessages.pop();
    currentMessage.value = lastMessage || "";
  }
};

const sendMessages = async () => {
  isFocused.value = false;
  if (route.path !== "chat") {
    router.push("/chat");
  }
  if (currentMessage.value.trim()) {
    chatStore.addMessageToCurrent(currentMessage.value);
  }

  chatStore.saveCurrentMessages(currentMessage.value);
  chatStore.clearCurrentMessages();

  currentMessage.value = "";

  await nextTick();
};

//по хорошему этот блок кода нужно вынести в другое место
if (chatStore.chatHistory.length <= 0) {
  router.push("/");
}
</script>

<style lang="scss">
.vue-smart-input {
  position: relative;
  width: 100%;
  cursor: text;
  &__chat {
    position: fixed;
    bottom: 20px;
    left: 0;
    right: 0;
    max-width: 700px;
    margin: 0 auto;
    z-index: 100;
  }

  textarea {
    width: 100%;
    background-color: var(--gray);
    border: none;
    outline: none;
    font-size: 15px;
    color: var(--white);
    resize: none;
    &::placeholder {
      font-size: 15px;
      color: var(--light-gray);
    }
  }
  &__disabled {
    opacity: 0.5;
  }

  &__value {
    white-space: pre-wrap;
    min-height: 100px;
    padding: 10px;
    border: 1px solid var(--light-gray);
    background-color: var(--gray);
    border-radius: 20px;
    position: relative;
    transition: all 0.4s ease;
  }

  &__button {
    position: absolute;
    cursor: no-drop;
    opacity: 0.5;
    bottom: 10px;
    right: 10px;
    background-color: var(--light-gray);
    padding: 10px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.4s ease;
    & img {
      display: block;
      width: 20px;
      height: 20px;
    }
  }

  .cursor {
    display: inline-block;
    width: 1px;
    height: 16px;
    background: var(--white);
    animation: blink 1s infinite;
    vertical-align: middle;
    position: relative;
    top: -1px;
    left: -1.5px;
    &__disabled {
      display: none;
    }
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
}
.active__send {
  opacity: 1 !important;
  cursor: pointer !important;
  transition: all 0.3s ease;
  &:active {
    scale: 1.1;
    transition: all 0.3s ease;
  }
}
.placeholder {
  opacity: 0.4;
}
</style>
