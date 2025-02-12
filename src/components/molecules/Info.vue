<template>
	<div class="flex gap-1 flex-1">
		<CircleCheckIcon
			class="size-6 text-white"
			:class="value ? 'fill-primary' : 'fill-semiprime'" />
		<Typography :class="value ? (value ? 'text-primary' : 'text-danger') : 'text-semiprime'"> {{ label }}</Typography>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import Typography from "../atoms/Typography.vue";

	export default defineComponent({
		name: "Info",
		components: {
			Typography,
		},
		props: {
			label: {
				type: String,
				required: true,
			},
			value: {
				type: Boolean,
				default: null,
			},
		},
	});
</script>

<style scoped>
	/* Add your custom styles here if needed */
</style>
