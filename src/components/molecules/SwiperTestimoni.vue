<template>
  <div class="bg-gradient-to-r from-gray-100 to-gray-50 flex items-center justify-center min-h-screen p-6">
    <div class="max-w-4xl w-full text-center">
      <h2 class="text-3xl font-semibold text-gray-800 mb-6">Wall of Love</h2>

      <swiper
        :modules="[Navigation, Pagination, Autoplay]"
        :slides-per-view="1"
        :space-between="20"
        :loop="true"
        :autoplay="{ delay: 4000, disableOnInteraction: false }"
        :pagination="{ clickable: true }"
        :navigation="true"
        :breakpoints="{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }"
        class="mySwiper"
      >
        <swiper-slide v-for="(testimonial, index) in testimonials" :key="index" class="bg-white shadow-lg rounded-xl p-6 max-w-sm mx-auto">
          <div v-if="testimonial.image" class="flex items-center space-x-3">
            <img :src="testimonial.image" :alt="testimonial.name" class="w-8 h-8 rounded-full" />
            <div class="text-left">
              <h3 class="text-lg font-semibold text-gray-900">{{ testimonial.name }}</h3>
              <p class="text-gray-500">{{ testimonial.username }}</p>
            </div>
          </div>
          <div v-else>
            <h3 class="text-lg font-semibold text-gray-900">{{ testimonial.name }}</h3>
            <p class="text-gray-500">{{ testimonial.username }}</p>
          </div>
          <p class="text-gray-600 mt-3 text-sm">
            {{ testimonial.feedback }}
          </p>
          <p class="text-gray-400 text-xs mt-4">📅 {{ testimonial.date }}</p>
        </swiper-slide>
        <swiper-slide v-for="(image, index) in images" :key="index" class="relative">
        <img :src="image.image" :alt="image.title" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center p-6">
          <h1 class="text-4xl md:text-5xl font-bold">{{ image.title }}</h1>
          <p class="mt-2 text-lg md:text-xl">{{ image.subtitle }}</p>
          <a :href="image.link" class="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white">
            Lihat Selengkapnya
          </a>
        </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Props
defineProps({
  testimonials: {
    type: Array,
    required: true
  }
});

// Modules
const modules = [Navigation, Pagination, Autoplay];
</script>

