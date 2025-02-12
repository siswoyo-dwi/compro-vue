<template>
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap justify-center">
        <div v-for="item in item" :key="item.id" class="w-full sm:w-1/3 p-4">
          <a :href="`/portfolio/detail/${item.id}`" class="block bg-white shadow-lg rounded-lg p-6 text-center transform transition-transform hover:scale-105">
            <div class="flex justify-center">
              <img :src="item.foto" alt="" class="h-24 w-auto">
            </div>
            <h6 class="mt-4 text-gray-800 font-semibold">{{ item.portfolio }}</h6>
          </a>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  import { useRoute } from "vue-router";
  
  const route = useRoute(); // Akses route params
  
  const categories = ref([
    { id: 1, kategori_id: 1, portfolio: "SIMRS", foto: "https://fosan.id/images/fosanlogo.png" },
    { id: 2, kategori_id: 1, portfolio: "OSBOND GYM", foto: "https://fosan.id/images/fosanlogo.png" },
    { id: 3, kategori_id: 2, portfolio: "BPSDM", foto: "https://fosan.id/images/fosanlogo.png" },
    { id: 4, kategori_id: 2, portfolio: "Poltekkes KEMENKES Semarang", foto: "https://fosan.id/images/fosanlogo.png" },
    { id: 5, kategori_id: 3, portfolio: "MD CLINIC", foto: "https://fosan.id/images/fosanlogo.png" },
    { id: 6, kategori_id: 3, portfolio: "BAJ", foto: "https://fosan.id/images/fosanlogo.png" },
  ]);
  
  // Filter kategori berdasarkan route params
  const item = computed(() => {
    return categories.value.filter(cat => cat.kategori_id == route.params.id);
  });
  </script>
  
  <style scoped>

  </style>
  