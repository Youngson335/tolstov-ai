<template>
  <div class="vue-welcome">
    <h1>
      <p>Добро пожаловать в</p>
      <vue-logo />
    </h1>
  </div>
</template>
<script lang="ts" setup>
import VueLogo from "../Logo/VueLogo.vue";
</script>
<style lang="scss">
h1 {
  text-align: center;
  & p {
    margin-bottom: 5px;
  }
  @media (max-width: 820px) {
    font-size: 25px;
  }
}
</style>
