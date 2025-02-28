<template>
    <footer class="px-6 py-10 bg-white shadow-lg rounded-t-lg text-center ">
      <div class="flex flex-col items-center space-y-6">
        <!-- Logo -->
        <div class="flex items-center space-x-2">
          <img src="https://fosan.id/images/fosanlogo.png" alt="Logo" class="w-8 h-8">
          <p class="text-gray-500">© fosan.id - All rights reserved.</p>
        </div>
  
        <!-- Footer Links -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          <div>
            <h3 class="font-semibold text-gray-800">Product</h3>
            <ul class="text-gray-500 text-sm space-y-1 mt-2"   v-for="(item, index) in categories" :key="index" >
              <li><router-link :to="`/portfolio/kategori/${item.id}`"  class="hover:text-black">{{ item.kategori }}</router-link></li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold text-gray-800">Company</h3>
            <ul class="text-gray-500 text-sm space-y-1 mt-2">
              <li><router-link :to="'/about_us'" class="hover:text-black">About us</router-link></li>
              <li><router-link :to="'/services'" class="hover:text-black">Service</router-link></li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold text-gray-800">Technology</h3>
            <ul class="text-gray-500 text-sm space-y-1 mt-2">
              <li><router-link :to="'#'" class="hover:text-black">Node js</router-link></li>
              <li><router-link :to="'#'" class="hover:text-black">JavaScript</router-link></li>
              <li><router-link :to="'#'" class="hover:text-black">AI</router-link></li>
              <li><router-link :to="'#'" class="hover:text-black">HTML5</router-link></li>
              <li><router-link :to="'#'" class="hover:text-black">CSS</router-link></li>
              <li><router-link :to="'#'" class="hover:text-black">Vue.js</router-link></li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold text-gray-800">Social</h3>
            <div class="flex justify-center space-x-3 mt-2">
              <a class="flex items-center justify-center text-blue-500 transition hover:text-blue-600" href="#">
                <svg class="h-8 w-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="m13.063 9 3.495 4.475L20.601 9h2.454l-5.359 5.931L24 23h-4.938l-3.866-4.893L10.771 23H8.316l5.735-6.342L8 9h5.063Z"></path>
                </svg>
              </a>
              <a class="flex items-center justify-center text-blue-500 transition hover:text-blue-600" href="#">
                <svg class="h-8 w-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 8H9a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1Zm-1.708 3.791-.858.823a.251.251 0 0 0-.1.241V18.9a.251.251 0 0 0 .1.241l.838.823v.181h-4.215v-.181l.868-.843c.085-.085.085-.11.085-.241v-4.887l-2.41 6.131h-.329l-2.81-6.13V18.1a.567.567 0 0 0 .156.472l1.129 1.37v.181h-3.2v-.181l1.129-1.37a.547.547 0 0 0 .146-.472v-4.749a.416.416 0 0 0-.138-.351l-1-1.209v-.181H13.8l2.4 5.283 2.122-5.283h2.971l-.001.181Z"></path>
                </svg>
              </a>
              <a class="flex items-center justify-center text-blue-500 transition hover:text-blue-600" href="#">
                <svg class="h-8 w-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 8.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V22c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </template>
  <script setup>
  import { ref, watch } from "vue";
  import { useI18n } from 'vue-i18n';
  import Healthcare from '../../components/images/Healthcare.jpg';
  import Human_Resource from '../../components/images/Human Resource.jpg';
  import Learning_Management_System from '../../components/images/Learning Management System.jpg';
  import Warehouse_Management_System from '../../components/images/Warehouse Management System.jpg';

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
  