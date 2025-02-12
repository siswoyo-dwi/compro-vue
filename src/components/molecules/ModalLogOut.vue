<template>
	<ModalTe
		testID="logout-modal"
		:closeBackdrop="false"
		:visible="visible"
		variant="top"
		className="w-[550px] h-[194px] "
		@close="close()">
		<div class="flex flex-col justify-between text-center text-poppins p-4">
			<Typography
				variant="paragraph"
				class="text-24-30"
				>Keluar Akun</Typography
			>
			<Typography
				variant="lead"
				class="text-14-21 text-semi mb-4"
				>Apakah Anda yakin ingin keluar akun?</Typography
			>

			<div class="flex space-x-4 mt-4">
				<Button
					class="bg-redist w-full py-4"
					@click="logOut"
					>Keluar</Button
				>
				<Button
					variant="outline text-black "
					class="w-full border-semi border-2"
					@click="close()"
					>Batal</Button
				>
			</div>
		</div>
	</ModalTe>
</template>

<script setup lang="ts">
	import { defineProps, defineEmits } from "vue";
	import Typography from "../atoms/Typography.vue";
	import useToast from "../../store/toast";
	import useLoading from "../../store/loading";
	import { useStore } from "../../store/monev";
	import { useRouter } from "vue-router";

	const router = useRouter();
	const toast = useToast();
	const store = useStore();
	const loading = useLoading();

	const emit = defineEmits(["close"]);
	const props = defineProps({
		visible: {
			type: Boolean,
			required: true,
		},
	});

	const logOut = () => {
		loading.show();
		setTimeout(() => {
			store.clear_token();
			router.replace("/login");
			loading.hide();
		}, 1500);
	};
	const close = () => {
		emit("close");
	};
</script>

<style lang="scss" scoped></style>
