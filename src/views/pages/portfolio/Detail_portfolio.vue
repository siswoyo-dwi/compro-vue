<template>
  <div class="bg-gradient-to-r from-gray-300 to-blue-50 dark:from-slate-900 dark:to-blue-800 flex justify-center items-start min-h-screen pt-20">
    <div v-if="project" class="w-full sm:w-3/5 lg:w-2/5 mx-auto bg-white shadow-lg rounded-lg p-4 mt-20">
      <!-- Gambar Proyek -->
      <img :src="project.foto" alt="Project Image" class="w-full h-40 object-cover rounded-md mb-4">

      <!-- Judul dan Kategori -->
      <div class="flex items-center justify-between mb-4">
        <div>
          <h1 class="text-xl font-bold mb-1">{{ project.portfolio }}</h1>
          <p class="text-sm text-gray-500">Kategori: {{ categoryName }}</p>
        </div>
        <!-- Tombol Kembali -->
        <router-link :to="`/portfolio/kategori/${project.kategori_id}`" class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm transition">
          Kembali
        </router-link>
      </div>

      <!-- Deskripsi Proyek -->
      <p class="text-sm text-gray-700 mb-4">{{ project.description }}</p>

      <!-- Teknologi yang Digunakan -->
      <div>
        <h3 class="text-md font-semibold mb-2">Teknologi:</h3>
        <div class="grid grid-cols-2 gap-2">
          <div v-for="tech in project.technologies" :key="tech" class="bg-gray-100 p-2 rounded-lg shadow-sm text-center text-gray-700 text-xs font-medium">
            {{ tech }}
          </div>
        </div>
      </div>
    </div>

    <!-- Jika Data Tidak Ditemukan -->
    <div v-else class="text-center text-red-500 mt-20">
      <h2 class="text-lg font-semibold">Proyek tidak ditemukan.</h2>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

// Data Proyek Dummy
const projects = ref([
  { id: 1, kategori_id: 1, portfolio: "SIMRS", foto: "https://fosan.id/images/fosanlogo.png", technologies: ['Vue.js', 'PostgreSQL', 'Node.js'] },
  { id: 2, kategori_id: 1, portfolio: "OSBOND GYM", foto: "https://fosan.id/images/fosanlogo.png", technologies: ['Vue.js', 'PostgreSQL', 'Node.js'] },
  { id: 3, kategori_id: 2, portfolio: "BPSDM", foto: "https://fosan.id/images/fosanlogo.png", technologies: ['Vue.js', 'PostgreSQL', 'Node.js'] },
  { id: 4, kategori_id: 2, portfolio: "Poltekkes KEMENKES Semarang", foto: "https://fosan.id/images/fosanlogo.png", technologies: ['Vue.js', 'PostgreSQL', 'Node.js'] },
  { id: 5, kategori_id: 3, portfolio: "MD CLINIC", foto: "https://fosan.id/images/fosanlogo.png", technologies: ['Vue.js', 'PostgreSQL', 'Node.js'] },
  { id: 6, kategori_id: 3, portfolio: "BAJ", foto: "https://fosan.id/images/fosanlogo.png", technologies: ['Vue.js', 'PostgreSQL', 'Node.js'] }, 
]);

// Data Kategori Dummy
const categories = ref([
  { id: 1, kategori: 'Kesehatan' },
  { id: 2, kategori: 'Edukasi' },
  { id: 3, kategori: 'WMS' }
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
