<template>
  <div class="vie-notification-label">
    <label class="vie-notification-label--label"><slot /></label>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss">
.vie-notification-label {
  background-color: var(--base-background);
  color: var(--base-color);
  display: inline-block;
  padding: 5px;
  font-size: 12px;
  border-radius: var(--radius);
}
</style>
