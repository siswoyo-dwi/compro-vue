<template>
	<div :class="computedContainerClasses">
		<label
			v-if="label"
			:for="label"
			:class="labelComputedClasses">
			<Typography>
				{{ label }}
				<span
					v-if="required"
					class="text-required"
					>*</span
				>
			</Typography>
		</label>

		<div>
			<div :class="inputWrapperClasses">
				<slot name="affix"></slot>

				<!-- Switch component with value display on the right -->
				<div class="flex items-center">
					<Switch
						ref="inputRef"
						:modelValue="isSwitchOn"
						:disabled="disabled"
						@focus="handleFocus"
						@blur="handleBlur"
						@update:modelValue="handleChange"
						:testID="testID" />

					<!-- Display current value aligned to top -->
					<span class="relative ml-2">
						<Typography class="text-sm text-gray-600">{{ isSwitchOn ? trueValue : falseValue }}</Typography>
					</span>
				</div>

				<slot name="suffix"></slot>
			</div>

			<!-- Info/Error Section -->
			<p
				v-if="error"
				:class="['text-12-18 font-light pb-1 italic', isError ? 'text-danger' : 'text-transparent']">
				{{ error ? error : "-" }}
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { defineProps, defineEmits, ref, computed } from "vue";
	import Typography from "../atoms/Typography.vue";

	const props = defineProps({
		modelValue: {
			type: [String, Number, Boolean],
			default: false,
		},
		trueValue: {
			type: [String, Number, Boolean],
			default: true,
		},
		falseValue: {
			type: [String, Number, Boolean],
			default: false,
		},
		containerClassName: String,
		hideLabel: Boolean,
		label: String,
		required: Boolean,
		valid: Boolean,
		error: String,
		onChange: Function,
		onFocus: Function,
		onBlur: Function,
		testID: {
			type: String,
			required: true,
		},
		name: String,
		disabled: Boolean,
		labelPosition: {
			type: String,
			default: "top",
		},
	});

	const emit = defineEmits(["focus", "blur", "update:modelValue"]);
	const isFocus = ref(false);

	const isSwitchOn = computed(() => props.modelValue === props.trueValue);

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

	const handleChange = (newState: boolean) => {
		const newValue = newState ? props.trueValue : props.falseValue;
		emit("update:modelValue", newValue);
		if (props.onChange) {
			props.onChange(newValue);
		}
	};

	const isError = computed(() => !!props.error);

	const labelComputedClasses = computed(() => ({
		"text-base": true,
		"text-primary": isFocus.value && !isError.value,
		"!text-valid": props.valid,
		"text-danger": isError.value,
		"text-transparent": props.hideLabel,
		"pr-4": props.labelPosition === "left",
		"mb-1": props.labelPosition === "top",
	}));

	const inputWrapperClasses = computed(() => ({
		// "relative flex items-center rounded-md border border-[#D9D9D9] bg-white": true,
		"relative flex items-center rounded-md  bg-white": true,
		// "border-semiprime ring-semiprime ring-1": isFocus.value && !isError.value,
		"": isFocus.value && !isError.value,
		"!border-valid": props.valid,
		"border-danger": isError.value,
		"!bg-gray-100": props.disabled,
	}));

	const computedContainerClasses = computed(() => [props.labelPosition === "left" ? "grid grid-cols-10 gap-4" : "flex flex-col", props.containerClassName]);
</script>

<style scoped>
	.grid-cols-10 {
		grid-template-columns: 2fr 8fr;
	}
</style>
