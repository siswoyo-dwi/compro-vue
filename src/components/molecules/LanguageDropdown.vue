<template>
    <div class="relative w-40" @click="toggleDropdown">
      <!-- Tampilan bahasa terpilih -->
      <div class="flex items-center gap-2 p-2 border rounded text-black bg-white cursor-pointer">
        <img :src="selectedOption.url" class="w-5 h-4" />
        <span>{{ selectedOption.label }}</span>
      </div>
  
      <!-- Dropdown list -->
      <div v-if="isOpen" class="absolute mt-1 w-full bg-white border rounded shadow-lg z-10">
        <div
          v-for="option in options"
          :key="option.value"
          @click.stop="selectOption(option)"
          class="p-2 hover:bg-gray-100 flex items-center text-black gap-2 cursor-pointer"
        >
          <img :src="option.url" class="w-5 h-4" />
          <span>{{ option.label }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue'
  
  // v-model setup
  const props = defineProps({
    modelValue: String
  })
  const emit = defineEmits(['update:modelValue'])
  
  const isOpen = ref(false)
  const options = [
    { value: 'en', label: 'English', url: 'https://flagcdn.com/w40/gb.png' },
    { value: 'id', label: 'Bahasa', url: 'https://flagcdn.com/w40/id.png' },
  ]
  
  const selectedOption = computed(() => {
    return options.find(opt => opt.value === props.modelValue) || options[0]
  })
  
  const toggleDropdown = () => {
    isOpen.value = !isOpen.value
  }
  
  const selectOption = (option) => {
    emit('update:modelValue', option.value)
    isOpen.value = false
  }
  </script>
  