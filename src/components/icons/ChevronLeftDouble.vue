<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		:class="props.class"
		s>
		<path
			fill-rule="evenodd"
			d="M10.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L12.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z"
			clip-rule="evenodd"
			:class="props.containerClass" />
		<path
			fill-rule="evenodd"
			d="M4.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L6.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z"
			clip-rule="evenodd"
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
