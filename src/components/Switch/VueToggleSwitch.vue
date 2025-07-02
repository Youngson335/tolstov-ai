<template>
  <div class="toggle-switch">
    <div class="toggle-options">
      <button
        v-for="option in options"
        :key="option.id"
        class="toggle-option"
        :class="{ active: props.modelValue === option.id }"
        @click="selectOption(option.id)"
      >
        {{ option.name }}
        <span v-if="option.span">{{ option.span }}</span>
      </button>
      <div class="toggle-slider" :style="sliderStyle" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type ToggleSwitchOption from "./ToggleSwitchOption";

const props = defineProps<{
  modelValue: number;
  options: ToggleSwitchOption[];
}>();

const emit = defineEmits(["update:modelValue", "input"]);

const selectOption = (id: number) => {
  emit("update:modelValue", id);
  emit("input", id);
};

const sliderStyle = computed(() => {
  const activeIndex = props.options.findIndex(
    (option) => option.id === props.modelValue
  );
  const optionWidth = 100 / props.options.length;

  return {
    width: `${optionWidth}%`,
    transform: `translateX(${activeIndex * 100}%)`,
  };
});
</script>

<style lang="scss" scoped>
.toggle-switch {
  --toggle-height: 40px;
  --toggle-border-radius: 18px;
  --toggle-bg: #f5f5f5;
  --toggle-active-bg: #ffffff;
  --toggle-text-color: #333333;
  --toggle-active-text-color: var(--white);
  --toggle-slider-color: var(--violet);
  --toggle-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  --toggle-transition: all 0.3s ease;

  position: relative;
  display: inline-block;
  width: 100%;
  border-radius: var(--toggle-border-radius);
  background-color: var(--dark-violet);
  box-shadow: var(--toggle-box-shadow);
  overflow: hidden;

  .toggle-options {
    position: relative;
    display: flex;
    height: var(--toggle-height);
    & span {
      margin-left: 5px;
      background-color: var(--toggle-slider-color);
      color: var(--white);
      padding: 3px 5px;
      border-radius: var(--radius);
      transition: all 0.3s ease;
    }
  }

  .toggle-option {
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 5px;
    border: none;
    background: transparent;
    color: var(--white);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    z-index: 2;
    transition: var(--toggle-transition);

    &.active {
      color: var(--toggle-active-text-color);
      & span {
        background-color: var(--dark-violet);
      }
    }
  }

  .toggle-slider {
    position: absolute;
    height: 100%;
    left: 0;
    background-color: var(--toggle-slider-color);
    border-radius: var(--toggle-border-radius);
    transition: var(--toggle-transition);
    z-index: 1;
  }
}
</style>
