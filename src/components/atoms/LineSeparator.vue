<template>
	<div :class="lineStyles"></div>
</template>

<script lang="ts">
	import { defineComponent, computed } from "vue";

	export default defineComponent({
		name: "LineSeparator",
		props: {
			className: {
				type: String,
				default: "",
			},
		},
		setup(props) {
			const lineStyles = computed(() => ["w-full h-[1px] border-[1px] border-shade", props.className]);
			return {
				lineStyles,
			};
		},
	});
</script>

<style scoped>
	/* Add any scoped styles if needed */
</style>
