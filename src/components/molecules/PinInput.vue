<template>
	<div class="flex space-x-4">
		<Input
			v-for="(value, index) in values"
			:key="`pin-${index}`"
			:testID="`pin-${index}`"
			ref="inputRefs"
			type="text"
			:maxlength="1"
			:value="value"
			@paste="autofill"
			@keydown.backspace="handleBackspace(index)"
			@input="handleChange(index, $event.target.value)"
			class="w-full h-20 text-center text-2xl font-medium border-solid border-2 ring-2 ring-gray-300 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
	</div>
</template>

<script setup lang="ts">
	import { defineEmits, defineProps, ref, onMounted, watch } from "vue";
	import Input from "../atoms/Input.vue";

	const emit = defineEmits(["onComplete"]);
	const props = defineProps({
		length: {
			type: Number,
			default: 4,
		},
	});

	const values = ref(Array(props.length).fill(""));
	const inputRefs = ref([]);

	const focusFirstInput = () => {
		if (inputRefs.value[0]) {
			inputRefs.value[0]?.$el.focus();
		}
	};

	onMounted(() => {
		inputRefs.value = inputRefs.value.slice(0, props.length);
		focusFirstInput();
	});

	watch(values, (newValues) => {
		// console.log(newValues);
		if (newValues.join("").length === props.length) {
			emit("onComplete", newValues.join(""));
		}
	});

	const autofill = (e: ClipboardEvent) => {
		for (let i = 0; i < props.length; i++) {
			const value = e.clipboardData?.getData("text");
			handleChange(i, value ? value[i] : "");
		}
	};

	const handleChange = (index: any, value: any) => {
		if (value.length <= 1 && /^\d*$/.test(value)) {
			values.value[index] = value;
			if (value !== "" && index < props.length - 1) {
				const nextInput = inputRefs.value[index + 1];
				if (nextInput) {
					nextInput.$el.focus();
				}
			}
		}
		emit("onComplete", values.value.join(""));
	};

	const handleBackspace = (index: any) => {
		if (index > 0 && values.value[index] === "") {
			const prevInput = inputRefs.value[index - 1];
			if (prevInput) {
				prevInput.$el.focus();
			}
		} else {
			values.value[index] = "";
		}
	};
</script>

<style scoped>
	/* Add your custom styles here if needed */
</style>
