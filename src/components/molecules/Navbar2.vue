<template>
    <nav class="bg-gradient-to-r from-gray-100 to-yellow-500 py-4 px-10 flex justify-between items-center">
      <!-- Logo -->
      <div class="flex items-center text-yellow-500 font-bold text-2xl">
        <img src="https://fosan.id/images/fosanlogo.png" alt="Fosan Logo" class="w-10 mr-2">
        FOSAN
      </div>
  
      <!-- Navbar Links -->
      <div class="flex gap-6 text-lg text-black">
        <div class="relative">
          <button @click="toggleDropdown('about')" class="flex items-center">About ▼</button>
          <div v-if="activeDropdown === 'about'" class="absolute bg-white/20 backdrop-blur-lg shadow-lg rounded-md p-4 grid grid-cols-2 gap-6 w-64 mt-2">
            <div>
              <h4 class="font-bold text-sm">Company</h4>
              <a href="#" class="block text-sm text-gray-700 hover:text-orange-500 mt-1">About Company</a>
              <a href="#" class="block text-sm text-gray-700 hover:text-orange-500">Leadership</a>
              <a href="#" class="block text-sm text-gray-700 hover:text-orange-500">Our Team</a>
              <a href="#" class="block text-sm text-gray-700 hover:text-orange-500">Partners</a>
              <a href="#" class="block text-sm text-gray-700 hover:text-orange-500">Portfolio</a>
              <a href="#" class="block text-sm text-gray-700 hover:text-orange-500">Locations</a>
            </div>
            <div>
              <h4 class="font-bold text-sm">Recognition</h4>
              <a href="#" class="block text-sm text-gray-700 hover:text-orange-500 mt-1">Testimonial</a>
            </div>
          </div>
        </div>
  
        <div class="relative">
          <button @click="toggleDropdown('services')" class="flex items-center">Services ▼</button>
          <div v-if="activeDropdown === 'services'" class="absolute  bg-white/20 backdrop-blur-lg shadow-lg  rounded-md p-4 w-48 mt-2">
            <a href="#" class="block text-sm text-gray-700 hover:text-orange-500">Web Development</a>
            <a href="#" class="block text-sm text-gray-700 hover:text-orange-500">Mobile App</a>
            <a href="#" class="block text-sm text-gray-700 hover:text-orange-500">UI/UX Design</a>
          </div>
        </div>
  
        <div class="relative">
          <button @click="toggleDropdown('solution')" class="flex items-center">Solution ▼</button>
          <div v-if="activeDropdown === 'solution'" class="absolute  bg-white/20 backdrop-blur-lg shadow-lg  rounded-md p-4 w-48 mt-2">
            <a href="#" class="block text-sm text-gray-700 hover:text-orange-500">E-commerce</a>
            <a href="#" class="block text-sm text-gray-700 hover:text-orange-500">ERP System</a>
          </div>
        </div>
  
        <div class="relative">
          <button @click="toggleDropdown('technologies')" class="flex items-center">Technologies ▼</button>
          <div v-if="activeDropdown === 'technologies'" class="absolute  bg-white/20 backdrop-blur-lg shadow-lg  rounded-md p-4 w-48 mt-2">
            <a href="#" class="block text-sm text-gray-700 hover:text-orange-500">Vue.js</a>
            <a href="#" class="block text-sm text-gray-700 hover:text-orange-500">Node.js</a>
            <a href="#" class="block text-sm text-gray-700 hover:text-orange-500">Tailwind CSS</a>
          </div>
        </div>
  
        <div class="relative">
          <button @click="toggleDropdown(null)" class="flex items-center">Portfolio</button>
        </div>
      </div>
  
      <!-- Contact Button -->
      <a href="#" class="border-2 border-black px-4 py-2 rounded-md text-black hover:bg-yellow-500 hover:text-white transition">
        Contact us
      </a>
    </nav>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const activeDropdown = ref(null);
  
  const toggleDropdown = (menu) => {
    activeDropdown.value = activeDropdown.value === menu ? null : menu;
  };
  </script>
  
  <style scoped>
  /* Semua styling sudah diatur menggunakan Tailwind CSS */
  </style>
  