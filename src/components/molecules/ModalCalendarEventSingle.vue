<template>
	<ModalCalendar
		testID="modal-event-single"
		:closeBackdrop="false"
		:visible="visible"
		variant="center"
		className="w-[544px] min-h-[300px] relative"
		@close="close()">
		<!--  Header -->
		<template #header>
			<div class="flex justify-between items-center px-2 py-4">
				<div class="flex justify-start space-x-4 items-center">
					<button @click="close()">
						<img
							src="../../assets/images/x-circle.png"
							alt="close"
							width="18"
							height="18" />
					</button>
					<Typography class="text-20-20">Detail Jadwal</Typography>
				</div>
				<div class="flex justify-end space-x-4 px-2">
					<div class="bg-white shadow rounded-md cursor-pointer">
						<PenLineIcon
							@click="isOwner && !isUnderFive ? $router.push(`/edit_jadwal?kode=${data.room_code}`) : ''"
							:class="['size-5 ', isUnderFive ? 'fill-semi' : 'fill-primary']" />
					</div>
					<div class="bg-white shadow rounded-md cursor-pointer">
						<TrashIcon
							@click="isOwner && !isUnderFive ? deleteEvent() : ''"
							:class="['size-5 ', isUnderFive ? 'fill-semi' : 'fill-redist']" />
					</div>
				</div>
			</div>
		</template>

		<div class="flex flex-col min-h-[160px] text-poppins p-2 pr-5 space-y-2">
			<div class="flex">
				<div class="w-[40px] flex items-start justify-start">
					<div :class="['size-[20px] rounded-md', getBgColorClass(data.schedule.event_color)]"></div>
				</div>
				<div class="flex-grow flex flex-col w-full truncate break-normal">
					<Typography class="text-18-20 truncate capitalize">{{ data.room_name }}</Typography>
					<Typography class="text-14-21 text-semi">
						<div class="flex items-center">
							<span>{{ moment(data.date).format("dddd, DD MMMM YYYY") }}</span>
							<div class="w-[6px] h-[6px] rounded-full bg-gray-400 mx-2"></div>
							<span>{{ moment(data.schedule.time_start, "HH:mm:ss").format("HH:mm") }}</span>
							<span class="mx-1"> - </span>
							<span>{{ moment(data.schedule.time_end, "HH:mm:ss").format("HH:mm") }}</span>
						</div>
					</Typography>
				</div>
			</div>

			<!-- Participants List -->
			<div class="flex flex-col item-center py-1">
				<div class="flex items-center space-y-1">
					<div class="w-[40px] flex items-center justify-start -ml-[2px]">
						<UserIcon class="size-[22px] fill-black" />
					</div>
					<div class="flex-grow flex flex-col justify-center">
						<Typography class="text-16-20 text-semi">{{ data.participants.length }} Peserta</Typography>
					</div>
					<div class="w-[36px] flex items-center justify-end">
						<UserPlusIcon
							@click="isOwner ? switchInvite() : ''"
							class="size-6 fill-black cursor-pointer" />
					</div>
					<div
						v-if="partyLength == 1"
						class="w-[36px] flex items-center justify-end cursor-pointer">
						<ChevronDownIcon
							@click="partyLength = data.participants.length"
							class="size-4 fill-black" />
					</div>
					<div
						v-else
						@click="partyLength = 1"
						class="w-[36px] flex items-center justify-end cursor-pointer">
						<ChevronUpIcon class="size-6 stroke-black" />
					</div>
				</div>
			</div>

			<!-- Participants Overflow List -->
			<div class="overflow-auto flex-grow max-h-[140px]">
				<div
					v-for="i in data.participants.slice(0, partyLength)"
					:key="i.id"
					class="px-10 py-1 cursor-pointer flex space-x-1 items-center hover:bg-ghostprime">
					<div class="w-[40px] relative">
						<img
							v-if="i.user.avatar"
							:src="i.user.avatar"
							alt="foto profil"
							class="size-[32px] rounded-full object-cover" />
						<div
							v-else
							class="size-[32px] bg-semi rounded-full flex items-center justify-center">
							<p class="text-white text-[24px]">{{ i.name[0].toUpperCase() }}</p>
						</div>
						<span
							v-if="i.is_attend"
							class="absolute right-0 bottom-0">
							<CircleCheckIcon class="size-[15px] fill-primary stroke-white" />
						</span>
					</div>
					<div class="flex flex-col">
						<Typography class="text-black text-14-24">{{ i.name }}</Typography>
						<Typography class="text-semi text-12-18">{{ i.is_owner ? "Penyelenggara Rapat" : "Peserta" }} </Typography>
					</div>
				</div>
			</div>

			<!-- Description -->
			<div class="flex flex-grow mt-1">
				<div class="w-[40px] flex items-start justify-start">
					<TagLineIcon class="size-[20px] stroke-semi" />
				</div>
				<div class="flex-grow flex justify-start break-all max-w-[430px]">
					<Typography class="text-14-21 text-ellipsis line-clamp-5">{{ data.schedule.description }}</Typography>
				</div>
			</div>
			<div class="flex flex-col w-full">
				<div
					v-if="data.schedule.is_notif"
					class="flex w-full">
					<div class="w-[40px] flex items-center justify-start">
						<BellIcon class="size-[20px] fill-black" />
					</div>
					<div>
						<Typography class="text-16-20 text-semi">{{ data.schedule.notification }} Menit Sebelumnya</Typography>
					</div>
				</div>
			</div>
		</div>

		<!-- Footer -->
		<template
			v-if="!isAttend || isStarting"
			#footer>
			<div class="flex flex-col w-full space-y-1">
				<div class="w-full px-4">
					<div
						v-if="!isAttend"
						class="flex items-center justify-between space-x-2">
						<div>
							<Typography class="text-16-24">Ingin bergabung di Rapat ini ?</Typography>
						</div>
						<div class="flex space-x-2 w-[180px]">
							<Button
								@click="store.save_attend(props.data.room_code)"
								variant="outline"
								class="w-full"
								>Tidak</Button
							>
							<Button
								class="w-full"
								@click="attending()"
								>Ya</Button
							>
						</div>
					</div>
				</div>
				<div
					v-if="isStarting"
					class="w-full px-4">
					<div class="flex items-center justify-between">
						<div>
							<Typography class="text-16-24">Rapat akan Berlangsung ?</Typography>
						</div>
						<div class="flex space-x-2 w-[120px]">
							<Button
								class="w-full"
								@click="joinMeet()"
								>Bergabung</Button
							>
						</div>
					</div>
				</div>
			</div>
		</template>
	</ModalCalendar>
</template>

<script setup>
	import { ref, defineProps, defineEmits, watch, computed } from "vue";
	import Typography from "../atoms/Typography.vue";
	import moment from "moment";
	import { ChevronUpIcon } from "@heroicons/vue/24/outline";
	import { useStore } from "../../store/monev";
	import axios from "../../axios/axios";
	import { useRouter } from "vue-router";

	const emit = defineEmits(["close", "deleteEvent", "switchInvite"]);
	const props = defineProps({
		visible: {
			type: Boolean,
			required: true,
		},
		data: {
			type: Object,
			default: () => ({}),
		},
	});
	const store = useStore();
	const router = useRouter();
	const partyLength = ref(1);
	const userLogin = computed(() => {
		let login = (props?.data?.participants || []).filter((i) => {
			return i.user.id == store.user.id;
		});
		return login.length ? login[0] : {};
	});
	const isOwner = computed(() => userLogin.value.is_owner);
	const isAttend = computed(() => store.attending.includes(props.data.room_code));

	const isUnderFive = computed(() => {
		if (!props.data) return true;
		const start = moment(`${props.data.schedule.date} ${props.data.schedule.time_start}`, "YYYY-MM-DD HH:mm");
		const now = moment();
		const diffMinutes = now.diff(start, "minutes");
		return diffMinutes >= -5;
	});
	const isStarting = computed(() => {
		if (!props.data) return true;
		const start = moment(`${props.data.schedule.date} ${props.data.schedule.time_start}`, "YYYY-MM-DD HH:mm").subtract(props.data.schedule.notification, "minutes");
		const end = moment(`${props.data.schedule.date} ${props.data.schedule.time_end}`, "YYYY-MM-DD HH:mm");
		const now = moment();
		const Starting = now.isBetween(start, end);
		return Starting;
	});

	const attending = () => {
		axios
			.post(`/instant-meeting/attend-participant/${store.user.id}/${props.data.room_code}`, {
				is_attend: true,
			})
			.then((res) => {
				store.save_attend(props.data.room_code);
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const joinMeet = () => {
		router.push("/room/prejoin/" + props.data.room_code);
	};

	watch(
		() => props.visible,
		(newV) => {
			if (newV) {
				partyLength.value = 1;
				if (props.data.schedule.is_attend) {
					store.save_attend(props.data.room_code);
				}
			}
		},
		{ immediate: true }
	);

	const close = () => emit("close");
	const switchInvite = () => emit("switchInvite");
	const deleteEvent = () => emit("deleteEvent");

	const getBgColorClass = (color) => {
		switch (color) {
			case "#00C472":
				return "bg-primary !text-white";
			case "#EB3B5A":
				return "bg-red !text-white";
			case "#F2CD42":
				return "bg-yellow !text-black";
			case "#2463E2":
				return "bg-blue !text-white";
			default:
				return "bg-primary";
		}
	};
</script>
