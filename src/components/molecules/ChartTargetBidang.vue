<template>
	<div class="p-4">
		<Chart
			type="bar"
			widthClass="w-full"
			heightClass="h-96"
			:showLegend="true"
			title="Grafik Target Dan Realisasi Per Bidang"
			:series="[
				{ name: 'Realisasi', data: [10, 20, 30, 40] },
				{ name: 'Target', data: [15, 25, 35, 45] },
			]"
			:xAxisCategories="['Bidang Kesehatan Masyarakat', 'Bidang Pengendalian Penyakit dan Penyehatan Lingkungan', 'Bidang kemitraan dan Promosi Kesehatan', 'Bidang Sumber Daya Kesehatan']"
			colorMode="series"
			direction="horizontal"
			legendType="series" />
	</div>
</template>

<script setup>
	import { ref } from "vue";
	const chartData = ref([{ name: "Sales", data: [10, 20, 30, 40] }]);

	const updateData = () => {
		chartData.value = [{ name: "Sales", data: [15, 25, 35, 45] }];
	};
</script>

<style lang="scss" scoped></style>
