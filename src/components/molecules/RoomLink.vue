<template>
	<div
		v-if="!showInput"
		class="relative">
		<div
			class="font-medium placeholder-[#868D9D] border-[1px] border-shade placeholder-opacity-50 focus:ring-1 ring-offset-1 text-black rounded-md py-2 px-4 bg-white left-0 pr-10 pl-2 top-0 flex items-center w-full overflow-hidden text-ellipsis whitespace-nowrap bg-transparent cursor-pointer"
			@click="focusInput()">
			<span class="pl-2 overflow-hidden text-ellipsis whitespace-nowrap bg-transparent">{{ link }}</span>
		</div>
		<span
			v-if="iscopied"
			@click="copyLink()"
			class="absolute inset-y-0 right-0 pr-2 top-[5%] flex items-center">
			<CircleCheckIcon :class="['size-5 stroke-1 cursor-pointer', iscopied ? 'fill-primary' : 'fill-semi ']" />
		</span>
		<span
			v-else
			@click="copyLink()"
			class="absolute inset-y-0 right-0 pr-2 top-[5%] flex items-center">
			<CopyIcon :class="['size-5 stroke-1 cursor-pointer', iscopied ? 'fill-primary' : 'fill-semi ']" />
		</span>
	</div>

	<div
		v-else
		class="relative">
		<InputFieldTime
			ref="kode_input"
			testID="kode-input"
			variant="plain"
			required
			placeholder="Link Meeting"
			:value="link" />
		<span
			v-if="iscopied"
			@click="copyLink()"
			class="absolute inset-y-0 right-0 pr-2 top-[5%] flex items-center">
			<CircleCheckIcon :class="['size-5 stroke-1 cursor-pointer', iscopied ? 'fill-primary' : 'fill-semi ']" />
		</span>
		<span
			v-else
			@click="copyLink()"
			class="absolute inset-y-0 right-0 pr-2 top-[5%] flex items-center">
			<CopyIcon :class="['size-5 stroke-1 cursor-pointer', iscopied ? 'fill-primary' : 'fill-semi ']" />
		</span>
	</div>
</template>

<script setup>
	import { ref, watch, nextTick } from "vue";
	import useToast from "../../store/toast";

	const props = defineProps({
		link: {
			type: String,
			required: true,
		},
	});

	const kode_input = ref(null);
	const showInput = ref(false);
	const iscopied = ref(false);
	const toast = useToast();

	const focusInput = async () => {
		showInput.value = true;
		await nextTick();
		const inputEl = kode_input.value?.$el?.querySelector("input") || kode_input.value;
		inputEl?.focus();
	};

	watch(
		() => props.link,
		(newV) => {
			showInput.value = newV.length <= 50;
		}
	);

	const copyLink = () => {
		navigator.clipboard.writeText(props.link);
		iscopied.value = true;
		toast.success({ text: "Link Rapat Berhasil di Copy" });

		setTimeout(() => (iscopied.value = false), 5000);
	};
</script>

<style lang="scss" scoped></style>
