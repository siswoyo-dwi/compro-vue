<template>
	<li :class="getClasses">
		<div class="block px-3 py-2 text-sm font-medium border border-gray-300 rounded-md hover:bg-white hover:text-primary cursor-pointer">
			<!-- Conditional Rendering for Icons and Labels -->
			<template v-if="!prev && !next">
				{{ label }}
			</template>
			<ChevronLeftIcon
				v-if="prev"
				class="size-5 fill-black" />
			<ChevronRightIcon
				v-if="next"
				class="size-5 fill-black" />
			<ChevronLeftDoubleIcon
				v-if="first"
				class="size-5 fill-black" />
			<ChevronRightDoubleIcon
				v-if="last"
				class="size-5 fill-black" />
		</div>
	</li>
</template>

<script setup>
	import { computed } from "vue";
	import ChevronLeft from "../icons/ChevronLeft.vue";
	import ChevronLeftDouble from "../icons/ChevronLeftDouble.vue";
	import ChevronRightDouble from "../icons/ChevronRightDouble.vue";

	// Props
	const props = defineProps({
		label: {
			type: String,
			default: "",
		},
		active: {
			type: Boolean,
			default: false,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		prev: {
			type: Boolean,
			default: false,
		},
		next: {
			type: Boolean,
			default: false,
		},
		first: {
			type: Boolean,
			default: false,
		},
		last: {
			type: Boolean,
			default: false,
		},
	});

	const getClasses = computed(() => {
		let classes = "inline-block";
		if (props.active) classes += " bg-primary rounded-md text-white";
		if (props.disabled) classes += " opacity-50 cursor-not-allowed";
		return classes;
	});
</script>
s

<style scoped>
	/* Scoped styles are not needed since TailwindCSS is used throughout */
</style>
