<template>
	<Modals
		:plain="true"
		:closeBackdrop="true"
		:visible="visible"
		variant="center"
		className="w-[320px] h-[346px]"
		@close="close()">
		<div class="flex flex-col space-y-3 text-start text-poppins p-2">
			<Typography
				variant="paragraph"
				class="text-14-21"
				>Unggah Foto*</Typography
			>
			<div class="flex justify-center">
				<div
					v-if="src1"
					class="flex justify-center items-center relative">
					<img
						class="size-[285px] object-cover"
						:src="src1" />
					<div
						class="absolute top-0 right-0 bg-white p-2 shadow rounded-md"
						@click="openFileInput()">
						<PenLineIcon class="size-5 fill-primary" />
					</div>
					<div
						class="absolute bottom-0 right-0 p-2 bg-white shadow rounded-md cursor-pointer"
						@click="clearPhoto()">
						<TrashIcon class="size-5 fill-redist" />
					</div>
				</div>
				<div
					v-else
					class="border-[1px] border-shade size-[278px] rounded-md">
					<div class="flex flex-col justify-center items-center h-full">
						<div class="flex justify-center">
							<div class="p-2 border-shade bg-shade border-[2px] rounded-full"><ArrowUpFromBracketIcon class="size-4 fill-primary" /></div>
						</div>
						<div class="flex justify-center">
							<Typography class="text-14-21"> Seret & Lepas atau </Typography>
							<span
								class="ml-1 underline text-primary cursor-pointer text-14-21"
								@click="openFileInput()">
								Pilih File</span
							>
						</div>
						<div class="text-center">
							<Typography class="text-semi text-14-21"> JPG atau PNG (Maks. 5MB)</Typography>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Modals>
	<input
		class="hidden"
		ref="file1"
		type="file"
		accept="image/png, image/jpg, image/jpeg"
		@change="handleFile()" />
</template>

<script setup lang="ts">
	import { ref, defineProps, defineEmits } from "vue";
	import Typography from "../atoms/Typography.vue";
	import upload from "../../axios/upload";
	import useToast from "../../store/toast";

	const emit = defineEmits(["close", "updatePhoto"]);
	const src1 = ref<any>(null);
	const file1 = ref<any>(null);
	const photo = ref<any>(null);
	const toast = useToast();
	const props = defineProps({
		visible: {
			type: Boolean,
			required: true,
		},
	});

	const handleFile = () => {
		let x = file1.value.files[0];
		let size = x.size / (1024 * 1024);
		if (size <= 5) {
			photo.value = x;
			src1.value = URL.createObjectURL(x);
			uploadPhoto();
		} else {
			toast.error({
				text: "File lebih dari 5 MB! Gagal mengunggah file",
			});
		}
	};

	const openFileInput = () => {
		file1.value.click();
	};

	const clearPhoto = () => {
		src1.value = null;
		photo.value = null;
	};

	const close = () => {
		emit("close");
	};

	const uploadPhoto = () => {
		console.log("mulai upload");
		let data = new FormData();
		data.append("file", photo.value);
		data.append("filepath", "/seeu-app/profile");
		upload
			.post("/upload", data)
			.then((res) => {
				console.log(res.data.data);
				emit("updatePhoto", res.data.data.url);
			})
			.catch((err) => {
				console.log(err);
				toast.error({
					text: err.message,
				});
			});
	};
</script>

<style lang="scss" scoped></style>
