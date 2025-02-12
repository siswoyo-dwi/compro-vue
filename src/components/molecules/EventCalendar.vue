<template>
	<div class="max-h-fit text-poppins">
		<!-- Calendar Page head -->
		<div class="flex justify-between items-center py-1">
			<div>
				<Typography class="text-24-30">Jadwal</Typography>
			</div>
			<div class="flex justify-center items-center space-x-2">
				<Button
					@click="prevWeek()"
					variant="basic"
					class="!px-2">
					<ChevronLeftIcon
						variant="plain"
						class="fill-black size-[18px]" />
				</Button>
				<Typography class="text-14-21"> {{ moment(startDate).format("DD") }} - {{ moment(endDate).format("DD") }} {{ moment(today).format("MMMM") }}</Typography>
				<Button
					@click="nextWeek"
					variant="basic"
					class="!px-2">
					<ChevronRightIcon
						variant="plain"
						class="fill-black size-[18px]" />
				</Button>
			</div>
			<div class="flex space-x-2">
				<Button
					variant="basic"
					@click="setToday()"
					><Typography class="text-14-21">Hari Ini</Typography>
				</Button>
				<Button variant="basic">
					<div class="flex space-x-2 items-center">
						<Typography class="text-14-21">Semua</Typography>
						<ArrowDownIcon
							class="w-[14px] h-[14px]"
							containerClass="fill-black" />
					</div>
				</Button>
			</div>
		</div>
		<!-- Calendar content -->
		<div
			v-if="showCalendar"
			class="flex justify-between">
			<div class="h-[80px] w-[100px] flex justify-center items-center">
				<Typography class="text-14-21"> GMT{{ moment().format("Z") }}</Typography>
			</div>
			<div
				v-for="date in alldays"
				:key="date"
				class="flex flex-col w-full flex-grow">
				<div class="h-[80px] text-center items-center flex flex-col justify-between p-2">
					<Typography class="text-semi text-14-21">{{ moment(date.dateHead).format("ddd") }} </Typography>
					<Button
						:variant="checkDays(date.dateHead) ? '' : 'contained'"
						class="text-semi text-24-30 size-[46px]"
						>{{ moment(date.dateHead).format("DD") }}
					</Button>
				</div>
			</div>
		</div>
		<!-- Content Body -->
		<div
			v-if="showCalendar"
			class="flex w-full h-[55vh] overflow-scroll overflow-x-hidden">
			<div class="w-[100px]">
				<div
					v-for="(i, index) in 24"
					:key="i"
					class="flex flex-col relative h-[80px] items-center border-r-[0.7px] border-semi">
					<Typography
						v-if="index != 23"
						class="absolute bottom-[-11px] text-14-21"
						>{{
							moment(today)
								.startOf("days")
								.add(index + 1, "hours")
								.format("HH:mm")
						}}</Typography
					>
				</div>
			</div>
			<div class="flex w-full justify-between">
				<div
					v-for="date in alldays"
					:key="date"
					class="border-semi w-full relative">
					<div
						v-for="(i, index) in date.hours"
						:key="index"
						:class="['h-[40px] border-r-[0.7px] border-semi', checkBlock(index)]">
						<!-- event -->
						<EventCard
							@click="openModal(i)"
							:data="i">
						</EventCard>
					</div>
				</div>
			</div>
		</div>
		<ModalCalendarEventSingle
			:visible="openEventModalSingle"
			:data="modalDataSingle"
			@close="openEventModalSingle = false"
			:closeBackdrop="false"
			@deleteEvent="setDelete()"
			@switchInvite="setInvite()" />
		<ModalCalendarEventMultiple
			:visible="openEventModalMulti"
			:data="modalDataMulti"
			@close="openEventModalMulti = false"
			:closeBackdrop="false"
			@switch="switchModal($event)" />
		<ModalCalendarDeleteEvent
			:visible="openEventModalDelete"
			:data="modalDataSingle"
			@close="openEventModalDelete = false"
			:closeBackdrop="false"
			@eventDeleted="$emit('refresh')" />
		<ModalCalendarDeleteEvent
			:visible="openEventModalDelete"
			:data="modalDataSingle"
			@close="openEventModalDelete = false"
			:closeBackdrop="false"
			@eventDeleted="$emit('refresh')" />
		<ModalCalendarInvite
			:visible="openEventModalInvite"
			:data="modalDataSingle"
			@close="openEventModalInvite = false"
			:closeBackdrop="false"
			@refresh="$emit('refresh'), setBack()" />
	</div>
</template>

<script setup>
	import { onMounted, ref, watch } from "vue";
	import moment from "moment";
	import Typography from "../atoms/Typography.vue";
	import ModalCalendarDeleteEvent from "./ModalCalendarDeleteEvent.vue";
	import ModalCalendarInvite from "./ModalCalendarInvite.vue";
	import useLoading from "../../store/loading";
	const emit = defineEmits(["changeDate", "refresh"]);

	const props = defineProps({
		events: {
			type: Array,
			default: [],
		},
	});
	const loading = useLoading();
	const today = ref(null);
	const startDate = ref(null);
	const endDate = ref(null);
	const showCalendar = ref(false);
	const alldays = ref([{ dateHead: moment().utc() }]);
	const modalDataSingle = ref({});
	const modalDataMulti = ref({});

	const openEventModalSingle = ref(false);
	const openEventModalMulti = ref(false);
	const openEventModalDelete = ref(false);
	const openEventModalInvite = ref(false);

	onMounted(() => {
		setToday();
	});

	const setDelete = () => {
		openEventModalSingle.value = false;
		openEventModalDelete.value = true;
	};

	const setInvite = () => {
		openEventModalSingle.value = false;
		openEventModalInvite.value = true;
	};
	const setBack = () => {
		openEventModalInvite.value = false;
		openEventModalSingle.value = true;
	};

	const switchModal = (data) => {
		modalDataSingle.value = data;
		openEventModalMulti.value = false;
		openEventModalSingle.value = true;
	};

	const openModal = (data) => {
		if (data.eventData.originalData.length > 1) {
			openEventModalMulti.value = true;
			modalDataMulti.value = data;
		} else {
			openEventModalSingle.value = true;
			modalDataSingle.value = data.eventData.originalData[0];
		}
	};
	const setToday = () => {
		today.value = moment();
		startDate.value = moment().startOf("week");
		endDate.value = moment().endOf("week");
		emit("changeDate", {
			today: moment(today.value).format("yyyy-MM-DD"),
			start: moment(startDate.value).format("yyyy-MM-DD"),
			end: moment(endDate.value).format("yyyy-MM-DD"),
		});
		getdayList();
	};

	const nextWeek = () => {
		today.value = moment();
		startDate.value = moment(startDate.value).add(7, "days");
		endDate.value = moment(endDate.value).add(7, "days");
		emit("changeDate", {
			today: moment(today.value).format("yyyy-MM-DD"),
			start: moment(startDate.value).format("yyyy-MM-DD"),
			end: moment(endDate.value).format("yyyy-MM-DD"),
		});
		getdayList();
	};

	const prevWeek = () => {
		today.value = moment();
		startDate.value = moment(startDate.value).subtract(7, "days");
		endDate.value = moment(endDate.value).subtract(7, "days");
		emit("changeDate", {
			today: moment(today.value).format("yyyy-MM-DD"),
			start: moment(startDate.value).format("yyyy-MM-DD"),
			end: moment(endDate.value).format("yyyy-MM-DD"),
		});
		getdayList();
	};

	const getdayList = () => {
		showCalendar.value = false;
		let days = [];
		let d = startDate.value.clone();
		while (d <= endDate.value) {
			let day = { dateHead: d.clone(), hours: [] };
			let start = moment(d).startOf("day");
			for (let h = start; h <= moment(d).endOf("day"); h.add(30, "minutes")) {
				let next = h.clone().format("HH:mm:ss");
				day.hours.push({ key: next, eventData: [] });
			}
			days.push(day);
			d = d.add(1, "day");
		}
		alldays.value = days;
		showCalendar.value = true;
	};

	const clearExistingEvents = () => {
		alldays.value.forEach((day) => {
			if (day.hours) {
				day.hours.forEach((slot) => {
					slot.eventData = [];
				});
			}
		});
		injectEvent();
	};

	const injectEvent = () => {
		if (!props.events || props.events.length === 0) return;
		loading.show();

		props.events.forEach((event) => {
			const eventDate = moment(event.date).format("YYYY-MM-DD");
			const startTime = moment(event.start, "HH:mm:ss").format("HH:mm:ss");

			alldays.value.forEach((day) => {
				const dayDate = moment(day.dateHead).format("YYYY-MM-DD");

				if (dayDate === eventDate && Array.isArray(day.hours)) {
					day.hours.forEach((slot) => {
						const slotTime = slot.key;
						const endTime = moment(slotTime, "HH:mm:ss").add(30, "minutes").format("HH:mm:ss");

						if (startTime >= slotTime && startTime < endTime) {
							slot.eventData = {
								...event,
								title: event.description,
								color: event.event_color,
							};
						}
					});
				}
			});
		});
		loading.hide();
	};

	const checkBlock = (idx) => {
		return idx == 0
			? "border-t-[0.7px] border-r-[0.7px] border-semi"
			: idx === 47
			? "border-b-[0.7px] border-r-[0.7px] border-semi"
			: (idx + 1) % 2 === 0
			? "border-b-[0.7px] border-r-[0.7px] border-semi"
			: null;
	};

	watch(
		() => props.events,
		(newV, oldV) => {
			if (newV != oldV) {
				clearExistingEvents();
			}
		},
		{ immediate: true }
	);

	const checkDays = (date) => {
		return moment(date).format("DDMMYYYY") !== moment().format("DDMMYYYY");
	};
</script>

<style lang="scss" scoped></style>
