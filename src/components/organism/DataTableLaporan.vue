<template>
	<div class="bg-white px-3 py-3 shadow-sm overflow-y-auto">
		<div class="min-h-full">
			<!-- Data table -->
			<div class="datatable-container">
				<table
					v-for="i in arrangeData"
					:key="i.nama"
					id="datatable-search"
					class="!w-full border-collapse text-xxs mb-12 mt-10">
					<thead>
						<tr>
							<th
								v-for="field in theFields"
								:key="field.key"
								:class="['px-2 py-2 text-sm font-medium bg-gray-100', field.style, headerBorder]">
								<div class="flex justify-between">
									<span :class="field.headerCenter ? 'w-full' : ''">{{ field.label }}</span>
									<i
										v-if="field.sorter"
										class="fa fa-solid fa-sort text-gray-500 cursor-pointer"
										@click="sorting(field.key, field.sorterType)"></i>
								</div>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-if="i.nama"
							:class="striped ? (idx % 2 === 0 ? 'bg-white' : 'bg-gray-50') : 'bg-white'">
							<td
								colspan="5"
								:class="['px-2 py-3 text-sm text-gray-800 border-b border-gray-300', { 'truncate whitespace-nowrap': truncate }, , bodyBorder, ,]"
								:style="{
									maxWidth: truncate ? maxWidth : 'auto',
									overflow: truncate ? 'hidden' : 'visible',
									textOverflow: truncate ? 'ellipsis' : 'clip',
								}">
								<span class="font-bold">{{ i.nama }}</span>
							</td>
						</tr>
						<tr
							v-for="(dana, danaidx) in i.sumber_dana"
							:class="striped ? (idx % 2 === 0 ? 'bg-white' : 'bg-gray-50') : 'bg-white'">
							<td
								v-for="field in theFields"
								:key="field.key"
								:class="[
									'px-2 py-3 text-sm text-gray-800 border-b border-gray-300',
									{ 'truncate whitespace-nowrap': truncate },
									field.bodyStyle,
									bodyBorder,
									field.key === 'persentase' ? getbgColor(dana.persentase) : '',
									field.key === 'nama_sumber_dana' && dana[field.key] == 'TOTAL' ? 'bg-white' : '',
								]"
								:style="{
									maxWidth: truncate ? maxWidth : 'auto',
									overflow: truncate ? 'hidden' : 'visible',
									textOverflow: truncate ? 'ellipsis' : 'clip',
								}">
								<slot
									:name="field.key"
									:index="danaidx"
									:item="dana">
									<span v-if="field.key === 'kode' && (danaidx == 0 || dana[field.key] !== i.sumber_dana[danaidx - 1][field.key])">
										{{ dana[field.key] }}
									</span>
									<span v-else-if="field.key !== 'kode'">{{ dana[field.key] }}</span>
									<span v-else></span>
								</slot>
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
	import moment from "moment";

	const props = defineProps({
		fields: {
			type: Array,
			required: true,
			default: () => [],
		},
		items: {
			type: Array,
			required: true,
			default: () => [],
		},
		border: {
			type: Boolean,
			default: false,
		},
		striped: {
			type: Boolean,
			default: false,
		},
		totalRows: {
			type: Number,
			default: 0,
		},
		perPage: {
			type: Number,
			default: 10,
		},
		truncate: {
			type: Boolean,
			default: false,
		},
		maxWidth: {
			type: String,
			default: "150px",
		},
		headerCenter: {
			type: Boolean,
			default: false,
		},
	});

	const search = ref("");
	const currentPage = ref(1);
	const ascending = ref(true);

	const theFields = computed(() => props.fields);
	const tableData = computed(() => props.items);

	const headerBorder = computed(() => (props.border ? "border-[1px] border-gray-300" : "border-b-[1px] border-t-[1px] border-gray-300"));
	const bodyBorder = computed(() => (props.border ? "border-[1px] border-gray-300" : "border-b-[1px] border-gray-300"));

	const filteredData = computed(() => {
		if (search.value) {
			return tableData.value.filter((item) => JSON.stringify(item).toLowerCase().includes(search.value.toLowerCase()));
		}
		return tableData.value;
	});

	const arrangeData = computed(() => {
		return props.items
			.filter((item) => item.sumber_dana && item.sumber_dana.length > 0)
			.map((item) => {
				const kodeValue = `${item.kode_sub_kegiatan} - ${item.nama_sub_kegiatan}`;

				const totalRealisasiSipd = item.sumber_dana.reduce((sum, sumber) => sum + (sumber.realisasi || 0), 0);
				const totalPaguAnggaran = item.sumber_dana.reduce((sum, sumber) => sum + (sumber.pagu_anggaran || 0), 0);

				const sumberDanaWithTotal = [
					...item.sumber_dana.map((sumber) => ({
						...sumber,
						kode: kodeValue,
						persentase: calculatePercentage(sumber),
					})),
					{
						nama_sumber_dana: "TOTAL",
						realisasi: totalRealisasiSipd,
						pagu_anggaran: totalPaguAnggaran,
						persentase: calculatePercentage2(totalRealisasiSipd, totalPaguAnggaran),
					},
				];

				return {
					...item,
					sumber_dana: sumberDanaWithTotal,
				};
			});
	});

	const display = computed(() => {
		const start = (currentPage.value - 1) * props.perPage;
		return filteredData.value.slice(start, start + props.perPage);
	});

	const getbgColor = (item) => {
		if (item <= 30) return "!bg-ghostdanger";
		if (item > 30 && item <= 50) return "!bg-orange-500";
		if (item > 50 && item <= 75) return "!bg-yellow-500";
		return "!bg-success";
	};

	function calculatePercentage(item) {
		if (!item.pagu_anggaran || !item.realisasi) return 0;
		return ((item.realisasi / item.pagu_anggaran) * 100).toFixed(2);
	}
	function calculatePercentage2(a, b) {
		if (!a || b === 0) return 0;
		return ((a / b) * 100).toFixed(2);
	}
</script>

<style scoped>
	.table-responsive {
		overflow-x: auto;
	}
	.dataTable-selector {
		width: 120px;
	}
	.btn {
		padding: 6px 12px;
		background-color: #4a90e2;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}
	.btn:disabled {
		background-color: #ccc;
		cursor: not-allowed;
	}
</style>
