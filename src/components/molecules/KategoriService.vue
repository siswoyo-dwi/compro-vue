<template>
    <section class="container mx-auto p-8 ">
      
        <h2 class="text-xl font-semibold mb-6">Pekerjaan kami meliputi</h2>
        <div class="flex bg-white shadow-md rounded-lg overflow-hidden">
            <!-- Sidebar Kategori -->
            <div class="w-1/3 bg-blue-50 p-6">
                <ul>
                    <li v-for="(service, index) in services" :key="index" 
                        class="cursor-pointer py-3 px-4 rounded-md font-semibold"
                        :class="{ 'bg-blue-500 text-white': activeIndex === index, 'text-gray-800 hover:bg-blue-100': activeIndex !== index }"
                        @click="showContent(service.id,index)">
                        {{ service.title }}
                    </li>
                </ul>
            </div>

            <!-- Konten Definisi -->
            <div class="w-2/3 p-8">
                <div class="flex justify-between items-center mb-4">
                    <router-link :to="'/services'" class="text-gray-900">&lt; Back to Our Services</router-link>
                    <p class="text-base text-gray-900 font-semibold">
                        {{ activeIndex ?  services[activeIndex].title : services[0].title }}
                    </p>
                </div>
                <div v-if="getDescription">
                    <div v-for="(item, index) in getDescription" :key="index" >
                        <p class="text-base text-blue-700 mt-12 font-semibold">
                            {{ item.title }}
                        </p>

                    <p class="text-sm text-gray-700 mt-2" v-if="typeof item.text === 'string'">
                        {{ item.text }}
                    </p>

                    <div class="text-sm text-gray-700 mt-2" v-else>
                        <ul>
                        <li v-for="(text, idx) in item.text" :key="idx">
                        {{ text }}
                        </li>
                    </ul>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref,computed  } from 'vue';

// Props
const { services, descriptions } = defineProps({
  descriptions: Array,
  services: Array
});
const activeIndex = ref(0);
const activeId = ref(services[0].id);

function showContent(id,index) {
    activeIndex.value = index
    activeId.value = id;
}
const getDescription = computed(() => {
    console.log(descriptions,activeId.value);
    
  return descriptions.filter(d => d.kategori === activeId.value);
});

</script>
