<template>
	<header class="pr-6 pl-1 bg-white shadow-md !absolutez-10">
		<div class="w-full p-2 flex items-center justify-between">
			<div class="flex items-center justify-around">
				<!-- Logo -->
				<div @click="toogleSideBar()">
					<p class="text-sm text-semi cursor-pointer mr-2"><BarsIcon class="size-6 stroke-semi" /></p>
				</div>
				<div>
					<Typography class="text-semibold text-14-21">Sistem Perencanaan Integrasi Kesehatan (SPIK)</Typography>
				</div>
			</div>
			<div class="space-x-2">
				<YearPickerButton
					title="Tahun Anggaran"
					:value="EPlanYear"
					v-model="EPlanYear"
					@update:modelValue="setEPlanning($event)" />
				<!-- <YearPickerButton
					title="Tahun Monev"
					:value="monevYear"
					v-model="monevYear"
					@update:modelValue="setMonev($event)" /> -->
			</div>
			<div class="flex items-center justify-center gap-3 border rounded-full py-1 px-2 w-fit">
				<Typography
					variant="lead"
					class="text-14-21"
					>{{ countdown.day ? countdown.day : moment().format("dddd") }}, {{ countdown.date ? countdown.date : moment().format("DD MMMM") }}</Typography
				>
				<div class="w-[6px] h-[6px] rounded-full bg-gray-400"></div>
				<Typography
					variant="lead"
					class="text-14-21"
					>{{ countdown.hour ? countdown.hour : moment().format("HH") }} . {{ countdown.minute ? countdown.minute : moment().format("mm") }}</Typography
				>
			</div>
		</div>
	</header>
</template>

<script setup>
	import { ref, onMounted, onUnmounted } from "vue";
	import { useStore } from "../../store/monev";
	import { useRouter } from "vue-router";
	import moment from "moment";
	import Typography from "../atoms/Typography.vue";
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

	const monevYear = ref(null);
	const EPlanYear = ref(null);

	const setEPlanning = (year) => {
		EPlanYear.value = year;
		store.setEPlan(year);
	};

	const setMonev = (year) => {
		monevYear.value = year;
		store.setMonev(year);
	};

	const toogleSideBar = () => {
		store.hideSidebar();
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
		EPlanYear.value = store.EPlanYear ? store.EPlanYear : moment().format("YYYY");
		monevYear.value = store.monevYear ? store.monevYear : moment().format("YYYY");
		console.log(store);
		document.addEventListener("mousedown", handleClickOutsides);
	});

	onUnmounted(() => {
		document.removeEventListener("mousedown", handleClickOutsides);
		clearInterval(interval.value);
	});
</script>

<style lang="scss" scoped></style>
