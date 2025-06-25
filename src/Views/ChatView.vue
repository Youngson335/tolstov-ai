<template>
  <div class="chat-view">
    <div class="chat-view__process">
      <vue-chat-process ref="chatProcess">
        <template v-for="group of groupedMessages" :key="group.question.id">
          <div class="message-container">
            <vue-message
              :message="group.question.messages"
              class="question-message"
            />
            <vue-response
              v-if="group.response"
              :response="group.response.response"
              class="response-message"
            />
          </div>
        </template>
      </vue-chat-process>
      <vue-smart-input @new-message="scrollToBottom" />
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

const chatProcess = ref<HTMLElement>();

const internalHistoryMessages = computed((): ChatMessage[] => {
  return useChatStore().chatHistory;
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

watch(groupedMessages, scrollToBottom, { deep: true });
</script>

<style lang="scss">
.chat-view {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  &__process {
    display: flex;
    flex-direction: column;
    width: calc(100% - 50px);
    max-width: 600px;
    margin: 0 auto;
    height: 100%;
    padding-bottom: 20px;
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
}

.response-message {
  align-self: flex-start;
  max-width: 80%;
}
</style>
