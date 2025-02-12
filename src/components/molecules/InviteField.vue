<template>
	<div
		:class="computedClasses"
		ref="inviteWrapper">
		<div
			v-if="label"
			class="flex justify-between mb-1">
			<label
				:for="label"
				:class="labelComputedClasses">
				{{ label }}
				<span
					v-if="required"
					class="text-required"
					>*</span
				>
			</label>
			<div v-if="labelInfo">{{ labelInfo }}</div>
		</div>

		<div :class="inputComputedClasses">
			<slot name="affix"></slot>

			<Input
				ref="inputRef"
				:class="'rounded-md py-2 px-4 bg-white'"
				:type="type"
				:name="name"
				:placeholder="placeholder"
				:value="value"
				:min="min"
				:max="max"
				:disabled="disabled"
				@focus="handleFocus"
				@blur="handleBlur"
				@keydown.enter="handleKeyPress"
				@update:modelValue="handleChange"
				:testID="testID" />
			<slot name="suffix"></slot>
		</div>
		<slot name="info"></slot>

		<p
			v-if="error"
			:class="['text-12-18 font-light mt-1', isError ? 'text-danger' : 'text-transparent']">
			{{ error ? error : "-" }}
		</p>
		<div
			v-if="showOptions && users.length"
			class="flex flex-col gap-2 absolute z-10 left-0 top-0 mt-20 w-full bg-white border border-border-default rounded-md py-4 px-3">
			<div class="flex flex-col max-h-52 overflow-y-scroll">
				<div
					v-for="(option, index) in users"
					:key="`option-${option.id}`"
					:class="'hover:bg-ghostprime'">
					<LineSeparator v-if="index !== 0" />
					<div :class="['p-2 cursor-pointer flex space-x-2 items-center hover:text-primary']">
						<div class="w-[100px]">
							<div
								v-if="option.avatar"
								class="flex justify-center">
								<img
									@errors="option.avatar = null"
									:src="option.avatar"
									alt="foto profil"
									class="size-[48px] rounded-full relative flex justify-center items-center object-cover" />
							</div>
							<div
								v-else
								class="flex justify-center">
								<div class="size-[48px] bg-semi rounded-full relative flex justify-center items-center">
									<p class="text-white text-[30px]">{{ option ? option.name[0].toUpperCase() : "U" }}</p>
								</div>
							</div>
						</div>
						<div class="flex flex-col">
							<Typography class="text-black text-16-24">{{ option.name }}</Typography>
							<Typography class="text-semi text-14-20">{{ option.email }}</Typography>
						</div>
						<div class="flex justify-end items-center w-full">
							<div>
								<CircleCheckIcon
									v-if="option.invited"
									:class="['size-[24px] stroke-1 cursor-pointer fill-primary']" />
								<UserPlusIcon
									@click="!option.invited ? selectUser(option) : isInvited()"
									v-else
									:class="['size-[24px] stroke-1 cursor-pointer fill-semi']" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { defineProps, defineEmits, ref, computed, reactive, watch, onMounted, onBeforeUnmount } from "vue";
	import invite from "../../axios/invite";
	import useToast from "../../store/toast";

	const props = defineProps({
		containerClassName: {
			type: String,
			default: "",
		},
		hideLabel: {
			type: Boolean,
			default: false,
		},
		type: {
			type: String,
			default: "text",
		},
		label: {
			type: String,
			default: undefined,
		},
		labelInfo: {
			type: [String, Object],
			default: undefined,
		},
		affix: {
			type: [String, Object],
			default: undefined,
		},
		suffix: {
			type: [String, Object],
			default: undefined,
		},
		info: {
			type: [String, Object],
			default: undefined,
		},
		required: {
			type: Boolean,
			default: false,
		},
		valid: {
			type: Boolean,
			default: false,
		},
		error: {
			type: String,
			default: undefined,
		},
		placeholder: {
			type: String,
			default: undefined,
		},
		value: {
			type: [String, Number],
			default: "",
		},
		onChange: Function,
		onFocus: Function,
		onBlur: Function,
		onEnter: Function,
		testID: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			default: undefined,
		},
		variant: {
			type: String,
			default: "default",
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		min: {
			type: [Number, String],
			default: undefined,
		},
		max: {
			type: [Number, String],
			default: undefined,
		},
		number: {
			type: Boolean,
			default: false,
		},
		room_code: {
			type: String,
			default: "",
		},
		invited: {
			type: Array,
			default: [],
		},
		cari: {
			type: Boolean,
			default: false,
		},
	});

	const emit = defineEmits(["focus", "blur", "update:modelValue", "invite", "failed"]);
	const inputRef = ref<HTMLInputElement | null>(null);
	const isFocus = ref(false);
	const users = ref<any>([]);
	const showOptions = ref(false);
	const toast = useToast();
	const inviteWrapper = ref();

	// const handleKeyPress = (e: KeyboardEvent) => {
	const handleKeyPress = (e: KeyboardEvent) => {
		if (e.key === "Enter" && props.onEnter) {
			props.onEnter();
		}
		getUser(props.value);
	};

	const handleFocus = () => {
		if (props.onFocus) props.onFocus();
		isFocus.value = true;
		showOptions.value = true;
		emit("focus", true);
	};

	const handleBlur = () => {
		if (props.onBlur) props.onBlur();
		isFocus.value = false;
		emit("blur", false);
	};

	const handleChange = (e: Event) => {
		emit("update:modelValue", e);
		if (props.onChange) {
			props.onChange(e);
		}
	};

	watch(
		() => props.cari,
		(newV, oldV) => {
			if (newV != oldV) {
				getUser(props.value);
			}
		}
	);

	const getUser = (key: any) => {
		users.value = [];
		invite
			.get("/account/list-user?search=" + key)
			.then((res) => {
				if (res.data.code == 200) {
					if (res.data.data.length) {
						users.value = res.data.data.map((i: any) => {
							console.log(i.id, props.invited);
							i.invited = props.invited.includes(i.id);
							return i;
						});
						emit("failed", false);
					} else {
						emit("failed", true);
					}
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const isInvited = () => {
		toast.error({
			text: "Undangan sudah dikirim untuk User ini",
		});
	};

	// https://seeu.ajari.app/rooms/sVe5vcGp

	const selectUser = (user: any) => {
		let x = { user_id: [user.id] };
		invite
			.post(`/instant-meeting/send-invitation/${props.room_code}`, JSON.stringify(x))
			.then((res) => {
				if (res.data.code == 200) {
					toast.success({
						text: "Undangan rapat berhasil dikirim",
					});
					emit("invite", user);
					getUser(props.value);
				}
			})
			.catch((err) => {
				console.log(err.message);
				toast.error({
					text: "Undangan rapat gagal dikirim",
				});
			});
	};

	const isError = computed(() => props.error && props.error !== "");

	const variants = reactive<any>({
		default: "bg-white p-4 rounded-2xl border border-black border-opacity-10",
		plain: "",
	});

	const labelComputedClasses = computed(() => ({
		"text-base": true,
		"text-primary": isFocus.value && !isError.value,
		"!text-valid": props.valid,
		"text-danger": isError.value,
		"text-transparent": props.hideLabel,
	}));

	const inputComputedClasses = computed(() => ({
		"relative flex rounded-md border border-[#D9D9D9] bg-white": true,
		"border-semiprime ring-semiprime ring-2": isFocus.value && !isError.value,
		"!border-valid": props.valid,
		"border-danger": isError.value,
		"!bg-gray-100": props.disabled,
	}));

	const computedClasses = computed(() => ["flex flex-col relative", variants[props.variant], props.containerClassName]);

	onMounted(() => {
		document.addEventListener("click", handleClickOutsideInvite);
	});

	const handleClickOutsideInvite = (event: any) => {
		if (inviteWrapper.value && !inviteWrapper.value.contains(event.target)) {
			showOptions.value = false;
		}
	};

	onBeforeUnmount(() => {
		document.removeEventListener("click", handleClickOutsideInvite);
	});
</script>

<style scoped>
	/* Add scoped styles here */
</style>
