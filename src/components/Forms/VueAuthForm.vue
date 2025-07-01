<template>
  <form class="vue-auth-form">
    <div v-if="!isEditForm">
      <div class="vue-auth-form__item" @click="onStartEditForm">
        <vue-button>{{ authTitle }}</vue-button>
      </div>
    </div>
    <div v-if="isEditForm">
      <div class="vue-auth-form__item">
        <h3>{{ authNameBtn }}</h3>
      </div>
      <div class="vue-auth-form__item" v-if="authNameBtn === AuthNameBtn.REG">
        <vue-text-input v-model="familyName" :placeholder="'Фамилия'" />
      </div>
      <div class="vue-auth-form__item" v-if="authNameBtn === AuthNameBtn.REG">
        <vue-text-input v-model="nameValue" :placeholder="'Имя'" />
      </div>
      <div class="vue-auth-form__item" v-if="authNameBtn === AuthNameBtn.REG">
        <vue-text-input v-model="surNameValue" :placeholder="'Отчество'" />
      </div>
      <div class="vue-auth-form__item">
        <vue-text-input v-model="uniqueNameValue" :placeholder="'user-name'" />
      </div>
      <div class="vue-auth-form__item" v-if="authNameBtn === AuthNameBtn.AUTH">
        <vue-button @click="onEditStateAuthForm"> Нет user-name? </vue-button>
      </div>
      <div class="vue-auth-form__item">
        <vue-button @click="onSaveUserInfo" :enabled="isValidForm">
          Сохранить
        </vue-button>
      </div>
    </div>
  </form>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import VueTextInput from "../Inputs/VueTextInput.vue";
import VueButton from "../Buttons/VueButton.vue";
import { useUserInfoStore } from "../../store/userInfoStore";

enum AuthNameBtn {
  AUTH = "Авторизоваться",
  REG = "Зарегестрироваться",
}

enum AuthTitle {
  AUTH = "Авторизация",
  REG = "Регистрация",
}

const nameValue = ref("");
const familyName = ref("");
const surNameValue = ref("");
const uniqueNameValue = ref("");
const isEditForm = ref(false);
const authNameBtn = ref<AuthNameBtn>(AuthNameBtn.AUTH);
const authTitle = ref<AuthTitle>(AuthTitle.AUTH);

const userInfoStore = useUserInfoStore();

// userInfoStore.getUserInfo();

const isValidForm = computed(() => {
  if (authNameBtn.value === AuthNameBtn.REG) {
    return !!(
      nameValue.value &&
      familyName.value &&
      surNameValue.value &&
      uniqueNameValue.value
    );
  } else if (authNameBtn.value === AuthNameBtn.AUTH) {
    return !!uniqueNameValue.value;
  }
});

const onStartEditForm = () => {
  isEditForm.value = true;
};

const onSaveUserInfo = () => {
  userInfoStore.setUserInfo(
    surNameValue.value,
    nameValue.value,
    familyName.value,
    uniqueNameValue.value
  );
};

const onEditStateAuthForm = () => {
  authNameBtn.value = AuthNameBtn.REG;
  authTitle.value = AuthTitle.REG;
};
</script>
<style lang="scss">
.vue-auth-form {
  &__item {
    margin-bottom: 10px;
  }
}
</style>
