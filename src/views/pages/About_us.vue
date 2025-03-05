<template >
     <div class="container mt-32 mx-auto px-6 py-12">
           <!-- Judul -->
           <h2 class="text-center text-3xl  md:text-4xl font-semibold mb-12">{{ tentang[0].tentang }}</h2>
        <!-- Kontainer utama -->
        <div class="flex flex-col  md:flex-row  gap-12">
            <!-- Bagian Teks -->
            <div class="w-full md:w-1/2  mt-[-20px]">
                <h2 class="text-3xl md:text-4xl font-bold  mb-4">{{ tentang[0].company }}</h2>
                <p class=" leading-relaxed mb-6">{{ tentang[0].deskripsi }}</p>
                <!-- <a href="#" class="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition">
                    Learn More
                </a> -->
            </div>

            <!-- Bagian Gambar -->
            <div class="w-full md:w-1/2">
                <img :src="fosan" alt="About Fosan" class="w-full rounded-lg shadow-lg">
            </div>
        </div>
     </div>
     <div class="container mt-32 mx-auto px-6 py-12">
           <!-- Judul -->
           <h2 class="text-center text-3xl  md:text-4xl font-semibold mb-12">
            {{ pemimpin }}
        </h2>
        <!-- Kontainer utama -->
        <div class="flex flex-col  md:flex-row  gap-12">
            <!-- Bagian Teks -->
            <div class="w-full md:w-1/2  mt-[-20px]">
                <h2 class="text-3xl md:text-4xl font-bold  mb-4">
                    Noor Bhagaskoro Liestantyo, S.Kom., M.Kom (CEO)
                </h2>

                <p class=" leading-relaxed mb-6">
                </p>
                <!-- <router-link :to="'#'" class="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition">
                    Learn More
                </router-link> -->
            </div>

            <!-- Bagian Gambar -->
            <div class="w-full md:w-1/2">
                <img src="https://www.scnsoft.com/slider-presentation/boris-and-nick.jpg" alt="About Fosan" class="w-full rounded-lg shadow-lg">
            </div>
        </div>
     </div>
    <div class="container mx-auto mt-32 px-6 py-12">
        <!-- Judul -->
        <h2 class="text-center text-3xl md:text-4xl font-semibold mb-24">
            About Company
        </h2>

        <!-- Kontainer utama -->
        <div class="flex flex-col md:flex-row items-start gap-8 md:gap-12 relative">
            
            <!-- Bagian Gambar (Hanya Tampil di Desktop) -->
            <div class="w-full md:w-1/2 relative hidden md:block">
                <img src="https://www.scnsoft.com/slider-presentation/boris-and-nick.jpg" 
                     alt="Office Image" 
                     class="w-full rounded-lg shadow-lg"> 

                <!-- Kotak Tahun (Desktop: Pojok kanan atas gambar) -->
                <div class="absolute -top-12 right-0 transform translate-x-1/3 bg-blue-600  
                            text-4xl md:text-5xl font-bold px-6 py-4 md:px-8 md:py-6 rounded-lg shadow-lg text-white">
                    35
                </div>
            </div>

            <!-- Bagian Teks -->
            <div class="w-full md:w-1/2 flex flex-col justify-start relative">
                <!-- Kotak Tahun (Mobile: Ditampilkan di atas teks) -->
                <div class="bg-blue-600 text-white text-4xl font-bold px-6 py-4 rounded-lg shadow-lg 
                            text-center mx-auto mb-4 md:hidden">
                    35
                </div>

                <h3 class="text-2xl md:text-3xl font-bold text-center md:text-left">
                    years in IT
                </h3>
                <p class="mt-4 leading-relaxed text-center md:text-left">
                    We have seen the technology landscape change time and again 
                    over the three decades of our operation. We have learned 
                    to be flexible and to expand our expertise to meet the demands of tomorrow.
                </p>
                <button class="mt-6 border-2 border-blue-600 text-blue-600 font-semibold px-6 py-2 rounded-lg 
                               hover:bg-blue-700 hover:text-white transition self-center md:self-start">
                    Fosan's highlights
                </button>
            </div>

        </div>
    </div>
</template> 
<script setup>
import { ref,computed  } from "vue";
import { useI18n } from 'vue-i18n';
import fosan from '../../components/images/fosan.jpg';

const { t, locale } = useI18n();
const tentang = computed(()=> [{tentang:t('company.tentang'),company:t('company.company'),deskripsi:t('company.deskripsi')}])
const pemimpin = computed(()=>t('pemimpin'))

</script>
