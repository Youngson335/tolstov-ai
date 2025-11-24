<template>
  <div class="vue-user-avatar">
    <img :src="user_icon_white" alt="" />
  </div>
</template>
<script lang="ts" setup>
import { user_icon_white } from "../../assets/icons";
</script>
<style lang="scss">
.vue-user-avatar {
  cursor: pointer;
  width: 50px;
  height: 50px;
  transition: all 0.3s ease;
  &:active {
    scale: 1.05;
    transition: all 0.3s ease;
  }
  & img {
    width: 50px;
    height: 50px;
  }
}
</style>
