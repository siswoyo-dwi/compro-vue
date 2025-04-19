<template>
  <section class="container mx-auto p-6 mt-48">
    <!-- Card untuk seluruh konten -->
    <div class="bg-white shadow-lg rounded-lg overflow-hidden p-6">
      <!-- Kembali ke kategori -->


      <div class="flex flex-col lg:flex-row bg-white shadow-md rounded-lg overflow-hidden">
        <!-- Sidebar Kategori -->
        <aside class="lg:w-1/4 w-full bg-blue-50 p-6">
          <h2 class="text-lg font-bold mb-4">{{ categories_portfolio[0].kategori }}</h2>
          <ul>
            <li 
              v-for="(categorie, index) in categories" 
              :key="index"
              class="cursor-pointer py-2 px-3 rounded-md font-semibold"
              :class="{ 
                'bg-blue-500 text-white': categorie === index, 
                'text-gray-800 hover:bg-blue-100': categorie !== index 
              }"
              @click="showContent(categorie.id, index)"
            >
              {{ categorie.portfolio }}
            </li>
          </ul>
        </aside>

        <!-- Konten -->
        <main class="lg:w-3/4 w-full p-6 space-y-12">
          <div class="flex justify-between items-center mb-4">
        <router-link :to="'/portfolio'" class="text-gray-900">&lt; Back to Our Services</router-link>
        <p class="text-base text-gray-900 font-semibold">
          {{ activeIndex ? categories[activeIndex].portfolio : categories[0].portfolio }}
        </p>
      </div>
          <!-- Header SIMPUS -->
          <div class="flex flex-col lg:flex-row gap-6 items-center">
            <div class="w-full lg:w-1/2">
              <div class="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <img :src="filteredProjects[0].foto" alt="Portfolio Image" />
              </div>
            </div>
            <div class="w-full lg:w-1/2 flex flex-col items-start">
              <h1 class="text-2xl font-bold mb-4">{{ filteredProjects[0].portfolio }}</h1>
              <router-link 
                to="https://api.whatsapp.com/send/?phone=6282227470745"
                class="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
              >
                Contact Us
              </router-link>
            </div>
          </div>
          <section v-if="filteredProjects[0].id!=1">
            <div class="flex flex-col lg:flex-row gap-6 items-center">
              <div class="w-full ">
                <div class="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <img :src="filteredProjects[0].foto" alt="Portfolio Image" />
                </div>
              </div>
            </div>
          </section>
          <!-- Deskripsi SIMPUS -->
          <section>
            <h2 class="text-xl font-semibold mb-2">{{ filteredProjects[0].portfolio }}</h2>
            <p class="text-gray-700 leading-relaxed">
              {{ filteredProjects[0].description }}
            </p>
          </section>

          <!-- Kelebihan -->
          <section>
            <h3 class="text-lg font-bold mb-3">Kelebihan</h3>
            <div v-for="(item, index) in filteredProjects" :key="index" class="space-y-4">
              <div v-for="(kelebihanItem, idx) in item.kelebihan.list" :key="idx">
                <p class="font-bold">{{ idx + 1 }}. {{ kelebihanItem.text }}</p>
                <p class="font-bold">{{ kelebihanItem.list }}</p>
              </div>
            </div>
          </section>

          <!-- Hubungi -->
          <section class="flex justify-center">
            <div class="w-full lg:w-3/4 bg-blue-50 rounded-xl p-8 shadow-md text-center space-y-4">
              <h4 class="text-2xl font-bold text-blue-700">Hubungi Konsultan Kami</h4>
              <p class="mb-4 text-gray-600">Ready to Collaborate</p>
              <router-link 
                to="https://api.whatsapp.com/send/?phone=6282227470745"
                class="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition"
              >
                Contact Us
              </router-link>
            </div>
          </section>
        </main>
      </div>
    </div>
  </section>
</template>


<script setup>
import { ref, computed } from 'vue';

const { categories, categories_portfolio, projects } = defineProps({
  categories_portfolio: Array,
  projects: Array,
  categories: Array
});
console.log(categories, categories_portfolio, projects );

const activeIndex = ref(0);
const active_categories = computed(() => categories[activeIndex.value]);

const filteredProjects = computed(() => {
  if (!active_categories.value) return [];
  console.log(active_categories.value);
  
  return projects.filter(project => project.id === active_categories.value.id);
});

function showContent(id, index) {
  console.log(index);
  console.log(categories);
  
  activeIndex.value = index;
}
</script>
