<template>
	<div
		class="relative inline-block"
		ref="timePickerWrapper">
		<!-- Input to show the selected time -->
		<div
			v-if="showTimePicker"
			class="absolute z-10 bg-white p-4 rounded-lg shadow-lg border border-gray-300 -top-[200px]">
			<div class="flex justify-center">
				<Typography class="text-15-24">Pilih Waktu</Typography>
			</div>
			<div class="flex items-center justify-between">
				<!-- Hour Selector -->
				<div class="flex items-center space-x-1">
					<div class="flex flex-col">
						<div class="bg-shade rounded-t-md px-[2px]">
							<button
								@click="scrollHour('up')"
								:class="`arrow-btn ${buttonColor}`">
								<ChevronUpIcon class="size-[14px] fill-black" />
							</button>
						</div>
						<div class="bg-shade rounded-b-md px-[2px] flex items-end">
							<button
								@click="scrollHour('down')"
								:class="`arrow-btn ${buttonColor}`">
								<ChevronDownIcon class="size-[14px] fill-black" />
							</button>
						</div>
					</div>
					<div class="relative overflow-hidden h-36 w-16 flex justify-center items-center">
						<div
							class="time-scroll"
							ref="hourScroll">
							<div
								v-for="(hour, index) in hoursVisible"
								:key="index"
								:class="hourClasses(hour)">
								{{ hour }}
							</div>
						</div>
					</div>
				</div>

				<div class="text-2xl font-bold mx-4">:</div>

				<!-- Minute Selector -->
				<div class="flex items-center space-x-1">
					<div class="relative overflow-hidden h-36 w-16 flex justify-center items-center">
						<div
							class="time-scroll"
							ref="minuteScroll">
							<div
								v-for="(minute, index) in minutesVisible"
								:key="index"
								:class="minuteClasses(minute)">
								{{ minute }}
							</div>
						</div>
					</div>
					<div class="flex flex-col">
						<div class="bg-shade rounded-t-md px-[2px]">
							<button
								@click="scrollMinute('up')"
								:class="`arrow-btn ${buttonColor}`">
								<ChevronUpIcon class="size-[14px] fill-black" />
							</button>
						</div>
						<div class="bg-shade rounded-b-md px-[2px] flex items-end">
							<button
								@click="scrollMinute('down')"
								:class="`arrow-btn ${buttonColor}`">
								<ChevronDownIcon class="size-[14px] fill-black" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<InputFieldTime
			:testID="testID"
			:label="label"
			:hideLabel="hideLabel"
			:required="required"
			type="text"
			@blur="handleBlur"
			@focus="openTimePicker"
			:placeholder="placeholder"
			:value="value"
			aria-label="Time Picker" />
		<span
			@click="openTimePicker"
			class="absolute inset-y-0 right-0 pr-1 -top-[35%] flex items-center">
			<ClockIcon class="size-[20px] stroke-grayish stroke-1" />
		</span>
		<p :class="['text-12-18 font-light mt-1 max-w-[300px]', isError ? 'text-danger' : 'text-transparent']">
			{{ error ? error : "-" }}
		</p>
		<!-- Time picker popup -->
	</div>
</template>

<script setup>
	import { ref, computed, nextTick, onMounted, onBeforeUnmount, defineProps, defineEmits, watch } from "vue";
	import InputFieldTime from "../molecules/InputFieldTime.vue";
	import Typography from "./Typography.vue";

	const emit = defineEmits(["update:modelValue"]);

	const props = defineProps({
		label: {
			type: String,
			default: "",
		},
		testID: {
			type: String,
			default: "",
		},
		value: {
			type: String,
			default: "",
		},
		hideLabel: {
			type: Boolean,
			default: false,
		},
		required: {
			type: Boolean,
			default: false,
		},
		placeholder: {
			type: String,
			default: "Pilih Waktu",
		},
		error: {
			type: String,
			default: "",
		},
		onBlur: Function,
		inputClass: {
			type: String,
			default: "px-3 py-2",
		},
		buttonColor: {
			type: String,
			default: "text-white hover:text-white",
		},
		inputWidth: {
			type: String,
			default: "48", // Default width
		},
	});

	// Hour and minute options
	const hours = Array.from({ length: 24 }, (_, i) => (i < 10 ? "0" + i : i.toString()));
	const minutes = Array.from({ length: 60 }, (_, i) => (i < 10 ? "0" + i : i.toString()));

	const hourScroll = ref(null);
	const minuteScroll = ref(null);
	const timePickerWrapper = ref(null);

	// Set default values
	const now = new Date();
	const defaultHour = String(now.getHours()).padStart(2, "0");
	const defaultMinute = String(now.getMinutes()).padStart(2, "0");

	const selectedHour = ref(hours.includes(defaultHour) ? defaultHour : hours[0]);
	const selectedMinute = ref(minutes.includes(defaultMinute) ? defaultMinute : minutes[0]);
	const formattedTime = computed(() => `${selectedHour.value}:${selectedMinute.value}`);
	const showTimePicker = ref(false);
	const optionHeight = ref(0);

	const isError = computed(() => props.error && props.error !== "");
	const handleBlur = () => {
		if (props.onBlur) props.onBlur();
		isFocus.value = false;
		emit("blur", false);
	};

	const hoursVisible = computed(() => {
		const currentIndex = hours.indexOf(selectedHour.value);
		if (currentIndex === -1) {
			selectedHour.value = hours[0];
			return [hours[0], hours[1], hours[2]];
		}
		return [hours[(currentIndex - 1 + hours.length) % hours.length], hours[currentIndex], hours[(currentIndex + 1) % hours.length]];
	});

	const minutesVisible = computed(() => {
		const currentIndex = minutes.indexOf(selectedMinute.value);
		if (currentIndex === -1) {
			selectedMinute.value = minutes[0];
			return [minutes[0], minutes[1], minutes[2]];
		}
		return [minutes[(currentIndex - 1 + minutes.length) % minutes.length], minutes[currentIndex], minutes[(currentIndex + 1) % minutes.length]];
	});

	const openTimePicker = () => {
		showTimePicker.value = true;
		nextTick(() => {
			centerSelectedTime();
		});
	};

	const closeTimePicker = () => {
		showTimePicker.value = false;
	};

	const handleClickOutside = (event) => {
		if (timePickerWrapper.value && !timePickerWrapper.value.contains(event.target)) {
			closeTimePicker();
		}
	};

	onMounted(() => {
		document.addEventListener("click", handleClickOutside);
	});

	onBeforeUnmount(() => {
		document.removeEventListener("click", handleClickOutside);
	});

	const centerSelectedTime = () => {
		if (hourScroll.value) {
			const selectedHourIndex = hours.indexOf(selectedHour.value);
			hourScroll.value.scrollTop = selectedHourIndex * optionHeight.value - optionHeight.value;
		}
		if (minuteScroll.value) {
			const selectedMinuteIndex = minutes.indexOf(selectedMinute.value);
			minuteScroll.value.scrollTop = selectedMinuteIndex * optionHeight.value - optionHeight.value;
		}
	};

	const scrollHour = (direction) => {
		const currentIndex = hours.indexOf(selectedHour.value);
		let newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

		if (newIndex < 0) newIndex = hours.length - 1;
		if (newIndex >= hours.length) newIndex = 0;

		selectedHour.value = hours[newIndex];
		centerSelectedTime();
	};

	const scrollMinute = (direction) => {
		const currentIndex = minutes.indexOf(selectedMinute.value);
		let newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

		if (newIndex < 0) newIndex = minutes.length - 1;
		if (newIndex >= minutes.length) newIndex = 0;

		selectedMinute.value = minutes[newIndex];
		centerSelectedTime();
	};

	watch(
		() => formattedTime.value,
		(newV, oldV) => {
			if (newV != oldV) {
				emit("update:modelValue", newV);
			}
		}
	);

	const hourClasses = (hour) => {
		return `cursor-pointer text-3xl flex items-center justify-center transition-colors duration-300 h-10 w-16 ${selectedHour.value === hour ? "text-green-600 bg-ghostprime rounded-md" : "text-semi"}`;
	};

	const minuteClasses = (minute) => {
		return `cursor-pointer text-3xl flex items-center justify-center transition-colors duration-300 h-10 w-16 ${
			selectedMinute.value === minute ? "text-green-600 bg-ghostprime rounded-md" : "text-semi"
		}`;
	};

	const calculateOptionHeight = () => {
		if (hourScroll.value) {
			const optionElement = hourScroll.value.querySelector("div");
			optionHeight.value = optionElement ? optionElement.clientHeight : 40;
		}
	};

	nextTick(calculateOptionHeight);
</script>

<style scoped>
	.arrow-btn {
		@apply text-gray-500 hover:text-gray-700 text-sm cursor-pointer; /* Adjusted button size */
	}

	.time-scroll {
		@apply h-36 flex flex-col items-center justify-center;
	}

	.time-scroll::-webkit-scrollbar {
		display: none; /* Hide the scrollbar */
	}
</style>
