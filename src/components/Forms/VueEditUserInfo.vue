<template>
  <form class="vue-edit-user-info">
    <vue-text-input
      v-model="internalUserModel.userName"
      :disabled="isDisabledInput"
      :placeholder="placeholderInput"
      class="vue-edit-user-info--input"
    />
    <vue-text-input
      v-model="internalUserModel.userSurName"
      :disabled="isDisabledInput"
      :placeholder="placeholderInput"
      class="vue-edit-user-info--input"
    />
    <vue-text-input
      v-model="internalUserModel.userFamilyName"
      :disabled="isDisabledInput"
      :placeholder="placeholderInput"
      class="vue-edit-user-info--input"
    />
    <div class="vue-edit-user-info__button">
      <vue-button @click="onStartEditUserInfo" :enabled="!isRequestUpdateInfo">
        {{ stateButtonText }}
      </vue-button>
      <vue-spinner :is-loading="isRequestUpdateInfo" />
    </div>
  </form>
</template>
<script lang="ts" setup>
import { watch, ref, computed, defineProps } from "vue";
import type { UserFIO } from "../User/UserFIO";
import { useUserInfoStore } from "../../store/userInfoStore";
import VueTextInput from "../Inputs/VueTextInput.vue";
import VueButton from "../Buttons/VueButton.vue";
import VueSpinner from "../Loaders/VueSpinner.vue";

enum StateButtonText {
  EDIT = "Редактировать",
  SAVE = "Сохранить",
}

const props = defineProps<{
  userInfo: UserFIO;
}>();

const userInfoStore = useUserInfoStore();
const stateButtonText = ref<StateButtonText>(StateButtonText.EDIT);
const isDisabledInput = ref(true);
const hasChangesModel = ref(false);

const internalUserModel = ref<UserFIO>({
  userFamilyName: "",
  userName: "",
  userSurName: "",
});
const placeholderInput = computed((): string => {
  return "Загружаем...";
});
const isRequestUpdateInfo = ref(false);

const onStartEditUserInfo = async () => {
  isDisabledInput.value = !isDisabledInput.value;
  if (stateButtonText.value === StateButtonText.EDIT) {
    stateButtonText.value = StateButtonText.SAVE;
  } else if (stateButtonText.value === StateButtonText.SAVE) {
    stateButtonText.value = StateButtonText.EDIT;
  }

  if (hasChangesModel.value && stateButtonText.value == StateButtonText.EDIT) {
    isRequestUpdateInfo.value = true;
    await userInfoStore.updateUserInfo(
      internalUserModel.value,
      userInfoStore.uniqueName
    );
    isRequestUpdateInfo.value = false;
  }
};

watch(
  () => internalUserModel.value,
  () => {
    const propsUserInfoJSON = JSON.stringify(props.userInfo);
    const internalUserModelJSON = JSON.stringify(internalUserModel.value);

    if (propsUserInfoJSON !== internalUserModelJSON) {
      hasChangesModel.value = true;
    } else {
      hasChangesModel.value = false;
    }
  },
  { immediate: true, deep: true }
);

watch(
  () => props.userInfo,
  (newVal) => {
    if (newVal) {
      internalUserModel.value = { ...newVal };
    }
  },
  { immediate: true, deep: true }
);

watch(
  () => userInfoStore,
  (store) => {
    if (store.userName) {
      internalUserModel.value = {
        userFamilyName: store.userFamilyName,
        userName: store.userName,
        userSurName: store.userSurName,
      };
    }
  },
  { immediate: true, deep: true }
);
</script>
<style lang="scss">
.vue-edit-user-info {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  &--input {
    width: 45%;
    min-width: 200px;
  }
  &__button {
    display: flex;
    justify-content: center;
    align-items: center;
    & .vue-spinner-block {
      margin-left: 10px;
    }
  }
}
</style>
