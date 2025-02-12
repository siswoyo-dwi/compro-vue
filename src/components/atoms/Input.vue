<template>
	<input
		:class="computedClasses"
		:maxlength="255"
		:data-testid="testID"
		:disabled="disabled"
		v-bind="otherAttrs"
		:type="type"
		ref="inputRef"
		autocomplete="off"
		@focus="handleFocus"
		@blur="handleBlur"
		@keydown.enter="handleKeyPress"
		@input="handleChange" />
</template>

<script setup lang="ts">
	import { defineEmits, ref, computed, watch } from "vue";

	const inputRef = ref<HTMLInputElement | null>(null);
	const isFocus = ref(false);
	const emit = defineEmits(["focus", "blur", "update:modelValue"]);
	const props = defineProps({
		testID: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			defaullt: "text",
		},
		className: {
			type: String,
			default: "",
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		value: {
			type: [String, Number],
			default: "",
		},
		onFocus: Function,
		onBlur: Function,
		onEnter: Function,
	});

	const computedClasses = computed(() => {
		return [
			"outline-none w-full font-medium placeholder-[#868D9D] ring-0 ring-offset-0 placeholder-opacity-50 focus:ring-0 ring-offset-0 border-none text-inputvalue",
			props.className,
			{ "!bg-gray-100": props.disabled },
		];
	});

	const otherAttrs = computed(() => {
		const { testID, className, disabled, ...rest } = props;
		return rest;
	});

	const handleKeyPress = (e: KeyboardEvent) => {
		if (e.key === "Enter" && props.onEnter) {
			props.onEnter();
		}
	};

	const handleFocus = () => {
		if (props.onFocus) props.onFocus();
		isFocus.value = true;
		emit("focus", isFocus.value);
	};

	const handleBlur = () => {
		if (props.onBlur) props.onBlur();
		isFocus.value = false;
		emit("blur", isFocus.value);
	};

	const handleChange = (e: any) => {
		const target = e.target as HTMLInputElement;
		emit("update:modelValue", target.value);
	};

	// watch(
	// 	() => props.value,
	// 	(newV) => {
	// 		console.log(newV, "newV");
	// 	}
	// );
</script>

<style scoped></style>
