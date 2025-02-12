<template>
	<div class="relative">
		<InputField
			ref="inputRef"
			testID="password-input"
			:variant="variant"
			:label="label"
			:required="required"
			:type="showPassword ? 'text' : 'password'"
			:placeholder="placeholder"
			:value="value"
			:error="error"
			@focus="handleFocus"
			@blur="handleBlur"
			@update:modelValue="handleChange($event)">
			<template #suffix>
				<button
					type="button"
					class="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
					@click="toggleShowPassword">
					<component
						:is="showPassword ? 'EyeSlashIcon' : 'EyeIcon'"
						alt="show-password"
						:class="['size-[16px]', showPassword ? 'fill-[#868D9D]' : 'fill-[#3E424B]']" />
				</button>
			</template>
		</InputField>
		<div
			v-if="showInfo && isFocused"
			class="absolute z-10 bg-white border border-border-default p-4 flex flex-col gap-2 rounded-md shadow">
			<Typography class="font-medium"> Kata sandi harus berisi: </Typography>
			<Info
				:label="'Minimal 8 karakter (maks. 20)'"
				:value="isValidChar(value)" />
			<Info
				:label="'Minimal 1 angka & huruf besar'"
				:value="isValidNumberAndCapital(value)" />
			<Info
				:label="'Minimal 1 karakter khusus'"
				:value="isValidSpecialChar(value)" />
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent, ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
	import InputField from "./InputField.vue";
	import Typography from "../atoms/Typography.vue";
	import Info from "./Info.vue";

	export default defineComponent({
		name: "PasswordInput",
		components: {
			InputField,
			Typography,
			Info,
		},
		props: {
			label: String,
			error: String,
			variant: {
				type: String,
				default: "default",
			},
			required: {
				type: Boolean,
				default: false,
			},
			placeholder: String,
			value: { type: [String, Number], default: "" },
			onChange: {
				type: Function,
			},
			onFocus: {
				type: Function,
			},
			onBlur: {
				type: Function,
			},
			onEnter: {
				type: Function,
			},
			showInfo: {
				type: Boolean,
				default: false,
			},
		},
		setup(props, { emit }) {
			const showPassword = ref(false);
			const isFocused = ref(false);
			const inputRef = ref<HTMLInputElement | null>(null);
			const values = ref(null);

			const toggleShowPassword = () => {
				showPassword.value = !showPassword.value;
			};

			const handleFocus = () => {
				if (props.onFocus) props.onFocus();
				isFocused.value = true;
				emit("focus", true);
			};

			const handleBlur = () => {
				if (props.onBlur) props.onBlur();
				isFocused.value = false;
				emit("blur", false);
			};

			const isError = computed(() => props.error && props.error !== "");

			const handleChange = (e: any) => {
				values.value = e;
				emit("update:modelValue", e);
				// const target = e.target as HTMLInputElement;

				// if (props.number && !/^\d*$/.test(target.value)) {
				// 	return;
				// }
				// if (props.onChange) {
				// 	console.log(target.value);

				// 	props.onChange(e as InputEvent);
				// }
			};

			watch(
				() => props.value,
				(newValue) => {
					if (props.onChange) {
						emit("update:modelValue", newValue);
					}
				}
			);

			onMounted(() => {
				// if (props.showInfo && inputRef.value) {
				//   console.log(inputRef.value)
				// 	inputRef.value.addEventListener("onFocus", handleFocus);
				// 	inputRef.value.addEventListener("blur", handleBlur);
				// }
			});

			onBeforeUnmount(() => {
				// if (props.showInfo && inputRef.value) {
				// 	inputRef.value.removeEventListener("focus", handleFocus);
				// 	inputRef.value.removeEventListener("blur", handleBlur);
				// }
			});

			const isValidChar = (input: any) => {
				return input ? /^(.{8,20})$/.test(input) : false;
			};
			const isValidNumberAndCapital = (input: any) => {
				return input ? /^(?=.*\d)(?=.*[A-Z]).+$/.test(input) : false;
			};
			const isValidSpecialChar = (input: any) => {
				return input ? /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(input) : false;
			};

			return {
				showPassword,
				isFocused,
				inputRef,
				toggleShowPassword,
				isValidChar,
				isValidNumberAndCapital,
				isValidSpecialChar,
				handleFocus,
				handleBlur,
				handleChange,
				isError,
				values,
			};
		},
	});
</script>

<style scoped>
	/* Add your styles here if needed */
</style>
