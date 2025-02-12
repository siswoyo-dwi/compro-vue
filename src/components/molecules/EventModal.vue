<template>
	<Modals
		:closeBackdrop="false"
		:visible="visible"
		variant="center"
		className="w-[550px] h-[194px]"
		@close="close()">
		<div class="flex flex-col justify-between text-center text-poppins p-4">
			<Typography
				variant="paragraph"
				class="text-24-30"
				>Hapus Foto Profil</Typography
			>
			<Typography
				variant="lead"
				class="text-14-21 text-semi mb-4"
				>Apakah Anda yakin ingin Menghapus Foto Profil?</Typography
			>

			<div class="flex space-x-4 mt-4">
				<Button
					class="bg-redist w-full py-4"
					@click="hapusPhoto()"
					>Hapus</Button
				>
				<Button
					variant="outline text-black "
					class="w-full border-semi border-2"
					@click="close()"
					>Batal</Button
				>
			</div>
		</div>
	</Modals>
</template>

<script setup lang="ts">
	import { defineProps, defineEmits } from "vue";
	import Typography from "../atoms/Typography.vue";
	import axios from "../../axios/axios";
	import { useStore } from "../../store/monev";

	const store = useStore();
	const emit = defineEmits(["close", "deletePhoto"]);
	const props = defineProps({
		visible: {
			type: Boolean,
			required: true,
		},
		users: {
			type: Object,
			required: true,
		},
	});
	const close = () => {
		emit("close");
	};

	const hapusPhoto = () => {
		let userx = props.users;
		userx.avatar = null;
		axios
			.put("/account/update/" + userx.id, userx)
			.then((res) => {
				console.log(res);
				if (res.data.code == 200) {
					emit("deletePhoto", null);
					emit("close");
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
</script>

<style lang="scss" scoped></style>
