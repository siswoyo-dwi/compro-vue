<template>
	<div
		ref="scrollableContainer"
		class="bg-white px-3 py-3 shadow-sm overflow-auto cursor-grab"
		@mousedown="startDragging">
		<div class="min-h-full">
			<!-- Data table -->
			<div class="datatable-container">
				<table
					id="datatable"
					class="w-full border-collapse">
					<thead>
						<tr>
							<th
								v-for="column in columns"
								:key="column.key"
								:class="['px-2 py-2 text-sm font-medium border', column.class]">
								{{ column.label }}
							</th>
						</tr>
					</thead>
					<tbody v-if="props.items.length > 0">
						<tr
							v-for="(item, idx) in props.items"
							:key="idx"
							:class="striped ? (idx % 2 === 0 ? 'bg-white' : 'bg-gray-50') : 'bg-white'">
							<!-- Render cells based on columns -->
							<td
								v-for="column in columns"
								:key="column.key"
								:class="['px-2 py-3 text-sm border', column.class]"
								:style="{
									textAlign: column.class.includes('text-right') ? 'right' : 'left',
								}">
								<!-- Check if the column key is dynamically generated -->
								<template v-if="isMonth(column.key)">
									{{ item[column.key] || "RP. 0" }}
								</template>
								<template v-else-if="column.key === 'Persentase Pajak Rokok'">
									{{ calculatePercentage2(item["Pajak Rokok"], item["Realisasi Pajak Rokok"]) }}
								</template>
								<template v-else-if="column.key === 'Persentase DAK Non Fisik Kabupaten / Kota'">
									{{ calculatePercentage2(item["DAK Non Fisik Kabupaten / Kota"], item["Realisasi DAK Non Fisik Kabupaten / Kota"]) }}
								</template>
								<template v-else-if="column.key === 'Persentase Dana Non Fisik BOK Puskesmas'">
									{{ calculatePercentage2(item["Dana Non Fisik BOK Puskesmas"], item["Realisasi Dana Non Fisik BOK Puskesmas"]) }}
								</template>
								<template v-else-if="column.key === 'Persentase Dana Transfer Umum'">
									{{ calculatePercentage2(item["Dana Transfer Umum"], item["Realisasi Dana Transfer Umum"]) }}
								</template>
								<!-- Render special columns -->
								<template v-else-if="column.key === 'no'">
									{{ idx + 1 }}
								</template>
								<template v-else-if="column.key === 'total'">
									{{ formatRupiah(calculateTotal(item)) }}
								</template>
								<template v-else-if="column.key === 'persentase'">
									{{ calculatePercentage(item) }}
								</template>
								<template v-else-if="column.key === 'sisa_anggaran'">
									{{ calculateRemaining(item) }}
								</template>
								<template v-else>
									{{ item[column.key] || "" }}
								</template>
							</td>
						</tr>
					</tbody>
					<tbody v-else>
						<tr>
							<td
								:colspan="columns.length"
								class="text-center py-6 bg-gray-50">
								<h3>Data Tidak Ditemukan</h3>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

// Define props
const props = defineProps({
	items: {
		type: Array,
		required: true,
		default: () => [],
	},
	striped: {
		type: Boolean,
		default: false,
	},
	totalBudget: {
		type: Number,
		default: 1000000, // Example total budget
	},
});

const scrollableContainer = ref(null);
const isDragging = ref(false);
const startPosition = ref({ x: 0, y: 0 });
const currentScroll = ref({ x: 0, y: 0 });

// Define columns
const columns = computed(() => {
	return [
		{ key: "no", label: "NO.", class: "w-12 text-center bg-gray-100" },
		{ key: "nama_spm12", label: "SPM", class: "w-[400px] text-left bg-gray-100" },
		{ key: "nama_sub_kegiatan", label: "Sub Kegiatan", class: "w-36 text-right  bg-gray-100 font-bold min-w-48" },
		...["DAK Non Fisik Kabupaten / Kota", "Dana Non Fisik BOK Puskesmas", "Dana Transfer Umum", "Pajak Rokok"].map((month) => ({
			key: month,
			label: month.toUpperCase(),
			class: "text-right bg-gray-100 min-w-36",
		})),
		{ key: "Realisasi DAK Non Fisik Kabupaten / Kota", label: "Realisasi DAK Non Fisik Kabupaten / Kota", class: "w-36 text-right bg-gray-100 font-bold min-w-48" },
		{ key: "Persentase DAK Non Fisik Kabupaten / Kota", label: "%", class: "w-36 text-right bg-gray-100 font-bold min-w-48" },
		{ key: "Realisasi Dana Non Fisik BOK Puskesmas", label: "Realisasi Dana Non Fisik BOK Puskesmas", class: "w-36 text-right bg-gray-100 font-bold min-w-48" },
		{ key: "Persentase Dana Non Fisik BOK Puskesmas", label: "%", class: "w-36 text-right bg-gray-100 font-bold min-w-48" },
		{ key: "Realisasi Dana Transfer Umum", label: "Realisasi Dana Transfer Umum", class: "w-36 text-right bg-gray-100 font-bold min-w-48" },
		{ key: "Persentase Dana Transfer Umum", label: "%", class: "w-36 text-right bg-gray-100 font-bold min-w-48" },
		{ key: "Realisasi Pajak Rokok", label: "Realisasi Pajak Rokok", class: "w-36 text-right bg-gray-100 font-bold min-w-48" },
		{ key: "Persentase Pajak Rokok", label: "%", class: "w-36 text-right bg-gray-100 font-bold min-w-48" },
		{ key: "total", label: "TOTAL", class: "w-36 text-right bg-gray-100 font-bold min-w-48" },
		{ key: "sisa_anggaran", label: "SISA ANGGARAN", class: "w-36 text-right bg-gray-100 min-w-48" },
		{ key: "notes", label: "KET.", class: "w-40 text-left bg-gray-100" },
	];
});

// Utility functions
function isMonth(key) {
	const months = ["DAK Non Fisik Kabupaten / Kota", "Dana Non Fisik BOK Puskesmas", "Dana Transfer Umum", "Pajak Rokok"];
	return months.some((item) => item.localeCompare(key) === 0);
}

function calculateTotal(item) {
	const months = ["DAK Non Fisik Kabupaten / Kota", "Dana Non Fisik BOK Puskesmas", "Dana Transfer Umum", "Pajak Rokok"];
	return months.reduce((total, month) => total + (parseFloat(item[month]) || 0), 0);
}

function calculatePercentage(item) {
	const total = calculateTotal(item);
	return ((total / item.target_puskesmas) * 100).toFixed(2) + "%";
}

function calculatePercentage2(a, b) {
	return ((b / a) * 100).toFixed(2) + "%";
}

function calculateRemaining(item) {
	const total = calculateTotal(item);
	return Math.abs(total - item.target_puskesmas);
}

const formatRupiah = (value) => {
	if (!value) return "";
	const numberString = value.toString().replace(/[^,\d]/g, "");
	const split = numberString.split(",");
	let rupiah = split[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	rupiah = split[1] != null ? `${rupiah},${split[1]}` : rupiah;
	return `Rp. ${rupiah}`;
};

const startDragging = (event) => {
	isDragging.value = true;
	startPosition.value = { x: event.clientX, y: event.clientY };
	currentScroll.value = {
		x: scrollableContainer.value.scrollLeft,
		y: scrollableContainer.value.scrollTop,
	};

	document.addEventListener("mousemove", drag);
	document.addEventListener("mouseup", stopDragging);
};

const drag = (event) => {
	if (!isDragging.value) return;

	const deltaX = event.clientX - startPosition.value.x;
	const deltaY = event.clientY - startPosition.value.y;

	scrollableContainer.value.scrollLeft = currentScroll.value.x - deltaX;
	scrollableContainer.value.scrollTop = currentScroll.value.y - deltaY;
};

const stopDragging = () => {
	isDragging.value = false;
	document.removeEventListener("mousemove", drag);
	document.removeEventListener("mouseup", stopDragging);
};

// Check for overflow
const hasOverflow = () => {
	const el = scrollableContainer.value;
	return el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth;
};

onMounted(() => {
	document.removeEventListener("mousemove", drag);
	document.removeEventListener("mouseup", stopDragging);
});
</script>

<style scoped>
.border {
	border: 1px solid #ccc;
}
.bg-gray-50 {
	background-color: #f9fafb;
}
.bg-gray-100 {
	background-color: #f3f4f6;
}
.cursor-grab {
	cursor: grab;
}
.cursor-grabbing {
	cursor: grabbing;
}
</style>
