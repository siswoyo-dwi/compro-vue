<template>
	<ModalCalendar
		testID="modal-event-multi"
		:closeBackdrop="false"
		:visible="visible"
		variant="center"
		className="w-[379px] h-[300px]"
		@close="close()">
		<template #header>
			<div class="flex justify-between items-center px-4 py-4">
				<div class="flex justify-start space-x-4 items-center">
					<button @click="close()">
						<img
							src="../../assets/images/x-circle.png"
							alt="close"
							width="18"
							height="18" />
					</button>
					<Typography class="text-20-20"> {{ displayData.length }} Rapat</Typography>
				</div>
			</div>
		</template>
		<div class="flex flex-col text-center text-poppins h-[220px] overflow-auto">
			<div
				v-for="i in displayData"
				:key="i"
				class="px-4 py-2 cursor-pointer rounded-md hover:bg-ghostprime"
				@click="switchModal(i)">
				<div class="flex">
					<div class="w-[40px] flex items-start justify-start">
						<div :class="['size-[20px] rounded-md', getBgColorClass(i.schedule.event_color)]"></div>
					</div>
					<div class="flex-grow flex flex-col w-full truncate break-all">
						<Typography class="text-18-20 capitalize truncate text-start">{{ i.room_name }}</Typography>
						<Typography class="text-14-21 text-semi">
							<div class="flex items-center">
								<span>{{ moment(i.date).format("dddd, DD MMMM YYYY") }}</span>
								<div class="w-[6px] h-[6px] rounded-full bg-gray-400 mx-2"></div>
								<span>{{ moment(i.schedule.time_start, "HH:mm:ss").format("HH:mm") }}</span>
								<span class="mx-1"> - </span>
								<span>{{ moment(i.schedule.time_end, "HH:mm:ss").format("HH:mm") }}</span>
							</div>
						</Typography>
					</div>
				</div>
			</div>
		</div>
	</ModalCalendar>
</template>

<script setup>
	import { defineProps, defineEmits, computed } from "vue";
	import Typography from "../atoms/Typography.vue";
	import moment from "moment";

	const emit = defineEmits(["close", "switch"]);
	const props = defineProps({
		visible: {
			type: Boolean,
			required: true,
		},
		data: {
			type: Object,
			required: true,
			default: () => {},
		},
	});

	const displayData = computed(() => {
		return props.data.eventData?.originalData || [];
	});
	const close = () => {
		emit("close");
	};

	const switchModal = (data) => {
		emit("switch", data);
	};

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
</script>

<style lang="scss" scoped></style>
