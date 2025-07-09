<template>
  <div class="stat-card">
    <div class="stat-card__icon">
      <slot name="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="12" y1="20" x2="12" y2="10"></line>
          <line x1="18" y1="20" x2="18" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="16"></line>
        </svg>
      </slot>
    </div>

    <div class="stat-card__content">
      <h3 class="stat-card__title">{{ statItem.title }}</h3>
      <p class="stat-card__value">{{ formattedValue }}</p>
    </div>

    <div class="stat-card-loading">
      <vue-spinner v-model:is-loading="isInternalLoading" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import VueSpinner from "../Loaders/VueSpinner.vue";
import type { StatisticsItem } from "../../store/statisticsStore";
import { useStatisticsStore } from "../../store/statisticsStore";

const props = defineProps<{
  statItem: StatisticsItem;
}>();

const statisticsStore = useStatisticsStore();

const isInternalLoading = ref(false);

watch(
  () => props.statItem.value,
  (newVal) => {
    if (newVal === 0) {
      isInternalLoading.value = true;
    } else if (newVal > 0) {
      async () =>
        await new Promise((resolve) => {
          setTimeout(resolve, 1000);
        });
      isInternalLoading.value = false;
    }
  }
);

if (props.statItem.value === 0 && !statisticsStore.uploadFlag) {
  isInternalLoading.value = true;
}

const formattedValue = computed(() => {
  if (props.statItem.value >= 1000000) {
    return `${(props.statItem.value / 1000000).toFixed(1)}M`;
  }
  if (props.statItem.value >= 1000) {
    return `${(props.statItem.value / 1000).toFixed(1)}K`;
  }
  return props.statItem.value.toLocaleString();
});

watch(
  () => statisticsStore.uploadFlag,
  (newVal: null | 1) => {
    if (newVal === 1) {
      isInternalLoading.value = false;
    }
  }
);
</script>

<style lang="scss" scoped>
.stat-card {
  --card-bg: #ffffff;
  --card-border: #e5e7eb;
  --text-color: #374151;
  --highlight-color: #4f46e5;
  --trend-up-color: #10b981;
  --trend-down-color: #ef4444;

  border-radius: var(--radius);
  padding: 20px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  background: var(--base-background);
  position: relative;

  &--highlight {
    border-left: 4px solid var(--highlight-color);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  &__icon {
    width: 48px;
    height: 48px;
    border-radius: 8px;
    background: var(--base-background);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    color: var(--base-color);

    svg {
      width: 24px;
      height: 24px;
    }
  }

  &__content {
    flex: 1;
  }

  &-loading {
    position: absolute;
    right: 10px;
    bottom: 10px;
  }

  &__title {
    font-size: 14px;
    font-weight: 500;
    color: var(--white);
    margin-bottom: 8px;
    line-height: 1.4;
  }

  &__value {
    font-size: 24px;
    font-weight: 700;
    color: var(--text-color);
    margin: 0;
    line-height: 1.2;
  }

  &__trend {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 12px;
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 9999px;

    &--up {
      background: rgba(16, 185, 129, 0.1);
      color: var(--trend-up-color);
    }

    &--down {
      background: rgba(239, 68, 68, 0.1);
      color: var(--trend-down-color);
    }
  }

  // Темная тема
  @media (prefers-color-scheme: dark) {
    --card-bg: #1f2937;
    --card-border: #374151;
    --text-color: #f3f4f6;
  }
}

// Адаптация для мобильных устройств
@media (max-width: 768px) {
  .stat-card {
    padding: 16px;

    &__icon {
      width: 40px;
      height: 40px;
      margin-bottom: 12px;

      svg {
        width: 20px;
        height: 20px;
      }
    }

    &__title {
      font-size: 13px;
    }

    &__value {
      font-size: 20px;
    }
  }
}
</style>
