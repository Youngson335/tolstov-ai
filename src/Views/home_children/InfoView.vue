<template>
  <div class="info-view">
    <div class="info-view__user-info">
      <div class="info-view__user-info-item">
        <vue-label class="info-view__user-info-item--label">Username</vue-label>
        <p class="info-view__user-info-item--p">
          {{ userInfoStore.uniqueName || "Загружаем..." }}
        </p>
      </div>
      <div class="info-view__user-info-item">
        <vue-label class="info-view__user-info-item--label">Имя</vue-label>
        <p class="info-view__user-info-item--p">
          {{ userInfoStore.userName || "Загружаем..." }}
        </p>
      </div>
      <div class="info-view__user-info-item">
        <vue-label class="info-view__user-info-item--label">Фамилия</vue-label>
        <p class="info-view__user-info-item--p">
          {{ userInfoStore.userFamilyName || "Загружаем..." }}
        </p>
      </div>
      <div class="info-view__user-info-item">
        <vue-label class="info-view__user-info-item--label">Отчество</vue-label>
        <p class="info-view__user-info-item--p">
          {{ userInfoStore.userSurName || "Загружаем..." }}
        </p>
      </div>
      <div class="info-view__user-info-item">
        <vue-button
          class="info-view__user-info-item--button"
          @click="onGoToSettingsPage"
        >
          Редактировать
        </vue-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useUserInfoStore } from "../../store/userInfoStore";
import VueLabel from "../../components/Labels/VueLabel.vue";
import VueButton from "../../components/Buttons/VueButton.vue";
import router from "../..";

const userInfoStore = useUserInfoStore();

const onGoToSettingsPage = () => {
  router.push("/settings");
};
</script>
<style lang="scss">
.info-view {
  width: calc(100% - 50px);
  background: var(--dark-violet);
  min-height: 50vh;
  padding: 20px;
  border-radius: var(--radius);
  &__user-info {
    &-item {
      margin-bottom: 5px;
      &--button {
        margin-top: 20px;
      }
    }
  }
}
</style>
