<template>
  <div class=" flex justify-center items-start min-h-screen pt-20">
    <div v-if="project" class="w-full sm:w-3/5 lg:w-2/5 mx-auto bg-white shadow-lg rounded-lg p-4 mt-20">
      <!-- Gambar Proyek -->
      <img :src="project.foto" alt="Project Image" class="w-full h-40 object-cover rounded-md mb-4">

      <!-- Judul dan Kategori -->
      <div class="flex items-center justify-between mb-4">
        <div>
          <h1 class="text-xl font-bold mb-1 text-black">{{ project.portfolio }}</h1>
          <p class="text-sm text-black">Kategori: {{ categoryName }}</p>
        </div>
        <!-- Tombol Kembali -->
        <router-link :to="`/portfolio/kategori/${project.kategori_id}`" class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm transition">
          {{ back }}
        </router-link>
      </div>

      <!-- Deskripsi Proyek -->
      <p class="text-sm text-black mb-4">{{ project.description }}</p>

      <!-- Teknologi yang Digunakan -->
      <div>
        <h3 class="text-md font-semibold mb-2 text-black">Teknologi:</h3>
        <div class="grid grid-cols-2 gap-2">
          <div v-for="tech in project.technologies" :key="tech" class="bg-gray-100 p-2 rounded-lg shadow-sm text-center text-black text-xs font-medium">
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
import osbond from '../../../components/images/Osbond Gym.jpg';
import simpus from '../../../components/images/SIMPUS.jpg';
import simrs from '../../../components/images/SIMRS1.jpg';
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n();
// Data Proyek Dummy
const projects = ref([
{ id: 13, kategori_id: 1, portfolio: "OSBOND GYM", foto:osbond, technologies: ['Vue.js', 'PostgreSQL', 'Node.js'] },
    { id: 1, kategori_id: 1, portfolio: "Sistem Informasi Manajemen Puskesmas (SIMPUS)", foto: simpus , technologies: ['Vue.js', 'PostgreSQL', 'Node.js'] },
    { id: 2, kategori_id: 1, portfolio: "Sistem Informasi Rumah Sakit (SIMRS)", foto: simrs , technologies: ['Vue.js', 'PostgreSQL', 'Node.js'] },
    { id: 3, kategori_id: 2, portfolio: "BPSDM", foto: "https://fosan.id/images/fosanlogo.png" , technologies: ['Vue.js', 'PostgreSQL', 'Node.js'] },
    { id: 4, kategori_id: 2, portfolio: "Poltekkes KEMENKES Semarang", foto: "https://fosan.id/images/fosanlogo.png" , technologies: ['Vue.js', 'PostgreSQL', 'Node.js'] },
    { id: 5, kategori_id: 3, portfolio: "Manfaat [Penjualan Tepung]", foto: "https://fosan.id/images/fosanlogo.png" , technologies: ['Vue.js', 'PostgreSQL', 'Node.js'] },
    { id: 6, kategori_id: 3, portfolio: "Warehouse Management System Bahtera Adi Jaya", foto: "https://fosan.id/images/fosanlogo.png" , technologies: ['Vue.js', 'PostgreSQL', 'Node.js'] },
    { id: 7, kategori_id: 4, portfolio: "ERP Solutions", foto: "https://fosan.id/images/fosanlogo.png" , technologies: ['Vue.js', 'PostgreSQL', 'Node.js'] },
    { id: 8, kategori_id: 4, portfolio: "CRM Solutions", foto: "https://fosan.id/images/fosanlogo.png" , technologies: ['Vue.js', 'PostgreSQL', 'Node.js'] },
    { id: 9, kategori_id: 4, portfolio: "Corporate Finance Solutions", foto: "https://fosan.id/images/fosanlogo.png" , technologies: ['Vue.js', 'PostgreSQL', 'Node.js'] },
    { id: 10, kategori_id: 4, portfolio: "HR Management Solutions", foto: "https://fosan.id/images/fosanlogo.png" , technologies: ['Vue.js', 'PostgreSQL', 'Node.js'] },
    { id: 11, kategori_id: 4, portfolio: "Project Management Solutions", foto: "https://fosan.id/images/fosanlogo.png" , technologies: ['Vue.js', 'PostgreSQL', 'Node.js'] },
    { id: 12, kategori_id: 4, portfolio: "Document Management Solutions", foto: "https://fosan.id/images/fosanlogo.png" , technologies: ['Vue.js', 'PostgreSQL', 'Node.js'] },
]);

// Data Kategori Dummy
const categories = computed(()=>[
      { id: 1, kategori: t('kategori.hospitality') },
      { id: 2, kategori: t('kategori.education')},
      { id: 3, kategori: t('kategori.WMS')},
      { id: 4, kategori: t('kategori.HR')}
]);
const back = computed(()=> t('kembali') );
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
