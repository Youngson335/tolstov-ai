<template>
  <div class="vue-start-chat-message">
    <div class="vue-start-chat-message__text">
      <h2>Задайте свой вопрос!</h2>
      <p>Привет! Сколько будет 2 + 2?</p>
    </div>
    <div class="vue-start-chat-message__stickers">
      <vue-animated-stickers :stickers="arrStickers" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import VueAnimatedStickers from "../UI/VueAnimatedStickers.vue";
import {
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
} from "../../assets/stickers";
import type Sticker from "../UI/Sticker";

const arrStickers: Sticker[] = [
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
</script>
<style lang="scss">
.vue-start-chat-message {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-height: 200px;
  &__text {
    text-align: start;
    margin-bottom: 20px;
    color: var(--light-gray);
  }
  &__stickers {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    opacity: 0.6;
  }
}
</style>
