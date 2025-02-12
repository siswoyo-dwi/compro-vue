<template>
	<div
		class="fixed top-10 left-0 right-0 w-fit mx-auto flex flex-col gap-3 z-[999]"
		v-if="toastStore.toasts.length">
		<div
			v-for="toast in toastStore.toasts"
			:key="toast.text"
			:class="['rounded-md w-[300px] px-2 pt-1 pb-3', toastClassMap[toast.status]]">
			<div class="flex min-h-[60px] space-x-4 justify-between">
				<div class="flex flex-col">
					<div class="flex items-center px-1 py-1">
						<Typography class="text-16-20 capitalize break-words">{{ get_status(toast.status) }}</Typography>
					</div>
					<div class="flex items-center px-1 py-1">
						<Typography class="text-base capitalize break-words">{{ toast.text }}</Typography>
					</div>
				</div>
				<div :class="['w-[24px] rounded-l-md flex justify-end items-start pl-1']">
					<img
						src="../../assets/images/x-circle.png"
						alt="close"
						width="20"
						height="20" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import useToasterStore from "../../store/toast";
	import Typography from "./Typography.vue";

	const toastStore = useToasterStore();

	const toastClassMap = {
		warning: "bg-toastWarning text-semi",
		error: "bg-danger text-white",
		success: "bg-toastSuccess text-white",
	};

	const get_status = (x) => {
		switch (x) {
			case "success":
				return "Berhasil";
			case "warning":
				return "Perhatian !";
			case "error":
				return "Gagal !!";
		}
	};

	const toastIconMap = {
		error: "toast-error",
		warning: "toast-warning",
		success: "toast-success",
	};
</script>
