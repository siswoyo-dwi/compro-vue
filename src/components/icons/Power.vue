<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		:class="props.class">
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
			:class="props.containerClass" />
	</svg>
</template>
<script setup>
	const props = defineProps({
		class: {
			type: String,
			default: "",
		},
		containerClass: {
			type: String,
			default: "",
		},
	});
</script>
