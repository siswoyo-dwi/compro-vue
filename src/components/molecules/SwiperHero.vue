<template>
  <swiper
    :modules="modules"
    :slides-per-view="1"
    :loop="true"
    :autoplay="{ delay: 5000, disableOnInteraction: false }"
    :pagination="{ clickable: true }"
    effect="fade"
    class="hero-slider"
    @slideChange="changeText"
  >
    <swiper-slide v-for="(image, index) in images" :key="index">
      <div class="slide-container">
        <img :src="image.image" alt="Hero Image" class="slide-image" />
        <div class="overlay">
          <div class="text-box">
            <h1 class="animated-text">{{ currentText }}</h1>
            <Button class="cta-B">{{ jelajah[0].text }}</Button>
          </div>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script setup>
import { ref, onMounted ,computed} from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n();
// Define props
const props = defineProps({
  images: {
    type: Array,
    required: true
  }
});

// State
const currentText = ref("");
const currentIndex = ref(0); // Menyimpan index aktif
const jelajah = computed(() => [{text:t('jelajah')}])

// Function untuk efek ketik
const typeEffect = async (text) => {
  currentText.value = ""; // Reset teks sebelum mengetik ulang
  for (let i = 0; i < text.length; i++) {
    await new Promise((resolve) => setTimeout(resolve, 100)); // Efek ketik
    currentText.value += text[i];
  }
};

// Function untuk mengganti teks saat slide berubah
const changeText = (swiper) => {
  const index = swiper.realIndex;
  
  // Cek apakah slide benar-benar berubah
  if (index !== currentIndex.value) {
    currentIndex.value = index; // Update index aktif
    typeEffect(props.images[index].title); // Jalankan efek ketik hanya untuk slide aktif
  }
};

// Ketik teks pertama kali saat halaman dimuat
onMounted(() => {
  typeEffect(props.images[0].title);
});

const modules = [Autoplay, Pagination, EffectFade];
</script>

<style scoped>
.hero-slider {
  width: 100%;
  height: 100vh;
  position: relative;
}

.slide-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 5s ease-in-out;
  transform: scale(1);
}

.swiper-slide-active .slide-image {
  transform: scale(1.2); /* Zoom-in effect */
}

/* Overlay untuk teks */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Dark overlay */
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
}

/* Box untuk teks dan tombol (Sejajar) */
.text-box {
  background: rgba(255, 255, 255, 0.2);
  padding: 15px 30px;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  color: white;
  display: flex;
  align-items: center;
  gap: 15px; /* Jarak antar teks & tombol */
}

/* Efek teks diketik */
.animated-text {
  font-size: 2rem;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  border-right: 2px solid white;
  display: inline-block;
  padding-right: 5px;
}

/* Tombol CTA */
.cta-button {
  padding: 10px 20px;
  background: #ff7f50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.cta-button:hover {
  background: #ff6347;
}
</style>
