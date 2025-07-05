<template>
  <input
    type="text"
    @input="onInput"
    v-model="internalValue"
    :placeholder="internalPlaceholder"
    class="vue-text-input"
    :disabled="props.disabled ? props.disabled : false"
  />
</template>
<script lang="ts" setup>
import { defineProps, defineEmits, ref, computed, onMounted, watch } from "vue";

const props = defineProps<{
  modelValue: string;
  placeholder?: string;
  disabled?: boolean;
}>();
const emits = defineEmits(["update:modelValue"]);

const internalValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newModelValue: string) => {
    internalValue.value = newModelValue;
  }
);

const onInput = () => {
  emits("update:modelValue", internalValue.value);
};

const internalPlaceholder = computed(() => {
  if (props.placeholder && !props.modelValue) {
    return props.placeholder;
  } else {
    return;
  }
});

onMounted(() => {
  emits("update:modelValue", internalValue.value);
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
  font-size: 16px;
  &::placeholder {
    color: var(--light-gray);
    font-size: 16px;
  }
  &:disabled {
    opacity: 0.4;
  }
}
</style>
