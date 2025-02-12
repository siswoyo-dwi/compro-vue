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
			d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
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
