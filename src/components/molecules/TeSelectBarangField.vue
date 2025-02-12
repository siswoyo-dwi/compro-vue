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

				<SelectBarang
					ref="selectRef"
					:class="'rounded-md px-4 bg-white w-full'"
					:searchable="searchable"
					:testID="testID"
					:name="name"
					:placeholder="placeholder"
					:value="value"
					:options="options"
					:disabled="disabled"
					:triggerSearch="triggerSearch"
					@update:modelValue="handleUpdate($event)"
					@focus="isOpen = true"
					@blur="isOpen = false" />
				<slot name="suffix"></slot>
			</div>

			<!-- Info/Error Section -->
			<p
				v-if="alert"
				:class="['text-12-18 font-light px-1 italic', isError ? 'text-danger' : 'text-transparent']">
				{{ error ? error : "-" }}
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { defineProps, defineEmits, ref, computed, watch } from "vue";
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
		loading: {
			type: Boolean,
			default: false,
		},
		searchable: {
			type: Boolean,
			default: false,
		},
		label: {
			type: String,
			default: undefined,
		},
		required: {
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
			type: [String, Number, Array],
			default: "",
		},
		testID: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			default: undefined,
		},
		options: {
			type: Array,
			default: () => [],
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		labelPosition: {
			type: String,
			default: "top", // Can be "top" or "left"
		},
		alert: {
			type: Boolean,
			default: true,
		},
		triggerSearch: {
			type: String,
		},
	});

	const emit = defineEmits(["update:modelValue", "focus", "blur", "onSearch"]);
	const selectRef = ref<HTMLSelectElement | null>(null);
	const isOpen = ref(false); // Track the open state

	const handleUpdate = (e: Event) => {
		console.log(e)
		emit("update:modelValue", e);
	};

	const isError = computed(() => props.error && props.error !== "");

	const labelComputedClasses = computed(() => ({
		"text-base": true,
		"!text-success": isOpen.value,
		"text-danger": isError.value,
		"text-transparent": props.hideLabel,
		"pr-4": props.labelPosition === "left",
		"mb-1": props.labelPosition === "top",
	}));

	const inputWrapperClasses = computed(() => ({
		"relative flex items-center rounded-md border border-[#D9D9D9] bg-white": true,
		"!border-success": isOpen.value,
		"border-danger": isError.value,
	}));

	const computedContainerClasses = computed(() => [props.labelPosition === "left" ? "grid grid-cols-10 gap-4" : "flex flex-col", props.containerClassName]);
	watch(
		() => isOpen.value,
		(newV) => {
			if (newV) {
				emit("focus");
			} else {
				emit("blur");
			}
		}
	);
</script>

<style scoped>
	.grid-cols-10 {
		grid-template-columns: 2fr 8fr; /* 2/8 ratio between label and input */
	}
</style>
