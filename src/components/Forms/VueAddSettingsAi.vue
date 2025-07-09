<template>
  <form class="vue-add-settings-ai">
    <div class="vue-add-settings-ai__item">
      <vue-text-input
        v-model="draftSettingsTitleValue"
        :placeholder="draftSettingsTitlePlaceholder"
      />
    </div>
    <div class="vue-add-settings-ai__item">
      <vue-text-area
        v-model="draftSettingsValue"
        :placeholder="draftSettingsPlaceholder"
        @update:modelValue="onInput"
      />
    </div>
  </form>
</template>
<script lang="ts" setup>
import { ref, defineProps, defineEmits } from "vue";
import VueTextArea from "../Inputs/VueTextArea.vue";
import VueTextInput from "../Inputs/VueTextInput.vue";

const props = defineProps<{
  modelValue: string;
  draftTitle: string;
}>();
const emits = defineEmits(["update:modelValue", "update:draft-title"]);

const draftSettingsValue = ref(props.modelValue);
const draftSettingsPlaceholder =
  'Например: "Отвечай максимально подробно на мои вопросы"';
const draftSettingsTitleValue = ref(props.draftTitle);
const draftSettingsTitlePlaceholder = "Введите название настройки";

const onInput = () => {
  emits("update:modelValue", draftSettingsValue.value);
  emits("update:draft-title", draftSettingsTitleValue.value);
};
</script>
<style lang="scss">
.vue-add-settings-ai {
  &__item {
    margin-bottom: 10px;
  }
}
</style>
