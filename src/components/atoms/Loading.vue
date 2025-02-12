<template>
	<div class="flex items-center justify-center">
		<div :class="loadingStyles"></div>
	</div>
</template>

<script setup>
	import { computed } from "vue";

	const props = defineProps({
		className: String,
	});

	const loadingStyles = computed(() => {
		return ["w-8 h-8 rounded-full animate-spin border-4 border-solid border-green-500 border-t-transparent", props.className].join(" ");
	});
</script>
