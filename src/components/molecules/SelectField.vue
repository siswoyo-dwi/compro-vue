<template>
	<div :class="computedClasses">
		<div class="w-full flex justify-between items-center">
			<label
				v-if="label"
				:for="label"
				:class="labelComputedClasses">
				{{ label }}
				<span
					v-if="required"
					class="text-required"
					>*</span
				>
			</label>
			<div
				v-if="information"
				class="w-fit">
				{{ information }}
			</div>
		</div>
		<div :class="inputComputedClasses">
			<slot
				name="affix"
				v-if="affix" />
			<Select
				:loading="loading"
				:searchable="searchable"
				:testID="testID"
				:name="name"
				:placeholder="placeholder"
				:value="value"
				:options="options"
				:disabled="disabled"
				@change="onChange"
				@update:modelValue="handleUpdate($event)" />
		</div>
		<Typography
			v-if="isError"
			class="text-error font-light mt-1"
			>{{ error }}</Typography
		>
		<slot
			name="info"
			v-if="info" />
	</div>
</template>

<script setup>
	import { computed, defineEmits } from "vue";
	import { isEmpty } from "lodash";

	const emit = defineEmits(["update:modelValue"]);

	const props = defineProps({
		loading: { type: Boolean, default: false },
		searchable: { type: Boolean, default: false },
		label: String,
		affix: String, // Can adjust for node usage with slot
		info: String, // Can adjust for node usage with slot
		required: Boolean,
		valid: Boolean,
		error: String,
		placeholder: String,
		value: [String, Number, Array],
		onChange: Function,
		testID: { type: String, required: true },
		name: String,
		options: Array,
		variant: { type: String, default: "default" },
		className: String,
		disabled: Boolean,
		information: String,
	});

	const handleUpdate = (e) => {
		emit("update:modelValue", e);
	};

	const isError = computed(() => !isEmpty(props.error));

	const variants = {
		default: "bg-white p-4 rounded-2xl border border-black border-opacity-10",
		plain: "",
	};

	const labelComputedClasses = computed(() => [
		"text-base text-text-gray mb-4",
		{
			"text-valid": props.valid,
			"text-error": isError.value,
		},
	]);

	const inputComputedClasses = computed(() => [
		"relative flex rounded-md border border-[#D9D9D9] bg-white",
		{
			"border-valid": props.valid,
			"border-error": isError.value,
			"bg-gray-100": props.disabled,
		},
		props.className,
	]);

	const computedClasses = computed(() => ["flex flex-col", variants[props.variant]]);
</script>
