<template>
	<ModalCalendar
		testID="modal-calendar-invite"
		:closeBackdrop="false"
		:visible="visible"
		variant="center"
		className="w-[544px]"
		@close="close()">
		<!-- Slot for the Header -->
		<template #header>
			<div class="flex justify-between items-center p-2">
				<div class="flex justify-start space-x-4 items-center">
					<button @click="set_invited()">
						<ArrowLeftIcon class="size-5 fill-black" />
					</button>
					<Typography class="text-20-20">Tambah Peserta</Typography>
				</div>
			</div>
		</template>

		<div class="flex flex-col text-poppins p-2 space-y-2 relative">
			<div>
				<InviteField
					:room_code="data.room_code"
					testID="invite-modal-field"
					placeholder="Cari Email ..."
					v-model="keysearch"
					:value="keysearch"
					:invited="filtered_user"
					@invite="set_invited()"
					@failed="showFailed = $event" />
				<span class="absolute inset-y-0 right-8 -top-0 flex items-center justify-center">
					<MagnifyingGlassIcon :class="['size-5 stroke-2 cursor-pointer stroke-semi']" />
				</span>
			</div>
			<slot />
		</div>
		<div
			v-if="showFailed"
			class="flex justify-center">
			<img
				class=""
				src="../images/invite-failed.png" />
		</div>
	</ModalCalendar>
</template>

<script setup lang="ts">
	import { ref, defineProps, defineEmits, computed } from "vue";
	import Typography from "../atoms/Typography.vue";
	import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";

	const emit = defineEmits(["close", "refresh", "switchBack"]);
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

	const keysearch = ref(null);
	const showFailed = ref(false);
	const filtered_user = computed(() =>
		props.data?.participants.map((i: any) => {
			return i.user.id;
		})
	);

	const close = () => {
		emit("close");
	};

	const set_invited = () => {
		emit("refresh");
	};

	const switchBack = () => {
		emit("switchBack");
	};

	const getBgColorClass = (color: any) => {
		switch (color) {
			case "#00C472":
				return "bg-primary !text-white";
			case "#EB3B5A":
				return "bg-red !text-white";
			case "#F2CD42":
				return " !text-black";
			case "#2463E2":
				return "bg-blue !text-white";
			default:
				return "bg-primary";
		}
	};
</script>

<style lang="scss" scoped></style>
