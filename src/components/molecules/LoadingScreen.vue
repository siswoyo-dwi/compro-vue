<template>
	<div
		v-if="show"
		class="fixed w-full h-full right-0 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-[1px] z-[999]">
		<div class="card w-[400px] h-[250px] flex flex-col space-y-2 items-center justify-center">
			<div class="mx-auto flex flex-col min-h-screen max-w-screen-sm items-center justify-center">
				<div class="h-[77px] animate-spin w-[77px] rounded-full bg-gradient-to-r from-ghostsuccess via-success to-success p-2">
					<div class="flex h-full w-full rounded-full items-center justify-center bg-white"></div>
				</div>
				<span class="flex flex-col items-center justify-center mt-4">
					<Typography class="text-16-20 font-bold">Loading</Typography>
					<Typography class="text-14-21 text-semi">Mohon Tunggu Sebentar..</Typography>
				</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import useLoadingStore from "../../store/loading";
	import { computed } from "vue";

	const loadingStore = useLoadingStore();

	const show = computed(() => {
		return loadingStore.loading;
	});

	const props = defineProps({
		className: String,
	});

	const loadingStyles = computed(() => {
		return ["size-[77px] rounded-full animate-spin border-[12px] bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"];
	});
</script>

<style scoped></style>
