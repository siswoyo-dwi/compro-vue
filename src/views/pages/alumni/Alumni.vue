<template>
    <div class=" ">
      <!-- Hero Section -->
      <section class="relative flex items-center justify-center min-h-screen ">
        <div class="text-center max-w-3xl p-6">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            Alumni Bootcamp Web Developer
          </h1>
          <p class="text-lg">
            Temui para lulusan terbaik kami yang telah berhasil berkarir di industri teknologi.
          </p>
          <a href="#alumni" class="mt-6 inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-lg font-semibold transition">
            Lihat Alumni
          </a>
        </div>
      </section>
  
      <!-- Alumni Section -->
      <section id="alumni" class="py-16 bg-gray-900">
        <div class="container mx-auto px-6 text-center">
          <h2 class="text-3xl font-bold mb-10 text-white">Para Alumni Kami</h2>
          <div class="grid md:grid-cols-3 gap-6">
            <div v-for="alumnus in alumni" :key="alumnus.id" class="p-6 bg-gray-800 rounded-lg shadow-lg">
              <img :src="alumnus.photo" alt="Alumni Photo" class="w-24 h-24 rounded-full mx-auto mb-4">
              <h3 class="text-xl font-semibold text-white">{{ alumnus.name }}</h3>
              <p class="text-gray-400 mt-2">{{ alumnus.job }}</p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Testimoni Section -->
      <section class="py-16">
        <div class="container mx-auto px-6 text-center">
          <h2 class="text-3xl font-bold mb-10">Apa Kata Alumni?</h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div v-for="testimonial in testimonials" :key="testimonial.id" class="p-6 bg-gray-700 rounded-lg shadow-lg">
              <p class="italic text-gray-300">"{{ testimonial.quote }}"</p>
              <h4 class="text-lg font-semibold mt-4 text-white">{{ testimonial.name }}</h4>
              <p class="text-gray-400">{{ testimonial.job }}</p>
            </div>
          </div>
        </div>
      </section>
 
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  // Data Alumni
  const alumni = ref([
    { id: 1, name: "Rizky Pratama", job: "Frontend Developer di Tokopedia", photo: "https://randomuser.me/api/portraits/men/1.jpg" },
    { id: 2, name: "Dina Rahma", job: "Backend Developer di Gojek", photo: "https://randomuser.me/api/portraits/women/2.jpg" },
    { id: 3, name: "Andi Wijaya", job: "Full Stack Developer di Shopee", photo: "https://randomuser.me/api/portraits/men/3.jpg" },
  ]);
  
  // Data Testimoni
  const testimonials = ref([
    { id: 1, name: "Rizky Pratama", job: "Frontend Developer", quote: "Bootcamp ini sangat membantu saya memahami web development dari nol!" },
    { id: 2, name: "Dina Rahma", job: "Backend Developer", quote: "Materinya lengkap, mentor berpengalaman, dan ada project real!" },
  ]);
  </script>
  
  <style scoped>
  /* Tambahan styling opsional */
  </style>
  