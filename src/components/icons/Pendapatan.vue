<template>
	<svg
		width="20"
		height="20"
		viewBox="0 0 20 20"
		:class="props.class"
		xmlns="http://www.w3.org/2000/svg">
		<path
			d="M7.91699 11.4585C7.91699 12.2669 8.542 12.9169 9.30867 12.9169H10.8753C11.542 12.9169 12.0837 12.3502 12.0837 11.6419C12.0837 10.8835 11.7503 10.6085 11.2587 10.4335L8.75033 9.55853C8.25866 9.38353 7.92533 9.11686 7.92533 8.35019C7.92533 7.65019 8.46699 7.0752 9.13365 7.0752H10.7003C11.467 7.0752 12.092 7.7252 12.092 8.53353"
			stroke="white"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
			:class="props.containerClass" />
		<path
			d="M10 6.25V13.75"
			stroke="white"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
			:class="props.containerClass" />
		<path
			d="M18.3337 10.0003C18.3337 14.6003 14.6003 18.3337 10.0003 18.3337C5.40033 18.3337 1.66699 14.6003 1.66699 10.0003C1.66699 5.40033 5.40033 1.66699 10.0003 1.66699"
			stroke="white"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
			:class="props.containerClass" />
		<path
			d="M14.167 2.5V5.83333H17.5003"
			stroke="white"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
			:class="props.containerClass" />
		<path
			d="M18.3337 1.66699L14.167 5.83366"
			stroke="white"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
			:class="props.containerClass" />
	</svg>
</template>
<script setup>
	const props = defineProps({
		class: {
			type: String,
			default: "",
		},
		containerClass: {
			type: String,
			default: "",
		},
	});
</script>
