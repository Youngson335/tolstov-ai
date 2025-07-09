<template>
  <button class="vue-small-red-button" type="button" :disabled="!props.enabled">
    <slot />
  </button>
</template>
<script lang="ts" setup>
import { defineProps, withDefaults } from "vue";

const props = withDefaults(
  defineProps<{
    enabled?: boolean;
  }>(),
  {
    enabled: true,
  }
);
</script>
<style lang="scss">
.vue-small-red-button {
  height: 100%;
  border: none;
  background-color: #530404;
  color: #a10606;
  padding: 6px 10px;
  border-radius: 18px;
  cursor: pointer;
  transition: all 0.4s ease;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      opacity: 0.7;
      transition: all 0.4s ease;
    }
  }
  &:active {
    scale: 1.03;
    transition: all 0.4s ease;
  }
  &:disabled {
    opacity: 0.5;
  }
}
</style>
