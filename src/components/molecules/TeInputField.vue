<template>
	<div :class="computedContainerClasses">
		<label
			v-if="label"
			:for="label"
			:class="labelComputedClasses">
			<Typography
				>{{ label }}
				<span
					v-if="required"
					class="text-required"
					>*</span
				></Typography
			>
		</label>

		<div>
			<div :class="inputWrapperClasses">
				<slot name="affix"></slot>

				<Input
					ref="inputRef"
					:class="'rounded-md py-1 px-4 bg-white w-full'"
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
					:testID="testID" />
				<slot name="suffix"></slot>
			</div>

			<!-- Info/Error Section -->
			<p :class="['text-12-18 font-light pb-1 italic', isError ? 'text-danger' : 'text-transparent']">
				{{ error ? error : "-" }}
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { defineProps, defineEmits, ref, computed, reactive } from "vue";
	import Typography from "../atoms/Typography.vue";

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
		labelPosition: {
			type: String,
			default: "top", // Can be "top" or "left"
		},
	});

	const emit = defineEmits(["focus", "blur", "update:modelValue"]);
	const inputRef = ref<HTMLInputElement | null>(null);
	const isFocus = ref(false);

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

	const handleChange = (e: Event) => {
		emit("update:modelValue", e);
		if (props.onChange) {
			props.onChange(e);
		}
	};

	const isError = computed(() => props.error && props.error !== "");

	const labelComputedClasses = computed(() => ({
		"text-base": true,
		"text-primary": isFocus.value && !isError.value,
		"!text-valid": props.valid,
		"text-danger": isError.value,
		"text-transparent": props.hideLabel,
		"pr-4": props.labelPosition === "left", // Add spacing when label is on the left
		"mb-1": props.labelPosition === "top", // Add spacing when label is on top
	}));

	const inputWrapperClasses = computed(() => ({
		"relative flex items-center rounded-md border border-[#D9D9D9] bg-white": true,
		"border-semiprime ring-semiprime ring-1": isFocus.value && !isError.value,
		"!border-valid": props.valid,
		"border-danger": isError.value,
		"!bg-gray-100": props.disabled,
	}));

	const computedContainerClasses = computed(() => [props.labelPosition === "left" ? "grid grid-cols-10 gap-4" : "flex flex-col", props.containerClassName]);
</script>

<style scoped>
	.grid-cols-10 {
		grid-template-columns: 2fr 8fr; /* 2/8 ratio between label and input */
	}
</style>
