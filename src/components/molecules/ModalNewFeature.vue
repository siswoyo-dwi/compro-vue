<template>
	<Modals
		:closeBackdrop="false"
		:visible="visible"
		variant="center"
		className="w-[379px] h-[491px]"
		@close="close()">
		<div class="flex flex-col space-y-3 text-center text-poppins">
			<Typography
				variant="paragraph"
				class="text-24-30"
				>Fitur Baru Segera Hadir</Typography
			>
			<Typography
				variant="lead"
				class="text-14-21 text-semi"
				>Fitur sedang dalam tahap Pengembangan. Tunggu kehadirannya segera!</Typography
			>
			<div class="flex justify-center">
				<img
					class="size-[285px]"
					src="../../assets/images/Maintenance.png" />
			</div>
			<Button @click="close()">Kembali</Button>
		</div>
	</Modals>
</template>

<script setup lang="ts">
	import { defineProps, defineEmits } from "vue";
	import Typography from "../atoms/Typography.vue";

	const emit = defineEmits(["close"]);
	const props = defineProps({
		visible: {
			type: Boolean,
			required: true,
		},
	});
	const close = () => {
		emit("close");
	};
</script>

<style lang="scss" scoped></style>
