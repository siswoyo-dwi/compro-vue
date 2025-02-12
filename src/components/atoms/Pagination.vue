<template>
  <ul :class="getClasses">
    <slot />
  </ul>
</template>

<script setup>
import { computed } from "vue";

// Props
const props = defineProps({
  color: {
    type: String,
    default: "success", // Could be 'success', 'danger', 'primary', etc.
  },
  size: {
    type: String,
    default: "md", // Could be 'sm', 'md', or 'lg'
  },
});

// Computed classes based on props
const getClasses = computed(() => {
  const colorClass = getColorClass(props.color);
  const sizeClass = getSizeClass(props.size);
  return `flex items-center space-x-2 ${colorClass} ${sizeClass}`;
});

// Helper functions to determine Tailwind classes
function getColorClass(color) {
  switch (color) {
    case "success":
      return "text-green-500";
    case "danger":
      return "text-red-500";
    case "primary":
      return "text-blue-500";
    default:
      return "text-gray-500";
  }
}

function getSizeClass(size) {
  switch (size) {
    case "sm":
      return "text-sm";
    case "lg":
      return "text-lg";
    default:
      return "text-md";
  }
}
</script>

<style scoped>
/* No custom styles needed since we're using TailwindCSS */
</style>
