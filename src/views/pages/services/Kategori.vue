<template>
    <section class="mt-36">
        <KategoriService :descriptions="item"/>
    </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute(); // Akses route params
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n();

const descriptions = computed(()=>[
        {   id:1,
            kategori:1,
            title: t("layanan.desk_job[0].title"),
            text: t("layanan.desk_job[0].text"),
        },
        {    id:2,
            kategori:1,
            title: t("layanan.desk_job[1].title"),
            text: t("layanan.desk_job[1].text"),},
        {    id:3,
            kategori:1,
            title: t("layanan.desk_job[2].title"),
            text: t("layanan.desk_job[2].text"), 
            },
        {    id:4,
            kategori:1,
            title: t("layanan.desk_job[3].title"),
            text: t("layanan.desk_job[3].text"),
            },
        {    id:5,
            kategori:1,
            title: t("layanan.desk_job[4].title"),
            text: t("layanan.desk_job[4].text"),
           },
        {   id:6,
            kategori:1,
            title: t("layanan.desk_job[5].title"),
            text: t("layanan.desk_job[5].text"), 
            },
        {    id:7,
            kategori:1,
            title: t("layanan.desk_job[6].title"),
            text: t("layanan.desk_job[6].text"), 
          },
        {    id:8,
            kategori:2,
            title: t("layanan.desk_job[7].title"),
            text: t("layanan.desk_job[7].text"), 
        },
        {    id:9,
            kategori:2,
            title: t("layanan.desk_job[8].title"),
            text: t("layanan.desk_job[8].text"), 
           },
        {    id:10,
            kategori:2,
            title: t("layanan.desk_job[9].title"),
            text: t("layanan.desk_job[9].text"),
            },
        {    id:11,
            kategori:2,
            title: t("layanan.desk_job[10].title"),
            text: t("layanan.desk_job[10].text")},
        {    id:12,
            kategori:3,
            title: t("layanan.desk_job[11].title"),
            text: [t("layanan.desk_job[11].text.a"),t("layanan.desk_job[11].text.b"),t("layanan.desk_job[11].text.c"),t("layanan.desk_job[11].text.d"),t("layanan.desk_job[11].text.e"),]},
          {    id:13,
            kategori:3,
            title: t("layanan.desk_job[12].title"),
            text: [t("layanan.desk_job[12].text.a"),t("layanan.desk_job[12].text.b"),t("layanan.desk_job[12].text.c"),t("layanan.desk_job[12].text.d")]},
      
       {    id:14,
            kategori:3,
            title: t("layanan.desk_job[13].title"),
            text: [t("layanan.desk_job[13].text.a"),t("layanan.desk_job[13].text.b"),t("layanan.desk_job[13].text.c")]},
   
        {    id:15,
            kategori:3,
            title: t("layanan.desk_job[14].title"),
            text: [t("layanan.desk_job[14].text.a"),t("layanan.desk_job[14].text.b"),t("layanan.desk_job[14].text.c"),t("layanan.desk_job[14].text.d")]}
   
    ])

    const item = computed(() => {        
        return descriptions.value.filter(cat => cat.kategori == route.params.id);
    });
    
</script>

<style scoped>
/* Tambahan styling opsional jika dibutuhkan */
</style>
      