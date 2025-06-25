<template>
  <div class="home-view container">
    <div class="home-view__start">
      <vue-welcome />
      <vue-smart-input :is-chat-page="false" />
      <p>Слишком "умная" нейросеть</p>
    </div>
    <div class="home-view__block">
      <div class="home-view__sticker">
        <vue-animated-stickers :stickers="stickers" :interval="3000" />
      </div>
      <div class="home-view__description">
        <vue-message
          :message="[
            'Данная нейросеть создана для вашего развития! Чуть позже поймете, как она это делает)',
          ]"
        />
      </div>
      <div>
        <div v-if="isUserRegister" class="home-view__avatar">
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
} from "../assets/stickers";

import VueAnimatedStickers from "../components/UI/VueAnimatedStickers.vue";
import { computed } from "vue";

const userInfoStore = useUserInfoStore();

const isUserRegister = computed(() => {
  return userInfoStore.isUser;
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
];
</script>

<style lang="scss" scoped>
.auth-block {
  padding: 20px;
}
.home-view {
  height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  @media (max-width: 820px) {
    flex-direction: column;
  }

  &__block {
    display: flex;
    flex-direction: column;
    @media (max-width: 820px) {
      height: 100%;
      width: 100%;
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
    }

    & .vue-welcome {
      margin-bottom: 50px;
      // @media (max-width: 820px) {
      //   margin-bottom: 0;
      //   h1 {
      //     text-align: start;
      //   }
      // }
    }
    & .vue-smart-input {
      margin-bottom: 10px;
      // @media (max-width: 820px) {
      //   margin-bottom: 50px;
      // }
    }
    & p {
      font-size: 14px;
      color: var(--light-gray);
      font-weight: 100;
      text-align: start;
    }
  }

  &__sticker {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    position: relative;
    height: 120px; /* Фиксированная высота для контейнера */
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

    @media (max-width: 820px) {
      display: flex;
      justify-content: end;
      max-width: 100%;
      width: 100%;
    }
  }

  // @media (max-width: 820px) {
  //   flex-direction: column-reverse;
  //   justify-content: center;
  // }
}
</style>
