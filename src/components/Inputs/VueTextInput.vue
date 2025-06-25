<template>
  <input
    type="text"
    @input="onInput"
    v-model="internalValue"
    :placeholder="internalPlaceholder"
    class="vue-text-input"
  />
</template>
<script lang="ts" setup>
import { defineProps, defineEmits, ref, computed } from "vue";

const props = defineProps<{
  modelValue: string;
  placeholder?: string;
}>();
const emits = defineEmits(["update:modelValue"]);

const internalValue = ref(props.modelValue);

const onInput = () => {
  emits("update:modelValue", internalValue.value);
};

const internalPlaceholder = computed(() => {
  return props.placeholder ? props.placeholder : "";
});
</script>
<style lang="scss">
.vue-text-input {
  background-color: var(--black);
  border: 1px solid var(--violet);
  padding: 12px 16px;
  width: 100%;
  border-radius: 18px;
  color: var(--white);
  outline: none;
  &::placeholder {
    color: var(--light-gray);
  }
}
</style>
