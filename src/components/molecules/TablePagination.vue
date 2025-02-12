<template>
	<div class="flex flex-col md:flex-row justify-between items-center py-4 px-4">
		<!-- Display Info -->
		<div
			v-if="totalRows > 0"
			class="text-sm text-gray-600">
			Menampilkan {{ display[0]?.no || 0 }} sampai {{ display[display.length - 1]?.no || 0 }} dari {{ totalRows }} data
		</div>
		<div
			v-else
			class="text-sm text-gray-600">
			Tidak ada data yang tersedia.
		</div>
		<div class="flex items-center space-x-2 mt-2 md:mt-0">
			<Pagination>
				<PaginationItem
					first
					@click="setCurrentPage(1)" />
				<PaginationItem
					prev
					@click="previousPage(currentPage - 1)" />
				<PaginationItem
					v-if="maxPage > 1"
					v-for="item in displayButton"
					:key="item"
					:label="item.toString()"
					:active="currentPage === item"
					@click="setCurrentPage(item)" />
				<PaginationItem
					v-else
					:label="'1'"
					:active="true" />
				<PaginationItem
					next
					@click="nextPage(currentPage + 1)" />
				<PaginationItem
					last
					@click="setCurrentPage(maxPage)" />
			</Pagination>
		</div>
	</div>
</template>

<script setup>
	import { computed } from "vue";
	import Pagination from "../atoms/Pagination.vue";
	import PaginationItem from "../atoms/PaginationItem.vue";

	const props = defineProps({
		display: { type: Array, required: true },
		currentPage: { type: Number, required: true },
		totalRows: { type: Number, required: true },
		perPage: { type: Number, required: true },
	});

	const emit = defineEmits(["paginations"]);

	const maxButton = 3;

	const maxPage = computed(() => Math.max(1, Math.ceil(props.totalRows / props.perPage)));

	const startButton = computed(() => {
		if (props.currentPage <= 1) return 1;
		if (props.currentPage === maxPage.value) {
			return maxPage.value > 2 ? maxPage.value - 2 : 1;
		}
		return props.currentPage - 1;
	});

	const displayButton = computed(() => {
		if (props.totalRows === 0) return [1];
		return Array.from({ length: Math.min(maxButton, maxPage.value) }, (_, i) => i + startButton.value);
	});

	// Methods
	function setCurrentPage(page) {
		emitPaginationEvent(page);
	}

	function previousPage(page) {
		emitPaginationEvent(Math.max(1, page));
	}

	function nextPage(page) {
		emitPaginationEvent(Math.min(page, maxPage.value));
	}

	function emitPaginationEvent(page) {
		emit("paginations", page);
	}
</script>
