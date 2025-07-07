<template>
  <textarea
    class="vue-text-area"
    name="text-area"
    id="text-area"
    ref="textareaRef"
    v-model="internalValue"
    :placeholder="internalPlaceholder"
    @input="onInput"
    :style="{ height: textareaHeight }"
  ></textarea>
</template>

<script lang="ts" setup>
import {
  defineProps,
  ref,
  defineEmits,
  computed,
  watch,
  onMounted,
  nextTick,
} from "vue";

const props = defineProps<{
  modelValue: string;
  placeholder?: string;
  minRows?: number;
  maxRows?: number;
}>();

const emits = defineEmits(["update:modelValue"]);

const textareaRef = ref<HTMLTextAreaElement | null>(null);
const internalValue = ref(props.modelValue);
const textareaHeight = ref("auto");
const maxHeight = 150;

const internalPlaceholder = computed((): string => {
  return props.placeholder ? props.placeholder : "Введите текст";
});

const calculateHeight = () => {
  if (!textareaRef.value) return;

  textareaRef.value.style.height = "auto";

  let newHeight = textareaRef.value.scrollHeight;

  if (newHeight > maxHeight) {
    newHeight = maxHeight;
    textareaRef.value.style.overflowY = "hidden";
  } else {
    textareaRef.value.style.overflowY = "hidden";
  }

  textareaHeight.value = `${newHeight}px`;
};

const onInput = () => {
  emits("update:modelValue", internalValue.value);
  calculateHeight();
};

onMounted(() => {
  emits("update:modelValue", internalValue.value);

  nextTick(() => {
    calculateHeight();
  });
});

watch(internalPlaceholder, () => {
  nextTick(calculateHeight);
});
</script>

<style lang="scss">
.vue-text-area {
  background-color: var(--black);
  border: 1px solid var(--violet);
  padding: 12px 16px;
  width: 100%;
  border-radius: 18px;
  color: var(--white);
  outline: none;
  font-size: 16px;
  resize: none;
  overflow-y: hidden !important; /* Убираем скролл */
  line-height: 1.5; /* Для более точного расчета высоты */

  &::placeholder {
    color: var(--light-gray);
    font-size: 16px;
  }

  &:disabled {
    opacity: 0.4;
  }
}
</style>
