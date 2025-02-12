<template>
	<div
		data-testid="displayData.id"
		v-if="data && data.eventData.originalData && data.eventData.originalData.length"
		:class="cardComputedClass"
		:style="customStyle">
		<div class="flex justify-center z-10 absolute -top-2 -right-2">
			<div :class="['h-[24px] w-[35px] rounded-full relative flex ring-[1px] ring-shade justify-center items-center border-[1px] border-white', getBgColorClass(props.data.eventData.event_color)]">
				<p :class="textColorClass">
					{{ data.eventData.originalData.length <= 9 ? data.eventData.originalData.length : "9+" }}
				</p>
			</div>
		</div>
		<div
			ref="titleElement"
			class="w-full">
			<Typography :class="[dynamicLineClamp, titleComputedClass, textColorClass, 'capitalize', 'break-all']">{{ displayTitle }}</Typography>
		</div>

		<div
			v-if="isHeightMoreThan40"
			class="flex flex-col">
			<div>
				<Typography :class="[timeComputedClass, textColorClass]">{{ getStartTime(data) }} - {{ getEndTime(data) }}</Typography>
			</div>
			<div
				v-if="getCardHeight(props.data) >= 120"
				class="flex justify-start items-center">
				<div
					v-if="displayData.participants"
					v-for="(member, memberIndex) in displayData.participants.slice(0, 5)"
					:key="memberIndex"
					:style="{ left: `${memberIndex * 15}px`, padding: '0 0 0 8px' }"
					class="absolute bottom-1">
					<img
						v-if="member.user.avatar"
						:src="member.user.avatar"
						alt="avatar"
						class="w-[24px] h-[24px] rounded-full border-[1px] border-white ring-[1px] ring-shade" />
					<div
						v-else
						class="flex justify-center">
						<div class="size-[24px] bg-semi rounded-full relative flex ring-[1px] ring-shade justify-center items-center border-[1px] border-white">
							<p :class="textColorClass">{{ member.name[0].toUpperCase() }}</p>
						</div>
					</div>
				</div>
				<div
					v-if="displayData.participants.length > 3"
					class="absolute bottom-1 left-[96px] text-white size-[24px]">
					<Typography :class="textColorClass"> +{{ displayData.participants.length - 3 }} </Typography>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { computed, defineProps, onMounted, onBeforeUnmount } from "vue";
	import moment from "moment";

	const props = defineProps({
		data: {
			type: Object,
			default: () => ({}),
		},
	});

	// watch(
	// 	() => props.data,
	// 	(newV) => {
	// 		console.log(newV);
	// 	},
	// 	{ immediate: true }
	// );

	// const titleElement = ref(null);
	// const titleWidth = ref(window.innerWidth * 0.2);
	// let resizeObserver;

	// const updateTitleWidth = () => {
	// 	if (titleElement.value) {
	// 		const containerWidth = titleElement.value.clientWidth;
	// 		titleWidth.value = Math.min(containerWidth, window.innerWidth * 0.2);
	// 	}
	// };

	const displayTitle = computed(() => {
		return props.data.eventData.originalData && props.data.eventData.originalData.length ? props.data.eventData.originalData[0].room_name || "Event Title" : "Event Title";
	});

	const displayData = computed(() => {
		return props.data.eventData.originalData && props.data.eventData.originalData.length ? props.data.eventData.originalData[0] : null;
	});

	const getEventDurationInMinutes = (event) => {
		const startTime = moment(event.eventData.start, "HH:mm:ss");
		const endTime = moment(event.eventData.end, "HH:mm:ss");
		if (!startTime.isValid() || !endTime.isValid()) return 0;
		return endTime.diff(startTime, "minutes");
	};

	const getCardHeight = (event) => {
		if (!event) return 0;
		return getEventDurationInMinutes(event) / 30 > 1 ? (getEventDurationInMinutes(event) / 30) * 40 : 40;
	};

	const customStyle = computed(() => {
		return {
			height: `${getCardHeight(props.data)}px`,
			backgroundColor: props.data.eventData.event_color || "#00C472",
		};
	});

	const cardComputedClass = computed(() => {
		const baseClass = "!relative !flex !flex-col space-y-1 w-full rounded-md ring-2 ring-shade p-4 shadow-md shadow-white cursor-pointer";
		return `${baseClass} ${getBgColorClass(props.data.eventData.event_color)}`;
	});

	const getBgColorClass = (color) => {
		switch (color) {
			case "#00C472":
				return "bg-primary !text-white";
			case "#EB3B5A":
				return "bg-red !text-white";
			case "#F2CD42":
				return "bg-yell !text-black";
			case "#2463E2":
				return "bg-blue !text-white";
			default:
				return "bg-primary";
		}
	};

	const isHeightMoreThan40 = computed(() => getCardHeight(props.data) > 40);

	const dynamicLineClamp = computed(() => {
		const cardHeight = getCardHeight(props.data);
		if (cardHeight >= 120) {
			return "line-clamp-3";
		} else if (cardHeight > 60) {
			return "line-clamp-2";
		} else {
			return "line-clamp-1";
		}
	});

	const textColorClass = computed(() => {
		return props.data.eventData.event_color === "#F2CD42" ? "!text-black" : "!text-white";
	});

	const getStartTime = (event) => moment(event.eventData.start, "HH:mm:ss").format("HH:mm");
	const getEndTime = (event) => moment(event.eventData.end, "HH:mm:ss").format("HH:mm");

	const titleComputedClass = computed(() => `text-14-21 -mt-2`);
	const timeComputedClass = computed(() => `text-12-18`);

	onMounted(() => {
		// if (titleElement.value) {
		// 	resizeObserver = new ResizeObserver(updateTitleWidth);
		// 	resizeObserver.observe(titleElement.value);
		// }
		// window.addEventListener("resize", updateTitleWidth); // Update title width on window resize
	});

	onBeforeUnmount(() => {
		// if (resizeObserver && titleElement.value) {
		// 	resizeObserver.unobserve(titleElement.value);
		// }
		// window.removeEventListener("resize", updateTitleWidth);
	});
</script>

<style scoped>
	.line-clamp-1 {
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
