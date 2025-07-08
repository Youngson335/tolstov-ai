<template>
  <form
    class="vue-ai-settings"
    :class="{ 'vue-ai-settings-delete': isProcessDelete }"
  >
    <div class="vue-ai-settings__item">
      <div class="vue-ai-settings__info">
        <div class="vue-ai-settings__item-title">
          <h4>{{ internalDrafts.title }}</h4>
        </div>

        <div class="vue-ai-settings__item-description">
          <p
            v-if="!isShowDescription"
            class="vue-ai-settings__item-details"
            @click="isShowDescription = !isShowDescription"
          >
            Подробнее
          </p>
          <div class="vue-ai-settings__item-details-block">
            <p v-if="isShowDescription">"{{ internalDrafts.text }}"</p>
            <div class="vue-ai-settings__item-delete">
              <vue-small-red-button
                v-if="isShowDescription"
                @click="onDeleteAiDraft"
              >
                Удалить
              </vue-small-red-button>
              <vue-spinner :is-loading="isProcessDelete" />
            </div>
          </div>
        </div>
      </div>

      <div class="vue-ai-settings__item-switch">
        <vue-switch-button
          :model-value="props.isSelected"
          @update:modelValue="onSwitchSettings"
        />
      </div>
    </div>
  </form>
</template>
<script lang="ts" setup>
import { computed, defineProps, ref } from "vue";
import type AiDraftSettings from "./AiDraftSettings";
import VueSwitchButton from "../Switch/VueSwitchButton.vue";
import { useAiModelConfigStore } from "../../store/aiModelConfigStore";
import VueSmallRedButton from "../Buttons/VueSmallRedButton.vue";
import deleteAiDraft from "../../api/delete/deleteAiDraft";
import VueSpinner from "../Loaders/VueSpinner.vue";

const props = defineProps<{
  draft: AiDraftSettings;
  isSelected: boolean;
  uniqueName: string;
  getUserInfo: (uniqueName: string) => Promise<void>;
}>();

const aiConfigStore = useAiModelConfigStore();

const isShowDescription = ref(false);
const isProcessDelete = ref(false);
const internalDrafts = computed((): AiDraftSettings => {
  return props.draft;
});

const onSwitchSettings = (val: boolean) => {
  console.log(val);
  if (val) {
    aiConfigStore.selectAiDraftId(props.draft.id!);
    return;
  } else {
    aiConfigStore.initActiveDraftId(null);
  }
};

const checkIsActiveSwitch = (id: number) => {
  const isActive = id === aiConfigStore.activeAiDraftId;
  if (isActive) {
    aiConfigStore.initActiveDraftId(null);
  }
};

const onDeleteAiDraft = async () => {
  checkIsActiveSwitch(props.draft.id!);
  isProcessDelete.value = true;
  await deleteAiDraft(props.draft.id!, props.uniqueName);
  await props.getUserInfo(props.uniqueName);
};
</script>
<style lang="scss">
.vue-ai-settings {
  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-title {
      margin-bottom: 5px;
    }
    &-details {
      text-decoration: underline;
      cursor: pointer;
      &-block {
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: start;
        gap: 5px;
        & p {
          color: var(--white);
          font-style: italic;
        }
      }
    }
    &-delete {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    &-switch {
      display: flex;
      justify-self: end;
      min-width: 50px;
    }
  }
  &-delete {
    pointer-events: none;
    user-select: none;
    touch-action: none;
    opacity: 0.6;
  }
}
</style>
