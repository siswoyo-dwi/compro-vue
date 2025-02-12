<template>
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap justify-center">
        <div v-for="item in categories" :key="item.id" class="w-full sm:w-1/3 p-4">
          <a :href="`/portfolio/kategori/${item.id}`" class="block bg-white shadow-lg rounded-lg p-6 text-center transform transition-transform hover:scale-105">
            <div class="flex justify-center">
              <img :src="item.foto" alt="" class="h-24 w-auto">
            </div>
            <h6 class="mt-4 text-gray-800 font-semibold">{{ item.kategori }}</h6>
          </a>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
   const categories = ref([
          { id: 1, kategori: 'Kesehatan', foto: 'https://fosan.id/images/fosanlogo.png' },
          { id: 2, kategori: 'Edukasi', foto: 'https://fosan.id/images/fosanlogo.png' },
          { id: 3, kategori: 'WMS', foto: 'https://fosan.id/images/fosanlogo.png' }
        ])

  </script>
  
  <style scoped>

  </style>
  