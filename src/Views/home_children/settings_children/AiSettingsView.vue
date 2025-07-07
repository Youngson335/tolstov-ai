<template>
  <div class="ai-setting-view">
    <div class="ai-setting-view__title" v-if="!isAddedNewSettings">
      <h3>Добавить настройку чата для нейросети</h3>
    </div>
    <div class="ai-setting-view__settings-add">
      <div
        class="ai-setting-view__settings-add__form"
        v-if="isAddedNewSettings"
      >
        <vue-add-settings-ai
          v-model="internalDraftValue"
          v-model:draft-title="internalDraftTitle"
        />
      </div>
      <div class="ai-setting-view__settings-add__buttons">
        <vue-button
          @click="onAddNewSettingsAi"
          :enabled="
            textButtonSettingsAi === TextButtonSettingsAi.SAVE &&
            isProcessRequest
              ? isValidDraftValue
              : true
          "
        >
          {{ textButtonSettingsAi }}
        </vue-button>
        <vue-button
          v-if="textButtonSettingsAi === TextButtonSettingsAi.SAVE"
          @click="onCancelProcess"
        >
          Отменить
        </vue-button>
      </div>
    </div>
    <div class="ai-setting-view__settings-switch">
      <p v-if="!userInfoStore.id" class="ai-setting-view__settings-loading">
        Загружается...
      </p>
      <vue-ai-settings
        v-for="draft of aiDrafts"
        :key="draft.id"
        :draft="draft"
        :is-selected="checkActiveDraftId(draft.id!)"
        class="ai-setting-view__component"
        :uniqueName="userInfoStore.uniqueName"
        :get-user-info="userInfoStore.getUserInfo"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import VueButton from "../../../components/Buttons/VueButton.vue";
import VueAddSettingsAi from "../../../components/Forms/VueAddSettingsAi.vue";
import setNewAiDrafts from "../../../api/post/setNewAiDraft";
import VueAiSettings from "../../../components/Forms/VueAiSettings.vue";
import { useUserInfoStore } from "../../../store/userInfoStore";
import { useAiModelConfigStore } from "../../../store/aiModelConfigStore";

enum TextButtonSettingsAi {
  ADD = "Добавить",
  SAVE = "Сохранить",
}

const userInfoStore = useUserInfoStore();
const aiConfigStore = useAiModelConfigStore();

const isAddedNewSettings = ref(false);
const textButtonSettingsAi = ref<TextButtonSettingsAi>(
  TextButtonSettingsAi.ADD
);
const internalDraftValue = ref("");
const internalDraftTitle = ref("");
const isProcessRequest = ref(false);
const aiDrafts = computed(() => {
  return userInfoStore.aiDrafts;
});
const activeDraftId = computed((): number | null => {
  return aiConfigStore.activeAiDraftId;
});

const checkActiveDraftId = (draftId: number): boolean => {
  if (activeDraftId === null) {
    return false;
  }
  if (draftId !== activeDraftId.value) {
    return false;
  }
  if (draftId === activeDraftId.value) {
    return true;
  }
  return false;
};

const isValidDraftValue = computed(() => {
  return !!internalDraftValue.value && !!internalDraftTitle.value;
});

const onAddNewSettingsAi = async () => {
  if (!isAddedNewSettings.value) {
    textButtonSettingsAi.value = TextButtonSettingsAi.SAVE;
    isAddedNewSettings.value = !isAddedNewSettings.value;
  } else if (isAddedNewSettings.value && isValidDraftValue.value) {
    isProcessRequest.value = true;
    await setNewAiDrafts(
      { text: internalDraftValue.value, title: internalDraftTitle.value },
      userInfoStore.uniqueName
    );
    await userInfoStore.getUserInfo(userInfoStore.uniqueName);
    textButtonSettingsAi.value = TextButtonSettingsAi.ADD;
    isAddedNewSettings.value = !isAddedNewSettings.value;

    internalDraftValue.value = "";
    internalDraftTitle.value = "";
  }
};

const onCancelProcess = () => {
  isAddedNewSettings.value = false;
  textButtonSettingsAi.value = TextButtonSettingsAi.ADD;
};
</script>
<style lang="scss">
.ai-setting-view {
  margin: 10px 0px;
  &__title {
    text-align: start;
    margin: 10px 0px;
  }
  &__settings {
    &-add {
      margin-bottom: 10px;
      &__form {
        margin-bottom: 10px;
      }
      &__buttons {
        display: flex;
        gap: 5px;
      }
    }
    &-loading {
      text-align: center;
    }
  }
  &__component {
    margin-bottom: 10px;
    padding: 15px;
    border: 1px solid var(--violet);
    border-radius: 32px;
  }
}
</style>
