<template>
	<Modals
		:closeBackdrop="false"
		:visible="visible"
		variant="center"
		className="w-[419px] h-[528px]"
		@close="close()">
		<div class="flex flex-col space-y-4 text-start text-poppins p-4">
			<Typography
				variant="paragraph"
				class="text-24-30"
				>Ubah Kata Sandi</Typography
			>
			<Typography
				variant="lead"
				class="text-14-21 text-semi"
				>Masukkan kata sandi saat ini, lalu buat kata sandi baru untuk memperbarui akun Anda.</Typography
			>
			<div class="flex flex-col justify-center">
				<div class="">
					<PasswordInput
						variant="plain"
						label="Kata Sandi Saat Ini"
						required
						@blur="v$.password_lama.$touch()"
						:error="v$.password_lama.$invalid ? (v$.password_lama.$errors.length ? v$.password_lama.$errors[0].$message : null) : null"
						:value="form.password_lama"
						placeholder="Masukan Kata Sandi Saat Ini"
						v-model="form.password_lama" />
					<div class="flex justify-end mb-4">
						<div
							@click="$router.push('/lupa_password')"
							class="text-sm text-primary hover:text-primary text-md cursor-pointer">
							Lupa kata Sandi?
						</div>
					</div>
				</div>
				<div>
					<PasswordInput
						showInfo
						variant="plain"
						label="Kata Sandi Baru"
						required
						@blur="v$.password_baru.$touch()"
						:error="v$.password_baru.$invalid ? (v$.password_baru.$errors.length ? v$.password_baru.$errors[0].$message : null) : null"
						:value="form.password_baru"
						placeholder="Masukan Kata Sandi Baru"
						v-model="form.password_baru" />
				</div>
				<div>
					<PasswordInput
						showInfo
						variant="plain"
						label="Konfirmasi Ulang Kata Sandi Baru"
						required
						@blur="v$.new_konfirm_password.$touch()"
						:error="v$.new_konfirm_password.$invalid ? (v$.new_konfirm_password.$errors.length ? v$.new_konfirm_password.$errors[0].$message : null) : null"
						:value="form.new_konfirm_password"
						placeholder="Konfirmasi Ulang Kata Sandi Baru"
						v-model="form.new_konfirm_password" />
				</div>
			</div>
			<Button
				:disabled="!isValid"
				@click="changePassword()"
				>Simpan Perubahan</Button
			>
		</div>
	</Modals>
</template>

<script setup lang="ts">
	import { defineProps, defineEmits, computed, reactive, onMounted } from "vue";
	import { useVuelidate } from "@vuelidate/core";
	import { required, helpers, sameAs } from "@vuelidate/validators";
	import Typography from "../atoms/Typography.vue";
	import ip from "../../axios/axios";
	import { useRouter } from "vue-router";
	import { useStore } from "../../store/monev";
	import useToast from "../../store/toast";
	import useLoading from "../../store/loading";

	const emit = defineEmits(["close"]);
	const props = defineProps({
		visible: {
			type: Boolean,
			required: true,
		},
	});

	const store = useStore();
	const router = useRouter();
	const toast = useToast();
	const loading = useLoading();
	const axios = ip;
	const close = () => {
		emit("close");
	};

	const form = reactive({
		password_lama: "",
		password_baru: "",
		new_konfirm_password: "",
	});

	const rules = computed(() => ({
		password_lama: {
			required: helpers.withMessage("Masukan Kata Sandi Saat Ini", required),
			// checkPassword: helpers.withMessage("Kata sandi belum memenuhi persyaratan", () => {
			// 	return /^(.{8,20})$/.test(form.password_lama) && /^(?=.*\d)(?=.*[A-Z]).+$/.test(form.password_lama) && /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(form.password_lama);
			// }),
			$lazy: true,
		},
		password_baru: {
			required: helpers.withMessage("Masukan Kata Sandi Baru", required),
			checkPassword: helpers.withMessage("Kata sandi belum memenuhi persyaratan", () => {
				return /^(.{8,20})$/.test(form.password_baru) && /^(?=.*\d)(?=.*[A-Z]).+$/.test(form.password_baru) && /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(form.password_baru);
			}),
			$lazy: true,
		},
		new_konfirm_password: {
			required: helpers.withMessage("Masukkan Konfimasi Ulang Kata Sandi", required),
			sameAs: helpers.withMessage("Kata sandi tidak cocok, harap periksa kembali.", sameAs(form.password_baru)),
			checkPassword: helpers.withMessage("Kata sandi belum memenuhi persyaratan", () => {
				return /^(.{8,20})$/.test(form.new_konfirm_password) && /^(?=.*\d)(?=.*[A-Z]).+$/.test(form.new_konfirm_password) && /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(form.new_konfirm_password);
			}),
			$lazy: true,
		},
	}));
	const v$ = useVuelidate(rules, form);

	const isValid = computed(() => {
		return !v$.value.$invalid;
	});

	onMounted(() => {});

	const changePassword = async () => {
		v$.value.$touch();
		if (isValid.value) {
			try {
				const users = store.user ? store.user : { id: 1 };
				loading.show();
				const register = await axios.post("/user/change_password", {
					id: users.id,
					password_lama: form.password_lama,
					password_baru: form.password_baru,
				});
				if (register.data.status == 200) {
					toast.success({
						text: "Berhasil Mengubah Kata Sandi",
					});
					store.clear_token();
					setTimeout(() => {
						router.push("/login");
						loading.hide();
					}, 2000);
				}
			} catch (err: any) {
				loading.hide();
				toast.error({
					text: "Gagal Mengubah Kata Sandi",
				});
				console.log(err);
			}
		}
	};
</script>

<style lang="scss" scoped></style>
