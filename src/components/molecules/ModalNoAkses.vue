<template>
	<Modals
		:closeBackdrop="false"
		:visible="visible"
		variant="center"
		className="w-[379px] h-[563px]"
		@close="close()">
		<div class="flex flex-col space-y-3 text-center text-poppins">
			<Typography
				variant="paragraph"
				class="text-24-30"
				>Masuk atau Daftar sekarang</Typography
			>
			<Typography
				variant="lead"
				class="text-14-21 text-semi"
				>Anda perlu masuk atau Daftar terlebih dahulu untuk bergabung ke dalam rapat.</Typography
			>
			<div class="flex justify-center">
				<img
					class="size-[285px]"
					src="../../assets/images/no_akses.png" />
			</div>
			<Button @click="$router.push('/daftar')">Daftar</Button>
			<Button
				variant="outline"
				@click="$router.push('/login')"
				>Masuk</Button
			>
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
