<template>
  <div class="chat-view">
    <div class="chat-view__header container">
      <div class="chat-view__button">
        <vue-button @click="onStartNewChat">
          Новый чат
          <img class="chat-view-image" :src="new_chat_icon" alt="" />
        </vue-button>
      </div>
    </div>
    <div class="chat-view__process">
      <vue-chat-process ref="chatProcess">
        <vue-start-chat-message v-if="chatStore.chatHistory.length === 0" />
        <template
          v-for="group of groupedMessages"
          :key="group.question.id"
          v-else
        >
          <div class="message-container">
            <vue-message
              :message="group.question.messages"
              class="question-message"
              :class="{
                'question-message__disabled':
                  group.question.id < internalHistoryMessages.length,
              }"
              :is-animate="
                group.question.id < internalHistoryMessages.length
                  ? false
                  : true
              "
              :key="group.question.id"
            />
            <vue-response
              v-if="group.response"
              :response="group.response.response"
              class="response-message"
              :class="{
                'response-message__disabled':
                  group.response.id < internalResponses.length,
              }"
              :key="group.response.id"
            />
          </div>
        </template>
      </vue-chat-process>
      <vue-smart-input @new-message="scrollToBottom" />
      <p class="chat-view__description">
        Перед отправкой сообщения убедитесь, что ваш запрос оформлен в виде
        вопроса, иначе диалог может показаться немного бессмысленным!
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import VueSmartInput from "../components/Inputs/VueSmartInput.vue";
import VueMessage from "../components/Chat/VueMessage.vue";
import { useChatStore } from "../store/messageStore";
import { computed, ref, nextTick, watch } from "vue";
import type { ChatMessage } from "../store/messageStore";
import VueChatProcess from "../components/Chat/VueChatProcess.vue";
import { useResponsesAIStore } from "../store/responsesAIStore";
import VueResponse from "../components/Chat/VueResponse.vue";
import VueButton from "../components/Buttons/VueButton.vue";
import { new_chat_icon } from "../assets/icons";
import VueStartChatMessage from "../components/Welcome/VueStartChatMessage.vue";

const chatProcess = ref<HTMLElement>();
const chatStore = useChatStore();

const internalHistoryMessages = computed((): ChatMessage[] => {
  return chatStore.chatHistory;
});

const internalResponses = computed(() => {
  return useResponsesAIStore().responsesAI;
});

const groupedMessages = computed(() => {
  return [...internalHistoryMessages.value].reverse().map((question) => {
    const response = internalResponses.value.find((r) => r.id === question.id);
    return { question, response };
  });
});

const scrollToBottom = async () => {
  await nextTick();
  if (chatProcess.value) {
    chatProcess.value.scrollTop = 0;
  }
};

const onStartNewChat = () => {
  chatStore.clearAllHistoryMessages();
};

watch(groupedMessages, scrollToBottom, { deep: true });
</script>

<style lang="scss">
.chat-view {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  &-image {
    margin-left: 5px;
  }
  &__button {
    max-width: 200px;
  }

  &__description {
    font-size: 10px;
    color: var(--light-gray);
    margin-top: 5px;
    text-align: center;
  }

  &__process {
    display: flex;
    flex-direction: column;
    width: calc(100% - 50px);
    max-width: 600px;
    margin: 0 auto;
    height: 100%;
    padding-bottom: 20px;
  }
  &__header {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    position: absolute;
    top: 0px;
    left: 0;
    right: 0;
    z-index: 10;
    background: var(--black);
    padding: 20px;
    box-shadow: 0px 10px 20px 12px var(--black);
  }
}
</style>

<style lang="scss" scoped>
.vue-chat-process {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;
  padding: 20px 0;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
}

.message-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
  animation: messageAppear 0.3s ease-out;
  &:first-child {
    margin-top: 0;
  }
}

@keyframes messageAppear {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.question-message {
  align-self: flex-end;
  max-width: 80%;
  &__disabled {
    background-color: var(--dark-violet) !important;
    color: var(--violet) !important;
    &::after {
      border-top-color: var(--dark-violet) !important;
    }
  }
}

.response-message {
  align-self: flex-start;
  max-width: 80%;
  &__disabled {
    opacity: 0.6;
  }
}
</style>
