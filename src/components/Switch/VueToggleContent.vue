<template>
  <div class="vue-toggle-content">
    <div class="vue-toggle-content__desktop" @click="onChange">
      <p>{{ props.options.name }}</p>
      <span>{{ props.options.span }}</span>
    </div>
    <div class="vue-toggle-content__mobile"></div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import type ToggleSwitchOption from "./ToggleSwitchOption";

const props = defineProps<{
  //   modelValue: number;
  options: ToggleSwitchOption;
}>();

const emits = defineEmits(["update:modelValue", "change"]);

const onChange = () => {
  emits("change", props.options.id);
};
</script>
<style lang="scss"></style>
