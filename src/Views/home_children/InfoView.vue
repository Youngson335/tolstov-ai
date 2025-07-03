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
    <div class="info-view__ai-info">
      <div class="info-view__ai-info__model">
        <h4>
          tolstov-ai BASE -
          <span>
            чем лучше оформлен ваш prompt (запрос), тем лучше получите ответ!
            Данная нейросеть не разработана для "общения"! Она разработана
            исключительно для вашего развития! Нейросеть имеет возможность
            отвечать текстом и стикерами)
          </span>
        </h4>
      </div>
      <div class="info-view__ai-info__model">
        <h4>
          tolstov-ai PRO -
          <span>
            улучшенная версия модели BASE! Дает полноценные ответы на ваши
            вопросы и может быть вашим другом в обычном общении! Пользоваться
            моделью могут только авторизованные пользователи
          </span>
        </h4>
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
  padding: 15px;
  border-radius: var(--radius);
  &__user-info {
    &-item {
      margin-bottom: 5px;
      &--button {
        margin: 15px 0;
      }
    }
  }
  &__ai-info {
    display: flex;
    flex-direction: column;
    gap: 15px;
    & span {
      font-weight: 300;
      color: var(--white);
    }
  }
}
</style>
