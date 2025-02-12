<template>
	<textarea
		ref="textareaRef"
		:maxlength="255"
		:data-testid="testID"
		:class="computedClasses"
		v-bind="otherAttrs"></textarea>
</template>

<script setup>
	import { ref, computed } from "vue";

	const props = defineProps({
		testID: { type: String, required: true },
		className: { type: String, default: "" },
		disabled: { type: Boolean, default: false },

		...Object.keys(Object.getPrototypeOf(document.createElement("textarea"))).reduce((acc, key) => {
			acc[key] = [String, Number, Boolean, Function];
			return acc;
		}, {}),
	});

	const textareaRef = ref(null);

	const computedClasses = computed(() => "outline-none w-full text-lg font-medium placeholder-[#868D9D] placeholder-opacity-50", props.className, {
		"!bg-gray-100": props.disabled,
	});
	const otherAttrs = {
		...props,
		className: undefined,
		testID: undefined,
	};
</script>
