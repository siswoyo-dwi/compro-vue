<template>
	<div
		ref="menuRef"
		:data-testid="testID"
		:class="computedClasses">
		<div
			:class="['w-full pl-1 pr-10', placeholder || value || text == 'Data Tidak Ditemukan' ? 'py-1' : 'py-4', disabled ? 'cursor-default' : 'cursor-pointer']"
			@click="disabled ? noop : toggleDropdown()">
			<Typography
				v-if="!text"
				variant="lead"
				class="text-text-secondary opacity-50"
				>{{ placeholder }}</Typography
			>
			<Typography
				v-else
				variant="lead"
				class="text-gray flex space-x-2">
				<div
					v-if="isWarna"
					:class="['size-[20px] rounded-md', getColor(value)]"></div>
				<div>
					<Typography>{{ text }}</Typography>
				</div>
			</Typography>
		</div>
		<div
			class="absolute right-2 flex items-center"
			@click="disabled ? noop : toggleDropdown()">
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
					:key="`option-${option.value}`"
					:class="isWarna ? getBg(option.value) : 'hover:bg-shade rounded-md'">
					<LineSeparator v-if="index !== 0" />
					<div
						:class="['p-2 cursor-pointer flex space-x-1 rounded-md', isWarna ? getText(option.value) : 'hover:text-success']"
						@click="handleChange(option.value)">
						<div
							v-if="isWarna"
							:class="['size-[20px] rounded-md', getColor(option.value)]"></div>
						<Typography class="text-gray">{{ option.label }}</Typography>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, computed, watch, onMounted, onUnmounted, defineEmits } from "vue";
	import { filter, find, lowerCase, noop } from "lodash";
	import Typography from "./Typography.vue";

	const emit = defineEmits(["update:modelValue", "focus", "blur"]);

	const props = defineProps({
		isWarna: Boolean,
		loading: { type: Boolean, default: false },
		searchable: { type: Boolean, default: false },
		placeholder: String,
		className: String,
		disabled: { type: Boolean, default: false },
		name: String,
		value: [String, Number, Array],
		onChange: Function,
		testID: { type: String, required: true },
		options: { type: Array, default: () => [] },
	});

	const isOpen = ref(false);
	const search = ref(undefined);
	const menuRef = ref(null);

	const toggleDropdown = () => {
		isOpen.value = !isOpen.value;
		if (isOpen.value) {
			emit("focus");
		} else {
			emit("blur");
		}
	};

	const getBg = (color) => {
		return color == "#00C472" ? "hover:bg-ghostprime" : color == "#2463E2" ? "hover:bg-ghostblue" : color == "#EB3B5A" ? "hover:bg-ghostred" : color == "#F2CD42" ? "hover:bg-ghostyell" : "";
	};

	const getColor = (color) => {
		return color == "#00C472" ? "bg-primary" : color == "#2463E2" ? "bg-blue" : color == "#EB3B5A" ? "bg-red" : color == "#F2CD42" ? "bg-yell" : "";
	};
	const getText = (color) => {
		return color == "#00C472" ? "hover:text-primary" : color == "#2463E2" ? "hover:text-blue" : color == "#EB3B5A" ? "hover:text-red" : color == "#F2CD42" ? "hover:text-yell" : "";
	};

	const handleSearch = (e) => {
		search.value = e;
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
		isOpen.value = false;
	};

	const computedClasses = computed(() => ({
		"relative flex items-center w-full min-h-4": true,
		"!bg-gray-100": props.disabled,
		[props.className]: !!props.className,
	}));

	const text = computed(() => (props.value ? find(props.options, (option) => option.value === props.value)?.label || "Data Tidak Ditemukan" : null));

	const filteredOptions = computed(() => {
		if (!search.value) {
			return props.options;
		}
		const searchValue = search.value.toLowerCase();
		return props.options.filter((option) => {
			const label = option.label.toLowerCase() || "";
			let i = 0;
			for (let char of label) {
				if (char === searchValue[i]) i++;
				if (i === searchValue.length) return true;
			}
			return false;
		});
	});

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

	const handleKeyDown = (event) => {
		if (event.key === "ArrowDown") {
			// Logic to navigate down the options
		} else if (event.key === "ArrowUp") {
			// Logic to navigate up the options
		} else if (event.key === "Enter") {
			// Logic to select the currently highlighted option
		}
	};

	onMounted(() => {
		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("keydown", handleKeyDown);
	});

	onUnmounted(() => {
		document.removeEventListener("mousedown", handleClickOutside);
		document.removeEventListener("keydown", handleKeyDown);
	});
</script>
