<template>
  <div class="vue-error">
    <p class="vue-error--p">Ошибка: {{ props.error }}</p>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps<{
  error: string;
}>();
</script>
<style lang="scss">
.vue-error {
  &--p {
    font-size: 12px;
    color: var(--error);
  }
}
</style>
