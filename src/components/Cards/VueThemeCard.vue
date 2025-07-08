<template>
  <div class="vue-theme-card" :style="styleBlock"><p>THEME</p></div>
</template>
<script lang="ts" setup>
import { computed, defineProps } from "vue";
import type { Theme } from "../../store/themesStore";

const props = defineProps<{
  theme: Theme;
}>();

const styleBlock = computed(() => {
  return {
    backgroundColor: props.theme.background,
    borderColor: props.theme.border_color,
    color: props.theme.base_color,
  };
});
</script>
<style lang="scss">
.vue-theme-card {
  text-align: center;
  height: 40px;
  border-radius: var(--radius);
  padding: 10px;
  border: 1px solid;
  cursor: pointer;
  transition: all 0.3s ease;
  &:active {
    scale: 1.05;
    transition: all 0.3s ease;
  }
}
</style>
