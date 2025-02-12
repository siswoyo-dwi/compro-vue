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
								:class="['px-2 py-2 text-sm font-medium border bg-gray-100 ', column.class, column.key === 'nama_puskesmas' ? 'sticky-left' : '']">
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
								:class="['px-2 py-3 text-sm border', column.class, column.key === 'nama_puskesmas' ? 'sticky-left' : '']"
								:style="{
									textAlign: column.class.includes('text-right') ? 'right' : 'left',
								}">
								<!-- Check if the column key is dynamically generated -->
								<template v-if="isMonth(column.key)">
									{{ formatRupiah(item[column.key]) || "RP. 0" }}
								</template>
								<template v-else-if="column.key === 'target_puskesmas'">
									{{ formatRupiah(item.target_puskesmas) || "RP. 0" }}
								</template>
								<!-- Render special columns -->
								<template v-else-if="column.key === 'no'">
									{{ idx + 1 }}
								</template>
								<template v-else-if="column.key === 'total_realisasi'">
									{{ formatRupiah(calculateTotal(item)) }}
								</template>
								<template v-else-if="column.key === 'persentase'">
									{{ calculatePercentage(item) }}
								</template>
								<template v-else-if="column.key === 'sisa_anggaran'">
									{{ formatRupiah(calculateRemaining(item)) }}
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

	// Drag-related refs and logic
	const scrollableContainer = ref(null);
	const isDragging = ref(false);
	const startPosition = ref({ x: 0, y: 0 });
	const currentScroll = ref({ x: 0, y: 0 });

	// Define columns
	const columns = computed(() => {
		return [
			{ key: "no", label: "NO.", class: "w-12 text-center " },
			{ key: "nama_puskesmas", label: "PUSKESMAS", class: "min-w-[300px] text-left " },
			{ key: "target_puskesmas", label: "TARGET", class: "w-36 text-right  font-bold min-w-48" },
			...["JAN", "FEB", "MAR", "APR", "MEI", "JUN", "JUL", "AGUST", "SEPT", "OKT", "NOV", "DES"].map((month) => ({
				key: month,
				label: month.toUpperCase(),
				class: "text-right  min-w-36",
			})),
			{ key: "total_realisasi", label: "TOTAL REALISASI", class: "w-36 text-right  font-bold min-w-48" },
			{ key: "persentase", label: "PERSENTASE %", class: "min-w-36 text-right  font-bold" },
			{ key: "sisa_anggaran", label: "SISA ANGGARAN", class: "w-36 text-right  min-w-48" },
			{ key: "notes", label: "KET.", class: "min-w-40 text-left " },
		];
	});

	// Utility functions
	function isMonth(key) {
		const months = ["JAN", "FEB", "MAR", "APR", "MEI", "JUN", "JUL", "AGUST", "SEPT", "OKT", "NOV", "DES"];
		return months.includes(key);
	}

	function calculateTotal(item) {
		const months = ["JAN", "FEB", "MAR", "APR", "MEI", "JUN", "JUL", "AGUST", "SEPT", "OKT", "NOV", "DES"];
		return months.reduce((total, month) => total + (parseFloat(item[month]) || 0), 0);
	}

	function calculatePercentage(item) {
		const total = calculateTotal(item);
		return item.target_puskesmas ? ((total / item.target_puskesmas) * 100).toFixed(2) + "%" : "0%";
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

	// Drag functionality
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

	/* Sticky Column Style */
	.sticky-left {
		position: sticky;
		left: 0;
		background-color: #f3f4f6; /* Match the column header background */
		z-index: 10;
	}
</style>
