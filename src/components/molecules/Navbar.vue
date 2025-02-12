<template>
    <header class="fixed top-2 z-30 w-full md:top-6">
      <div class="mx-auto max-w-6xl px-4 sm:px-6">
        <nav class="bg-white shadow-lg rounded-2xl p-3 mx-4 mt-4 flex items-center justify-between">
          <!-- Logo -->
          <div class="flex items-center">
            <img src="https://fosan.id/images/fosanlogo.png" alt="Logo" class="h-8 w-8" />
          </div>
  
          <!-- Menu Items -->
          <div class="hidden md:flex space-x-6 text-gray-700"     v-for="item in menuItems"  :key="item.name">
            <RouterLink
             
              v-if="!item.link.startsWith('http')"
              :to="item.link"
              class="hover:text-gray-900"
            >
              {{ item.name }}
            </RouterLink>

            <a v-else
              :href="item.link"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-gray-900"
            >
              {{ item.name }}
            </a>
          </div>

  
          <!-- Mobile Menu Button -->
          <button class="md:hidden focus:outline-none" @click="toggleMenu">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </nav>
  
        <!-- Mobile Menu -->
         <div v-if="isMenuOpen" >
          <div class="md:hidden bg-white shadow-md rounded-lg mt-2 mx-4 p-4"   v-for="item in menuItems" :key="item.name" >
            <RouterLink               v-if="!item.link.startsWith('http')"            :to="item.link" class="block py-2 text-gray-700 hover:text-gray-900">
              {{ item.name }}
            </RouterLink >
            <a v-else   :href="item.link" class="block py-2 text-gray-700 hover:text-gray-900">
            {{ item.name }}
            </a>
        </div>
         </div>
       
      </div>
    </header>
  </template>
<script>
import { ref } from 'vue';

export default {
  setup() {
    const isMenuOpen = ref(false);
    const menuItems = ref([
      { name: 'Home', link: '/' },
      { name: 'Services', link: '/services' },
      { name: 'Contact Us', link: 'https://api.whatsapp.com/send/?phone=6282227470745' },
      { name: 'Portfolio', link: '/portfolio' },
      { name: 'About Us', link: '/about_us' },
      { name: 'Alumni', link: '/alumni' }
    ]);
    
    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    return { isMenuOpen, menuItems, toggleMenu };
  }
};
</script>