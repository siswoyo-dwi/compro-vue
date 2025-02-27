<template>
		<div class="bg-gradient-to-r from-gray-300 to-yellow-500 dark:from-slate-900 dark:to-blue-800 flex justify-center items-center min-h-screen">
      <div class="flex flex-wrap justify-center mt-12">
        <!-- <div v-for="item in categories" :key="item.id" class="w-full sm:w-1/2 p-4 mt-24">
         <div class="block bg-white shadow-lg rounded-lg p-6 text-center ">
            <div class="flex justify-center">
              <img :src="item.foto" :alt="item.kategori" class="w-full h-52 object-cover transition-transform duration-300 hover:scale-110">
            </div>
            <div>
              <div class="flex items-center justify-between mb-4">
                <div>
                  <h6 class="mt-4 text-gray-800 font-semibold">{{ item.kategori }}</h6>
                </div>
                <RouterLink :to="`/portfolio/kategori/${item.id}`"  class="inline-block mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700 transition">
                      See project details →
                  </RouterLink>
              </div>
            </div>
          </div>
        </div> -->
        <CardKategori :categories="categories"/>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from "vue";
  import { useI18n } from 'vue-i18n';
  import Healthcare from '../../../components/images/Healthcare.jpg';
  import Human_Resource from '../../../components/images/Human Resource.jpg';
  import Learning_Management_System from '../../../components/images/Learning Management System.jpg';
  import Warehouse_Management_System from '../../../components/images/Warehouse Management System.jpg';

   const { t, locale } = useI18n();
  
  const categories = ref([]);
  
  const updateCategories = () => {
    categories.value = [
      { id: 1, kategori: t('kategori.hospitality'), foto: Healthcare },
      { id: 2, kategori: t('kategori.education'), foto: Learning_Management_System },
      { id: 3, kategori: t('kategori.WMS'), foto: Warehouse_Management_System },
      { id: 4, kategori: t('kategori.HR'), foto:Human_Resource }
    ];
  };
  
  // Panggil updateCategories saat pertama kali di-load
  updateCategories();
  
  // Perbarui data setiap kali bahasa berubah
  watch(locale, updateCategories);
  </script>
  
  <style scoped>

  </style>
  