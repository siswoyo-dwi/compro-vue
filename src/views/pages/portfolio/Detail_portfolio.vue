<template>

<div class="w-full min-h-screen bg-white ">
    <div id="carouselExampleSlidesOnly" class="carousel slide " data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-200 to-gray-100">
            <div class="relative max-w-4xl p-4 rounded-3xl bg-white shadow-2xl border border-gray-300 mt-14 ">
              <!-- Outer Box Background -->
              <div class="relative aspect-video overflow-hidden rounded-2xl shadow-lg ">
                <!-- Gradient Borders -->
                <div class="absolute -inset-1 rounded-2xl bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
  
                <!-- Image -->
                <img 
                  :src="imageSrc" 
                  alt="Demo Image" 
                  class="relative z-10 object-cover w-full h-full rounded-2xl"
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from "vue";
  
  defineProps({
    imageSrc: {
      type: String,
      default: "https://mmc.tirto.id/image/otf/970x0/2021/05/25/pelanggaran-tata-ruang-di-perkotaan-antarafoto_ratio-16x9.jpg"
    }
  });
  </script>
  