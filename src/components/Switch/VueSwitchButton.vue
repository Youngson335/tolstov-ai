<template>
  <div class="vue-switch-button">
    <input
      type="checkbox"
      class="vue-switch-button--checkbox"
      :id="uniqueId"
      v-model="internalValue"
    />
    <label class="vue-switch-button--switch" :for="uniqueId">
      <span class="vue-switch-button--slider"></span>
    </label>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  disabled: {
    type: Boolean,
  },
});

const emits = defineEmits(["update:modelValue"]);

const uniqueId = `switcher-${Math.random().toString(36).substring(2, 9)}`;

const internalValue = computed({
  get: () => props.modelValue,
  set: (value) => emits("update:modelValue", value),
});
</script>

<style lang="scss" scoped>
.vue-switch-button {
  width: 51px;
  height: 31px;
  position: relative;
  &--checkbox {
    opacity: 0;
    width: 0;
    height: 0;
    position: absolute;
    &:checked + .vue-switch-button--switch {
      background-color: #34c759;
    }
    &:checked + .vue-switch-button--switch .vue-switch-button--slider {
      left: calc(50% - 27px / 2 + 10px);
      top: calc(50% - 27px / 2);
    }
  }
  &--switch {
    width: 100%;
    height: 100%;
    display: block;
    background-color: #e9e9eb;
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.2s ease-out;
  }
  &--slider {
    width: 27px;
    height: 27px;
    position: absolute;
    left: calc(50% - 27px / 2 - 10px);
    top: calc(50% - 27px / 2);
    border-radius: 50%;
    background: #ffffff;
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.15), 0px 3px 1px rgba(0, 0, 0, 0.06);
    transition: all 0.2s ease-out;
    cursor: pointer;
  }
}
</style>
