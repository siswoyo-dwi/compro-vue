<template>
	<button
		aria-label="switch"
		:class="buttonClass"
		@click="toggle">
		<span :class="spanClass" />
	</button>
</template>

<script setup>
	import { computed, defineEmits, defineProps } from "vue";

	const emit = defineEmits(["update:modelValue"]);

	const props = defineProps({
		modelValue: { type: Boolean, required: true }
	});

	const buttonClass = computed(() => ({
		"bg-primary": props.modelValue,
		"bg-gray-200": !props.modelValue,
		"relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none": true,
	}));

	const spanClass = computed(() => ({
		"translate-x-6": props.modelValue,
		"translate-x-1": !props.modelValue,
		"inline-block h-4 w-4 transform rounded-full bg-white transition-transform": true,
	}));

	const toggle = () => {
		emit("update:modelValue", !props.modelValue);
	};
</script>

<style scoped>
	/* Add any necessary styling here */
</style>
