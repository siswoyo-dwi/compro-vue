<template>
	<div class="flex flex-col absolute bottom-0 w-full bg-primary">
		<div
			@click="toogleLogout()"
			class="flex justify-between items-center p-4 cursor-pointer">
			<div class="capitalize">
				<Typography class="text-14-21">{{ store.user.nama_user }}</Typography>
			</div>
			<div
				v-if="showLogout"
				class="w-[50px] flex justify-end">
				<ChevronDownIcon class="size-5 fill-white" />
			</div>
			<div
				v-else
				class="w-[50px] flex justify-end">
				<ChevronUpIcon class="size-5 stroke-white" />
			</div>
		</div>
		<div
			v-if="showLogout"
			class="flex flex-col p-4 space-y-4">
			<div
				@click="$router.push('/profile')"
				class="flex w-full justify-between cursor-pointer stroke-white hover:text-success hover:!stroke-success">
				<Typography class="text-14-21">Profil</Typography>
				<UserIcon class="size-4 stroke-inherit stroke-2" />
			</div>
			<div
				@click="emit('logout')"
				class="flex w-full justify-between cursor-pointer stroke-white hover:text-danger hover:!stroke-danger">
				<Typography class="text-14-21">Keluar</Typography>
				<PowerIcon class="size-4 stroke-inherit stroke-2" />
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref } from "vue";
	import { useStore } from "../../store/monev";
	import ModalLogOut from "./ModalLogOut.vue";

	const emit = defineEmits(["logout"]);

	const store = useStore();
	const showLogout = ref(false);
	const openOut = ref(false);
	const toogleLogout = () => {
		showLogout.value = !showLogout.value;
	};
</script>

<style lang="scss" scoped></style>
