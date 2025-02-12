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
		:value="displayValue"
		@focus="handleFocus"
		@blur="handleBlur"
		@keydown.enter="handleKeyPress"
		@input="handleChange" />
</template>

<script setup lang="ts">
	import { defineEmits, ref, computed, watch } from "vue";

	const formatRupiah = (value: string | number | null | undefined) => {
		if (!value) return "";
		const numberString = value.toString().replace(/[^,\d]/g, "");
		const split = numberString.split(",");
		let rupiah = split[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		rupiah = split[1] != null ? `${rupiah},${split[1]}` : rupiah;
		return `Rp ${rupiah}`;
	};

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
			default: "text",
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

	// Track the actual numeric value
	const modelValue = ref(props.value);
	// Track the formatted display value
	const displayValue = ref(formatRupiah(modelValue.value));

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

	const handleChange = (e: InputEvent) => {
		const target = e.target as HTMLInputElement;

		// Remove formatting to get the pure numeric value
		const numericValue = target.value.replace(/[^0-9]/g, "");

		// Update modelValue with the numeric value
		modelValue.value = numericValue;
		emit("update:modelValue", numericValue);

		// Set display value with Rupiah formatted string
		displayValue.value = formatRupiah(numericValue);
	};

	// Watch for external changes to `value` and update `modelValue` and `displayValue`
	watch(
		() => props.value,
		(newValue) => {
			modelValue.value = newValue;
			displayValue.value = formatRupiah(newValue);
		}
	);
</script>

<style scoped></style>
