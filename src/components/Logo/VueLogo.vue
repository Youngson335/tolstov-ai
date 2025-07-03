<template>
  <div class="vue-logo">
    <p class="logo"><span>#tolstov-</span>ai</p>
  </div>
</template>
<script lang="ts" setup>
import splitText from "../../plugins/gsap/randomText";
import { onMounted } from "vue";

onMounted(() => {
  splitText(".logo");
});
</script>
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
  @media (max-width: 820px) {
  }
}
</style>
