<template>
  <div class="welcome-view container">
    <div class="welcome-view__start">
      <vue-welcome class="welcome-view__start-welcome" />
      <div class="welcome-view__toggle-model">
        <p>Выбрать модель</p>
        <div class="welcome-view__toggle-model--toggler">
          <vue-toggle-switch
            :options="toggleModelOptions"
            v-model="selectedIdModel"
            :is-animation="true"
            @input="setNewAiMode($event)"
          />
        </div>
      </div>
      <vue-smart-input :is-chat-page="false" />
      <p>Слишком "умная" нейросеть</p>
    </div>
    <div class="welcome-view__block">
      <vue-welcome class="welcome-view__block-welcome" />
      <div class="welcome-view__description">
        <vue-message
          :is-animate="true"
          :message="[
            'Данная нейросеть создана для вашего развития! Чуть позже поймете, как она это делает)',
          ]"
        />
        <div style="display: flex; justify-content: start; width: 100%">
          <vue-response
            :response="'Чтобы использовать PRO версию, необходимо пройти регистрацию!'"
            :ai-mode="aiMode"
          />
        </div>
      </div>
      <vue-notification
        :type="NotificationStatus.SUCCESS"
        class="welcome-view__notification"
      >
        <template #title> Последние обновления (24.11.2025) </template>
        <template #description>
          <li>Убрали авторизацию</li>
          <li>Любым пользователям доступна 'PRO' версия модели</li>
          <li>Упрощен интерфейс личных настроек</li>
        </template>
      </vue-notification>
      <div class="welcome-view__auth-info">
        <div class="welcome-view__avatar">
          <vue-user-avatar @click="onGoToHome" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import VueWelcome from "../components/Welcome/VueWelcome.vue";
import VueSmartInput from "../components/Inputs/VueSmartInput.vue";
import VueMessage from "../components/Chat/VueMessage.vue";
import VueResponse from "../components/Chat/VueResponse.vue";
import VueToggleSwitch from "../components/Switch/VueToggleSwitch.vue";
import VueUserAvatar from "../components/User/VueUserAvatar.vue";
import { computed, ref } from "vue";
import type ToggleSwitchOption from "../components/Switch/ToggleSwitchOption";
import AiModelMode from "../enums/AiModelMode";
import AiModelModeId from "../enums/AiModelModeId";
import { useAiModelConfigStore } from "../store/aiModelConfigStore";
import initStore from "../store/initStore";
import router from "../index";
import VueNotification from "../components/Notification/VueNotification.vue";
import NotificationStatus from "../notification/NotificationStatus";

const aiModelConfigStore = useAiModelConfigStore();

const aiMode = computed((): AiModelMode => {
  return AiModelMode.BASE;
});

const selectedIdModel = ref<AiModelModeId.PRO | AiModelModeId.BASE>(
  aiModelConfigStore.aiModeValue.aiModeId
);

const toggleModelOptions = computed((): ToggleSwitchOption[] => {
  return [
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
});

const setNewAiMode = (aiId: AiModelModeId) => {
  aiModelConfigStore.setNewAiConfig(aiId);
};

const onGoToHome = () => {
  router.push("/info");
};

initStore();
</script>

<style lang="scss" scoped>
.auth-block {
  padding: 20px;
}
.welcome-view {
  height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  @media (max-width: 820px) {
    height: 100%;
    min-height: 100vh;
    flex-direction: column-reverse;
    gap: 0px;
  }

  &__block {
    display: flex;
    flex-direction: column;
    width: 50%;

    &-welcome {
      display: none;
      @media (max-width: 820px) {
        display: block;
        margin-top: 20px;
      }
    }
    @media (max-width: 820px) {
      height: 100%;
      width: 100%;
    }
  }

  &__notification {
    margin-bottom: 10px;
  }

  &__toggle-model {
    display: flex;
    flex-direction: column;
    align-items: center;
    & p {
      color: var(--white) !important;
      font-size: 15px !important;
      margin-bottom: 5px;
    }
    &--toggler {
      width: 100%;
      max-width: 300px;
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
    }
  }
  &__auth-info {
    display: flex;
    justify-content: end;
    @media (max-height: 715px) {
      margin-bottom: 20px;
      width: 100%;
    }
  }

  &__avatar {
    position: relative;
    width: 50px;
    &-loading {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-self: center;
      align-items: center;
      width: 50px;
    }
  }

  &__start {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    justify-content: center;
    border-right: 3px solid var(--light-gray);
    padding-right: 10%;
    @media (max-width: 820px) {
      border: none;
      padding-right: 0;
      height: 100%;
      margin-bottom: 10px;
    }
    &-welcome {
      @media (max-width: 820px) {
        display: none;
      }
    }

    &-stickers {
      @media (max-width: 820px) {
        display: none;
      }
    }

    & .vue-welcome {
      margin: 20px 0px;
    }
    & .vue-smart-input {
      margin-bottom: 10px;
    }
    & p {
      font-size: 14px;
      color: var(--light-gray);
      font-weight: 100;
      text-align: center;
    }
  }

  &__sticker {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    position: relative;
    height: 120px;
    overflow: hidden;

    .sticker {
      max-width: 100px;
      width: 100%;
      display: block;
      position: absolute;
      right: 0;
    }
  }

  &__description {
    max-width: 500px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 20px;

    @media (max-width: 820px) {
      display: flex;
      justify-content: end;
      max-width: 100%;
      width: 100%;
    }
  }
}
</style>
