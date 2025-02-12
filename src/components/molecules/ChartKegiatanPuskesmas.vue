<template>
	<div class="p-4">
		<Chart
			type="bar"
			widthClass="w-full"
			heightClass="h-96"
			:showLegend="false"
			title="Grafik Jumlah Kegiatan Per Puskemas"
			:series="[{ name: 'Kegiatan', data: [10, 20, 30, 40, 22, 65, 32, 67, 34, 22, 11] }]"
			:xAxisCategories="['jati', 'TanjungRejo', 'Deman', 'Rendeng', 'Jekulo', 'Mejobo', 'Jepang', 'Undaan', 'Undaan Lor', 'Rejosari', 'Bae']"
			colorMode="data"
			direction="vertical"
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
