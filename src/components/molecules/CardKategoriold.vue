<template>
  <div class="container mx-auto px-6 py-10">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <RouterLink 
        :to="`/portfolio/kategori/${item.id}`"  
        v-for="(item, index) in categories" 
        :key="index" 
        class="group relative bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition"
      >
        <!-- Ikon -->
        <div class="flex justify-center">
          <img :src="item.foto" :alt="item.kategori" class="w-full h-52 object-cover transition-transform duration-300 hover:scale-110">
        </div>
        <!-- Judul (tombol di tengah) -->
        <div class="flex justify-center mt-4">
          <Button class="text-lg font-semibold text-gray-700">
            {{ item.kategori }}
          </Button>
        </div>
        <!-- Hover effect -->
        <div class="absolute bottom-0 left-0 w-full h-1 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
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