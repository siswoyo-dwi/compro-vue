<template>
	<div class="p-4">
		<Chart
			type="bar"
			widthClass="w-full"
			heightClass="h-96"
			height="400"
			:showLegend="false"
			title="Grafik Jumlah Anggaran Per Bidang"
			:series="[{ name: 'Anggaran', data: [15000000, 21000000, 32000000, 42000000] }]"
			:xAxisCategories="['Bidang Kesehatan Masyarakat', 'Bidang Pengendalian Penyakit dan Penyehatan Lingkungan', 'Bidang kemitraan dan Promosi Kesehatan', 'Bidang Sumber Daya Kesehatan']"
			colorMode="data"
			direction="horizontal"
			legendType="categories" />
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
