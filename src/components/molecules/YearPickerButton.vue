<template>
	<div
		ref="yearPickerWrapper"
		class="relative inline-block">
		<!-- Toggle Button -->
		<Button
			:color="color"
			:small="true"
			variant="outline"
			@click="toggleYearSelector">
			<Typography class=""> {{ title }} {{ selectedYear }} </Typography>
		</Button>

		<!-- Year Selector Card -->
		<div
			v-if="showYearSelector"
			role="listbox"
			class="absolute mt-2 w-full bg-white rounded shadow-lg border overflow-y-auto max-h-48 z-10 transition-opacity duration-300"
			@keydown.esc="closeYearSelector">
			<ul class="divide-y divide-gray-200">
				<li
					v-for="year in years"
					:key="year"
					@click="selectYear(year)"
					tabindex="0"
					:class="['px-4 py-2 cursor-pointer hover:bg-ghostsuccess', year === selectedYear ? 'bg-ghostprimary text-success font-bold' : '']"
					@keydown.enter="selectYear(year)"
					@keydown.space="selectYear(year)">
					<Typography class="text-14-21">{{ year }}</Typography>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
	import { ref, onMounted, onBeforeUnmount, defineEmits, watch } from "vue";
	import Typography from "../atoms/Typography.vue";

	// Props Definition
	const props = defineProps({
		title: {
			type: String,
			default: "Tahun",
		},
		color: {
			type: String,
			default: "secondary",
		},
		modelValue: {
			type: [String, Number], // Support both string and number values
		},
	});

	// Emit Event for v-model Binding
	const emit = defineEmits(["update:modelValue"]);

	// Refs
	const yearPickerWrapper = ref(null);
	const currentYear = new Date().getFullYear();

	// Set initial value to props.modelValue if provided; otherwise, use currentYear
	const selectedYear = ref(props.modelValue || currentYear);
	const showYearSelector = ref(false);

	// Generate 41 Years (20 Before and 20 After Current Year)
	const years = Array.from({ length: 41 }, (_, i) => currentYear - 1 + i);

	// Toggle Year Selector Dropdown
	function toggleYearSelector() {
		console.log(showYearSelector.value);
		showYearSelector.value = !showYearSelector.value;
		if (showYearSelector.value) {
			setTimeout(() => yearPickerWrapper.value?.querySelector("li")?.focus(), 0);
		}
	}

	// Close Year Selector Dropdown
	function closeYearSelector() {
		showYearSelector.value = false;
	}

	// Handle Year Selection
	function selectYear(year) {
		selectedYear.value = year;
		showYearSelector.value = false;
		emit("update:modelValue", year);
	}

	// Handle Click Outside to Close the Dropdown
	const handleClickOutsideYearPicker = (event) => {
		if (yearPickerWrapper.value && !yearPickerWrapper.value.contains(event.target)) {
			closeYearSelector();
		}
	};

	// Lifecycle Hooks
	onMounted(() => {
		document.addEventListener("click", handleClickOutsideYearPicker);
	});

	onBeforeUnmount(() => {
		document.removeEventListener("click", handleClickOutsideYearPicker);
	});

	// Watch for Changes to modelValue Prop
	watch(
		() => props.modelValue,
		(newValue) => {
			selectedYear.value = newValue || currentYear;
		}
	);
</script>

<style scoped>
	/* .transition-opacity {
		opacity: 0;
		visibility: hidden;
	}

	[v-cloak] .transition-opacity {
		opacity: 1;
		visibility: visible;
	} */
</style>
