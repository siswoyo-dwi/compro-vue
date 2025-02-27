<template>
    <section class="container mx-auto p-8 ">
        <h2 class="text-3xl font-bold  mb-6">Pekerjaan kami meliputi</h2>
        <div class="flex bg-white shadow-md rounded-lg overflow-hidden">
            <!-- Sidebar Kategori -->
            <div class="w-1/3 bg-blue-50 p-6">
                <ul>
                    <li v-for="(description, index) in descriptions" :key="index" 
                        class="cursor-pointer py-3 px-4 rounded-md font-semibold"
                        :class="{ 'bg-blue-500 text-white': activeIndex === index, 'text-gray-800 hover:bg-blue-100': activeIndex !== index }"
                        @click="showContent(index)">
                        {{ description.title }}
                    </li>
                </ul>
            </div>

            <!-- Konten Definisi -->
            <div class="w-2/3 p-8">
                <div>
                    <h3 class="text-2xl font-bold text-gray-900">{{ descriptions[activeIndex].title }}</h3>
                    <p class="text-gray-700 mt-4" v-if="typeof descriptions[activeIndex].text=='string'">
                        {{ descriptions[activeIndex].text }}
                    </p>
                    <div class="text-gray-700 mt-4" v-else>
                        <ul>
                            <li v-for="(text, index) in  descriptions[activeIndex].text" :key="index" >
                                {{ text }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';

// Props
defineProps({
    descriptions: {
        type: Array,
        required: true
    }
});

const activeIndex = ref(0);

function showContent(index) {
    activeIndex.value = index;
}
</script>
