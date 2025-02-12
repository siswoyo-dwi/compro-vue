<template>
	<div
		v-if="visible"
		@click="closeBackdrop ? handleClickOutside : ''"
		:class="containerStyles">
		<div
			:class="modalStyles"
			ref="menuRef">
			<div
				v-if="!plain"
				class="flex justify-end">
				<button @click="close()">
					<img
						src="../../assets/images/x-circle.png"
						alt="close"
						width="18"
						height="18" />
				</button>
			</div>
			<div :class="childClassName">
				<slot />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, defineProps, reactive, computed, onMounted, onUnmounted } from "vue";

	const emit = defineEmits(["close"]);
	const menuRef = ref();
	const props = defineProps({
		visible: {
			type: Boolean,
			required: true,
		},
		onClose: {
			type: Function,
		},
		plain: {
			type: Boolean,
			default: false,
		},
		className: {
			type: String,
			default: "",
		},
		childClassName: {
			type: String,
			default: "",
		},
		variant: {
			type: String as () => "center" | "right" | "top",
			default: "center",
		},
		closeBackdrop: {
			type: Boolean,
			default: true,
		},
	});

	const variants = reactive({
		top: {
			container: "flex items-start justify-center bg-black bg-opacity-10 z-10 backdrop-blur-[0.5px]",
			modal: "bg-white rounded-lg shadow-lg p-2 max-w-lg w-full mt-12",
		},
		center: {
			container: "flex items-center justify-center bg-black bg-opacity-10 z-10 backdrop-blur-[0.5px]",
			modal: "bg-white rounded-lg shadow-lg p-2 max-w-lg w-full",
		},
		right: {
			container: "flex justify-end bg-black bg-opacity-50 backdrop-blur-[2px]",
			modal: "bg-white min-w-[25%]",
		},
	});

	const close = () => {
		emit("close");
	};

	const containerStyles = computed(() => {
		return ["fixed inset-0 !z-[2147483647]", variants[props.variant].container];
	});

	const modalStyles = computed(() => {
		return [variants[props.variant].modal, props.className];
	});

	const handleClickOutside = (event: any) => {
		if (menuRef.value && !menuRef.value.contains(event.target)) {
			emit("close");
		}
	};
	onMounted(() => {
		document.addEventListener("mousedown", handleClickOutside);
	});

	onUnmounted(() => {
		document.removeEventListener("mousedown", handleClickOutside);
	});
</script>

<style scoped>
</style>
