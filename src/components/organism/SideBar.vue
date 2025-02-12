<template>
	<div
		:class="['fixed top-0 left-0 h-screen bg-[#3949AB] text-15-24 text-white shadow-lg flex flex-col transition-all duration-300', store.sidebarShow ? '-ml-96' : minimize ? 'w-20' : 'w-64']"
		@mouseenter="handleHover(true)"
		@mouseleave="handleHover(false)">
		<!-- Toggle Button -->
		<div class="flex flex-col justify-center items-center p-6">
			<img
				src="../../components/images/logoDinkes.png"
				alt="Logo"
				class="mb-2 w-[40px] h-[46px]" />
			<Typography class="text-24-30"> SPIK </Typography>
			<Typography class="text-12-14 text-center"> Sistem Perencanaan Integrasi Kesehatan </Typography>
		</div>

		<!-- Sidebar Menu Items -->
		<ul class="flex flex-col space-y-1 p-1 overflow-auto mb-[50px]">
			<template
				v-for="item in filteredMenu"
				:key="item.key">
				<li
					v-if="item._name === 'TSidebarNavItem'"
					class="transition-colors cursor-pointer">
					<div
						@click="goTo(item.to)"
						:class="getAClass(item.to)"
						class="flex items-center p-2 rounded-md hover:bg-[#B388FF] hover:text-white">
						<div class="size-[20px] flex items-center">
							<component
								:is="item.icon"
								:name="item.icon"
								:class="[{ 'fill-white': item.fill }, { 'stroke-white': item.stroke }, 'size-[20px]']" />
						</div>
						<div
							v-if="!minimize"
							class="ml-2 flex items-center">
							<span>{{ item.name }}</span>
						</div>
					</div>
				</li>

				<li
					v-else-if="item._name === 'TSidebarNavDropdown'"
					:class="getDropClass(item)">
					<div
						@click="toggleDropdown(item)"
						:class="['flex items-center p-2 cursor-pointer hover:bg-[#B388FF] hover:text-white', getDropClass(item)]">
						<div class="size-[20px]">
							<component
								:is="item.icon"
								:name="item.icon"
								:class="[{ 'fill-white': item.fill }, { 'stroke-white': item.stroke }, 'size-[20px]']" />
						</div>
						<div
							class="flex justify-start flex-1 ml-2"
							v-if="!minimize">
							{{ item.name }}
						</div>
						<div class="size-[20px]">
							<ChevronDownIcon class="size-5 fill-white" />
						</div>
					</div>
					<ul
						v-if="dropActive[item.name]"
						:class="['pl-6 space-y-0', getDropClass(item)]">
						<li
							v-for="child in item._children"
							:key="child.key"
							class="transition-colors cursor-pointer">
							<div
								@click="goTo(child.to, item)"
								:class="[getAClass(child.to), child.new ? '!text-warning' : '']"
								class="flex items-center p-2 hover:bg-[#B388FF] hover:text-white">
								<div class="size-[20px]">
									<component
										:is="child.icon"
										:name="child.icon"
										:class="[{ 'fill-white': child.fill }, { 'stroke-white': child.stroke }, 'size-[20px]']" />
								</div>
								<span
									:class="child.icon ? 'ml-2' : ''"
									v-if="!minimize"
									>{{ child.name }}</span
								>
							</div>
						</li>
					</ul>
				</li>
			</template>
		</ul>
		<SideBarLogOut @logout="openOut = true" />
	</div>
	<ModalLogOut
		:visible="openOut"
		@close="openOut = false" />
</template>

<script setup>
	import { ref, computed } from "vue";
	import { useStore } from "../../store/monev";
	import { useRouter } from "vue-router";
	import { ChevronDownIcon } from "@heroicons/vue/16/solid";

	// Reactive State
	const store = useStore();
	const router = useRouter();

	const dropActive = ref({});
	const tabActive = ref(null);
	const minimize = ref(false);
	const openOut = ref(false);

	const menu = ref([
		{
			_name: "TSidebarNavItem",
			name: "Dashboard",
			to: "/dashboard",
			icon: "FolderIcon",
			stroke: true,
			role: ["superadmin", "puskesmas", "seksi", "bidang", "kabid", "kapus", "sekdin", "kadin", "pepk"],
			key: "menu_dashboard",
		},
		{
			_name: "TSidebarNavDropdown",
			name: "Master",
			icon: "FolderIcon",
			stroke: true,
			role: ["superadmin"],
			key: "menu_master",
			_children: [
				{ _name: "TSidebarNavItem", name: "Unit", to: "/master/puskesmas", role: ["superadmin"], key: "menu_master_puskesmas" },
				{ _name: "TSidebarNavItem", name: "Bidang", to: "/master/bidang", role: ["superadmin"], key: "menu_master_bidang" },
				{ _name: "TSidebarNavItem", name: "Seksi", to: "/master/seksi", role: ["superadmin"], key: "menu_master_seksi" },
				{ _name: "TSidebarNavItem", name: "Bidang Seksi", to: "/master/bidang_seksi", role: ["superadmin"], key: "menu_master_bidang_seksi" },
				{ _name: "TSidebarNavItem", name: "Seksi Sub Kegiatan", to: "/master/seksi_kegiatan", role: ["superadmin"], key: "menu_master_seksi_kegiatan" },
				{ _name: "TSidebarNavItem", name: "IKU", to: "/master/iku", role: ["superadmin"], key: "menu_master_iku" },
				{ _name: "TSidebarNavItem", name: "SPM 12", to: "/master/spm", role: ["superadmin"], key: "menu_master_spm" },
				{ _name: "TSidebarNavItem", name: "Sumber Dana", to: "/master/sumber_dana", role: ["superadmin"], key: "menu_master_sumber_dana" },
				{ _name: "TSidebarNavItem", name: "Harga", to: "/master/harga", role: ["superadmin"], key: "menu_master_harga" },
				{ _name: "TSidebarNavItem", name: "Jadwal", to: "/master/jadwal", role: ["superadmin"], key: "menu_master_jadwal" },
				{ _name: "TSidebarNavItem", name: "Anggaran", to: "/master/anggaran", role: ["superadmin"], key: "menu_master_anggaran" },
				{ _name: "TSidebarNavItem", name: "Urusan", to: "/master/urusan", role: ["superadmin"], key: "menu_master_urusan" },
				{ _name: "TSidebarNavItem", name: "Program", to: "/master/program", role: ["superadmin"], key: "menu_master_program" },
				{ _name: "TSidebarNavItem", name: "Kegiatan", to: "/master/kegiatan", role: ["superadmin"], key: "menu_master_kegiatan" },
				{ _name: "TSidebarNavItem", name: "Sub Kegiatan", to: "/master/sub_kegiatan", role: ["superadmin"], key: "menu_master_sub_kegiatan" },
				{ _name: "TSidebarNavItem", name: "Belanja Level 1", to: "/master/sub_belanja_1", role: ["superadmin"], key: "menu_master_sub_belanja_1" },
				{ _name: "TSidebarNavItem", name: "Belanja Level 2", to: "/master/sub_belanja_2", role: ["superadmin"], key: "menu_master_sub_belanja_2" },
				{ _name: "TSidebarNavItem", name: "Belanja Level 3", to: "/master/sub_belanja_3", role: ["superadmin"], key: "menu_master_sub_belanja_3" },
				{ _name: "TSidebarNavItem", name: "Belanja Level 4", to: "/master/sub_belanja_4", role: ["superadmin"], key: "menu_master_sub_belanja_4" },
				{ _name: "TSidebarNavItem", name: "Belanja Level 5", to: "/master/sub_belanja_5", role: ["superadmin"], key: "menu_master_sub_belanja_5" },
				{ _name: "TSidebarNavItem", name: "Belanja", to: "/master/belanja", role: ["superadmin"], key: "menu_master_belanja" },
				{ _name: "TSidebarNavItem", name: "Pendapatan 1", to: "/master/pendapatan_1", role: ["superadmin"], key: "menu_master_pendapatan_1" },
				{ _name: "TSidebarNavItem", name: "Pendapatan 2", to: "/master/pendapatan_2", role: ["superadmin"], key: "menu_master_pendapatan_2" },
				{ _name: "TSidebarNavItem", name: "Pendapatan 3", to: "/master/pendapatan_3", role: ["superadmin"], key: "menu_master_pendapatan_3" },
				{ _name: "TSidebarNavItem", name: "Pendapatan 4", to: "/master/pendapatan_4", role: ["superadmin"], key: "menu_master_pendapatan_4" },
				{ _name: "TSidebarNavItem", name: "Pendapatan 5", to: "/master/pendapatan_5", role: ["superadmin"], key: "menu_master_pendapatan_5" },
				{ _name: "TSidebarNavItem", name: "User", to: "/master/user", role: ["superadmin"], key: "menu_master_user" },
			],
		},
		{
			_name: "TSidebarNavDropdown",
			name: "Import",
			icon: "FolderIcon",
			stroke: true,
			role: ["superadmin"],
			key: "menu_master",
			_children: [
				{
					_name: "TSidebarNavItem",
					name: "Pagu",
					icon: "cil-layers",
					to: "/import_pagu",
					role: ["superadmin"],
					key: "menu_import_pagu",
				},
				// {
				// 	_name: "TSidebarNavItem",
				// 	name: "Monev",
				// 	icon: "cil-layers",
				// 	to: "/import_monev",
				// 	role: ["superadmin"],
				// 	key: "menu_import_monev",
				// },
				{
					_name: "TSidebarNavItem",
					name: "Realisasi Keuangan",
					icon: "cil-layers",
					to: "/import_realisasi_keuangan",
					role: ["superadmin"],
					key: "menu_import_realisasi",
				},
				{
					_name: "TSidebarNavItem",
					name: "Realisasi Fisik",
					icon: "cil-layers",
					to: "/import_realisasi_fisik",
					role: ["superadmin"],
					key: "menu_import_realisasi",
				},
			],
		},
		{
			_name: "TSidebarNavItem",
			name: "Sumber Dana Belanja",
			icon: "cil-layers",
			to: "/sumber_dana_belanja",
			role: ["superadmin", "puskesmas", "seksi", "kapus", "kabid"],
			key: "menu_sumber_dana_belanja",
		},
		// {
		// 	_name: "TSidebarNavItem",
		// 	name: "Import Monev",
		// 	icon: "cil-layers",
		// 	to: "/import_monev",
		// 	role: ["superadmin"],
		// 	key: "menu_import_monev",
		// },

		{ _name: "TSidebarNavItem", name: "Renstra", icon: "cil-layers", to: "/renstra", role: ["superadmin", "puskesmas", "kapus", "sekdin", "kadin", "pepk"], key: "menu_renstra" },
		// { _name: "TSidebarNavItem", name: "Renstra", icon: "cil-layers", to: "/dinkes/renstra", role: ["superadmin", "sekdin", "kadin"], key: "menu_renstra_dinkes" },
		{ _name: "TSidebarNavItem", name: "Masalah", to: "/master/dim", role: ["superadmin", "puskesmas", "seksi"], key: "menu_master_masalah" },
		{
			_name: "TSidebarNavItem",
			name: "RUK",
			icon: "cil-layers",
			to: "/ruk",
			role: ["superadmin", "puskesmas"],
			key: "menu_ruk",
		},
		{
			_name: "TSidebarNavItem",
			name: "Usulan Kegiatan",
			icon: "cil-layers",
			to: "/kua_ppas",
			role: ["superadmin", "seksi"],
			key: "menu_kua_ppas",
		},
		{
			_name: "TSidebarNavDropdown",
			name: "Pendapatan",
			icon: "FolderIcon",
			stroke: true,
			role: ["superadmin", "puskesmas", "bidang", "kabid", "sekdin", "kadin", "pepk"],
			key: "menu_master",
			_children: [
				{
					_name: "TSidebarNavItem",
					name: "Target Pendapatan",
					icon: "cil-layers",
					to: "/target_pendapatan",
					role: ["superadmin", "puskesmas", "seksi"], // pptk atau seksi
					key: "menu_pendapatan_target",
				},
				{
					_name: "TSidebarNavItem",
					name: "Input Pendapatan",
					icon: "cil-layers",
					to: "/pendapatan",
					role: ["superadmin", "puskesmas"], // pptk atau seksi
					key: "menu_pendapatan_input",
				},
				{
					_name: "TSidebarNavItem",
					name: "Pendapatan",
					icon: "cil-layers",
					to: "/laporan_pendapatan",
					role: ["superadmin", "puskesmas", "bidang", "kabid", "sekdin", "kadin", "pepk"],
					key: "menu_pendapatan_laporan",
				},
			],
		},

		{
			_name: "TSidebarNavItem",
			name: "RKA SKPD",
			icon: "cil-layers",
			to: "/rka",
			role: ["superadmin", "puskesmas", "seksi", "kapus", "kabid", "pepk", "sekdin", "kadin"], // pptk atau seksi
			key: "menu_rka",
		},
		// {
		// 	_name: "TSidebarNavItem",
		// 	name: "RKA SKPD",
		// 	icon: "cil-layers",
		// 	to: "/rka/approval",
		// 	role: ["superadmin", "kapus", "kabid"], // kapus
		// 	key: "menu_rka_approval",
		// },
		// {
		// 	_name: "TSidebarNavItem",
		// 	name: "RKA SKPD",
		// 	icon: "cil-layers",
		// 	to: "/rka/dinkes",
		// 	role: ["superadmin", "pepk", "sekdin", "kadin"], //kabid , pepk, sekdin, kadin
		// 	key: "menu_rka_dinkes",
		// },
		{
			_name: "TSidebarNavItem",
			name: "RKA Belanja",
			icon: "cil-layers",
			to: "/blud",
			role: ["superadmin", "puskesmas", "seksi", "kapus", "kabid", "pepk", "sekdin", "kadin"], // pptk atau seksi
			key: "menu_blud",
		},
		// {
		// 	_name: "TSidebarNavItem",
		// 	name: "RKA BLUD",
		// 	icon: "cil-layers",
		// 	to: "/blud/approval",
		// 	role: ["superadmin", "kapus", "kabid"], // kapus
		// 	key: "menu_blud_approval",
		// },
		// {
		// 	_name: "TSidebarNavItem",
		// 	name: "RKA BLUD",
		// 	icon: "cil-layers",
		// 	to: "/blud/dinkes",
		// 	role: ["superadmin", "pepk", "sekdin", "kadin"], //kabid , pepk, sekdin, kadin
		// 	key: "menu_blud_dinkes",
		// },
		{
			_name: "TSidebarNavItem",
			name: "Monev",
			icon: "cil-layers",
			to: "/monev",
			role: ["superadmin", "puskesmas", "seksi", "kabid", "kapus", "pepk", "sekdin", "kadin"],
			key: "menu_monev",
		},

		{
			_name: "TSidebarNavItem",
			name: "Monev BLUD",
			icon: "cil-layers",
			to: "/monev_blud",
			role: ["superadmin", "puskesmas", "seksi", "kabid", "kapus", "pepk", "sekdin", "kadin"],
			key: "menu_monev_dinkes",
		},
		{
			_name: "TSidebarNavDropdown",
			name: "Laporan",
			icon: "FolderIcon",
			stroke: true,
			role: ["superadmin", "puskesmas", "kapus", "kabid", "pepk", "sekdin", "kadin"],
			key: "menu_laporan",
			_children: [
				// {
				// 	_name: "TSidebarNavItem",
				// 	name: "Pendapatan",
				// 	to: "/laporan/pendapatan",
				// 	role: ["superadmin", "puskesmas", "kapus", "kabid", "pepk", "sekdin", "kadin"],
				// 	key: "menu_laporan_pendapatan",
				// },
				{
					_name: "TSidebarNavItem",
					name: "Realisasi SIPD",
					to: "/laporan/realisasi_sipd",
					role: ["superadmin", "puskesmas", "kapus", "kabid", "pepk", "sekdin", "kadin"],
					key: "menu_laporan_realisasi_sipd",
					new: true,
				},
				{
					_name: "TSidebarNavItem",
					name: "Realisasi Fisik",
					to: "/laporan/realisasi_fisik",
					role: ["superadmin", "puskesmas", "kapus", "kabid", "pepk", "sekdin", "kadin"],
					key: "menu_laporan_realisasi_fisik",
					new: true,
				},
				{
					_name: "TSidebarNavItem",
					name: "Sumber Dana",
					to: "/laporan/Monev_sumber_dana",
					role: ["superadmin", "puskesmas", "kapus", "kabid", "pepk", "sekdin", "kadin"],
					key: "menu_laporan_monev_sumber_dana",
					new: true,
				},
				{
					_name: "TSidebarNavItem",
					name: "Kategori Sumber Dana",
					to: "/laporan/kategori_sumber_dana",
					role: ["superadmin", "puskesmas", "kapus", "kabid", "pepk", "sekdin", "kadin"],
					key: "menu_laporan_monev_sumber_dana",
					new: true,
				},
				{
					_name: "TSidebarNavItem",
					name: "SPM",
					to: "/laporan/monev_spm",
					role: ["superadmin", "puskesmas", "kapus", "kabid", "pepk", "sekdin", "kadin"],
					key: "menu_laporan_monev_spm",
					new: true,
				},
				{
					_name: "TSidebarNavItem",
					name: "IKU",
					to: "/laporan/iku",
					role: ["superadmin", "puskesmas", "kapus", "kabid", "pepk", "sekdin", "kadin"],
					key: "menu_laporan_monev_sumber_dana",
					new: true,
				},
				{
					_name: "TSidebarNavItem",
					name: "Stunting",
					to: "/laporan/stunting",
					role: ["superadmin", "puskesmas", "kapus", "kabid", "pepk", "sekdin", "kadin"],
					key: "menu_laporan_monev_sumber_dana",
					new: true,
				},
			],
		},
	]);

	const role = computed(() => (store.user ? store.active_role : null));

	const filteredMenu = computed(() =>
		menu.value
			.map((item) => {
				if (item._children) {
					return {
						...item,
						_children: item._children.filter((child) => !child.role || child.role.includes(role.value)),
					};
				}
				return item;
			})
			.filter((item) => !item.role || item.role.includes(role.value))
	);

	const toggleMinimize = () => {
		minimize.value = !minimize.value;
	};

	const handleHover = (hovering) => {
		if (minimize.value) {
			minimize.value = !hovering;
		}
	};

	const toggleDropdown = (item) => {
		const isCurrentlyActive = dropActive.value[item.name]; // Cache state
		Object.keys(dropActive.value).forEach((key) => {
			dropActive.value[key] = false; // Close others
		});
		dropActive.value[item.name] = !isCurrentlyActive; // Toggle clicked
	};

	const goTo = (to, parentItem) => {
		if (parentItem && !dropActive.value[parentItem.name]) {
			dropActive.value[parentItem.name] = true;
		}
		tabActive.value = to;
		router.push(to);
	};

	const getDropClass = (item) => (dropActive.value[item.name] ? "border-l-[1px] border-[#B388FF]" : "");

	const getAClass = (to) => (tabActive.value === to ? "bg-[#D1C4E9] text-[#B388FF] rounded-sm" : "");
</script>

<style scoped>
	/* Add necessary styles here */
</style>
