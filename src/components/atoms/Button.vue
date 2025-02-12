<template>
	<button
		:disabled="isDisabled"
		:data-testid="testID"
		:type="type"
		:class="computedClasses"
		@click="onClick"
		v-bind="$attrs">
		<div :class="contentStyles">
			<!-- Loading State -->
			<Loading
				v-if="loading"
				:class="loadingStyles" />
			<!-- Default Slot Content -->
			<slot />
		</div>
	</button>
</template>

<script setup>
	import { computed, ref } from "vue";
	import Loading from "./Loading.vue";

	// Define Props
	const props = defineProps({
		testID: String,
		type: { type: String, default: "button" },
		color: {
			type: String,
			default: "primary",
			validator: (value) => ["primary", "secondary", "danger", "success", "warning", "info"].includes(value),
		},
		onClick: Function,
		className: { type: String, default: "" },
		variant: {
			type: String,
			default: "contained",
			validator: (value) => ["contained", "outline", "underline"].includes(value),
		},
		rounded: Boolean,
		small: Boolean,
		loading: Boolean,
		disabled: {
			type: Boolean,
			default: false,
		},
	});

	const isDisabled = computed(() => props.disabled || props.loading);

	const colorMap = {
		primary: "bg-primary border-[0.75px] border-primary text-white hover:bg-ghostprimary hover:text-primary",
		warning: "bg-warning border-[0.75px] border-warning text-white hover:bg-ghostwarning hover:text-warning",
		success: "bg-success border-[0.75px] border-success text-white hover:bg-ghostsuccess hover:text-success",
		danger: "bg-danger border-[0.75px] border-danger text-white hover:bg-ghostdanger hover:text-danger",
		secondary: "bg-secondary border-[0.75px] border-secondary text-white hover:bg-ghostsecondary :hover:text-black ",
		info: "bg-info border-[0.75px] border-info text-white hover:bg-ghostinfo hover:text-info",
	};

	const colorMapOutline = {
		primary: "bg-white border-[1px] border-primary text-primary hover:text-white hover:bg-primary",
		warning: "bg-white border-[1px] border-warning text-warning hover:text-white hover:bg-warning",
		success: "bg-white border-[1px] border-success text-success hover:text-white hover:bg-success",
		danger: "bg-white border-[1px] border-danger text-danger hover:text-white hover:bg-danger",
		secondary: "bg-white border-[1px] border-secondary text-secondary hover:bg-secondary :hover:text-black",
		info: "bg-white border-[1px] border-info text-info hover:text-white hover:bg-info",
	};
	const colorMapUnderline = {
		primary: "bg-white border-b-[2px] border-primary text-primary hover:bg-primary",
		warning: "bg-white border-b-[2px] border-warning text-warning hover:bg-warning",
		success: "bg-white border-b-[2px] border-success text-success hover:bg-success",
		danger: "bg-white border-b-[2px] border-danger text-danger hover:bg-danger",
		secondary: "bg-white border-b-[2px] border-secondary text-secondary hover:bg-secondary :hover:textlack",
		info: "bg-white border-b-[2px] border-info text-info hover:bg-info",
	};

	// Base styles
	const baseStyles = "px-4 py-2 rounded-md font-medium transition duration-200";

	const buttonStyles = computed(() => {
		// const baseColor = colorMap[props.color] || colorMap.primary;

		switch (props.variant) {
			case "contained":
				return colorMap[props.color];
			case "outline":
				return colorMapOutline[props.color];
			case "underline":
				return colorMapUnderline[props.color];
			default:
				return "bg-transparent text-black hover:bg-gray-100";
		}
	});

	// Computed Classes
	const computedClasses = computed(() =>
		[
			baseStyles,
			buttonStyles.value,
			props.small ? "!px-2 !py-1 text-sm" : "text-base",
			props.rounded ? "rounded-full" : "rounded-md",
			props.className,
			isDisabled.value ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
		].join(" ")
	);

	// Content Styles
	const contentStyles = computed(() => ["flex items-center", props.variant !== "plain" ? "justify-center" : ""].join(" "));
</script>

<style scoped>
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
