<template>
	<label :class="['flex items-center cursor-pointer', labelClass]">
		<input
			type="checkbox"
			:checked="modelValue === checkedValue"
			@change="toggle"
			class="sr-only" />
		<div :class="['w-5 h-5 flex items-center justify-center border-2 rounded transition-all', modelValue === checkedValue ? checkedClasses : uncheckedClasses, checkboxClass]">
			<svg
				v-if="modelValue === checkedValue"
				xmlns="http://www.w3.org/2000/svg"
				class="w-4 h-4 text-white"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M5 13l4 4L19 7" />
			</svg>
		</div>
		<span
			v-if="label"
			:class="['ml-2', labelTextClass]">
			{{ label }}
		</span>
	</label>
</template>

<script setup>
	// import { defineProps, defineEmits } from "vue";

	const props = defineProps({
		modelValue: {
			type: [Boolean, String, Number], 
		},
		label: {
			type: String,
			default: "",
		},
		labelClass: {
			type: String,
			default: "",
		},
		labelTextClass: {
			type: String,
			default: "text-gray-700",
		},
		checkboxClass: {
			type: String,
			default: "",
		},
		checkedClasses: {
			type: String,
			default: "bg-blue-500 border-blue-500",
		},
		uncheckedClasses: {
			type: String,
			default: "bg-white border-gray-400",
		},
		checkedValue: {
			type: [Boolean, String, Number], // Custom value when checked
			default: true,
		},
		uncheckedValue: {
			type: [Boolean, String, Number], // Custom value when unchecked
			default: false,
		},
		disabled: {
			type: Boolean,
			default: false, // Indicates whether the checkbox is disabled
		},
	});

	const emits = defineEmits(["update:modelValue"]);

	const toggle = (event) => {
		if (!props.disabled) {
			emits("update:modelValue", event.target.checked ? props.checkedValue : props.uncheckedValue);
		}
	};
</script>
