<template>
  <div class="statistics-view">
    <div class="statistics-view__cards">
      <VueStatisticsCard :stat-item="statisticsStore.userVisits" />
      <VueStatisticsCard :stat-item="statisticsStore.userCountSentMessages" />
      <VueStatisticsCard :stat-item="statisticsStore.allVisits" />
      <VueStatisticsCard :stat-item="statisticsStore.allCountSentMessages" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";
import VueStatisticsCard from "../../components/Cards/VueStatisticsCard.vue";
import useStatisticsStore from "../../store/statisticsStore";
import { useUserInfoStore } from "../../store/userInfoStore";

const statisticsStore = useStatisticsStore();
const userInfoStore = useUserInfoStore();

const internalStatistics = ref<null | { title: string; value: number }>(null);

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
</script>
<style lang="scss">
.statistics-view {
  width: calc(100% - 50px);
  background: var(--dark-violet);
  padding: var(--padding-block);
  min-height: 50vh;
  border-radius: calc(var(--padding-block) + var(--radius));
  &__cards {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
