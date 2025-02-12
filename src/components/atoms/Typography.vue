<template>
	<component
		:is="tagName"
		:class="computedClassName">
		<slot></slot>
	</component>
</template>

<script setup>
	import { computed } from "vue";

	const props = defineProps({
		class: {
			type: String,
			default: "",
		},
		variant: {
			type: String,
			default: "lead",
			validator: (value) => ["h1", "h2", "h3", "h4", "h5", "h6", "lead", "paragraph", "paragraph-xs", "paragraph-xxs"].includes(value),
		},
	});

	const headingElements = ["h1", "h2", "h3", "h4", "h5", "h6"];
	const typographiesClassName = {
		h1: "heading1",
		h2: "heading2",
		h3: "heading3",
		h4: "heading4",
		h5: "heading5",
		h6: "heading6",
		lead: "lead",
		paragraph: "paragraph",
		"paragraph-xs": "paragraph-xs",
		"paragraph-xxs": "paragraph-xxs",
	};

	const tagName = computed(() => (headingElements.includes(props.variant) ? props.variant : "p"));
	const computedClassName = computed(() => `base-font ${typographiesClassName[props.variant]} ${props.class}`);
</script>
