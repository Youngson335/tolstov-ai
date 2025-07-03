<template>
  <button
    class="vue-toggle-content"
    @click="onChange"
    :disabled="props.options.disabled ? props.options.disabled : false"
  >
    <p class="vue-toggle-content--p">{{ props.options.name }}</p>
    <span class="vue-toggle-content--span">{{ props.options.span }}</span>
  </button>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import type ToggleSwitchOption from "./ToggleSwitchOption";

const props = defineProps<{
  options: ToggleSwitchOption;
}>();

const emits = defineEmits(["change"]);

const onChange = () => {
  emits("change", props.options.id);
};
</script>
<style lang="scss" scoped>
button:disabled {
  opacity: 0.7;
}
.vue-toggle-content {
  cursor: pointer;
  height: 100%;
  display: flex;
  font-size: 16px;
  align-items: center;
  justify-content: center;
  text-wrap: nowrap;
  background-color: var(--dark-violet);
  color: var(--violet);
  padding: 12px 16px;
  border-radius: var(--radius);
  transition: all 0.3s ease;
  border: none;
  &--p {
    margin-right: 5px;
    @media (max-width: 820px) {
      display: none;
    }
  }
  &--span {
    background-color: var(--violet);
    color: var(--white);
    padding: 2px 5px;
    border-radius: var(--radius);
    text-align: center;
    min-width: 55px;
    @media (max-width: 820px) {
      padding: 5px 10px;
      min-width: 65px;
    }
  }
  &:active {
    scale: 1.1;
    transition: all 0.3s ease;
  }
}
</style>
