<template>
	<div
		ref="optionsPickerWrapper"
		class="relative inline-block">
		<!-- Toggle Button -->
		<Button
			color="success"
			:small="true"
			variant="outline"
			@click="toggleYearSelector">
			<Typography>{{ title }} {{ selectedLabel }}</Typography>
		</Button>

		<!-- Options Selector Card -->
		<div
			v-if="showOptionsSelector"
			role="listbox"
			class="absolute mt-2 w-full bg-white rounded shadow-lg border overflow-y-auto max-h-48 z-10 transition-opacity duration-300"
			@keydown.esc="closeYearSelector">
			<ul class="divide-y divide-gray-200">
				<li
					v-for="option in options"
					:key="getOptionValue(option)"
					@click="selectOption(option)"
					tabindex="0"
					:class="['px-4 py-2 cursor-pointer hover:bg-ghostsuccess', isSelected(option) ? 'bg-success text-white font-bold' : '']"
					@keydown.enter="selectOption(option)"
					@keydown.space="selectOption(option)">
					<Typography class="text-14-21">{{ getOptionLabel(option) }}</Typography>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
	import { ref, onMounted, onBeforeUnmount, computed, watch, nextTick } from "vue";
	import Typography from "../atoms/Typography.vue";

	// Props Definition
	const props = defineProps({
		title: {
			type: String,
			default: "",
		},
		color: {
			type: String,
			default: "secondary",
		},
		modelValue: {
			type: [String, Number],
		},
		options: {
			type: Array,
			default: () => [],
		},
		valueKey: {
			type: String,
			default: "value",
		},
		labelKey: {
			type: String,
			default: "label",
		},
	});

	const emit = defineEmits(["update:modelValue"]);

	const optionsPickerWrapper = ref(null);
	const showOptionsSelector = ref(false);
	const selectedOptions = ref(props.modelValue);

	// Computed property for the selected label
	const selectedLabel = computed(() => {
		const selectedOption = props.options.find((option) => getOptionValue(option) === selectedOptions.value);
		return selectedOption ? getOptionLabel(selectedOption) : selectedOptions.value;
	});

	// Toggle the visibility of the selector
	function toggleYearSelector() {
		showOptionsSelector.value = !showOptionsSelector.value;
		if (showOptionsSelector.value) {
			nextTick(() => optionsPickerWrapper.value?.querySelector("li")?.focus());
		}
	}

	// Close the selector
	function closeYearSelector() {
		showOptionsSelector.value = false;
	}

	// Handle option selection
	function selectOption(option) {
		selectedOptions.value = getOptionValue(option);
		showOptionsSelector.value = false;
		emit("update:modelValue", getOptionValue(option));
	}

	// Check if an option is selected
	function isSelected(option) {
		return getOptionValue(option) === selectedOptions.value;
	}

	// Get the value of an option
	function getOptionValue(option) {
		return props.valueKey && option[props.valueKey] !== undefined ? option[props.valueKey] : option;
	}

	// Get the label of an option
	function getOptionLabel(option) {
		return props.labelKey && option[props.labelKey] !== undefined ? option[props.labelKey] : getOptionValue(option);
	}

	// Handle click outside to close the selector
	const handleClickOutsideOptionsPicker = (event) => {
		if (optionsPickerWrapper.value && !optionsPickerWrapper.value.contains(event.target)) {
			closeYearSelector();
		}
	};

	onMounted(() => {
		document.addEventListener("click", handleClickOutsideOptionsPicker);
	});

	onBeforeUnmount(() => {
		document.removeEventListener("click", handleClickOutsideOptionsPicker);
	});

	// Watch for changes to modelValue prop
	watch(
		() => props.modelValue,
		(newValue) => {
			selectedOptions.value = newValue;
		}
	);
</script>

<style scoped>
	/* Add styles for transitions if necessary */
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.3s ease, visibility 0.3s ease;
	}
	.fade-enter,
	.fade-leave-to {
		opacity: 0;
		visibility: hidden;
	}
</style>
