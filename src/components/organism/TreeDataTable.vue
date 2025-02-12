<template>
	<div
		ref="scrollableContainer"
		:class="[sticky ? 'h-[calc(100vh-80px)]' : '', 'overflow-y-auto relative']"
		@mousedown="startDragging">
		<!-- Set max height for scrolling -->
		<table :class="['min-w-full border-collapse border-none w-full', tableClass]">
			<!-- Table Header -->
			<thead class="bg-gray-50">
				<tr :class="['text-left', headerRowClass, sticky ? 'sticky top-0 z-20' : '']">
					<th
						v-for="(column, index) in columns"
						:key="index"
						:class="['border-2 text-center border-gray-300 text-sm font-medium px-4 py-2', headerCellClass, column.class || '', index == 0 ? 'cursor-pointer' : '']">
						<div class="flex">
							<CheckBox
								class="mr-2 -ml-3"
								v-if="index === 0"
								v-model="sticky"
								@update:modelValue="store.toogleSticky($event)" />
							<div
								:class="column.class"
								@click="toggleAll()">
								{{ column.label }}
							</div>
						</div>
					</th>
				</tr>
			</thead>

			<!-- Table Body -->
			<tbody v-if="rows.length">
				<template
					v-for="(row, rowIndex) in flatRows"
					:key="row.id">
					<ExpandableRow
						:row="row"
						:columns="columns"
						:treeColumn="treeColumn"
						:cellClass="cellClass"
						:indentSize="indentSize"
						:toggle="toggle"
						:rowClass="rowClass">
						<template
							v-for="(_, slotName) in $slots"
							v-slot:[slotName]="scope">
							<slot
								:name="slotName"
								v-bind="scope" />
						</template>
					</ExpandableRow>
				</template>
			</tbody>
			<tbody v-else>
				<tr>
					<td
						:colspan="columns.length"
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
</template>

<script setup>
	import { ref, computed, watch, onMounted, onUnmounted } from "vue";
	import ExpandableRow from "./ExpandableRow.vue";
	import { useStore } from "../../store/monev";

	const props = defineProps({
		columns: Array,
		rows: Array,
		treeColumn: String,
		tableWrapperClass: String,
		tableClass: String,
		headerRowClass: String,
		headerCellClass: String,
		rowClass: String,
		cellClass: String,
		indentSize: Number,
		headerStyle: Object,
		cellStyle: Object,
		rowStyle: Function,
	});

	const expandedRows = ref(new Set());
	const allExpanded = ref(false);
	const store = useStore();
	const isDragging = ref(false);
	const startPosition = ref({ x: 0, y: 0 });
	const currentScroll = ref({ x: 0, y: 0 });
	const scrollableContainer = ref(null);

	const flatRows = computed(() => {
		const flattenRows = (rows, level = 0) => {
			const flat = [];
			rows.forEach((row) => {
				const newRow = { ...row, level, expanded: expandedRows.value.has(row.id) };
				newRow.hasChildren = row.children && row.children.length > 0;
				flat.push(newRow);
				if (newRow.hasChildren && newRow.expanded) {
					flat.push(...flattenRows(row.children, level + 1));
				}
			});
			return flat;
		};
		return flattenRows(props.rows);
	});

	const toggleAll = () => {
		if (allExpanded.value) {
			expandedRows.value.clear(); // Collapse all rows
		} else {
			props.rows.forEach((row) => addAllChildren(row)); // Expand all rows
		}
		allExpanded.value = !allExpanded.value;
	};

	const toggle = (id) => {
		if (expandedRows.value.has(id)) expandedRows.value.delete(id);
		else expandedRows.value.add(id);
	};

	const addAllChildren = (row) => {
		expandedRows.value.add(row.id);
		if (row.children) {
			row.children.forEach(addAllChildren);
		}
	};

	const sticky = computed(() => {
		return store.sticky;
	});

	// Drag functionality
	const startDragging = (event) => {
		if (event.button !== 0 || !hasOverflow()) return; // Ensure left mouse button and overflow
		isDragging.value = true;
		startPosition.value = { x: event.clientX, y: event.clientY };
		currentScroll.value = {
			x: scrollableContainer.value.scrollLeft,
			y: scrollableContainer.value.scrollTop,
		};

		// Add mousemove and mouseup listeners
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

		// Remove listeners
		document.removeEventListener("mousemove", drag);
		document.removeEventListener("mouseup", stopDragging);
	};

	// Check for overflow
	const hasOverflow = () => {
		const el = scrollableContainer.value;
		return el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth;
	};

	// Cleanup on unmount
	onUnmounted(() => {
		document.removeEventListener("mousemove", drag);
		document.removeEventListener("mouseup", stopDragging);
	});
</script>

<style scoped>
	.table {
		width: 100%;
		table-layout: fixed; /* Important for sticky to work */
	}

	th,
	td {
		min-width: 120px; /* Adjust minimum width as necessary */
	}

	.sticky {
		position: -webkit-sticky; /* For Safari */
		position: sticky;
	}

	thead th {
		top: 0; /* Keep the header on top while scrolling */
		z-index: 20; /* Ensure the header appears above other content */
		background-color: white; /* Set background color for header */
	}

	tbody td.sticky {
		background-color: white; /* Set background color for sticky cells */
		z-index: 10; /* Ensure sticky column is above other cells */
	}

	tbody td.sticky {
		background-color: inherit; /* Ensure it inherits the background color */
	}
</style>
