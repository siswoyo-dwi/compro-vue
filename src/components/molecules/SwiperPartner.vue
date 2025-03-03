<template>
  <div class="container mx-auto px-6 py-10">
    <h2 class="text-2xl font-semibold text-center  mb-6">{{ partner }}</h2>
    
    <Swiper
      :modules="[Autoplay]"
      :slides-per-view="2"
      :space-between="30"
      :loop="true"
      :autoplay="{ delay: 3000 }"
      :breakpoints="{
        640: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 5 }
      }"
      class="partnership-swiper"
    >
      <SwiperSlide v-for="(partner, index) in partners" :key="index">
        <div class="relative flex justify-center">
          <img 
            :src="partner.logo" 
            class="h-20 object-contain grayscale hover:grayscale-0 transition"
          >
          
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import { ref ,computed} from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n();
// Props
defineProps({
  partners: {
    type: Array,
    required: true
  }
});

// Modules
const modules = [Navigation, Pagination, Autoplay];
const partner = computed(()=>t('partner'))

</script>

<style>
.partnership-swiper .swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
}

.tooltip-target {
  position: relative;
}

.tooltip {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px;
  border-radius: 4px;
  font-size: 14px;
  white-space: nowrap;
  z-index: 1000;
  opacity: 0.9;
  transition: opacity 0.3s ease;
  transform: translateX(-50%);
}
</style>
