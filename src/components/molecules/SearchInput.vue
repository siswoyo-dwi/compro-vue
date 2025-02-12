<template>
	<div class="flex flex-col w-full">
		<div :class="containerStyle">
			<div class="flex justify-center items-center space-x-2">
				<MagnifyingGlassIcon class="size-4 mr-3" />
			</div>
			<Input
				:testID="testID"
				:placeholder="placeholder"
				:name="name"
				:value="inputValue"
				v-model="inputValue"
				@update:modelValue="handleInput"
				:class="className" />
		</div>
	</div>
</template>

<script setup>
	import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
	import { computed, ref, watch } from "vue";

	const emit = defineEmits(["update:modelValue"]);
	const props = defineProps({
		placeholder: String,
		value: [String, Number, Array],
		onChange: Function,
		testID: { type: String, required: true },
		name: String,
		containerClassName: String,
		className: String,
	});

	const inputValue = ref(props.value);

	const containerStyle = computed(() => ["flex py-2 px-4 rounded-md border border-[#D9D9D9] bg-white", props.containerClassName]);

	const handleInput = () => {
		// console.log(inputValue)
		emit("update:modelValue", inputValue.value);
	};

</script>
