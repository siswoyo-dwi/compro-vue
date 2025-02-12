<template>
  <div class="absolute border top-10 bg-white p-2 rounded-lg max-w-62 max-h-32 overflow-auto" v-if="show">
    <ul>
      <li v-for="(device, index) in dataList" :key="device[keyValue]" class="hover:bg-gray-300 p-1 rounded-md cursor-pointer" @click="handleClick(index)">{{ device[label] || '-' }}</li>
    </ul>
  </div>
</template>

<script setup>
import { computed, defineEmits } from 'vue';

const props = defineProps({
  show: Boolean,
  dataList: Array,
  keyValue: String,
  label: String,
  iconClass: String,
});

const emit = defineEmits([
  'update:modelValue',
  'toogle',
]);

const handleClick = (index) => {
  emit('update:modelValue', props.dataList[index][props.keyValue]);
}

const handleToogle = () => {
  emit('toogle');
}
</script>