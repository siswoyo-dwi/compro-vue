<template>
  <div :class="computedClasses">
    <div v-if="label" class="flex justify-between mb-1">
      <label :for="label" :class="labelComputedClasses">
        {{ label }}
        <span v-if="required" class="text-required">*</span>
      </label>
      <div v-if="labelInfo">{{ labelInfo }}</div>
    </div>

    <div :class="inputComputedClasses">
      <slot name="affix"></slot>

      <Input
        ref="inputRef"
        :class="'rounded-md py-2 px-4 bg-white'"
        :type="type"
        :name="name"
        :placeholder="placeholder"
        :value="value"
        :min="min"
        :max="max"
        :disabled="disabled"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown.enter="handleKeyPress"
        @update:modelValue="handleChange($event)"
        :testID="testID"
      />
      <slot name="suffix"></slot>
    </div>
    <slot name="info"></slot>
    <p
      v-if="error"
      :class="[
        'text-12-18 font-light mt-1',
        isError ? 'text-danger' : 'text-transparent',
      ]"
    >
      {{ error ? error : "-" }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, computed, reactive, watch } from "vue";

const props = defineProps({
  containerClassName: {
    type: String,
    default: "",
  },
  hideLabel: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "text",
  },
  label: {
    type: String,
    default: undefined,
  },
  labelInfo: {
    type: [String, Object],
    default: undefined,
  },
  affix: {
    type: [String, Object],
    default: undefined,
  },
  suffix: {
    type: [String, Object],
    default: undefined,
  },
  info: {
    type: [String, Object],
    default: undefined,
  },
  required: {
    type: Boolean,
    default: false,
  },
  valid: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: undefined,
  },
  placeholder: {
    type: String,
    default: undefined,
  },
  value: {
    type: [String, Number],
    default: "",
  },
  onChange: Function,
  onFocus: Function,
  onBlur: Function,
  onEnter: Function,
  testID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: undefined,
  },
  variant: {
    type: String,
    default: "default",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  min: {
    type: [Number, String],
    default: undefined,
  },
  max: {
    type: [Number, String],
    default: undefined,
  },
  number: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["focus", "blur", "update:modelValue"]);
const inputRef = ref<HTMLInputElement | null>(null);
const isFocus = ref(false);

// const handleKeyPress = (e: KeyboardEvent) => {
const handleKeyPress = (e: KeyboardEvent) => {
  if (e.key === "Enter" && props.onEnter) {
    props.onEnter();
  }
};

const handleFocus = () => {
  if (props.onFocus) props.onFocus();
  isFocus.value = true;
  emit("focus", true);
};

const handleBlur = () => {
  if (props.onBlur) props.onBlur();
  isFocus.value = false;
  emit("blur", false);
};

// const handleChange = (e: Event) => {
const handleChange = (e: Event) => {
  emit("update:modelValue", e);
  if (props.onChange) {
    props.onChange(e);
  }
};

// watch(
// 	() => props.value,
// 	(newV) => {
// 		console.log(newV, "newV");
// 	}
// );

const isError = computed(() => props.error && props.error !== "");

const variants = reactive<any>({
  default: "bg-white p-4 rounded-2xl border border-black border-opacity-10",
  plain: "",
});

const labelComputedClasses = computed(() => ({
  "text-base": true,
  "text-primary": isFocus.value && !isError.value,
  "!text-valid": props.valid,
  "text-danger": isError.value,
  "text-transparent": props.hideLabel,
}));

const inputComputedClasses = computed(() => ({
  "relative flex rounded-md border border-[#D9D9D9] bg-white": true,
  "border-semiprime ring-semiprime ring-2": isFocus.value && !isError.value,
  "!border-valid": props.valid,
  "border-danger": isError.value,
  "!bg-gray-100": props.disabled,
}));

const computedClasses = computed(() => [
  "flex flex-col",
  variants[props.variant],
  props.containerClassName,
]);
</script>

<style scoped>
/* Add scoped styles here */
</style>
