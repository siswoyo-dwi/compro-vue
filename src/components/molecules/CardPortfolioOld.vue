<template>
  <div class="container mx-auto px-6 py-10">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <RouterLink 
        :to="`/portfolio/detail/${item.id}`" 
        v-for="(item, index) in categories" 
        :key="index" 
        class="group relative bg-white border rounded-lg shadow-sm hover:shadow-md transition-transform duration-300 hover:scale-105 flex flex-col"
      >
        <!-- Gambar (1/2 bagian atas) -->
        <div class="w-full h-[200px] overflow-hidden rounded-t-lg">
          <img :src="item.foto" :alt="item.portfolio" class="w-full h-full object-cover">
        </div>

        <!-- Teks dan tombol (1/2 bagian bawah) -->
        <div class="flex-1 flex flex-col justify-between p-6">
          <!-- Judul dan Deskripsi -->
          <div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">{{ item.portfolio }}</h3>
            <p class="text-sm text-gray-600">{{ item.description }}</p>
          </div>

          <!-- Tombol dengan efek transisi -->
          <button class="w-fit px-6 py-2 border-2 border-blue-500 text-blue-500 rounded-lg transition-all duration-300 hover:bg-blue-500 hover:text-white mt-4">
            Read More
          </button>
        </div>

        <!-- Hover effect (garis biru di bawah) -->
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