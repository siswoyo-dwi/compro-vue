<template>
	<div
		v-if="isAdmin"
		ref="actionBar">
		<!-- Toggle Button -->
		<button
			v-if="!actionBarShow"
			class="fixed top-1/2 right-0 z-20 transform -translate-y-1/2 p-3 bg-success text-white shadow-lg rounded-l-md"
			@click.stop="toggleActionbar">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="size-6">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
			</svg>
		</button>

		<!-- actionBar -->
		<div
			:class="['fixed top-0 right-0 h-screen bg-success shadow-lg flex flex-col transition-transform duration-300 !z-999 w-56']"
			:style="{ transform: actionBarShow ? 'translateX(0)' : 'translateX(100%)' }">
			<div class="flex flex-col justify-center items-center p-6">
				<Typography class="text-14-21 text-white"> Admin </Typography>
				<Typography class="text-12-14 text-center text-white"> Action Bar </Typography>
			</div>
			<div class="p-3">
				<TeSelectField
					testID="role-user"
					label="Role"
					:options="role"
					:value="selected_role"
					v-model="selected_role"
					required />
				<TeSelectField
					testID="ms-puskemas-id-user"
					label="Unit"
					:options="puskesmas"
					:value="selected_puskesmas"
					v-model="selected_puskesmas" />
				<TeSelectField
					testID="bidang-user"
					label="Bidang"
					:options="bidang"
					:value="selected_bidang"
					v-model="selected_bidang" />
				<TeSelectField
					testID="seksi-user"
					label="Seksi"
					:options="seksi"
					:value="selected_seksi"
					v-model="selected_seksi" />
			</div>
			<div class="flex justify-center p-4">
				<Button @click="set_superadmin()">Admin Mode</Button>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, onMounted, onBeforeUnmount, computed, watch } from "vue";
	import { useStore } from "../../store/monev";
	import axios from "../../axios/axios";
	import { useRouter } from "vue-router";

	// Reactive State
	const actionBarShow = ref(false);
	const actionBar = ref(null);
	const store = useStore();
	const router = useRouter();
	const selected_role = ref(null);
	const selected_bidang = ref(null);
	const selected_puskesmas = ref(null);
	const selected_seksi = ref(null);
	const role = ref([
		{ value: "puskesmas", label: "Pejabat Pelaksana Teknis Kegiatan (PPTK)" },
		{ value: "pepk", label: "PEPK" },
		{ value: "seksi", label: "Seksi" },
		{ value: "kabid", label: "Kepala Bidang" },
		{ value: "kapus", label: "Kepala Puskemas / Laboratorium" },
		{ value: "sekdin", label: "Sekretaris Dinas" },
		{ value: "kadin", label: "Kepala Dinas" },
		{ value: "superadmin", label: "" },
	]);
	const bidang = ref([]);
	const seksi = ref([]);
	const puskesmas = ref([]);
	// Methods
	const toggleActionbar = () => {
		actionBarShow.value = !actionBarShow.value;
	};

	const set_superadmin = () => {
		store.set_role("superadmin");
		selected_bidang.value = null;
		selected_seksi.value = null;
		selected_puskesmas.value = null;
		selected_role.value = null;
		store.set_puskesmas(null);
		store.set_seksi(null);
		store.set_bidang(null);
	};

	const get_bidang = async () => {
		try {
			let res = await axios.post("ms_bidang/list");
			if (res.data.status == 200) {
				if (res.data.message == "sukses") {
					bidang.value = res.data.data.map((i) => {
						return { value: i.id, label: i.nama_bidang };
					});
				}
			}
		} catch (err) {
			console.log(err);
		}
	};

	const get_seksi = async () => {
		try {
			let res = await axios.post("ms_seksi/list");
			if (res.data.status == 200) {
				if (res.data.message == "sukses") {
					seksi.value = res.data.data.map((i) => {
						return { value: i.id, label: i.nama_seksi };
					});
				}
			}
		} catch (err) {
			console.log(err);
		}
	};

	const get_puskesmas = async () => {
		try {
			let res = await axios.post("ms_puskesmas/list");
			if (res.data.status == 200) {
				if (res.data.message == "sukses") {
					puskesmas.value = res.data.data.map((i) => {
						return { value: i.id, label: i.nama_puskesmas };
					});
				}
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleClickOutside = (event) => {
		if (actionBarShow.value && actionBar.value && !actionBar.value.contains(event.target)) {
			actionBarShow.value = false;
		}
	};

	const isAdmin = computed(() => (store.user ? store.user.role == "superadmin" : true));

	onMounted(() => {
		get_bidang();
		get_puskesmas();
		get_seksi();
		selected_puskesmas.value = store.active_puskesmas;
		selected_seksi.value = store.active_seksi;
		selected_role.value = store.active_role;
		document.addEventListener("click", handleClickOutside);
	});

	watch(
		() => selected_puskesmas.value,
		(newV, oldV) => {
			if (newV) {
				store.set_puskesmas(newV);
			}
		}
	);
	watch(
		() => selected_role.value,
		(newV, oldV) => {
			if (newV) {
				store.set_role(newV);
				router.push("/");
			}
		}
	);
	watch(
		() => selected_seksi.value,
		(newV, oldV) => {
			if (newV) {
				store.set_seksi(newV);
			}
		}
	);
	watch(
		() => selected_bidang.value,
		(newV, oldV) => {
			if (newV) {
				store.set_bidang(newV);
			}
		}
	);

	onBeforeUnmount(() => {
		document.removeEventListener("click", handleClickOutside);
	});
</script>

<style scoped>
	/* Smooth sliding animation */
</style>
