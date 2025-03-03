<template>
		<div :class="arrayClass+'  flex justify-center items-center min-h-screen'">
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
import osbond from '../../../components/images/Osbond Gym.jpg';
import simpus from '../../../components/images/SIMPUS.jpg';
import simrs from '../../../components/images/SIMRS1.jpg';

  const route = useRoute(); // Akses route params
  
  const categories = ref([
    // { id: 1, kategori_id: 1, portfolio: "Sistem Informasi Rumah Sakit (SIMRS)", foto: "https://fosan.id/images/fosanlogo.png" },
    // { id: 2, kategori_id: 1, portfolio: "OSBOND GYM", foto: "https://fosan.id/images/fosanlogo.png" },
    // { id: 3, kategori_id: 1, portfolio: "Sistem Informasi Manajemen Puskesmas (SIMPUS)", foto: "https://fosan.id/images/fosanlogo.png" },
    // { id: 4, kategori_id: 2, portfolio: "BPSDM", foto: "https://fosan.id/images/fosanlogo.png" },
    // { id: 5, kategori_id: 2, portfolio: "Poltekkes KEMENKES Semarang", foto: "https://fosan.id/images/fosanlogo.png" },
    // { id: 6, kategori_id: 3, portfolio: "MD CLINIC", foto: "https://fosan.id/images/fosanlogo.png" },
    // { id: 7, kategori_id: 3, portfolio: "BAJ", foto: "https://fosan.id/images/fosanlogo.png" },
    { id: 13, kategori_id: 1, portfolio: "OSBOND GYM", foto:osbond},
    { id: 1, kategori_id: 1, portfolio: "Sistem Informasi Manajemen Puskesmas (SIMPUS)", foto: simpus },
    { id: 2, kategori_id: 1, portfolio: "Sistem Informasi Rumah Sakit (SIMRS)", foto: simrs },
    { id: 3, kategori_id: 2, portfolio: "BPSDM", foto: "https://fosan.id/images/fosanlogo.png" },
    { id: 4, kategori_id: 2, portfolio: "Poltekkes KEMENKES Semarang", foto: "https://fosan.id/images/fosanlogo.png" },
    { id: 5, kategori_id: 3, portfolio: "Manfaat [Penjualan Tepung]", foto: "https://fosan.id/images/fosanlogo.png" },
    { id: 6, kategori_id: 3, portfolio: "Warehouse Management System Bahtera Adi Jaya", foto: "https://fosan.id/images/fosanlogo.png" },
    { id: 7, kategori_id: 4, portfolio: "ERP Solutions", foto: "https://fosan.id/images/fosanlogo.png" },
    { id: 8, kategori_id: 4, portfolio: "CRM Solutions", foto: "https://fosan.id/images/fosanlogo.png" },
    { id: 9, kategori_id: 4, portfolio: "Corporate Finance Solutions", foto: "https://fosan.id/images/fosanlogo.png" },
    { id: 10, kategori_id: 4, portfolio: "HR Management Solutions", foto: "https://fosan.id/images/fosanlogo.png" },
    { id: 11, kategori_id: 4, portfolio: "Project Management Solutions", foto: "https://fosan.id/images/fosanlogo.png" },
    { id: 12, kategori_id: 4, portfolio: "Document Management Solutions", foto: "https://fosan.id/images/fosanlogo.png" },

  ]);
    const item = computed(() => {
    return categories.value.filter(cat => cat.kategori_id == route.params.id);
  });
    const arrayClass = computed(() => item.value.length > 4 ? 'more-than-four' : '');
  </script>
  
  <style scoped>
    .more-than-four {
      margin-top: 150px; 
    }
  </style>
  