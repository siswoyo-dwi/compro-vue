<template>
	<div class="p-4">
		<Chart
			type="bar"
			widthClass="w-full"
			heightClass="h-96"
			:showLegend="true"
			title="Grafik Jumlah Anggaran Per Puskemas"
			:series="[{ name: 'Anggaran', data: [11000000, 45000000, 27000000, 39000000, 21000000, 33000000, 44000000, 51000000, 31000000, 77000000, 21000000] }]"
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
