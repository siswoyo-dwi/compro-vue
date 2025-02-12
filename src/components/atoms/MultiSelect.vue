<template>
	<div
		ref="menuRef"
		:data-testid="testID"
		:class="computedClasses">
		<div
			:class="['w-full pl-1 pr-10', placeholder || selectedOptions.length === 0 ? 'py-4' : 'py-1', disabled ? 'cursor-default' : 'cursor-pointer']"
			@click="disabled ? noop : toggleDropdown()">
			<Typography
				v-if="selectedOptions.length === 0"
				variant="lead"
				class="text-text-secondary opacity-50">
				{{ placeholder }}
			</Typography>
			<Typography
				v-else
				variant="lead"
				class="text-gray flex flex-wrap gap-2">
				<div
					v-for="(option, index) in selectedOptions"
					:key="`selected-${index}`"
					class="flex items-center space-x-3 bg-toastSuccess text-white rounded-md px-3 py-[1px]">
					<Typography>{{ option[props.optionsLabel] }}</Typography>
					<button @click.stop="removeOption(option[optionsValue])">×</button>
				</div>
			</Typography>
		</div>
		<div
			class="absolute right-2 flex items-center"
			@click="toggleDropdown()">
			<Loading
				v-if="loading"
				class="!w-4 !h-4" />
			<ChevronDownIcon
				class="size-5"
				v-else />
		</div>
		<div
			v-if="isOpen"
			class="flex flex-col gap-2 absolute z-10 left-0 top-2 mt-6 w-full bg-white border border-semi rounded-md shadow py-4 px-1">
			<SearchInput
				v-if="searchable"
				:className="'w-full'"
				:testID="`search-select`"
				:value="search"
				@update:modelValue="handleSearch($event)" />
			<div class="flex flex-col max-h-52 overflow-y-scroll px-2">
				<div
					v-for="(option, index) in filteredOptions"
					:key="`option-${option[props.optionsValue]}`"
					:class="'hover:bg-shade rounded-md'">
					<LineSeparator v-if="index !== 0" />
					<div
						:class="['p-2 cursor-pointer flex space-x-1 justify-between rounded-md hover:text-success', isSelected(option[optionsValue]) ? 'bg-toastSuccess text-white hover:text-white' : '']"
						@click="toggleOption(option)">
						<Typography class="text-gray">{{ option[optionsLabel] }}</Typography>
						<span
							class="justify-self-end"
							v-if="isSelected(option[optionsValue])"
							>✔️</span
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, computed, watch, onMounted, onUnmounted, toRaw } from "vue";
	import { filter, find, lowerCase, noop } from "lodash";
	import Typography from "./Typography.vue";

	const emit = defineEmits(["update:modelValue", "focus", "blur"]);

	const props = defineProps({
		optionsLabel: {
			type: String,
			default: "label",
		},
		optionsValue: {
			type: String,
			default: "value",
		},
		loading: { type: Boolean, default: false },
		searchable: { type: Boolean, default: false },
		placeholder: String,
		className: String,
		disabled: { type: Boolean, default: false },
		name: String,
		value: { type: Array, default: () => [] },
		onChange: Function,
		testID: { type: String, required: true },
		options: { type: Array, default: () => [] },
		maxSelected: { type: Number, default: Infinity },
	});

	const isOpen = ref(false);
	const search = ref(undefined);
	const menuRef = ref(null);
	const selectedOptions = ref([]);

	const toggleDropdown = () => {
		isOpen.value = !isOpen.value;
		if (isOpen.value) {
			emit("focus");
		} else {
			emit("blur");
		}
	};

	watch(
		() => props.value,
		(newVal) => {
			console.log(newVal)
			selectedOptions.value = [];
			if (Array.isArray(newVal) && Array.isArray(props.options)) {
				const rawOptions = toRaw(props.options);
				newVal.forEach((n) => {
					rawOptions.forEach((option) => {
						if (n[props.optionsValue] == option[props.optionsValue]) {
							selectedOptions.value.push(option);
						}
					});
				});
			}
		},
		{ deep: true, immediate: true }
	);

	const toggleOption = (option) => {
		const index = selectedOptions.value.findIndex((o) => o[props.optionsValue] === option[props.optionsValue]);
		if (index === -1) {
			if (selectedOptions.value.length < props.maxSelected) {
				selectedOptions.value.push(option);
				handleChange(selectedOptions.value);
			}
		} else {
			selectedOptions.value.splice(index, 1);
			handleChange(selectedOptions.value);
		}
	};

	const removeOption = (value) => {
		const index = selectedOptions.value.findIndex((o) => o[props.optionsValue] === value);
		if (index !== -1) {
			selectedOptions.value.splice(index, 1);
		}
		handleChange(selectedOptions.value);
	};

	const handleChange = (val) => {
		if (props.onChange) {
			props.onChange({
				target: {
					value: val,
					name: props.name,
				},
			});
		}
		emit("update:modelValue", val);
	};

	const computedClasses = computed(() => ({
		"relative flex items-center w-full min-h-4": true,
		"!bg-gray-100": props.disabled,
		[props.className]: !!props.className,
	}));

	const filteredOptions = computed(() => filter(props.options, (option) => lowerCase(option[props.optionsValue]).includes(lowerCase(search.value))));

	const isSelected = (value) => {
		return selectedOptions.value.some((option) => option[props.optionsValue] === value);
	};

	watch(isOpen, (newVal) => {
		if (!newVal) {
			search.value = undefined;
		}
	});

	const handleClickOutside = (event) => {
		if (menuRef.value && !menuRef.value.contains(event.target)) {
			isOpen.value = false;
			emit("blur");
		}
	};

	onMounted(() => {
		document.addEventListener("mousedown", handleClickOutside);
	});

	onUnmounted(() => {
		document.removeEventListener("mousedown", handleClickOutside);
	});
</script>
