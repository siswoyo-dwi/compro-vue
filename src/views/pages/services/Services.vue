<template>
  <div class="w-full min-h-screen ">
    <!-- Hero Section -->
      <section class="relative flex items-center justify-center min-h-screen mt-12">
        <div class="text-center max-w-3xl p-6">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            Jasa Konsultasi IT dan Pengembangan Software
          </h1>
          <p class="text-lg text-gray-500">
            Kami membantu bisnis Anda berkembang dengan software modern, cepat, dan responsif
          </p>
          <a href="#layanan" class="mt-6 inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-lg font-semibold transition">
            Lihat Layanan Kami
          </a>
        </div>
      </section>
  
      <!-- Layanan Section -->
      <section id="layanan" class="py-16 bg-gray-900">
        <div class="container mx-auto px-6 text-center">
          <h2 class="text-3xl font-bold mb-10 text-white">Layanan Kami</h2>
          <div class="grid md:grid-cols-3 gap-6">
            <div v-for="service in services" :key="service.id"
               class="relative w-full h-[400px] flex flex-col bg-yellow-50 border border-yellow-300 rounded-xl shadow-md overflow-hidden">
                          <!-- Gambar -->
              <img :src="service.img" alt="Service Image" class="mt-12">

              <!-- Text & Button di Kiri Atas -->
              <div class="absolute top-0 left-0 p-4 text-left">
                <h2 class="text-3xl mb-4 font-semibold text-gray-800">{{ service.title }}</h2>
                <RouterLink :to="'/service/kategori/'+service.id " class="mt-2 bg-yellow-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-yellow-600 transition">
                  Select
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Keunggulan Section -->
      <section class="py-16 ">
        <div class="container mx-auto px-6 text-center">
          <h2 class="text-3xl font-bold mb-10">Mengapa Memilih Kami?</h2>
          <div class="grid md:grid-cols-3 gap-6">
            <div v-for="advantage in advantages" :key="advantage.id" class="p-6 bg-gray-700 rounded-lg shadow-lg">
              <h3 class="text-xl font-semibold text-white">{{ advantage.title }}</h3>
              <p class="text-gray-400 mt-2">{{ advantage.description }}</p>
            </div>
          </div>
        </div>
      </section>
  
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { RouterLink } from "vue-router";
  import software_development from '../../../components/images/software_development.png';
  import web_development from '../../../components/images/web_development.png';
  import it_consulting from '../../../components/images/it_consulting.png';

  // Data layanan
  const services = ref([
    { id: 1, title: "Software Development", description: "Website profesional untuk perusahaan dan UMKM.", img: software_development },
    { id: 2, title: "Web Development", description: "Toko online lengkap dengan fitur checkout.",img:web_development },
    { id: 3, title: "IT Consulting", description: "Tampilan optimal di semua perangkat.", img: it_consulting },
  ]);
  
  // Data keunggulan
  const advantages = ref([
    { id: 1, title: "Desain Modern", description: "Menggunakan teknologi terbaru untuk desain yang elegan." },
    { id: 2, title: "Keamanan Terjamin", description: "Keamanan data pelanggan adalah prioritas utama kami." },
    { id: 3, title: "Support 24/7", description: "Tim kami siap membantu kapan saja jika ada kendala." },
  ]);
  </script>
  
  <style scoped>
  /* Tambahan styling opsional jika dibutuhkan */
  </style>
  