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
            @input="setNewAiMode($event)"
          />
        </div>
      </div>
      <vue-smart-input :is-chat-page="false" />
      <p>Слишком "умная" нейросеть</p>
      <div class="welcome-view__start-stickers">
        <vue-animated-stickers
          :position="'left'"
          :align="'unset'"
          :stickers="duckStickers"
          :interval="3000"
        />
      </div>
    </div>
    <div class="welcome-view__block">
      <vue-welcome class="welcome-view__block-welcome" />
      <div class="welcome-view__sticker">
        <vue-animated-stickers :stickers="stickers" :interval="3000" />
      </div>
      <div class="welcome-view__description">
        <vue-message
          :is-animate="true"
          :message="[
            'Данная нейросеть создана для вашего развития! Чуть позже поймете, как она это делает)',
          ]"
        />
        <div style="display: flex; justify-content: start; width: 100%">
          <vue-response
            :response="'Для лучшего качества ответа советую пройти регистрацию!)'"
            :ai-mode="aiMode"
          />
        </div>
      </div>
      <div class="welcome-view__auth-info">
        <div v-if="isUserRegister" class="welcome-view__avatar">
          <vue-user-avatar />
        </div>
        <vue-auth-form v-else />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import VueWelcome from "../components/Welcome/VueWelcome.vue";
import VueSmartInput from "../components/Inputs/VueSmartInput.vue";
import VueMessage from "../components/Chat/VueMessage.vue";
import VueAuthForm from "../components/Forms/VueAuthForm.vue";
import VueUserAvatar from "../components/User/VueUserAvatar.vue";
import VueResponse from "../components/Chat/VueResponse.vue";
import { useUserInfoStore } from "../store/userInfoStore";
import {
  sticker_1,
  sticker_2,
  sticker_3,
  sticker_4,
  sticker_5,
  sticker_6,
  sticker_7,
  sticker_8,
  sticker_9,
  sticker_10,
  sticker_11,
  sticker_12,
  sticker_13,
  sticker_14,
  sticker_15,
  sticker_16,
  sticker_17,
  sticker_18,
  sticker_19,
  sticker_20,
  sticker_21,
  sticker_22,
} from "../assets/stickers";
import VueAnimatedStickers from "../components/UI/VueAnimatedStickers.vue";
import VueToggleSwitch from "../components/Switch/VueToggleSwitch.vue";
import { computed, ref } from "vue";
import type ToggleSwitchOption from "../components/Switch/ToggleSwitchOption";
import AiModelMode from "../enums/AiModelMode";
import AiModelModeId from "../enums/AiModelModeId";
import { useAiModelConfigStore } from "../store/aiModelConfigStore";

const userInfoStore = useUserInfoStore();
const aiModelConfigStore = useAiModelConfigStore();

const isUserRegister = computed(() => {
  return userInfoStore.hasUserAuth;
});
const aiMode = computed((): AiModelMode => {
  return AiModelMode.BASE;
});

const stickers = [
  { id: 1, src: sticker_1 },
  { id: 2, src: sticker_2 },
  { id: 3, src: sticker_3 },
  { id: 4, src: sticker_4 },
  { id: 5, src: sticker_5 },
  { id: 6, src: sticker_6 },
  { id: 7, src: sticker_7 },
  { id: 8, src: sticker_8 },
  { id: 9, src: sticker_9 },
  { id: 10, src: sticker_10 },
  { id: 11, src: sticker_11 },
  { id: 12, src: sticker_12 },
  { id: 13, src: sticker_13 },
];

const duckStickers = [
  { id: 1, src: sticker_10 },
  { id: 2, src: sticker_11 },
  { id: 3, src: sticker_12 },
  { id: 4, src: sticker_13 },
  { id: 5, src: sticker_14 },
  { id: 6, src: sticker_15 },
  { id: 7, src: sticker_16 },
  { id: 8, src: sticker_17 },
  { id: 9, src: sticker_18 },
  { id: 10, src: sticker_19 },
  { id: 11, src: sticker_20 },
  { id: 12, src: sticker_21 },
  { id: 13, src: sticker_22 },
];

const selectedIdModel = ref<AiModelModeId.PRO | AiModelModeId.BASE>(
  aiModelConfigStore.aiModeValue.aiModeId
);

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

const setNewAiMode = (aiId: AiModelModeId) => {
  aiModelConfigStore.setNewAiConfig(aiId);
};
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

  &__toggle-model {
    & p {
      color: var(--white) !important;
      font-size: 15px !important;
      margin-bottom: 5px;
    }
    &--toggler {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
    }
  }
  &__auth-info {
    @media (max-height: 715px) {
      margin-bottom: 20px;
    }
  }

  &__avatar {
    display: flex;
    justify-content: end;
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
