<template>
	<div class="bg-white px-3 py-3 shadow-sm overflow-y-auto">
		<div class="min-h-full">
			<!-- Optional top controls (pagination, search) -->
			<!-- <div class="datatable-top mb-2">
				<div class="flex justify-between items-center">
					<div class="flex items-center space-x-4">
						<select class="dataTable-selector rounded p-2" v-model="perPage">
							<option v-for="number in perPageOptions" :key="number" :value="number">
								{{ number }}
							</option>
						</select>
						<span class="text-sm font-medium">Data Per Page</span>
					</div>
					<div class="flex items-center space-x-4">
						<input
							type="text"
							placeholder="Search..."
							v-model="search"
							class="border p-2 rounded"
						/>
						<slot name="add_button"></slot>
					</div>
				</div>
			</div> -->

			<!-- Data table -->
			<div class="datatable-container">
				<table
					id="datatable-search"
					class="w-full border-collapse">
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
					<tbody v-if="display.length > 0">
						<tr
							v-for="(item, idx) in display"
							:key="idx"
							:class="striped ? (idx % 2 === 0 ? 'bg-white' : 'bg-gray-50') : 'bg-white'">
							<td
								v-for="field in theFields"
								:key="field.key"
								:class="[
									'px-2 py-3 text-sm text-gray-800 border-b border-gray-300',
									{ 'truncate whitespace-nowrap': truncate },
									field.bodyStyle,
									bodyBorder,
									field.key === 'persentase' ? getbgColor(item.persentase) : '',
								]"
								:style="{
									maxWidth: truncate ? maxWidth : 'auto',
									overflow: truncate ? 'hidden' : 'visible',
									textOverflow: truncate ? 'ellipsis' : 'clip',
								}">
								<slot
									:name="field.key"
									:index="idx"
									:item="item">
									{{ item[field.key] }}
								</slot>
							</td>
						</tr>
					</tbody>
					<tbody v-else>
						<tr>
							<td
								:colspan="theFields.length"
								class="text-center py-6 bg-gray-50">
								<slot name="nodata">
									<img
										src="../images/noFile.jpg"
										class="max-h-36 mx-auto mb-4" />
									<h3>Data Tidak Ditemukan</h3>
								</slot>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<!-- Pagination controls -->
			<!-- <div class="flex justify-between items-center mt-4">
				<button @click="prevPage" :disabled="currentPage === 1" class="btn">Previous</button>
				<span>Page {{ currentPage }} of {{ totalPageCount }}</span>
				<button @click="nextPage" :disabled="currentPage === totalPageCount" class="btn">Next</button>
			</div> -->
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

	const display = computed(() => {
		const start = (currentPage.value - 1) * props.perPage;
		return filteredData.value.slice(start, start + props.perPage);
	});

	const totalPageCount = computed(() => Math.ceil(filteredData.value.length / props.perPage));

	function sorting(key, type) {
		const items = tableData.value;
		items.sort((a, b) => {
			let comparison = 0;
			if (type === "moment") {
				comparison = moment(a[key]).isBefore(moment(b[key])) ? -1 : 1;
			} else {
				comparison = a[key] < b[key] ? -1 : 1;
			}
			return ascending.value ? comparison : -comparison;
		});
		ascending.value = !ascending.value;
	}

	function nextPage() {
		if (currentPage.value < totalPageCount.value) {
			currentPage.value++;
		}
	}

	function prevPage() {
		if (currentPage.value > 1) {
			currentPage.value--;
		}
	}

	const getbgColor = (item) => {
		if (item <= 30) return "!bg-ghostdanger";
		if (item > 30 && item <= 50) return "!bg-orange-500";
		if (item > 50 && item <= 75) return "!bg-yellow-500";
		return "!bg-success";
	};
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
