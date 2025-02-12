<template>
	<div
		v-if="store.user"
		ref="menuRef"
		:class="toggleDropdown ? 'py-[7px]' : 'py-1'"
		class="flex items-center bg-white justify-center gap-3 border rounded-full px-5 w-fit shadow">
		<div class="flex items-center space-x-2 flex-grow">
			<Typography
				variant="lead"
				class="text-14-21"
				>{{ countdown.day }}, {{ countdown.date }}</Typography
			>
			<div class="w-[6px] h-[6px] rounded-full bg-gray-400"></div>
			<Typography
				variant="lead"
				class="text-14-21 mr-10"
				>{{ countdown.hour ? countdown.hour : "00" }}.{{ countdown.minute ? countdown.minute : "00" }}</Typography
			>
		</div>
		<div class="w-[200px]">
			<div
				v-if="toggleDropdown"
				class="absolute z-10 w-[200px] mt-[-18px] bg-white border border-border-default p-2 flex flex-col gap-1 space-y-1 rounded-md shadow">
				<div
					class="flex items-center space-x-3 border-[rgba(0, 0, 0, 0.1)] border-b-2 pb-2"
					@click="toggleDropdown = false">
					<img
						v-if="store.user.avatar"
						:src="store.user.avatar"
						alt=""
						class="rounded-full size-[30px]" />
					<div
						v-else
						class="flex justify-center">
						<div class="size-[30px] bg-semi rounded-full relative flex justify-center items-center">
							<p class="text-white text-[18px]">{{ store.user.name[0].toUpperCase() }}</p>
						</div>
					</div>
					<Typography
						variant="lead"
						class="text-turncate">
						{{ store.user ? store.user.name : "" }}
					</Typography>
					<ArrowDownIcon
						class="w-[14px] h-[14px]"
						containerClass="fill-black" />
				</div>
				<div class="flex items-center space-x-4 px-1 py-3 cursor-pointer rounded-md fill-black hover:bg-ghostprime hover:fill-primary hover:text-primary">
					<CircleUserIcon class="size-5 fill-inherit" />
					<Typography
						variant="lead"
						@click="goProfil()"
						>Profil Anda
					</Typography>
				</div>
				<div
					class="flex items-center space-x-4 px-1 py-3 cursor-pointer rounded-md hover:bg-ghostdanger"
					@click="logOut()">
					<LogOutIcon class="size-5 fill-danger" />
					<Typography
						variant="lead"
						class="text-danger">
						Keluar
					</Typography>
				</div>
			</div>
			<div
				v-else
				@click="toggleDropdown = true"
				class="flex gap-3 items-center cursor-pointer w-[200px] justify-end">
				<img
					v-if="store.user.avatar"
					:src="store.user.avatar"
					alt=""
					class="rounded-full size-[30px] p-0 m-0" />
				<div
					v-else
					class="flex justify-center">
					<div class="size-[30px] bg-semi rounded-full relative flex justify-center items-center">
						<p class="text-white text-[18px]">{{ store.user.name[0].toUpperCase() }}</p>
					</div>
				</div>
				<Typography variant="lead">{{ store.user ? store.user.name : "" }}</Typography>
				<ArrowDownIcon
					class="w-[14px] h-[14px]"
					containerClass="fill-black" />
			</div>
		</div>
	</div>
	<ModalLogOut
		:visible="visible"
		@close="visible = false" />
</template>

<script setup>
	import { ref, onMounted, onUnmounted } from "vue";
	import { useStore } from "../../store/monev.js";
	import { useRouter } from "vue-router";
	import moment from "moment";
	const store = useStore();
	const router = useRouter();
	const toggleDropdown = ref(false);
	const visible = ref(false);
	const interval = ref(null);
	const menuRef = ref(null);
	const countdown = ref({
		day: null,
		date: null,
		hour: null,
		minute: null,
	});

	const logOut = () => {
		visible.value = true;
	};

	const setTimer = () => {
		const intervals = setInterval(() => {
			const now = moment();
			countdown.value.hour = now.format("HH");
			countdown.value.minute = now.format("mm");
			countdown.value.day = now.format("dddd");
			countdown.value.date = now.format("DD MMMM");
		}, 1000);
		interval.value = intervals;
		clearInterval(interval.value - 1);
	};

	const goProfil = () => {
		toggleDropdown.value = false;
		router.replace("/profile");
	};

	const handleClickOutsides = (event) => {
		if (menuRef.value && !menuRef.value.contains(event.target)) {
			toggleDropdown.value = false;
		}
	};

	onMounted(() => {
		setTimer();
		document.addEventListener("mousedown", handleClickOutsides);
	});

	onUnmounted(() => {
		document.removeEventListener("mousedown", handleClickOutsides);
		clearInterval(interval.value);
	});
</script>

<style lang="scss" scoped></style>
