<template>
    <section class="mt-36">
        <KategoriService :descriptions="item"/>
    </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute(); // Akses route params


const descriptions = ref([
        {   id:1,
            kategori:1,
            title: "Software consulting",
            text: "Kami menggabungkan keahlian multi-domain yang mendalam, pemikiran yang berpusat pada klien, dan pendekatan inovatif untuk merancang dan merencanakan solusi andal yang sangat sesuai dengan kebutuhan dan perilaku penggunanya."
        },
        {    id:2,
            kategori:1,
            title: "Custom software development",
            text: "Kami mengembangkan perangkat lunak dengan nilai bisnis jangka panjang – disesuaikan secara unik dengan proses bisnis anda dan disesuaikan dengan kebutuhan masa depan."
        },
        {    id:3,
            kategori:1,
            title: "Enterprise software development",
            text: "Kami membangun solusi perusahaan multi-segi yang dapat dengan mudah menahan beban tertinggi, ditingkatkan seiring pertumbuhan bisnis anda, dan secara fleksibel mengakomodasi perluasan fungsional."
        },
        {    id:4,
            kategori:1,
            title: "Software product development",
            text: "Kami menciptakan produk perangkat lunak SaaS, seluler, dan desktop yang tangguh dengan UX yang hebat dan mendorong pengembangan yang bergerak cepat."
        },
        {    id:5,
            kategori:1,
            title: "Cloud development",
            text: "Kami merancang dan menghadirkan aplikasi cloud yang skalabel, portabel, dan aman serta membantu memigrasikan aplikasi dengan kompleksitas apa pun dari infrastruktur lokal ke cloud."
        },
        {   id:6,
            kategori:1,
            title: "Support and maintenance",
            text: "Kami memastikan kelancaran fungsi dan relevansi perangkat lunak anda melalui pemantauan kinerja berkelanjutan, pengoptimalan proaktif, penyelesaian masalah dengan cepat, pengiriman fitur dan integrasi baru."
        },
        {    id:7,
            kategori:1,
            title: "Legacy software modernization",
            text: "Kami mendesain ulang dan meningkatkan perangkat lunak yang ada untuk membantu anda mendapatkan solusi modern dengan biaya optimal dan gangguan minimal terhadap alur kerja bisnis."
        },
        {    id:8,
            kategori:2,
            title: "Web Portals",
            text: "Portal web yang kami buat secara otomatis mengumpulkan data dari sistem perusahaan dan menjadi sumber informasi terkini dan bantuan bagi pengguna."
        
        },
        {    id:9,
            kategori:2,
            title: "Websites",
            text: "Kami memastikan situs web kami memiliki editor halaman yang mudah digunakan untuk pengelolaan konten dinamis."
        },
        {    id:10,
            kategori:2,
            title: "Web Apps",
            text: "Kami meningkatkan efisiensi bisnis dengan menggunakan arsitektur layanan mikro yang dapat diskalakan dan memungkinkan otomatisasi tinggi pada semua proses bisnis."
        },
        {    id:11,
            kategori:2,
            title: "E-commerce",
            text: "Kami menerapkan otomatisasi cerdas untuk menyederhanakan alur kerja dan mengintegrasikan aplikasi perusahaan untuk pengoperasian yang koheren."
        },
        {    id:12,
            kategori:3,
            title: "Digital Transformation",
            text:[`a. Digital transformation consulting`,`b.	Software modernization`,`c.	Software consulting`,`d. Custom software`,`e. Cloud enablement`]      
        },
        {    id:13,
            kategori:3,
            title: "IT and Software Support",
            text: [`a. Application maintenance and support`,`b.	IT infrastructure support`,`c.	Managed IT services`,`d. Helpdesk`] 
        },
        {    id:14,
            kategori:3,
            title: "IT Service Management",
            text: [`a. ITSM consulting`,`b. Softwre QA consulting`,`c. DevOps consulting`]
        },
        {    id:15,
            kategori:3,
            title: "Cybersecurity",
            text: [`a.Cybersecurity consulting`,`b.Security testing`,`c.Managed security services`,`d.Compliance assessment & consulting`]
        },
    ])

    const item = computed(() => {        
        return descriptions.value.filter(cat => cat.kategori == route.params.id);
    });
    
</script>

<style scoped>
/* Tambahan styling opsional jika dibutuhkan */
</style>
      