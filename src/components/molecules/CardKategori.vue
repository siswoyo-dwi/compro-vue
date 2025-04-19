<template>
  <div class="container mx-auto px-6 py-10">
    <!-- Flexbox untuk item agar semua tampil dalam satu baris -->
    <div class="flex space-x-6 overflow-x-auto">
      <RouterLink 
        :to="`/portfolio/kategori/${item.id}`"  
        v-for="(item, index) in categories" 
        :key="index" 
        class="relative w-80 h-48 p-5 border border-gray-300 rounded-lg shadow-lg bg-white">
        
        <!-- Title di pojok kiri atas -->
        <h3 class="absolute top-2 left-2 text-lg font-bold"> {{ item.kategori }}</h3>
        
        <!-- Tombol check di pojok kanan bawah -->
        <button class="absolute bottom-2 right-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          ✔️ CHECK
        </button>
        
      </RouterLink>
    </div>
  </div>
</template>
<script setup>
// Props
defineProps({
  categories: {
  type: Array,
  required: true
}
});
</script>