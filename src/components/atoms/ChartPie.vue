<script setup>
	import { ref, watch, computed } from "vue";
	import VueApexCharts from "vue3-apexcharts";

	const defaultColors = [
		"#FF4560",
		"#008FFB",
		"#00E396",
		"#FEB019",
		"#775DD0",
		"#FF66C3",
		"#546E7A",
		"#D4526E",
		"#13D8AA",
		"#A5978B",
		"#2B908F",
		"#F9A3A4",
		"#90EE7E",
		"#3A3DFF",
		"#F48024",
		"#69D2E7",
		"#A0AAB2",
		"#FFCE56",
		"#FF6384",
		"#4BC0C0",
		"#36A2EB",
		"#9966FF",
		"#FF9F40",
		"#66BB6A",
		"#D4E157",
		"#FF7043",
		"#7E57C2",
		"#26A69A",
		"#EF5350",
		"#EC407A",
	];

	const props = defineProps({
		type: {
			type: String,
			default: "pie",
		},
		widthClass: {
			type: String,
			default: "w-full",
		},
		heightClass: {
			type: String,
			default: "h-80",
		},
		height: {
			type: String,
			default: "400",
		},
		showLegend: {
			type: Boolean,
			default: true,
		},
		title: {
			type: String,
			default: "",
		},
		series: {
			type: Array,
			required: true,
		},
		labels: {
			type: Array,
			default: () => [],
		},
		colorMode: {
			type: String,
			default: "data",
			validator: (value) => ["data", "series"].includes(value),
		},
		legendType: {
			type: String,
			default: "series",
			validator: (value) => ["series", "categories"].includes(value),
		},
	});

	const chartOptions = ref({
		chart: {
			type: "pie",
			toolbar: {
				show: false,
			},
			style: {
				zIndex: 1,
			},
		},
		title: {
			text: props.title,
		},
		dataLabels: {
			enabled: true,
		},
		legend: {
			show: props.showLegend,
			position: "bottom",
			floating: false,
			fontSize: "11px",
			labels: {
				useSeriesColors: true,
			},
			itemMargin: {
				horizontal: 10,
				vertical: 5,
			},
			markers: {
				width: 10,
				height: 10,
			},
			scrollable: true,
			height: 100,
		},
		labels: props.labels,
		tooltip: {
			y: {
				formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
					return value;
				},
			},
		},
		colors: props.colorMode === "data" ? defaultColors : defaultColors.slice(0, props.series.length),
	});

	watch(
		() => [props.type, props.showLegend, props.title, props.labels, props.colorMode, props.legendType],
		([newType, newShowLegend, newTitle, newLabels, newColorMode, newLegendType]) => {
			chartOptions.value.chart.type = newType;
			chartOptions.value.legend.show = newShowLegend;
			chartOptions.value.title.text = newTitle;
			chartOptions.value.labels = newLabels;
			chartOptions.value.colors = newColorMode === "data" ? defaultColors : defaultColors.slice(0, props.series.length);
		}
	);

	watch(
		() => props.series,
		(newSeries) => {
			chartOptions.value.series = newSeries;
		},
		{ deep: true }
	);

	const formatRupiah = (value) => {
		if (value === null || value === undefined) return "Rp. 0";
		const isNegative = value < 0;
		const absoluteValue = Math.abs(value);
		const numberString = absoluteValue.toString().replace(/[^,\d]/g, "");
		const split = numberString.split(",");
		let rupiah = split[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		rupiah = split[1] != null ? `${rupiah},${split[1]}` : rupiah;

		return `${isNegative ? "-" : ""}Rp. ${rupiah}`;
	};
</script>

<template>
	<div :class="`${widthClass} ${heightClass}`">
		<VueApexCharts
			:options="chartOptions"
			:series="series"
			:height="height"
			width="450"
			:type="type" />
		<div
			v-if="showLegend && legendType === 'categories'"
			class="flex flex-wrap mt-4">
			<div
				v-for="(item, index) in customLegendItems"
				:key="index"
				class="flex items-center mr-4 mb-2">
				<span
					:style="{ backgroundColor: item.color }"
					class="w-4 h-4 mr-2 inline-block rounded"></span>
				<span>{{ item.label }}</span>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.apexcharts-series {
		position: relative;
		z-index: 10 !important;
	}
</style>
