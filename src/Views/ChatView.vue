<template>
  <div class="chat-view">
    <div class="chat-view__header container">
      <div class="chat-view__buttons">
        <vue-button @click="onStartNewChat">
          Новый чат
          <img class="chat-view-image" :src="new_chat_icon" alt="" />
        </vue-button>
        <vue-toggle-content
          :options="toggleModelOptions.find((item) => item.id === aiModeId)!"
          @change="aiModelConfigStore.toggleAiConfig($event)"
        />
        <vue-button @click="onGoToHome">
          <img :src="home_icon" alt="" />
        </vue-button>
      </div>
      <div>
        <vue-notification
          :type="notification.status!"
          :is-action-button="
            notification.status !== NotificationStatus.SUCCESS ? true : false
          "
          @action="reloadPage"
          v-if="notification.status"
        >
          <template #title>
            {{ notification.title }}
          </template>
          <template #description>
            <p>{{ notification.text }}</p>
          </template>
          <template #actions> Обновить чат </template>
        </vue-notification>
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
              v-if="notification.status !== NotificationStatus.ERROR"
              :response="group.response.response"
              :ai-mode="aiMode"
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
import { home_icon, new_chat_icon } from "../assets/icons";
import VueStartChatMessage from "../components/Welcome/VueStartChatMessage.vue";
import { useAiModelConfigStore } from "../store/aiModelConfigStore";
import AiModelMode from "../enums/AiModelMode";
import AiModelModeId from "../enums/AiModelModeId";
import VueNotification from "../components/Notification/VueNotification.vue";
import { useNotificationStore } from "../notification/notificationStore";
import type { Notification } from "../notification/notificationStore";
import NotificationStatus from "../notification/NotificationStatus";
import VueToggleContent from "../components/Switch/VueToggleContent.vue";
import type ToggleSwitchOption from "../components/Switch/ToggleSwitchOption";
import { startNetWorkMonitoring } from "../api/networkMonitor";
import router from "../index";
import initStore from "../store/initStore";

const toggleModelOptions: ToggleSwitchOption[] = [
  {
    id: AiModelModeId.BASE,
    name: "tolstov-ai",
    span: AiModelMode.BASE,
  },
  {
    id: AiModelModeId.PRO,
    name: "tolstov-ai",
    span: AiModelMode.PRO,
  },
];

const chatProcess = ref<HTMLElement>();

const chatStore = useChatStore();
const aiModelConfigStore = useAiModelConfigStore();
const notificationStore = useNotificationStore();
const responsesAiStore = useResponsesAIStore();

const aiMode = computed((): AiModelMode => {
  return aiModelConfigStore.aiModeValue.aiMode;
});
const aiModeId = computed((): AiModelModeId => {
  return aiModelConfigStore.aiModeValue.aiModeId;
});
const notification = computed((): Notification => {
  return notificationStore.notification;
});
const internalHistoryMessages = computed((): ChatMessage[] => {
  return chatStore.chatHistory;
});
const internalResponses = computed(() => {
  return responsesAiStore.responsesAI;
});
const groupedMessages = computed(() => {
  return [...internalHistoryMessages.value].reverse().map((question) => {
    const response = internalResponses.value.find(
      (r) => r.id === question.id
    ) ?? { id: question.id, response: null };

    return { question, response };
  });
});

const reloadPage = () => {
  window.location.reload();
};
const onGoToHome = () => {
  router.push("/");
};

const scrollToBottom = async () => {
  await nextTick();
  if (chatProcess.value) {
    chatProcess.value.scrollTop = 0;
  }
};

const onStartNewChat = () => {
  chatStore.clearAllHistoryMessages();
  responsesAiStore.isProcess = false;
};

startNetWorkMonitoring();

watch(groupedMessages, scrollToBottom, { deep: true });

initStore();
</script>

<style lang="scss">
.chat-view {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  max-width: 600px;
  margin: 0 auto;

  &-image {
    margin-left: 5px;
  }
  &__buttons {
    max-width: 600px;
    height: 50px;
    margin: 0 auto;
    width: 100%;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5%;
    & .vue-button {
      max-width: 150px;
    }
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
    flex-direction: column;
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
