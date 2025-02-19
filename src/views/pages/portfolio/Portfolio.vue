<template>
		<div class="bg-gradient-to-r from-gray-300 to-blue-50 dark:from-slate-900 dark:to-blue-800 flex justify-center items-center min-h-screen">
      <div class="flex flex-wrap justify-center">
        <div v-for="item in categories" :key="item.id" class="w-full sm:w-1/3 p-4">
          <RouterLink :to="`/portfolio/kategori/${item.id}`" class="block bg-white shadow-lg rounded-lg p-6 text-center transform transition-transform hover:scale-105">
            <div class="flex justify-center">
              <img :src="item.foto" alt="" class="h-24 w-auto">
            </div>
            <h6 class="mt-4 text-gray-800 font-semibold">{{ item.kategori }}</h6>
          </RouterLink>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from "vue";
  import { useI18n } from 'vue-i18n';
  
  const { t, locale } = useI18n();
  
  const categories = ref([]);
  
  const updateCategories = () => {
    categories.value = [
      { id: 1, kategori: t('kategori.hospitality'), foto: 'https://fosan.id/images/fosanlogo.png' },
      { id: 2, kategori: t('kategori.education'), foto: 'https://fosan.id/images/fosanlogo.png' },
      { id: 3, kategori: t('kategori.WMS'), foto: 'https://fosan.id/images/fosanlogo.png' },
      { id: 4, kategori: t('kategori.HR'), foto: 'https://fosan.id/images/fosanlogo.png' }
    ];
  };
  
  // Panggil updateCategories saat pertama kali di-load
  updateCategories();
  
  // Perbarui data setiap kali bahasa berubah
  watch(locale, updateCategories);
  </script>
  
  <style scoped>

  </style>
  