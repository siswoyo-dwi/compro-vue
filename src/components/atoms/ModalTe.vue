<template>
	<div
		:data-testid="testID"
		v-if="isVisible"
		@click.self="closeBackdrop ? handleClose() : null"
		:class="containerStyles">
		<!-- Modal Content -->
		<div
			:class="modalComputedStyles"
			ref="menuRef"
			tabindex="0">
			<!-- Header Slot -->
			<div
				class="modal-header"
				v-if="$slots.header">
				<slot name="header"></slot>
			</div>
			<div
				v-else
				class="flex justify-between mb-2">
				<div class="font-bold px-3">
					{{ title }}
				</div>
				<button @click="handleClose">
					<img
						src="../../assets/images/x-circle.png"
						alt="close"
						width="18"
						height="18" />
				</button>
			</div>

			<!-- Body Slot -->
			<div
				class="max-h-[70vh]"
				:class="[childClassName, props.overflow ? 'overflow-y-auto' : '']">
				<slot></slot>
			</div>

			<!-- Footer Slot -->
			<div
				class="modal-footer"
				v-if="$slots.footer">
				<slot name="footer"></slot>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, defineProps, reactive, computed, onMounted, onBeforeUnmount } from "vue";

	const emit = defineEmits(["close"]);

	const menuRef = ref<HTMLElement | null>(null);
	const props = defineProps({
		visible: {
			type: Boolean,
			required: true,
			default: false,
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
			type: String as () => "center" | "right",
			default: "center",
		},
		closeBackdrop: {
			type: Boolean,
			default: true,
		},
		testID: {
			type: String,
			required: true,
		},
		size: {
			type: String as () => "sm" | "md" | "lg" | "full",
			default: "md",
		},
		title: {
			type: String,
			default: "",
		},
		overflow: {
			type: Boolean,
			default: true,
		},
	});

	const sizeClasses = {
		sm: "w-2/5",
		md: "w-3/5",
		lg: "w-4/5",
		full: "w-full",
	};

	const variants = reactive({
		top: {
			container: "flex items-start justify-center bg-black bg-opacity-10 backdrop-blur-[0.5px] !z-[9999]",
			modal: "bg-white rounded-lg shadow-lg p-2 mt-12",
		},
		center: {
			container: "flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-[0.5px]",
			modal: "bg-white rounded-lg shadow-lg p-2",
		},
		right: {
			container: "flex justify-end bg-black bg-opacity-50 backdrop-blur-[2px]",
			modal: "bg-white",
		},
	});

	const handleClose = () => {
		if (props.onClose) {
			props.onClose();
		} else {
			emit("close");
		}
	};

	const isVisible = computed(() => props.visible);

	const containerStyles = computed(() => ["fixed inset-0 z-50", variants[props.variant].container]);

	const modalComputedStyles = computed(() => [variants[props.variant].modal, sizeClasses[props.size], props.className]);

	const onEscPress = (event: KeyboardEvent) => {
		if (event.key === "Escape") {
			handleClose();
		}
	};

	onMounted(() => {
		document.addEventListener("keydown", onEscPress);
	});

	onBeforeUnmount(() => {
		document.removeEventListener("keydown", onEscPress);
	});
</script>

<style scoped>
	.modal-header {
		border-bottom: 1px solid #eaeaea;
	}

	.modal-footer {
		border-top: 1px solid #eaeaea;
		margin-top: 15px;
		padding-top: 15px;
		display: flex;
		justify-content: flex-end;
	}
</style>
