<template>
  <div class="w-full min-h-screen ">
    <!-- Hero Section -->
      <section class="relative flex items-center justify-center min-h-screen mt-12">
        <div class="text-center max-w-3xl p-6">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ hero }}</h1>
          <p class="text-lg text-gray-500">{{ deskripsi_hero }}</p>
          <a href="#layanan" class="mt-6 inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-lg font-semibold transition">
            {{ button_hero }}
          </a>
        </div>
      </section>
  
      <!-- Layanan Section -->
      <!-- <section id="layanan" class="py-16 bg-gray-900">
        <div class="container mx-auto px-6 text-center">
          <h2 class="text-3xl font-bold mb-10 text-white">{{ layanan }}</h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div v-for="service in services" :key="service.id"
               class="relative w-full h-[400px] flex flex-col bg-yellow-50 border border-yellow-300 rounded-xl shadow-md overflow-hidden">
              <img :src="service.img" alt="Service Image" class="">

              <div class="absolute top-0 left-0 p-4 text-left">
                <h2 class="text-3xl mb-4 font-semibold text-gray-800">{{ service.title }}</h2>
                <RouterLink :to="'/services/kategori/'+service.id " class="mt-2 bg-yellow-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-yellow-600 transition">
                  Select
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </section> -->
      <section class="py-16 " id="layanan">
        <div class="container mx-auto px-6 text-center">
          <h2 class="text-3xl font-bold mb-10">{{ layanan }}</h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div v-for="service in services" :key="service.id" class="p-6 bg-gray-100 rounded-lg shadow-lg">
              <RouterLink :to="'/services/kategori/'+service.id "><h3 class="text-xl font-semibold text-black flex items-center gap-2">
                <CircleEmote size="sm" />
                <span>{{ service.title }}</span>
              </h3></RouterLink>
            </div>
          </div>
        </div>
      </section>
      <!-- Keunggulan Section -->
      <!-- <section class="py-16 ">
        <div class="container mx-auto px-6 text-center">
          <h2 class="text-3xl font-bold mb-10">Mengapa Memilih Kami?</h2>
          <div class="grid md:grid-cols-3 gap-6">
            <div v-for="advantage in advantages" :key="advantage.id" class="p-6 bg-gray-100 rounded-lg shadow-lg">
              <h3 class="text-xl font-semibold text-black">{{ advantage.title }}</h3>
              <p class="text-black mt-2">{{ advantage.description }}</p>
            </div>
          </div>
        </div>
      </section> -->
    </div>
  </template>
  
  <script setup>
  import { ref ,computed} from "vue";
  import { RouterLink } from "vue-router";
  import software_development from '../../../components/images/software_development.png';
  import web_development from '../../../components/images/web_development.png';
  import it_consulting from '../../../components/images/it_consulting.png';

  import { useI18n } from 'vue-i18n';
  const { t, locale } = useI18n();
  const hero = computed(()=>t('layanan.hero'))
  const deskripsi_hero = computed(()=>t('layanan.deskripsi_hero'))
  const button_hero = computed(()=>t('layanan.button_hero'))
  const layanan = computed(()=>t('layanan.layanan'))

  // Data layanan
  const services = computed(()=>[
    // { id: 1, title: "Software Development", description: "Website profesional untuk perusahaan dan UMKM.", img: software_development },
    { id: 2, title: t('layanan.layanan1'), description: t(''),img:web_development },
    { id: 3, title: t('layanan.layanan2'), description: t(''), img: it_consulting },
  ]);
  
  // Data keunggulan
  const advantages = computed(()=>[
    { id: 1, title: t('layanan.alasan1.title'), description: t('layanan.alasan1.deskripsi') },
    { id: 2, title: t('layanan.alasan2.title'), description: t('layanan.alasan2.deskripsi') },
    { id: 3, title: t('layanan.alasan3.title'), description: t('layanan.alasan3.deskripsi') },
  ]);
  </script>
  
  <style scoped>
  /* Tambahan styling opsional jika dibutuhkan */
  </style>
  