<template>
	<div :class="computedClasses">
		<div :class="inputComputedClasses">
			<Input
				ref="inputRef"
				:class="'rounded-md py-2.5 px-6 bg-white'"
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
			<span
				@click="clicked()"
				variant="default"
				class="absolute inset-y-0 right-0 pr-1 top-[5%] flex items-center">
				<Button class="bg-primary rounded-md !p-2">
					<ArrowRightIcon class="size-[18px] fill-white" />
				</Button>
			</span>
		</div>
		<p
			v-if="error"
			class="text-red-500 mt-1 text-sm">
			{{ error }}
		</p>
	</div>
</template>

<script setup lang="ts">
	import { defineProps, defineEmits, ref, computed, reactive } from "vue";

	const props = defineProps({
		containerClassName: {
			type: String,
			default: "",
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
		affix: {
			type: [String, Object],
			default: undefined,
		},
		suffix: {
			type: [String, Object],
			default: undefined,
		},
		info: {
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
	});

	const emit = defineEmits(["focus", "blur", "update:modelValue", "buttonClick"]);
	const inputRef = ref<HTMLInputElement | null>(null);
	const isFocus = ref(false);
	const isi = ref("");

	// const handleKeyPress = (e: KeyboardEvent) => {
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

	const clicked = () => {
		emit("buttonClick");
	};

	const handleBlur = () => {
		if (props.onBlur) props.onBlur();
		isFocus.value = false;
		emit("blur", false);
	};

	// const handleChange = (e: Event) => {
	const handleChange = (e: any) => {
		emit("update:modelValue", e);
	};

	const isError = computed(() => props.error && props.error !== "");

	const variants = reactive<any>({
		default: "bg-white rounded-2xl border border-black border-opacity-10",
		plain: "",
	});

	const labelComputedClasses = computed(() => ({
		"text-base": true,
		"text-primary": isFocus.value && !isError.value,
		"!text-valid": props.valid,
		"text-danger": isError.value,
	}));

	const inputComputedClasses = computed(() => ({
		"relative flex rounded-md border border-[#D9D9D9] bg-white relative": true,
		"border-semiprime ring-semiprime ring-2": isFocus.value && !isError.value,
		"!border-valid": props.valid,
		"border-danger": isError.value,
		"!bg-gray-100": props.disabled,
	}));

	const computedClasses = computed(() => ["flex flex-col", variants[props.variant], props.containerClassName]);
</script>

<style scoped>
	/* Add scoped styles here */
</style>
