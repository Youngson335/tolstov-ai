<template>
  <form class="vue-auth-form">
    <div v-if="!isEditForm">
      <div class="vue-auth-form__item" @click="onStartEditForm">
        <vue-button>Зарегестрироваться</vue-button>
      </div>
    </div>
    <div v-if="isEditForm">
      <div class="vue-auth-form__item">
        <vue-text-input v-model="familyName" :placeholder="'Фамилия'" />
      </div>
      <div class="vue-auth-form__item">
        <vue-text-input v-model="nameValue" :placeholder="'Имя'" />
      </div>
      <div class="vue-auth-form__item">
        <vue-text-input v-model="surNameValue" :placeholder="'Отчество'" />
      </div>
      <div class="vue-auth-form__item">
        <vue-button @click="onSaveUserInfo" :enabled="isValidForm"
          >Сохранить</vue-button
        >
      </div>
    </div>
  </form>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import VueTextInput from "../Inputs/VueTextInput.vue";
import VueButton from "../Buttons/VueButton.vue";
import { useUserInfoStore } from "../../store/userInfoStore";

const nameValue = ref("");
const familyName = ref("");
const surNameValue = ref("");
const isEditForm = ref(false);

const userInfoStore = useUserInfoStore();

userInfoStore.initUserInfo();

const isValidForm = computed(() => {
  return !!(nameValue.value && familyName.value && surNameValue.value);
});

const onStartEditForm = () => {
  isEditForm.value = true;
};

const onSaveUserInfo = () => {
  userInfoStore.setUserInfo(
    surNameValue.value,
    nameValue.value,
    familyName.value
  );
};
</script>
<style lang="scss">
.vue-auth-form {
  &__item {
    margin-bottom: 10px;
  }
}
</style>
