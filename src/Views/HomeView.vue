<template>
  <div class="home-view container">
    <div class="home-view__start">
      <vue-welcome />
      <vue-smart-input :is-chat-page="false" />
    </div>
    <div class="home-view__block">
      <div class="home-view__sticker">
        <vue-animated-stickers :stickers="stickers" :interval="3000" />
      </div>
      <div class="home-view__description">
        <vue-message
          :message="[
            'Данная нейросеть создана для вашего развития! Развитие - это не про быстро!',
          ]"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import VueWelcome from "../components/Welcome/VueWelcome.vue";
import VueSmartInput from "../components/Inputs/VueSmartInput.vue";
import VueMessage from "../components/Chat/VueMessage.vue";
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
.home-view {
  height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;

  &__block {
    display: flex;
    flex-direction: column;
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
      flex-direction: column-reverse;
      border: none;
      padding-right: 0;
      height: 20%;
    }

    & .vue-welcome {
      margin-bottom: 50px;
      @media (max-width: 820px) {
        margin-bottom: 0;
        h1 {
          text-align: start;
        }
      }
    }
    & .vue-smart-input {
      @media (max-width: 820px) {
        margin-bottom: 50px;
      }
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

  @media (max-width: 820px) {
    flex-direction: column-reverse;
    justify-content: center;
  }
}
</style>
