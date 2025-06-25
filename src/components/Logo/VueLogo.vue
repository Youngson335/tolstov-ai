<template>
  <div class="vue-logo">
    <p class="logo"><span>#tolstov</span>GPT</p>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss">
.vue-logo {
  color: var(--violet);
  & span {
    font-weight: 400;
  }
  & p {
    display: inline-block;
    background: var(--dark-violet);
    padding: 0px 16px;
    border-radius: 18px;
    font-weight: 600;
  }
}
</style>
