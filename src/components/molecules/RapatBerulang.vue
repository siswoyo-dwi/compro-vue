<template>
	<div class="flex flex-col space-y-4 w-[348px] border-[1px] border-shade rounded-2xl p-4">
		<div class="flex justify-between">
			<Typography class="text-16-20 text-black"> Rapat Berulang</Typography>
			<Switch
				@click="repeat_event = !repeat_event"
				:enabled="repeat_event"
				@clicked="clickRepeat($event)" />
		</div>
		<div class="flex space-x-4">
			<div
				v-for="i in hari"
				:key="i.value"
				class="flex items-center justify-start"
				@click="repeat_event ? addDays(i) : ''">
				<div
					:class="[
						'rounded-full size-[32px] flex items-center justify-center ring-2 ring-shade',
						days.includes(i.value) ? 'text-white ring-2 ring-primary bg-primary' : 'bg-gray-200',
						repeat_event ? 'cursor-pointer' : '',
					]">
					{{ i.key }}
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, defineEmits } from "vue";

	const emit = defineEmits(["update", "updateDays"]);

	const days = ref([]);
	const repeat_event = ref(false);

	const hari = ref([
		{
			key: "S",
			value: "Senin",
		},
		{
			key: "S",
			value: "Selasa",
		},
		{
			key: "R",
			value: "Rabu",
		},
		{
			key: "K",
			value: "Kamis",
		},
		{
			key: "J",
			value: "Jumat",
		},
		{
			key: "S",
			value: "Sabtu",
		},
		{
			key: "M",
			value: "Minggu",
		},
	]);

	const clickRepeat = (e) => {
		if (!e) {
			days.value = [];
		} else {
			days.value = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
		}
		emit("update", e);
	};

	const addDays = (day) => {
		let idx = days.value.indexOf(day);
		console.log(idx);
		if (idx === -1) {
			days.value.push(day);
			emit("updateDays", days.value);
		} else {
			days.value.splice(idx, 1);
			emit("updateDays", days.value);
		}
	};
</script>

<style lang="scss" scoped></style>
