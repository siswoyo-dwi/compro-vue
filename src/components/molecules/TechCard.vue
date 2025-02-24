<template>
    <div class="relative">
      <!-- Card Teknologi -->
      <div class="bg-white p-4 rounded-lg shadow-md w-24 h-24 flex flex-col items-center justify-center hover:shadow-xl transition duration-300 cursor-pointer relative group">
        <img :src="img" class="h-10 object-contain" />
        <p class="text-xs text-black text-center mt-2 font-semibold">{{ name }}</p>
  
        <!-- Detail Box muncul di bawah & mentok kiri saat hover -->
        <div 
          class="absolute left-0 top-full mt-2 w-80 bg-white p-4 rounded-lg shadow-xl opacity-0 transition duration-300 z-50 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100"
        >
          <p class="text-lg font-semibold text-gray-900">{{ name }}</p>
          <p class="text-sm text-gray-600">{{ desc }}</p>
  
          <div class="flex justify-between mt-3 text-gray-700">
            <div class="flex items-center">
              <span class="text-2xl font-bold">{{ experience }}</span>
              <span class="ml-2 text-sm">years</span>
            </div>
            <div class="flex items-center">
              <span class="text-2xl font-bold">{{ workforce }}</span>
              <span class="ml-2 text-sm">workforce</span>
            </div>
          </div>
  
          <button class="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
            Find out more →
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    name: String,
    img: String,
    desc: String,
    experience: String,
    workforce: String
  });
  </script>
  