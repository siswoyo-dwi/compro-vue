<template>
  <div class="container mx-auto px-4 py-10">
    <div v-if="project" class="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <!-- Gambar Proyek -->
      <img :src="project.foto" alt="Project Image" class="w-full h-60 object-cover rounded-md mb-6">

      <!-- Judul dan Kategori -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-3xl font-bold mb-2">{{ project.portfolio }}</h1>
          <p class="text-sm text-gray-500">Kategori: {{ categoryName }}</p>
        </div>
        <!-- Tombol Kembali (Sejajar dengan Kategori) -->
        <router-link :to="`/portfolio/kategori/${project.kategori_id}`" class="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Kembali ke Daftar Proyek
        </router-link>
      </div>

      <!-- Deskripsi Proyek -->
      <p class="text-lg text-gray-700 mb-6">{{ project.description }}</p>

      <!-- Teknologi yang Digunakan -->
      <div class="mb-6">
        <h3 class="text-xl font-semibold mb-2">Teknologi:</h3>
        <ul class="list-disc list-inside">
          <li v-for="tech in project.technologies" :key="tech">{{ tech }}</li>
        </ul>
      </div>
    </div>

    <!-- Jika Data Tidak Ditemukan -->
    <div v-else class="text-center text-red-500">
      <h2 class="text-xl font-semibold">Proyek tidak ditemukan.</h2>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

// Data Proyek Dummy
const projects = ref([
    { id: 1, kategori_id: 1, portfolio: "SIMRS", foto: "https://fosan.id/images/fosanlogo.png"   ,    technologies: ['Vue.js', 'PostgreSQL', 'Node.js']},
    { id: 2, kategori_id: 1, portfolio: "OSBOND GYM", foto: "https://fosan.id/images/fosanlogo.png" ,    technologies: ['Vue.js', 'PostgreSQL', 'Node.js']},
    { id: 3, kategori_id: 2, portfolio: "BPSDM", foto: "https://fosan.id/images/fosanlogo.png" ,    technologies: ['Vue.js', 'PostgreSQL', 'Node.js']},
    { id: 4, kategori_id: 2, portfolio: "Poltekkes KEMENKES Semarang", foto: "https://fosan.id/images/fosanlogo.png" ,    technologies: ['Vue.js', 'PostgreSQL', 'Node.js']},
    { id: 5, kategori_id: 3, portfolio: "MD CLINIC", foto: "https://fosan.id/images/fosanlogo.png" ,    technologies: ['Vue.js', 'PostgreSQL', 'Node.js']},
    { id: 6, kategori_id: 3, portfolio: "BAJ", foto: "https://fosan.id/images/fosanlogo.png" ,    technologies: ['Vue.js', 'PostgreSQL', 'Node.js']}, 
]);

// Data Kategori Dummy
const categories = ref([
    { id: 1, kategori: 'Kesehatan', foto: 'https://fosan.id/images/fosanlogo.png' },
    { id: 2, kategori: 'Edukasi', foto: 'https://fosan.id/images/fosanlogo.png' },
    { id: 3, kategori: 'WMS', foto: 'https://fosan.id/images/fosanlogo.png' }
]);

// Ambil parameter dari URL
const route = useRoute();
const projectId = parseInt(route.params.id);

// Cari proyek berdasarkan ID
const project = computed(() => projects.value.find(p => p.id === projectId));

// Cari nama kategori berdasarkan kategori_id proyek
const categoryName = computed(() => {
  const category = categories.value.find(c => c.id === project.value?.kategori_id);
  return category ? category.kategori : 'Kategori Tidak Ditemukan';
});
</script>
<style>
.container{
  margin-top: 70px;
}
</style>