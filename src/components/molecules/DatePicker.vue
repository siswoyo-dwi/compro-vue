<template>
	<div
		ref="datePickerWrapper"
		class="relative inline-block">
		<!-- Date Input Field -->
		<div>
			<Input
				containerClassName="!p-4"
				:label="label"
				testID="datePicker"
				type="text"
				v-model="formattedDate"
				@focus="openDatePicker()"
				@blur="emit('blur', false)"
				:class="inputClasses"
				:value="formattedDate"
				:placeholder="placeholder"
				required
				readonly />
			<span
				@click="openDatePicker"
				class="absolute inset-y-0 right-0 pr-2 top-[5%] flex items-center text-gray-400">
				<CalendarInputIcon
					class="size-[20px] stroke-grayish"
					:containerClass="error ? 'stroke-danger' : ''" />
			</span>
		</div>

		<!-- Date Picker Popup with Positioning -->
		<div
			v-show="showDatePicker"
			:class="['absolute z-[99999] bg-white border rounded shadow-md w-80', pickerPositionClass]">
			<!-- Header for Month and Year Navigation -->
			<div class="flex justify-between items-center p-4 border-b">
				<button
					@click="previousMonth"
					class="text-gray-500 hover:text-gray-700">
					&lt;
				</button>
				<div
					@click="toggleMonthYearSelector"
					class="text-lg font-semibold cursor-pointer">
					{{ currentMonth }} {{ currentYear }}
				</div>
				<button
					@click="nextMonth"
					class="text-gray-500 hover:text-gray-700">
					&gt;
				</button>
			</div>

			<!-- Label Hari -->
			<div class="grid grid-cols-7 text-center text-sm text-gray-500 my-2">
				<span
					v-for="day in dayLabels"
					:key="day"
					>{{ day }}</span
				>
			</div>

			<!-- Tanggal -->
			<div class="grid grid-cols-7 gap-y-2 p-4">
				<!-- Prev Month -->
				<div
					v-for="(day, index) in daysBeforeCurrentMonth"
					:key="'prev-' + index"
					class="text-gray-300 cursor-not-allowed w-full h-10 flex items-center justify-center">
					{{ day }}
				</div>

				<!-- Current Month Days -->
				<div
					v-for="(day, index) in daysInMonth"
					:key="'current-' + index"
					@click="selectDay(day)"
					:class="getDayClasses(day)"
					class="cursor-pointer w-full h-10 flex items-center justify-center rounded-md transition duration-300">
					{{ day }}
				</div>

				<!-- Next Month -->
				<div
					v-for="(day, index) in daysAfterCurrentMonth"
					:key="'next-' + index"
					class="text-gray-300 cursor-not-allowed w-full h-10 flex items-center justify-center">
					{{ day }}
				</div>
			</div>
		</div>

		<!-- Month and Year Popup with Positioning -->
		<div
			v-show="showMonthYearSelector"
			:class="['absolute z-20 bg-white border rounded shadow-md w-96 h-72 p-4 overflow-hidden flex', pickerPositionClass]">
			<!-- Month (left) -->
			<div class="w-1/2 overflow-hidden h-full relative">
				<div class="text-center font-semibold mb-2">Pilih Bulan</div>
				<div
					class="h-60 overflow-y-scroll smooth-scroll"
					ref="monthScroll">
					<div
						v-for="(month, index) in monthNames"
						:key="month"
						@click="selectMonth(index)"
						:class="getMonthClasses(index)"
						class="cursor-pointer p-2 rounded-md text-center mb-1 transition duration-300">
						{{ month }}
					</div>
				</div>
			</div>

			<!-- Year (right) -->
			<div class="w-1/2 overflow-hidden h-full relative">
				<div class="text-center font-semibold mb-2">Pilih Tahun</div>
				<div
					class="h-60 overflow-y-scroll smooth-scroll"
					ref="yearScroll">
					<div
						v-for="year in years"
						:key="year"
						@click="selectYear(year)"
						:class="getYearClasses(year)"
						class="cursor-pointer p-2 text-center rounded-md mb-1 transition duration-300">
						{{ year }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, computed, watch, onMounted, onBeforeUnmount, defineEmits } from "vue";
	import { format } from "date-fns";
	import { id } from "date-fns/locale";

	const emit = defineEmits(["update:modelValue"]);

	const props = defineProps({
		label: {
			type: String,
			default: "Tanggal",
		},
		value: {
			type: Date || String,
			default: "",
		},
		placeholder: {
			type: String,
			default: "Pilih tanggal",
		},
		initialDate: {
			type: String,
			default: "",
		},
		format: {
			type: String,
			default: "dd MMMM yyyy",
		},
		inputClasses: {
			type: String,
			default: "border py-1 rounded w-full",
		},
		activeDayClass: {
			type: String,
			default: "bg-primary text-white",
		},
		inactiveDayClass: {
			type: String,
			default: "text-gray-800 hover:bg-secondary",
		},
		activeMonthYearClass: {
			type: String,
			default: "bg-ghostsuccess text-success",
		},
		inactiveMonthYearClass: {
			type: String,
			default: "text-gray-800 hover:bg-green-100",
		},
		error: {
			type: String,
			default: "",
		},
		onChange: Function,
		onFocus: Function,
		onBlur: Function,
		onEnter: Function,
		pickerPosition: {
			type: String,
			default: "bottom",
			validator: (value) => ["top", "bottom"].includes(value),
		},
	});

	const showDatePicker = ref(false);
	const showMonthYearSelector = ref(false);
	const selectedDate = ref(props.initialDate ? new Date(props.initialDate) : new Date());
	const currentYear = ref(selectedDate.value.getFullYear());
	const currentMonthIndex = ref(selectedDate.value.getMonth());
	const formattedDate = ref("");
	const datePickerWrapper = ref(null);

	const dayLabels = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

	const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
	const years = Array.from({ length: 40 }, (_, i) => currentYear.value - 10 + i);

	const pickerPositionClass = computed(() => (props.pickerPosition === "top" ? "bottom-full -mb-10" : "top-full -mt-10"));

	const currentMonth = computed(() => monthNames[currentMonthIndex.value]);

	const daysInMonth = computed(() => {
		return getDaysInMonth(currentYear.value, currentMonthIndex.value);
	});

	const firstDayOfMonth = computed(() => {
		return new Date(currentYear.value, currentMonthIndex.value, 1).getDay();
	});

	// hari bulan kemarin dan depan
	const daysBeforeCurrentMonth = computed(() => {
		const daysBefore = (firstDayOfMonth.value + 6) % 7; // ngitung hari by senin
		const prevMonthDays = getDaysInMonth(currentYear.value, currentMonthIndex.value - 1);
		return Array.from({ length: daysBefore }).map((_, i) => prevMonthDays[prevMonthDays.length - daysBefore + i]);
	});

	const daysAfterCurrentMonth = computed(() => {
		const totalDaysDisplayed = daysBeforeCurrentMonth.value.length + daysInMonth.value.length;
		const remainingSpaces = totalDaysDisplayed % 7 === 0 ? 0 : 7 - (totalDaysDisplayed % 7);
		return Array.from({ length: remainingSpaces }).map((_, i) => i + 1);
	});

	// ngitung hari
	function getDaysInMonth(year, month) {
		return Array.from({ length: new Date(year, month + 1, 0).getDate() }, (_, i) => i + 1);
	}

	const getDayClasses = (day) => {
		return day === selectedDate.value.getDate() ? props.activeDayClass : props.inactiveDayClass;
	};

	const getMonthClasses = (index) => {
		return index === currentMonthIndex.value ? props.activeMonthYearClass : props.inactiveMonthYearClass;
	};

	const getYearClasses = (year) => {
		return year === currentYear.value ? props.activeMonthYearClass : props.inactiveMonthYearClass;
	};

	// Date selection methods
	const selectDay = (day) => {
		selectedDate.value = new Date(currentYear.value, currentMonthIndex.value, day);
		formattedDate.value = format(selectedDate.value, props.format, { locale: id });
		showDatePicker.value = false;
		emit("blur", false);
	};

	watch([selectedDate, currentMonthIndex, currentYear], () => {
		formattedDate.value = format(selectedDate.value, props.format, { locale: id });
		emit("update:modelValue", format(selectedDate.value, "yyyy-MM-dd", { locale: id }));
		emit("blur", false);
	});

	const previousMonth = () => {
		if (currentMonthIndex.value === 0) {
			currentMonthIndex.value = 11;
			currentYear.value -= 1;
		} else {
			currentMonthIndex.value -= 1;
		}
	};

	watch(
		() => props.value,
		(newValue) => {
			if (newValue) {
				const newDate = new Date(newValue);
				if (!isNaN(newDate)) {
					selectedDate.value = newDate;
					formattedDate.value = format(newDate, props.format, { locale: id });
				}
			}
		},
		{ immediate: true } // Trigger this watch immediately to handle initial values
	);

	const nextMonth = () => {
		if (currentMonthIndex.value === 11) {
			currentMonthIndex.value = 0;
			currentYear.value += 1;
		} else {
			currentMonthIndex.value += 1;
		}
	};

	const selectMonth = (index) => {
		currentMonthIndex.value = index;
		openDatePicker();
	};

	const selectYear = (year) => {
		currentYear.value = year;
		openDatePicker();
	};

	const openDatePicker = () => {
		showDatePicker.value = true;
		showMonthYearSelector.value = false;
		emit("focus", true);
	};

	const toggleMonthYearSelector = () => {
		showMonthYearSelector.value = !showMonthYearSelector.value;
		showDatePicker.value = !showMonthYearSelector.value;
	};

	const monthScroll = ref(null);
	const yearScroll = ref(null);

	onMounted(() => {
		if (monthScroll.value && yearScroll.value) {
			const monthIndex = currentMonthIndex.value;
			const yearIndex = years.indexOf(currentYear.value);

			// center bulan
			monthScroll.value.scrollTop = monthIndex * 30 - 60;

			// center taun
			yearScroll.value.scrollTop = yearIndex * 30 - 60;
		}
		// formattedDate.value = props.value ? format(props.value, props.format, { locale: id }) : null;
		// emit("update:modelValue", format(props.value, "yyyy-MM-dd", { locale: id }));
		document.addEventListener("click", handleClickOutsideDatePicker);
	});

	const handleClickOutsideDatePicker = (event) => {
		if (datePickerWrapper.value && !datePickerWrapper.value.contains(event.target)) {
			showDatePicker.value = false;
			showMonthYearSelector.value = false;
			emit("blur", false);
		}
	};

	onBeforeUnmount(() => {
		document.removeEventListener("click", handleClickOutsideDatePicker);
	});
</script>

<style scoped>
	.h-60 {
		height: 15rem;
	}
</style>
