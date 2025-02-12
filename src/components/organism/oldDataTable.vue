<template>
	<div :class="['overflow-x-auto', tableWrapperClass]">
		<table :class="tableClasses">
			<!-- Table Header -->
			<thead>
				<tr :class="['bg-gray-50 text-left', headerRowClass]">
					<th
						v-for="(column, index) in columns"
						:key="index"
						:style="getHeaderCellStyle(column)"
						:class="['px-6 py-3 text-sm font-medium whitespace-nowrap border border-gray-300', headerCellClass, column.headerClass]">
						{{ column.label }}
					</th>
				</tr>
			</thead>

			<!-- Table Body -->
			<tbody>
				<tr
					v-for="(row, rowIndex) in data"
					:key="rowIndex"
					:class="[getRowStyle(row), rowClass, { 'bg-gray-200': striped && rowIndex % 2 !== 0 }]">
					<td
						v-for="(column, colIndex) in columns"
						:key="colIndex"
						:style="getCellStyle(column)"
						:class="['px-6 py-2 text-sm border border-gray-300 truncate max-w-full whitespace-nowrap', cellClass, column.style]">
						<slot
							:name="column.key"
							:row="row"
							:column="column"
							:rowIndex="rowIndex"
							:colIndex="colIndex"
							:item="row">
							<!-- Default fallback content -->
							<span
								class="tooltip"
								:class="{ 'cursor-pointer': isTruncated(row[column.key]) }"
								:title="isTruncated(row[column.key]) ? row[column.key] : ''">
								{{ row[column.key] }}
							</span>
						</slot>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup>
	import { computed } from "vue";

	const props = defineProps({
		columns: {
			type: Array,
			required: true,
			default: () => [],
		},
		data: {
			type: Array,
			required: true,
			default: () => [],
		},
		tableWrapperClass: {
			type: String,
			default: "",
		},
		tableClass: {
			type: String,
			default: "bg-white",
		},
		headerRowClass: {
			type: String,
			default: "",
		},
		headerCellClass: {
			type: String,
			default: "text-gray-500",
		},
		rowClass: {
			type: String,
			default: "",
		},
		cellClass: {
			type: String,
			default: "text-gray-700",
		},
		headerStyle: {
			type: Object,
			default: () => ({}),
		},
		cellStyle: {
			type: Object,
			default: () => ({}),
		},
		rowStyle: {
			type: Function,
			default: () => (row) => ({}),
		},
		// New Props
		border: {
			type: Boolean,
			default: false,
		},
		striped: {
			type: Boolean,
			default: false,
		},
	});

	// Compute table classes based on props
	const tableClasses = computed(() => {
		return [
			props.tableClass,
			"min-w-full border-collapse", // Ensure full-width and proper border collapsing
			props.border ? "border border-gray-300" : "border border-b-gray-100",
		];
	});

	const getHeaderCellStyle = (column) => ({
		...props.headerStyle,
		...column.headerStyle,
	});

	const getCellStyle = (column) => ({
		...props.cellStyle,
		...column.cellStyle,
	});

	const getRowStyle = (row) => props.rowStyle(row);

	const isTruncated = (value) => {
		if (!value) return false;
		return typeof value === "string" && value.length > 20;
	};
</script>

<style scoped>
	.tooltip {
		overflow: hidden;
		text-overflow: ellipsis;
		display: inline-block;
		max-width: 100%;
		white-space: nowrap;
		position: relative;
	}

	.tooltip[title]:hover::after {
		content: attr(title);
		position: absolute;
		background-color: #333;
		color: white;
		padding: 0.5rem;
		border-radius: 0.25rem;
		white-space: normal;
		z-index: 10;
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
		min-width: 200px;
	}
</style>
