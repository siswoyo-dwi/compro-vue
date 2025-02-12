<template>
	<div class="bg-white px-3 py-3 shadow-sm overflow-auto">
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
								:class="['px-2 py-2 text-sm border', column.class]"
								:style="{
									textAlign: column.class.includes('text-right') ? 'right' : 'left',
								}">
								<template v-if="column.key === 'no'">
									{{ idx + 1 }}
								</template>
								<template v-else-if="column.key === 'pagu_anggaran'">
									{{ formatRupiah(item[column.key]) }}
								</template>
								<template v-else-if="column.key === 'realisasi_sipd'">
									{{ formatRupiah(item[column.key]) }}
								</template>
								<template v-else-if="column.key === 'sisa'">
									{{ formatRupiah(calculateRemaining(item)) }}
								</template>
								<template v-else-if="column.key === 'persentase'">
									{{ calculatePercentage(item) }}
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
	import { ref, computed } from "vue";

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

	// Define columns
	const columns = computed(() => {
		return [
			{ key: "no", label: "NO.", class: "w-12 text-center bg-gray-100" },
			{ key: "nama_sumber_dana", label: "SUMBER DANA ANGGARAN DARI SIPD", class: "w-[300px] text-left bg-gray-100" },
			{ key: "pagu_anggaran", label: "PAGU ANGGARAN", class: "w-36 text-right  bg-gray-100 font-bold min-w-48" },
			{ key: "realisasi_sipd", label: "REALISASI SIPD", class: "w-36 text-right bg-gray-100 font-bold min-w-48" },
			{ key: "sisa", label: "SISA", class: "w-28 text-right bg-gray-100 font-bold" },
			{ key: "persentase", label: "PERSENTASE REALISASI SIPD", class: "w-36 text-right bg-gray-100 min-w-48" },
		];
	});


	function calculateTotal(item) {
	const months = ["DAK Non Fisik Kabupaten / Kota", "Dana Non Fisik BOK Puskesmas", "Dana Transfer Umum", "Pajak Rokok"];
	return months.reduce((total, month) => total + (parseFloat(item[month]) || 0), 0);
}

function calculatePercentage(item) {
	const total = calculateTotal(item);
	if (!item.target_puskesmas || item.target_puskesmas === 0) return "0.00%";
	return ((total / item.target_puskesmas) * 100).toFixed(2) + "%";
}

function calculatePercentage2(a, b) {
	if (!a || a === 0) return "0.00%";
	return ((b / a) * 100).toFixed(2) + "%";
}

	function calculateRemaining(item) {
		return item.pagu_anggaran - item.realisasi_sipd;
	}

	const formatRupiah = (value) => {
		if (!value) return "Rp. 0";
		const numberString = value.toString().replace(/[^,\d]/g, "");
		const split = numberString.split(",");
		let rupiah = split[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		rupiah = split[1] != null ? `${rupiah},${split[1]}` : rupiah;
		return `Rp. ${rupiah}`;
	};
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
</style>
