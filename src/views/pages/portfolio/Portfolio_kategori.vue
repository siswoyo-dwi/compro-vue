<template>
		<div class="bg-gradient-to-r from-gray-300 to-blue-50 dark:from-slate-900 dark:to-blue-800 flex justify-center items-center min-h-screen">
      <div class="flex  justify-center">
        <!-- <div v-for="item in categories" :key="item.id"  class="mx-4">
            <RouterLink v-if="item.kategori_id == route.params.id" :to="`/portfolio/detail/${item.id}`" class="block bg-white shadow-lg rounded-lg p-6 text-center transform transition-transform hover:scale-105">
              <div  class="flex justify-center">
                <img :src="item.foto" alt="" class="h-24 w-auto">
              </div>
              <h6 class="mt-4 text-gray-800 font-semibold">{{ item.portfolio }}</h6>
            </RouterLink>
        </div> -->
        <CardPortfolio :categories="item"/>

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
    const item = computed(() => {
    return categories.value.filter(cat => cat.kategori_id == route.params.id);
  });
  </script>
  
  <style scoped>

  </style>
  