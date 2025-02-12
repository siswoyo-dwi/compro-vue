<template>
	<div class="p-4">
		<Chart
			type="bar"
			widthClass="w-full"
			heightClass=""
			height="400"
			:showLegend="false"
			title="Grafik Berdasarkan Sumber Anggaran"
			:series="[{ name: 'Anggaran', data: [11000000, 21000000, 33000000, 44000000, 51000000, 31000000, 77000000, 21000000] }]"
			:xAxisCategories="['DAU', 'DAU Gaji', 'Pajak Pokok', 'DBHCHT', 'BLUD', 'BANKEU', 'DAK Non Fisik', 'DAK Fisik']"
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
