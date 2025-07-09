<template>
  <div class="statistics-view">
    <div class="statistics-view__button">
      <vue-button
        :enabled="!isRequestStatistics"
        @click="onUpdateInfoStatistics"
      >
        обновить
      </vue-button>
      <vue-spinner
        class="statistics-view__button-loading"
        v-model:is-loading="isRequestStatistics"
      />
    </div>
    <div class="statistics-view__cards">
      <vue-statistics-card :stat-item="statisticsStore.userVisits" />
      <vue-statistics-card :stat-item="statisticsStore.userCountSentMessages" />
      <vue-statistics-card :stat-item="statisticsStore.allVisits" />
      <vue-statistics-card :stat-item="statisticsStore.allCountSentMessages" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";
import VueStatisticsCard from "../../components/Cards/VueStatisticsCard.vue";
import { useStatisticsStore } from "../../store/statisticsStore";
import { useUserInfoStore } from "../../store/userInfoStore";
import VueButton from "../../components/Buttons/VueButton.vue";
import VueSpinner from "../../components/Loaders/VueSpinner.vue";

const statisticsStore = useStatisticsStore();
const userInfoStore = useUserInfoStore();

const internalStatistics = ref<null | { title: string; value: number }>(null);
const isRequestStatistics = ref(false);

const onUpdateInfoStatistics = async () => {
  try {
    isRequestStatistics.value = true;
    await Promise.all([
      statisticsStore.initStatistics(),
      userInfoStore.getUserInfo(userInfoStore.uniqueName),
    ]);
  } catch (error) {
    console.error("Ошибка при загрузке статистики:", error);
  } finally {
    isRequestStatistics.value = false; // Гарантированно выключаем спиннер
  }
};

watch(
  () => statisticsStore.userVisits,
  () => {
    internalStatistics.value = statisticsStore.userVisits;
  }
);

watch(
  () => userInfoStore,
  (store) => {
    if (store.id) {
      statisticsStore.initStatistics();
    }
  },
  { immediate: true, deep: true }
);

async () => {
  await useStatisticsStore().initStatistics();
};
</script>
<style lang="scss">
.statistics-view {
  width: calc(100% - 50px);
  background: var(--gray);
  padding: var(--padding-block);
  min-height: 50vh;
  border-radius: calc(var(--padding-block) + var(--radius));
  &__cards {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  &__button {
    margin-bottom: 10px;
    display: flex;
    justify-content: start;
    align-items: center;
    &-loading {
      margin-left: 10px;
    }
  }
}
</style>
