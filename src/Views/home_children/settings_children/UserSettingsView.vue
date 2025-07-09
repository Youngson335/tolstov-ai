<template>
  <div class="user-settings-view">
    <div class="user-settings-view__info">
      <p class="user-settings-view__info--p">Личная информация</p>
      <vue-edit-user-info :user-info="props.userInfo" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from "vue";
import VueEditUserInfo from "../../../components/Forms/VueEditUserInfo.vue";
import type { UserFIO } from "../../../components/User/UserFIO";

const props = defineProps<{
  userInfo: UserFIO;
}>();
</script>
<style lang="scss">
.user-settings-view {
  &__info {
    &--p {
      margin: 10px 0;
    }
  }
}
</style>
