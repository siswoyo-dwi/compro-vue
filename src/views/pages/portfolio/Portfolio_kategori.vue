<template>
		<div :class="arrayClass+'  flex justify-center items-center min-h-screen'">
      <div class="flex  justify-center">
        <!-- <div v-for="item in categories" :key="item.id"  class="mx-4">
            <RouterLink v-if="item.kategori_id == route.params.id" :to="`/portfolio/detail/${item.id}`" class="block bg-white shadow-lg rounded-lg p-6 text-center transform transition-transform hover:scale-105">
              <div  class="flex justify-center">
                <img :src="item.foto" alt="" class="h-24 w-auto">
              </div>
              <h6 class="mt-4 text-gray-800 font-semibold">{{ item.portfolio }}</h6>
            </RouterLink>
        </div> -->
        
        <CardPortfolio :categories_portfolio="kategori" :categories="item" :projects="projects" />

      </div>
    </div>
  </template>
  
  <script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import osbond from '../../../components/images/Osbond Gym.jpg';
import simpus from '../../../components/images/SIMPUS.jpg';
import simrs from '../../../components/images/simrs.jpg';
import livejapan from '../../../components/images/livejapan.jpg';
import simadu from '../../../components/images/simadu.jpg';
import stara from '../../../components/images/stara.jpg';
import wmsbaj from '../../../components/images/wmsbaj.jpg';
import mdclinic from '../../../components/images/mdclinic.jpg';
  const route = useRoute(); // Akses route params
  import { useI18n } from 'vue-i18n';

  const { t, locale } = useI18n();

  const categories = ref([
    // { id: 1, kategori_id: 1, portfolio: "Sistem Informasi Rumah Sakit (SIMRS)", foto: "https://fosan.id/images/fosanlogo.png" },
    // { id: 2, kategori_id: 1, portfolio: "OSBOND GYM", foto: "https://fosan.id/images/fosanlogo.png" },
    // { id: 3, kategori_id: 1, portfolio: "Sistem Informasi Manajemen Puskesmas (SIMPUS)", foto: "https://fosan.id/images/fosanlogo.png" },
    // { id: 4, kategori_id: 2, portfolio: "BPSDM", foto: "https://fosan.id/images/fosanlogo.png" },
    // { id: 5, kategori_id: 2, portfolio: "Poltekkes KEMENKES Semarang", foto: "https://fosan.id/images/fosanlogo.png" },
    // { id: 6, kategori_id: 3, portfolio: "MD CLINIC", foto: "https://fosan.id/images/fosanlogo.png" },
    // { id: 7, kategori_id: 3, portfolio: "BAJ", foto: "https://fosan.id/images/fosanlogo.png" },
    { id: 1, kategori_id: 1, portfolio: "Sistem Informasi Manajemen Puskesmas (SIMPUS)", foto: simpus },
    { id: 2, kategori_id: 1, portfolio: "Sistem Informasi Rumah Sakit (SIMRS)", foto: simrs },
    { id: 3, kategori_id: 2, portfolio: "BPSDM", foto: mdclinic },
    { id: 4, kategori_id: 2, portfolio: "Poltekkes KEMENKES Semarang", foto: simadu},
    // { id: 5, kategori_id: 3, portfolio: "Manfaat [Penjualan Tepung]", foto: "https://fosan.id/images/fosanlogo.png" },
    { id: 6, kategori_id: 3, portfolio: "Warehouse Management System Bahtera Adi Jaya", foto: wmsbaj },
    // { id: 7, kategori_id: 4, portfolio: "ERP Solutions", foto: "https://fosan.id/images/fosanlogo.png" },
    // { id: 8, kategori_id: 4, portfolio: "CRM Solutions", foto: "https://fosan.id/images/fosanlogo.png" },
    // { id: 9, kategori_id: 4, portfolio: "Corporate Finance Solutions", foto: "https://fosan.id/images/fosanlogo.png" },
    // { id: 10, kategori_id: 4, portfolio: "HR Management Solutions", foto: "https://fosan.id/images/fosanlogo.png" },
    // { id: 11, kategori_id: 4, portfolio: "Project Management Solutions", foto: "https://fosan.id/images/fosanlogo.png" },
    // { id: 12, kategori_id: 4, portfolio: "Document Management Solutions", foto: "https://fosan.id/images/fosanlogo.png" },
    { id: 13, kategori_id: 1, portfolio: "OSBOND GYM", foto:osbond},
    { id: 14, kategori_id: 2, portfolio: "Live English Japan", foto: livejapan  },
    { id: 15, kategori_id: 4, portfolio: "STARA", foto: stara  },

  ]);
  const projects =computed(()=> [
{ id: 13, kategori_id: 1, portfolio: t('OSBOND.portfolio'), foto:osbond, technologies: ['Vue.js', 'PostgreSQL', 'Node.js'] ,description:t('OSBOND.description'),modul:{text:t('OSBOND.modul.text'),list:[]},integrasi:{text:'',list:[]},fitur:{text:'',list:[]},kelebihan:{text:t("OSBOND.kelebihan.text"),list:[
  {text:t("OSBOND.kelebihan[0].text"),list:t("OSBOND.kelebihan[0].list[0].name")},
  {text:t("OSBOND.kelebihan[1].text"),list:t("OSBOND.kelebihan[1].list[0].name")},
  {text:t("OSBOND.kelebihan[2].text"),list:t("OSBOND.kelebihan[2].list[0].name")},
  {text:t("OSBOND.kelebihan[3].text"),list:t("OSBOND.kelebihan[3].list[0].name")},

]},},
    { id: 1, kategori_id: 1, portfolio: t('simpus.portfolio'), foto: simpus , technologies: ['Vue.js', 'PostgreSQL', 'Node.js'] ,description:t('simpus.description'),modul:{text:t('simpus.modul.text'),list:[{
      name:t('simpus.modul.list[0].name')},{
      name:t('simpus.modul.list[1].name')},{
      name:t('simpus.modul.list[2].name')},{
      name:t('simpus.modul.list[3].name')},{
      name:t('simpus.modul.list[4].name')},{
      name:t('simpus.modul.list[5].name')},{
      name:t('simpus.modul.list[6].name')},{
      name:t('simpus.modul.list[7].name')},{
      name:t('simpus.modul.list[8].name')},{
      name:t('simpus.modul.list[9].name')},{
      name:t('simpus.modul.list[10].name')},{
      name:t('simpus.modul.list[11].name')},{
      name:t('simpus.modul.list[12].name')},{
      name:t('simpus.modul.list[13].name')},{
      name:t('simpus.modul.list[14].name')},{
      name:t('simpus.modul.list[15].name')},{
      name:t('simpus.modul.list[16].name')},
      ]},integrasi:{text:t('simpus.integrasi.text'),
      list:[
        t('simpus.integrasi.list[0]'),
        t('simpus.integrasi.list[1]'),
        t('simpus.integrasi.list[2]'),
        t('simpus.integrasi.list[3]')
      ]},fitur:{
        text:t('simpus.fitur.text'),
        list:[
        t('simpus.fitur.list[0].name'),
        t('simpus.fitur.list[1].name'),
        t('simpus.fitur.list[2].name'),
        ]},kelebihan:{text:t('simpus.kelebihan.text'),list:[
          {text:t("simpus.kelebihan[0].text"),list:t("simpus.kelebihan[0].list[0].name")},
          {text:t("simpus.kelebihan[1].text"),list:t("simpus.kelebihan[1].list[0].name")},
          {text:t("simpus.kelebihan[2].text"),list:t("simpus.kelebihan[2].list[0].name")},
          {text:t("simpus.kelebihan[3].text"),list:t("simpus.kelebihan[3].list[0].name")},

        ]}},
    { id: 2, kategori_id: 1, portfolio:  t('simrs.portfolio'), foto: simrs , technologies: ['Vue.js', 'PostgreSQL', 'Node.js'] ,description:t('simrs.description'),
    modul:{text:t('simrs.modul.text'),list:[
  {
    name:  t('simrs.modul.list[0].name'),
    description:  t('simrs.modul.list[0].description')
  },
  {
    name:  t('simrs.modul.list[1].name'),
    description:  t('simrs.modul.list[1].description'),
     subModules: [
      {
        name: t('simrs.modul.list[1].subModules[0].name')
      },
      {
        name: t('simrs.modul.list[1].subModules[1].name')
      },
      {
        name: t('simrs.modul.list[1].subModules[2].name')
      },
      {
        name: t('simrs.modul.list[1].subModules[3].name')
      },
      {
        name: t('simrs.modul.list[1].subModules[4].name'),
        description: t('simrs.modul.list[1].subModules[4].description')
      },
      {
        name: t('simrs.modul.list[1].subModules[5].name'),
        description: t('simrs.modul.list[1].subModules[5].description')
      },
      {
        name: t('simrs.modul.list[1].subModules[6].name'),
        description: t('simrs.modul.list[1].subModules[6].description')
      },
      {
        name: t('simrs.modul.list[1].subModules[7].name'),
        description: t('simrs.modul.list[1].subModules[7].description')
      },
      {
        name: t('simrs.modul.list[1].subModules[8].name'),
        description: t('simrs.modul.list[1].subModules[8].description')
      },
      {
        name: t('simrs.modul.list[1].subModules[9].name'),
        description: t('simrs.modul.list[1].subModules[9].description')
      },
      {
        name: t('simrs.modul.list[1].subModules[10].name'),
        description: t('simrs.modul.list[1].subModules[10].description')
      },
      {
        name: t('simrs.modul.list[1].subModules[11].name'),
      }
    ]
  },
  {
    name:  t('simrs.modul.list[2].name'),
    subModules: [
      {
        name:  t('simrs.modul.list[2].subModules[0].name'),
        description:  t('simrs.modul.list[2].subModules[0].description'),
      },
      {
        name:  t('simrs.modul.list[2].subModules[1].name'),
        description:  t('simrs.modul.list[2].subModules[1].description'),
     },
      {
        name:  t('simrs.modul.list[2].subModules[2].name'),
        description:  t('simrs.modul.list[2].subModules[2].description'),
      },
      {
        name:  t('simrs.modul.list[2].subModules[3].name'),
        description:  t('simrs.modul.list[2].subModules[3].description'),
      },
      {
        name:  t('simrs.modul.list[2].subModules[4].name'),
        description:  t('simrs.modul.list[2].subModules[4].description'),
     },
      {
        name:  t('simrs.modul.list[2].subModules[5].name'),
        description:  t('simrs.modul.list[2].subModules[5].description'),
     }
    ]
  },
  {
    name:  t('simrs.modul.list[3].name'),
    description:  t('simrs.modul.list[3].description'),
    subModules: [
      { name: "V-Claim" },
      { name: "Aplicare" },
      { name: "Mobile JKN" },
      { name: "I-Care" }
    ]
  },
  {
    name:  t('simrs.modul.list[4].name'),
    description:  t('simrs.modul.list[4].description'),
  },
  {
    name:  t('simrs.modul.list[5].name'),
    description:  t('simrs.modul.list[5].description'),
  },
]}
,integrasi:{text:'',list:[]},fitur:{text:'',list:[]},kelebihan:{text:t('simrs.kelebihan.text'),list:[
  {text:t("simrs.kelebihan[0].text"),list:t("simrs.kelebihan[0].list[0].name")},
  {text:t("simrs.kelebihan[1].text"),list:t("simrs.kelebihan[1].list[0].name")},
  {text:t("simrs.kelebihan[2].text"),list:t("simrs.kelebihan[2].list[0].name")},
  {text:t("simrs.kelebihan[3].text"),list:t("simrs.kelebihan[3].list[0].name")},

]},},
    { id: 3, kategori_id: 2, portfolio:  t('BPSDM.portfolio'), foto: mdclinic , technologies: ['Vue.js', 'PostgreSQL', 'Node.js'] ,description:'',modul:{text:'',list:[]},integrasi:{text:'',list:[]},fitur:{text:'',list:[]},kelebihan:{text:t('BPSDM.kelebihan.text'),list:[
  {text:t("BPSDM.kelebihan[0].text"),list:t("BPSDM.kelebihan[0].list[0].name")},
  {text:t("BPSDM.kelebihan[1].text"),list:t("BPSDM.kelebihan[1].list[0].name")},
  {text:t("BPSDM.kelebihan[2].text"),list:t("BPSDM.kelebihan[2].list[0].name")},

]},},
    { id: 4, kategori_id: 2, portfolio: t('Simadu.portfolio'), foto: simadu , technologies: ['Vue.js', 'PostgreSQL', 'Node.js'] ,description:t('Simadu.description'),modul:{text:t('Simadu.modul.text'),list:[ {
      name: t('Simadu.modul.list[0].name'),
      description:t('Simadu.modul.list[0].description') },{
      name:  t('Simadu.modul.list[1].name'),
      description:t('Simadu.modul.list[1].description')  },{
      name:  t('Simadu.modul.list[2].name'),
      description:t('Simadu.modul.list[2].description') },{
      name:  t('Simadu.modul.list[3].name'),
      description:`fitur yang memudahkan pengguna mengelola dan menampilkan data mata kuliah, substansi kuliah, kurikulum, mata kuliah kurikulum, kelas kuliah, jadwal perkuliahan, jadwal UAT, jadwal UAS, dan paket KRS. `
    },{
      name:  t('Simadu.modul.list[4].name'),
      description:t('Simadu.modul.list[4].description') },{
      name:  t('Simadu.modul.list[5].name'),
      description:t('Simadu.modul.list[5].description') },{
      name: t('Simadu.modul.list[6].name'),
      description:t('Simadu.modul.list[6].description')  },{
      name:  t('Simadu.modul.list[7].name'),
      description:t('Simadu.modul.list[7].description') },{
      name:  t('Simadu.modul.list[8].name'),
      description:t('Simadu.modul.list[8].description')  },{
      name:  t('Simadu.modul.list[9].name'),
      description:t('Simadu.modul.list[9].description') }
  ]},integrasi:{text:'',list:[]},fitur:{text:'',list:[]},kelebihan:{text:t('simrs.kelebihan.text'),list:[
  {text:t("simrs.kelebihan[0].text"),list:t("simrs.kelebihan[0].list[0].name")},
  {text:t("simrs.kelebihan[1].text"),list:t("simrs.kelebihan[1].list[0].name")},
  {text:t("simrs.kelebihan[2].text"),list:t("simrs.kelebihan[2].list[0].name")},
  {text:t("simrs.kelebihan[3].text"),list:t("simrs.kelebihan[3].list[0].name")},

]}},
    { id: 14, kategori_id: 2, portfolio: t('live_japan.portfolio'), foto: livejapan , technologies: ['Vue.js', 'PostgreSQL', 'Node.js'] ,description:t('live_japan.description'),modul:{text:t('live_japan.modul.text'),list:[ 
    {
      name: t('live_japan.modul.list[0].name'),
      description:t('live_japan.modul.list[0].description')
    },
    {
      name:t('live_japan.modul.list[1].name'),
      description:t('live_japan.modul.list[1].description')},
    {
      name: t('live_japan.modul.list[2].name'),
      description:t('live_japan.modul.list[2].description')},
    {
      name:t('live_japan.modul.list[3].name'),
      description:t('live_japan.modul.list[3].description')},
    {
      name: t('live_japan.modul.list[4].name'),
      description:t('live_japan.modul.list[4].description')},
    {
      name:t('live_japan.modul.list[5].name'),
      description:t('live_japan.modul.list[5].description')},
    {
      name: t('live_japan.modul.list[6].name'),
      description:t('live_japan.modul.list[6].description')},
    {
      name: t('live_japan.modul.list[7].name'),
      description:t('live_japan.modul.list[7].description')},
    
  ]},integrasi:{text:'',list:[]},fitur:{text:'',list:[]},kelebihan:{text:t('live_japan.kelebihan.text'),list:[
  {text:t("live_japan.kelebihan[0].text"),list:t("live_japan.kelebihan[0].list[0].name")},
  {text:t("live_japan.kelebihan[1].text"),list:t("live_japan.kelebihan[1].list[0].name")},
  {text:t("live_japan.kelebihan[2].text"),list:t("live_japan.kelebihan[2].list[0].name")},
  {text:t("live_japan.kelebihan[3].text"),list:t("live_japan.kelebihan[3].list[0].name")},

]}},
//     { id: 5, kategori_id: 3, portfolio:  t('Manfaat.portfolio'), foto: "https://fosan.id/images/fosanlogo.png" , technologies: ['Vue.js', 'PostgreSQL', 'Node.js'] ,description:'',modul:{text:'',list:[]},integrasi:{text:'',list:[]},fitur:{text:'',list:[]},kelebihan:{text:t('Manfaat.kelebihan.text'),list:[
//   {text:t("Manfaat.kelebihan[0].text"),list:t("Manfaat.kelebihan[0].list[0].name")},
//   {text:t("Manfaat.kelebihan[1].text"),list:t("Manfaat.kelebihan[1].list[0].name")},
//   {text:t("Manfaat.kelebihan[2].text"),list:t("Manfaat.kelebihan[2].list[0].name")},
//   {text:t("Manfaat.kelebihan[3].text"),list:t("Manfaat.kelebihan[3].list[0].name")},

// ]}},
    { id: 6, kategori_id: 3, portfolio:  t('wms.portfolio') ,foto: wmsbaj , technologies: ['Vue.js', 'PostgreSQL', 'Node.js'] ,description:'',modul:{text:'',list:[]},integrasi:{text:'',list:[]},fitur:{text:'',list:[]},
    kelebihan:{text:t('wms.kelebihan.text'),list:[
  {text:t("wms.kelebihan[0].text"),list:t("wms.kelebihan[0].list[0].name")},
  {text:t("wms.kelebihan[1].text"),list:t("wms.kelebihan[1].list[0].name")},
  {text:t("wms.kelebihan[2].text"),list:t("wms.kelebihan[2].list[0].name")},
  {text:t("wms.kelebihan[3].text"),list:t("wms.kelebihan[3].list[0].name")},

]}},
    { id: 15, kategori_id: 4, portfolio: t('STARA.portfolio'), foto: stara , technologies: ['Vue.js', 'PostgreSQL', 'Node.js'] ,description:t('STARA.description'),modul:{text:t('STARA.modul.text'),list:[
    {
      name: t('STARA.modul.list[0].name'),
      description:t('STARA.modul.list[0].description') },{
      name: t('STARA.modul.list[1].name'),
      description:t('STARA.modul.list[1].description') },{
      },{
      name:t('STARA.modul.list[2].name'),
      description:t('STARA.modul.list[2].description') },{
      },{
      name: t('STARA.modul.list[3].name'),
      description:t('STARA.modul.list[3].description') },{
      },{
      name: t('STARA.modul.list[4].name'),
      description:t('STARA.modul.list[4].description') },{
      },{
      name: t('STARA.modul.list[5].name'),
      description:t('STARA.modul.list[5].description') },{
       },

    ]},integrasi:{text:'',list:[]},fitur:{text:'',list:[]},kelebihan:{text:t('STARA.kelebihan.text'),list:[
  {text:t("STARA.kelebihan[0].text"),list:t("STARA.kelebihan[0].list[0].name")},
  {text:t("STARA.kelebihan[1].text"),list:t("STARA.kelebihan[1].list[0].name")},
  {text:t("STARA.kelebihan[2].text"),list:t("STARA.kelebihan[2].list[0].name")},
  {text:t("STARA.kelebihan[3].text"),list:t("STARA.kelebihan[3].list[0].name")},

]}},
  ]);
  const categories_portfolio = ref([]);
  import Healthcare from '../../../components/images/Healthcare.jpg';
  import Human_Resource from '../../../components/images/Human Resource.jpg';
  import Learning_Management_System from '../../../components/images/Learning Management System.jpg';
  import Warehouse_Management_System from '../../../components/images/Warehouse Management System.jpg';
  const updateCategories = () => {    
    categories_portfolio.value = [
      { id: 1, kategori: t('kategori.hospitality'), foto: Healthcare },
      { id: 2, kategori: t('kategori.education'), foto: Learning_Management_System },
      { id: 3, kategori: t('kategori.WMS'), foto: Warehouse_Management_System },
      { id: 4, kategori: t('kategori.HR'), foto:Human_Resource }
    ];

  };
  updateCategories()
  let kategori = computed(()=> {return categories_portfolio.value.filter(cat => cat.id == route.params.id) })
    const item = computed(() => {
    return categories.value.filter(cat => cat.kategori_id == route.params.id);
  });
    const arrayClass = computed(() => item.value.length > 4 ? 'more-than-four' : '');
  </script>
  
  <style scoped>
    .more-than-four {
      margin-top: 150px; 
    }
  </style>
  