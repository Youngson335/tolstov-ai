<template>
  <div class="message-bubble right">
    <div
      v-for="(message, index) of internalMessages"
      :key="index"
      class="message-text"
    >
      {{ message }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from "vue";

const props = defineProps<{
  message: string[];
}>();

const internalMessages = computed(() => {
  return props.message;
});
</script>

<style lang="scss" scoped>
.message-bubble {
  position: relative;
  max-width: 80%;
  padding: 12px 16px;
  margin: 8px 0;
  border-radius: 18px;
  line-height: 1.4;
  word-break: break-word;

  &.right {
    align-self: flex-end;
    background-color: var(--violet);
    color: white;

    &::after {
      content: "";
      position: absolute;
      right: 0;
      bottom: -13px;
      width: 20px;
      height: 20px;
      border: 0 solid transparent;
      border-top-width: 12px;
      border-top-color: var(--violet);
      border-radius: 0 0 0 20px;
      transform: rotate(45deg);
      transform-origin: 0 0;
    }
  }
}

.message-text {
  margin: 4px 0;
  position: relative;
  z-index: 2;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
