<template>
	<div :class="computedClasses">
		<div class="flex justify-between">
			<label
				v-if="label"
				:class="labelComputedClasses"
				:for="label">
				{{ label }}
				<span
					v-if="required"
					class="text-required"
					>*</span
				>
			</label>
			<div
				v-if="maks"
				class="text-semi">
				{{ count }}/{{ maks }} Karakter
			</div>
		</div>

		<div :class="inputComputedClasses">
			<div v-if="affix">
				<slot name="affix"></slot>
			</div>
			<textarea
				:maxlength="maks"
				:rows="rows"
				:disabled="disabled"
				:name="name"
				:placeholder="placeholder"
				:value="value"
				@input="onInputChange"
				:data-testid="testID"
				ref="textareaRef"
				class="outline-none w-full text-md font-medium placeholder-[#868D9D] placeholder-opacity-50 border-none focus:ring-2 focus:ring-primary" />
			<div v-if="suffix">
				<slot name="suffix"></slot>
			</div>
		</div>

		<Typography
			v-if="isError"
			class="text-error font-light mt-1"
			>{{ error }}</Typography
		>
	</div>
</template>

<script setup>
	import { computed, ref, watch, defineEmits } from "vue";
	import { isEmpty } from "lodash";

	const props = defineProps({
		rows: String,
		label: String,
		affix: Boolean, // or Object, depending on how you handle slot content
		suffix: Boolean,
		required: Boolean,
		valid: Boolean,
		error: String,
		placeholder: String,
		value: [String, Array, Number],
		onChange: Function,
		testID: { type: String, required: true },
		name: String,
		variant: { type: String, default: "default" },
		disabled: Boolean,
		maks: String,
	});

	const emit = defineEmits(["update:modelValue"]);

	const textareaRef = ref(null);
	const count = ref(0);

	const isError = computed(() => !isEmpty(props.error));

	const variants = {
		default: "bg-white p-4 rounded-2xl border border-black border-opacity-10",
		plain: "",
	};

	const labelComputedClasses = computed(() => "text-md mb-1", {
		"text-valid": props.valid,
		"text-error": isError.value,
	});

	const inputComputedClasses = computed(() => "relative flex py-2 px-4 rounded-md border border-[#D9D9D9] bg-white", {
		"border-valid": props.valid,
		"border-error": isError.value,
		"!bg-gray-100": props.disabled,
	});

	const computedClasses = computed(() => "flex flex-col", variants[props.variant]);

	// Handle the input event
	const onInputChange = (e) => {
		if (props.onChange) {
			props.onChange(e.target.value);
		}
		emit("update:modelValue", e.target.value);
	};

	watch(
		() => props.value,
		(newV) => {
			if (newV) {
				count.value = newV.length;
			}
		}
	);
</script>
