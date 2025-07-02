<template>
  <div class="vue-user-avatar">
    <p>{{ getUserInitials }}</p>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { useUserInfoStore } from "../../store/userInfoStore";

const userStore = useUserInfoStore();

const getUserInitials = computed(() => {
  const nameInitial = userStore.userName[0];
  const familyNameInitial = userStore.userFamilyName[0];
  return `${nameInitial}${familyNameInitial}`;
});
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
  & p {
    text-transform: uppercase;
    background-color: var(--violet);
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-weight: 600;
    width: 100%;
    height: 100%;
    background-color: var(--dark-violet);
    color: var(--violet);
    border: 1px solid;
  }
}
</style>
