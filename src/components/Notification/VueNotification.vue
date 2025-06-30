<template>
  <div class="vue-notification">
    <div :class="props.type">
      <div class="flex">
        <div class="flex-shrink-0" v-if="hasIcon">
          <svg
            class="notification-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              v-if="type === NotificationStatus.SUCCESS"
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
            <path
              v-if="type === NotificationStatus.WARNING"
              fill-rule="evenodd"
              d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
              clip-rule="evenodd"
            />
            <path
              v-if="type === NotificationStatus.ERROR"
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="notification-prompt-wrap">
          <p class="notification-prompt-heading">
            <slot name="title"></slot>
          </p>
          <div class="notification-prompt-prompt">
            <slot name="description"></slot>
          </div>
          <div class="notification-button-container" v-if="showAnyButtons">
            <button
              type="button"
              class="notification-button-main"
              @click="$emit('action')"
              v-if="showActionButton"
            >
              <slot name="actions"></slot>
            </button>

            <button
              type="button"
              class="notification-button-secondary"
              @click="$emit('cancel')"
              v-if="showCancelButton"
            >
              <slot name="cancel"></slot>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import NotificationStatus from "../../notification/NotificationStatus";

const props = defineProps({
  type: {
    type: String as () => NotificationStatus,
  },
  isButtons: {
    type: Boolean,
    default: false,
  },
  isActionButton: {
    type: Boolean,
    default: false,
  },
  isCanceledButton: {
    type: Boolean,
    default: false,
  },
  hasIcon: {
    type: Boolean,
    default: true,
  },
});

defineEmits(["action", "cancel"]);

const showActionButton = computed(
  () => props.isButtons || props.isActionButton
);
const showCancelButton = computed(
  () => props.isButtons || props.isCanceledButton
);
const showAnyButtons = computed(
  () => showActionButton.value || showCancelButton.value
);
</script>

<style scoped lang="scss">
.vue-notification {
  --payment_success: #10b981;
  --payment_fail: #ef4444;
  --payment_info: #3b82f6;
  --payment_warning: #f59e0b;

  --payment_fail-opacity: rgba(239, 68, 68, 0.1);
  --payment_info-opacity: rgba(59, 130, 246, 0.1);
  --payment_success-opacity: rgba(16, 185, 129, 0.1);
  --payment_warning-opacity: rgba(245, 158, 11, 0.1);
  width: 100%;
  height: auto;
  font-size: 0.875rem;
  line-height: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: showNotification 0.3s ease;
  @keyframes showNotification {
    0% {
      opacity: 0;
      filter: blur(3px);
    }
    100% {
      opacity: 1;
      filter: blur(0px);
    }
  }
}

.flex {
  display: flex;
}

.flex-shrink-0 {
  flex-shrink: 0;
}

.notification-svg {
  width: 1.25rem;
  height: 1.25rem;
}

.notification-prompt-wrap {
  margin-left: 0.75rem;
}

.notification-prompt-heading {
  font-weight: bold;
  text-align: start;
}

.notification-prompt-prompt {
  margin-top: 0.5rem;
  text-align: start;
}

.notification-button-container {
  display: flex;
  margin-top: 0.875rem;
  margin-bottom: -0.375rem;
  margin-left: -0.5rem;
  margin-right: -0.5rem;
  font-family: "sf-pro-italic-100";
}

.notification-button-main,
.notification-button-secondary {
  padding: 0.375rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.notification-button-secondary {
  margin-left: 0.75rem;
}

/* Success styles */
.success {
  padding: 1rem;
  border-radius: 15px;
  background-color: var(--payment_success-opacity);
}

.success .notification-svg {
  color: var(--payment_success);
}

.success .notification-prompt-heading {
  color: var(--payment_success);
}

.success .notification-prompt-prompt {
  color: var(--payment_success);
}

.success .notification-button-main,
.success .notification-button-secondary {
  background-color: var(--payment_success-opacity);
  color: var(--payment_success);
}

.success .notification-button-main:hover,
.success .notification-button-secondary:hover {
  background-color: #d1fae5;
}

/* Warning styles */
.warning {
  padding: 1rem;
  border-radius: 15px;
  background-color: var(--payment_warning-opacity);
}

.warning .notification-svg {
  color: var(--payment_warning);
}

.warning .notification-prompt-heading {
  color: var(--payment_warning);
}

.warning .notification-prompt-prompt {
  color: var(--payment_warning);
}

.warning .notification-button-main,
.warning .notification-button-secondary {
  background-color: var(--payment_warning-opacity);
  color: var(--payment_warning);
}

.warning .notification-button-main:hover,
.warning .notification-button-secondary:hover {
  background-color: var(--payment_warning-opacity);
}

/* Error styles */
.error {
  padding: 1rem;
  border-radius: 15px;
  background-color: var(--payment_fail-opacity);
}

.error .notification-svg {
  color: var(--payment_fail);
}

.error .notification-prompt-heading {
  color: var(--payment_fail);
}

.error .notification-prompt-prompt {
  color: var(--payment_fail);
}

.error .notification-button-main,
.error .notification-button-secondary {
  background-color: var(--payment_fail-opacity);
  color: var(--payment_fail);
}

.error .notification-button-main:hover,
.error .notification-button-secondary:hover {
  background-color: var(--payment_fail-opacity);
}
</style>
