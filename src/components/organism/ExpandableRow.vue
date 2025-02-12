<template>
	<tr :class="[getBgColor(row), rowClass]">
		<td
			v-for="(column, colIndex) in columns"
			:key="`${row.id}-${colIndex}`"
			:class="[
				'border-b-[1px] border-t-[1px] border-gray-300 text-sm px-2 py-2',
				cellClass,
				column.class || '',
				sticky && colIndex === 0 ? ['sticky bg-white text-black left-0 z-10', getTextColor(row)] : '',
			]"
			:style="colIndex === 0 ? { paddingLeft: `${row.level * indentSize}px` } : { paddingLeft: `${indentSize}px` }">
			<div class="flex items-center">
				<button
					v-if="column.field === treeColumn && row.hasChildren"
					@click="toggle(row.id)"
					class="mr-2 ml-1 focus:outline-none">
					<span
						v-if="!row.expanded"
						class="text-gray-600"
						>➕</span
					>
					<span
						v-else
						class="text-gray-600"
						>➖</span
					>
				</button>
				<div
					v-else-if="colIndex === 0"
					class="size-[14px]"></div>
				<slot
					:name="`column-${column.field}-level-${row.level}`"
					:row="row"
					:column="column">
					<div v-if="!column.rupiah">
						<Typography class="text-14-21">{{ row[column.field] }}</Typography>
					</div>
					<div
						v-else
						class="flex w-full justify-end">
						<Typography class="text-14-21">{{ formatRupiah(row[column.field]) }}</Typography>
					</div>
				</slot>
			</div>
		</td>
	</tr>
</template>

<script setup>
	import { computed, watch } from "vue";
	import Typography from "../atoms/Typography.vue";
	import { useStore } from "../../store/monev";

	const props = defineProps({
		row: Object,
		columns: Array,
		treeColumn: String,
		cellClass: String,
		indentSize: Number,
		toggle: Function,
		getCellStyle: Function,
		getRowStyle: Function,
		rowClass: String,
	});

	const store = useStore();

	const sticky = computed(() => {
		return store.sticky;
	});

	const getBgColor = (row) => {
		const colors = ["bg-treeLevel1", "bg-treeLevel2", "bg-treeLevel3", "bg-treeLevel4", "bg-treeLevel5"];
		return colors[row.level] || "#99ccff";
	};
	const getTextColor = (row) => {
		const colors = ["text-danger", "text-primary", "text-treeLevel3", "text-warning", "text-black"];
		return colors[row.level] || "#99ccff";
	};

	const formatRupiah = (value) => {
		if (!value) return "";
		const numberString = value.toString().replace(/[^,\d]/g, "");
		const split = numberString.split(",");
		let rupiah = split[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		rupiah = split[1] != null ? `${rupiah},${split[1]}` : rupiah;
		return `Rp. ${rupiah}`;
	};
</script>

<style scoped></style>
