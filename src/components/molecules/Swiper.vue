<template>
  <div class="bg-gradient-to-r from-gray-100 to-gray-50 flex items-center justify-center min-h-screen p-6">
    <div class="max-w-4xl w-full text-center">
      <h2 class="text-3xl font-semibold text-gray-800 mb-6">Wall of Love</h2>

      <swiper
        :modules="[Navigation, Pagination, Autoplay]"
        :slides-per-view="1"
        :space-between="20"
        :loop="true"
        :autoplay="{ delay: 4000, disableOnInteraction: false }"
        :pagination="{ clickable: true }"
        :navigation="true"
        :breakpoints="{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }"
        class="mySwiper"
      >
        <swiper-slide v-for="(testimonial, index) in testimonials" :key="index" class="bg-white shadow-lg rounded-xl p-6 max-w-sm mx-auto">
          <div v-if="testimonial.image" class="flex items-center space-x-3">
            <img :src="testimonial.image" :alt="testimonial.name" class="w-8 h-8 rounded-full" />
            <div class="text-left">
              <h3 class="text-lg font-semibold text-gray-900">{{ testimonial.name }}</h3>
              <p class="text-gray-500">{{ testimonial.username }}</p>
            </div>
          </div>
          <div v-else>
            <h3 class="text-lg font-semibold text-gray-900">{{ testimonial.name }}</h3>
            <p class="text-gray-500">{{ testimonial.username }}</p>
          </div>
          <p class="text-gray-600 mt-3 text-sm">
            {{ testimonial.feedback }}
          </p>
          <p class="text-gray-400 text-xs mt-4">📅 {{ testimonial.date }}</p>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    testimonials: {
      type: Array,
      required: true
    }
  },
  setup() {
    return { Navigation, Pagination, Autoplay };
  }
};
</script>
