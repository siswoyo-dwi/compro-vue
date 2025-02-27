<template>
    <section class="container mx-auto p-8">
            <h2 class="text-3xl font-bold text-gray-800 mb-6">How We Help</h2>
            <div class="flex bg-white shadow-md rounded-lg overflow-hidden">
                <!-- Sidebar Kategori -->
                <div class="w-1/3 bg-blue-50 p-6">
                    <ul v-for="">
                        <li class="cursor-pointer py-3 px-4 rounded-md font-semibold text-gray-800 bg-blue-500 text-white" @click="showContent(0)">Software consulting</li>
                        <li class="cursor-pointer py-3 px-4 rounded-md text-gray-700 hover:bg-blue-100" @click="showContent(1)">Custom software development</li>
                        <li class="cursor-pointer py-3 px-4 rounded-md text-gray-700 hover:bg-blue-100" @click="showContent(2)">Enterprise software development</li>
                        <li class="cursor-pointer py-3 px-4 rounded-md text-gray-700 hover:bg-blue-100" @click="showContent(3)">Software product development</li>
                        <li class="cursor-pointer py-3 px-4 rounded-md text-gray-700 hover:bg-blue-100" @click="showContent(4)">Cloud development</li>
                        <li class="cursor-pointer py-3 px-4 rounded-md text-gray-700 hover:bg-blue-100" @click="showContent(5)">Support and maintenance</li>
                        <li class="cursor-pointer py-3 px-4 rounded-md text-gray-700 hover:bg-blue-100" @click="showContent(6)">Legacy software modernization</li>
                    </ul>
                </div>
    
                <!-- Konten Definisi -->
                <div class="w-2/3 p-8">
                    <div id="content">
                        <h3 class="text-2xl font-bold text-gray-900">Software consulting</h3>
                        <p class="text-gray-700 mt-4">
                            Kami menggabungkan keahlian multi-domain yang mendalam, pemikiran yang berpusat pada klien, dan pendekatan inovatif untuk merancang dan merencanakan solusi andal yang sangat sesuai dengan kebutuhan dan perilaku penggunanya.
                        </p>
                    </div>
                </div>
            </div>
        </section>
       
      </template>
      
      <script setup>
      import { ref } from "vue";
      
   
      const descriptions = ref([
                {   kategori:1,
                    title: "Software consulting",
                    text: "Kami menggabungkan keahlian multi-domain yang mendalam, pemikiran yang berpusat pada klien, dan pendekatan inovatif untuk merancang dan merencanakan solusi andal yang sangat sesuai dengan kebutuhan dan perilaku penggunanya."
                },
                {   kategori:1,
                    title: "Custom software development",
                    text: "Kami mengembangkan perangkat lunak dengan nilai bisnis jangka panjang – disesuaikan secara unik dengan proses bisnis anda dan disesuaikan dengan kebutuhan masa depan."
                },
                {   kategori:1,
                    title: "Enterprise software development",
                    text: "Kami membangun solusi perusahaan multi-segi yang dapat dengan mudah menahan beban tertinggi, ditingkatkan seiring pertumbuhan bisnis anda, dan secara fleksibel mengakomodasi perluasan fungsional."
                },
                {   kategori:1,
                    title: "Software product development",
                    text: "Kami menciptakan produk perangkat lunak SaaS, seluler, dan desktop yang tangguh dengan UX yang hebat dan mendorong pengembangan yang bergerak cepat."
                },
                {   kategori:1,
                    title: "Cloud development",
                    text: "Kami merancang dan menghadirkan aplikasi cloud yang skalabel, portabel, dan aman serta membantu memigrasikan aplikasi dengan kompleksitas apa pun dari infrastruktur lokal ke cloud."
                },
                {   kategori:1,
                    title: "Support and maintenance",
                    text: "Kami memastikan kelancaran fungsi dan relevansi perangkat lunak anda melalui pemantauan kinerja berkelanjutan, pengoptimalan proaktif, penyelesaian masalah dengan cepat, pengiriman fitur dan integrasi baru."
                },
                {   kategori:1,
                    title: "Legacy software modernization",
                    text: "Kami mendesain ulang dan meningkatkan perangkat lunak yang ada untuk membantu anda mendapatkan solusi modern dengan biaya optimal dan gangguan minimal terhadap alur kerja bisnis."
                }
            ])
    
            function showContent(index) {
                const content = document.getElementById("content");
                content.innerHTML = `
                    <h3 class="text-2xl font-bold text-gray-900">${this.descriptions[index].title}</h3>
                    <p class="text-gray-700 mt-4">${this.descriptions[index].text}</p>
                `;
    
                // Highlight kategori aktif
                document.querySelectorAll("ul li").forEach((li, i) => {
                    li.classList.remove("bg-blue-500", "text-white", "font-semibold");
                    li.classList.add("text-gray-700", "hover:bg-blue-100");
                    if (i === index) {
                        li.classList.add("bg-blue-500", "text-white", "font-semibold");
                    }
                });
            }
      </script>
      
      <style scoped>
      /* Tambahan styling opsional jika dibutuhkan */
      </style>
      