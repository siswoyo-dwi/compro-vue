<template>
  <div class="bg-gradient-to-r from-gray-300 to-yellow-500 dark:from-slate-900 dark:to-blue-800 min-h-screen">
    <!-- Wrapper untuk semua isi -->
    <div class="flex flex-col items-center">

      <!-- CardKategori di tengah, diberi margin atas agar tidak terlalu menempel atas -->
      <div class="flex justify-center mt-48">
        <CardKategori :categories="categories" />
      </div>

      <!-- Section berada di bawah, tidak ikut ke tengah -->
      <section class="py-16 w-full">
        <div class="container mx-auto px-6 text-center">
          <h2 class="text-3xl font-bold mb-10 text-white">Mengapa Memilih Kami?</h2>
          <div class="grid md:grid-cols-3 gap-6">
            <div v-for="advantage in advantages" :key="advantage.id" class="p-6 bg-gray-100 rounded-lg shadow-lg">
              <h3 class="text-xl font-semibold text-black">{{ advantage.title }}</h3>
              <p class="text-black mt-2">{{ advantage.description }}</p>
            </div>
          </div>
        </div>
      </section>
      <CardContacUs class="mb-24"></CardContacUs>
    </div>
  </div>
</template>

  
  <script setup>
  import { ref, watch ,computed} from "vue";
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
  const advantages = computed(()=>[
    { id: 1, title: t('layanan.alasan1.title'), description: t('layanan.alasan1.deskripsi') },
    { id: 2, title: t('layanan.alasan2.title'), description: t('layanan.alasan2.deskripsi') },
    { id: 3, title: t('layanan.alasan3.title'), description: t('layanan.alasan3.deskripsi') },
  ]);
  // Perbarui data setiap kali bahasa berubah
  watch(locale, updateCategories);
  </script>
  
  <style scoped>

  </style>
  