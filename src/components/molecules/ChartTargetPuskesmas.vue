<template>
	<div class="p-4">
		<Chart
			type="bar"
			widthClass="w-full"
			heightClass="h-96"
			:showLegend="true"
			title="Grafik Target Dan Realisasi Per Puskesmas"
			:series="[
				{ name: 'Realisasi', data: [10, 20, 30, 40, 30, 40, 20, 30, 20, 10, 50] },
				{ name: 'Target', data: [15, 25, 35, 45, 32, 45, 23, 34, 21, 15, 56] },
			]"
			:xAxisCategories="['jati', 'TanjungRejo', 'Deman', 'Rendeng', 'Jekulo', 'Mejobo', 'Jepang', 'Undaan', 'Undaan Lor', 'Rejosari', 'Bae']"
			colorMode="series"
			direction="vertical"
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
