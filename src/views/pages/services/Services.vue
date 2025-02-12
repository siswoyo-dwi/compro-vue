<template>
  <div class="w-full min-h-screen bg-white">
    <!-- Hero Section -->
      <section class="relative flex items-center justify-center min-h-screen ">
        <div class="text-center max-w-3xl p-6">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            Jasa Pembuatan Website Profesional
          </h1>
          <p class="text-lg text-gray-500">
            Kami membantu bisnis Anda berkembang dengan website modern, cepat, dan responsif.
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
            <div v-for="service in services" :key="service.id" class="p-6 bg-gray-800 rounded-lg shadow-lg">
              <div class="text-5xl mb-4 text-blue-400">
                <component :is="service.icon"></component>
              </div>
              <h3 class="text-xl font-semibold text-white">{{ service.title }}</h3>
              <p class="text-gray-400 mt-2">{{ service.description }}</p>
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
  
  // Data layanan
  const services = ref([
    { id: 1, title: "Website Bisnis", description: "Website profesional untuk perusahaan dan UMKM.",  },
    { id: 2, title: "Website E-commerce", description: "Toko online lengkap dengan fitur checkout.", },
    { id: 3, title: "Website Responsif", description: "Tampilan optimal di semua perangkat.",  },
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
  