<template>
	<ModalCalendar
		testID="modal-delete"
		:closeBackdrop="false"
		:visible="visible"
		variant="center"
		className="w-[550px] h-[194px]"
		@close="close()">
		<div class="flex flex-col justify-between text-center text-poppins p-4">
			<Typography
				variant="paragraph"
				class="text-24-30"
				>Hapus Jadwal</Typography
			>
			<Typography
				variant="lead"
				class="text-14-21 text-semi mb-4"
				>Apakah Anda yakin ingin Menghapus Jadwal ini?</Typography
			>
			<div class="flex space-x-4 mt-4">
				<Button
					class="bg-redist w-full py-4"
					@click="hapusEvent()"
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
	</ModalCalendar>
</template>

<script setup lang="ts">
	import { defineProps, defineEmits } from "vue";
	import axios from "../../axios/axios";
	import useLoading from "../../store/loading.js";
	import useToast from "../../store/toast.js";

	const emit = defineEmits(["close", "eventDeleted"]);
	const props = defineProps({
		visible: {
			type: Boolean,
			required: true,
		},
		data: {
			type: Object,
			default: () => ({}),
		},
	});

	const loading = useLoading();
	const toast = useToast();
	const close = () => {
		emit("close");
	};

	const hapusEvent = () => {
		loading.show();
		axios
			.delete("/instant-meeting/delete/room/" + props.data.room_code)
			.then((res) => {
				console.log(res);
				if (res.data.code == 200) {
					emit("eventDeleted");
					emit("close");
					loading.hide();
					toast.success({
						text: " Hapus Jadwal Berhasil",
					});
				}
			})
			.catch((err) => {
				console.log(err);
				loading.hide();
				toast.success({
					text: err.message ? err.message : err.data.message,
				});
			});
	};
</script>

<style lang="scss" scoped></style>
