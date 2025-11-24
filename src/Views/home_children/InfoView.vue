<template>
  <div class="info-view">
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
<script lang="ts" setup></script>
<style lang="scss">
.info-view {
  width: calc(100% - 50px);
  background: var(--gray);
  min-height: 50vh;
  padding: var(--padding-block);
  border-radius: calc(var(--padding-block) + var(--radius));
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
