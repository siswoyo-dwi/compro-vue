

<template>
  <header class="fixed top-2 z-30 w-full md:top-6">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">

      <nav class="shadow-lg rounded-2xl p-3 mx-4 mt-4 flex  bg-white dark:bg-gray-900 items-center justify-between">
      <!-- <nav :class="['shadow-lg rounded-2xl p-3 mx-4 mt-4 flex items-center justify-between', theme.isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900']"> -->
        <!-- Logo -->
        <div class="flex items-center">
          <img src="https://fosan.id/images/fosanlogo.png" alt="Logo" class="h-8 w-8" />
        </div>

        <!-- Menu Items -->
        <div class="hidden md:flex space-x-6">
          <template v-for="item in menuItems" :key="item.link">
            <RouterLink
              v-if="!item.link.startsWith('http')"
              :to="item.link"
              class="hover:underline"
            >
              {{ item.name }}
            </RouterLink>
            <a v-else :href="item.link" target="_blank" rel="noopener noreferrer" class="hover:underline">
              {{ item.name }}
            </a>
          </template>
        </div>

        <!-- Right Side (Language & Theme Toggle) -->
        <div class="flex items-center space-x-4">
          <!-- Language Dropdown -->
          <select v-model="locale" class="border p-1 rounded bg-transparent cursor-pointer">
            <option value="en">🇬🇧 English</option>
            <option value="id">🇮🇩 Bahasa Indonesia</option>
          </select>

          <!-- Dark/Light Mode Toggle -->
          <button @click="theme.toggleTheme" class="p-2 rounded-lg border">
            <span v-if="theme.isDark">☀️</span>
            <span v-else>🌙</span>
          </button>

          <!-- Mobile Menu Button -->
          <button class="md:hidden focus:outline-none" @click="toggleMenu">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </nav>

      <!-- Mobile Menu -->
      <div v-if="isMenuOpen" class="md:hidden bg-white shadow-md rounded-lg mt-2 mx-4 p-4">
        <template v-for="item in menuItems" :key="item.link">
          <RouterLink
            v-if="!item.link.startsWith('http')"
            :to="item.link"
            class="block py-2 hover:underline"
          >
            {{ item.name }}
          </RouterLink>
          <a v-else :href="item.link" class="block py-2 hover:underline">
            {{ item.name }}
          </a>
        </template>
      </div>
    </div>
  </header>
</template>
<script setup>
import { ref, computed ,watch} from 'vue';
import { useI18n } from 'vue-i18n';
import { useThemeStore } from '../../store/themeStore';
  let theme = useThemeStore()
const { t, locale } = useI18n();
const isMenuOpen = ref(false);

const menuItems = computed(() => [
  { name: t('navbar.home'), link: '/' },
  { name: t('navbar.services'), link: '/services' },
  { name: t('navbar.contact'), link: 'https://api.whatsapp.com/send/?phone=6282227470745' },
  { name: t('navbar.portfolio'), link: '/portfolio' },
  { name: t('navbar.about'), link: '/about_us' },
  { name: t('navbar.graduate'), link: '/alumni' }
]);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style scoped>
/* Tambahkan styling jika diperlukan */
</style>
