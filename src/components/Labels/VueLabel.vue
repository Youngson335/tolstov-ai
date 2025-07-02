<template>
  <label class="vue-label">
    <slot />
  </label>
</template>
<script lang="ts" setup></script>
<style lang="scss">
.vue-label {
  display: inline-block;
  font-size: 12px;
  color: var(--violet);
}
</style>
