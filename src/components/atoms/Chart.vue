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
		"#3A3DFF",
		"#546E7A",
		"#D4526E",
		"#13D8AA",
		"#A5978B",
		"#2B908F",
		"#F9A3A4",
		"#90EE7E",
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
			default: "bar",
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
		xAxisCategories: {
			type: Array,
			default: () => [],
		},
		colorMode: {
			type: String,
			default: "data",
			validator: (value) => ["data", "series"].includes(value),
		},
		direction: {
			type: String,
			default: "vertical",
			validator: (value) => ["vertical", "horizontal"].includes(value),
		},
		legendType: {
			type: String,
			default: "series",
			validator: (value) => ["series", "categories"].includes(value),
		},
	});

	const chartOptions = ref({
		chart: {
			type: props.type,
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
			enabled: false,
		},
		legend: {
			show: props.legendType === "series" && props.showLegend,
		},
		xaxis: {
			categories: props.xAxisCategories,
			trims: false,
		},

		// tooltip: {
		// 	custom: function ({ series, seriesIndex, dataPointIndex, w }) {
		// 		return "aaaa";
		// 	},
		// },
		tooltip: {
			y: {
				formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
					return props.type != "pie" || props.type != "donut" ? formatRupiah(value) : value;
				},
			},
		},
		plotOptions: {
			bar: {
				distributed: props.colorMode === "data",
				horizontal: props.direction === "horizontal",
			},
			pie: {
				donut: {
					size: 500,
				},
			},
		},
		colors: props.colorMode === "data" ? defaultColors : defaultColors.slice(0, props.series.length),
	});

	watch(
		() => [props.type, props.showLegend, props.title, props.xAxisCategories, props.colorMode, props.direction, props.legendType],
		([newType, newShowLegend, newTitle, newCategories, newColorMode, newDirection, newLegendType]) => {
			chartOptions.value.chart.type = newType;
			chartOptions.value.legend.show = newLegendType === "series" && newShowLegend;
			chartOptions.value.title.text = newTitle;
			chartOptions.value.xaxis.categories = newCategories;
			chartOptions.value.plotOptions.bar.distributed = newColorMode === "data";
			chartOptions.value.plotOptions.bar.horizontal = newDirection === "horizontal";
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
	const customLegendItems = computed(() => {
		if (props.legendType !== "categories") return [];
		return props.xAxisCategories.map((category, index) => ({
			label: category,
			color: defaultColors[index % defaultColors.length],
		}));
	});

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
			:type="type" />
		<div
			v-if="showLegend && legendType === 'categories'"
			class="flex flex-wrap mt-4 !bg-primary">
			<div
				v-for="(item, index) in customLegendItems"
				:key="index"
				class="flex items-center mr-4 mb-2">
				<span
					:style="{ backgroundColor: item.color }"
					class="w-4 h-4 mr-2 inline-block rounded-md"></span>
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
