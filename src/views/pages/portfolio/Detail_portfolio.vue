<template>
  <div class="flex justify-center items-start min-h-screen pt-20 px-4">
    <div v-if="project" class="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6 mt-20">
      <!-- Gambar Proyek -->
      <div
        ref="scrollContainer"
        class="h-[25vh] overflow-auto border rounded-xl cursor-grab active:cursor-grabbing"
        @mousedown="startDrag"
        @mousemove="onDrag"
        @mouseup="stopDrag"
        @mouseleave="stopDrag"
        @touchstart="startDrag"
        @touchmove="onDrag"
        @touchend="stopDrag"
      >
        <div class="w-[2000px] h-[1500px] flex items-center justify-center relative">
          <img :src="project.foto" ref="imageRef" alt="Project Image" class="pointer-events-none object-contain" />
        </div>
      </div>

      <!-- Judul dan Kategori -->
      <div class="flex items-center justify-between mt-6 mb-4">
        <div>
          <h1 class="text-2xl font-bold text-black font-sans">{{ project.portfolio }}</h1>
          <p class="text-sm text-gray-600 font-sans">Kategori: {{ categoryName }}</p>
        </div>
        <router-link :to="`/portfolio/kategori/${project.kategori_id}`" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm transition">
          {{ back }}
        </router-link>
      </div>

      <!-- Deskripsi Proyek -->
      <p class="text-sm text-gray-700 mb-6 leading-relaxed font-sans">{{ project.description }}</p>

      <!-- Hubungi & Modul -->
      <a href="https://api.whatsapp.com/send/?phone=6282227470745" class="inline-block px-4 py-2 mb-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm transition">
        Hubungi Kami
      </a>
      <p class="text-xl text-gray-700 font-sans font-semibold mb-4">{{ project.modul.text }}</p>

      <div v-for="(idx, index) in project.modul.list" :key="index" class="mb-4">
        <p class="text-black font-sans font-medium">{{ index + 1 }}. {{ idx.name }}</p>
        <p class="text-black font-sans">{{ idx.description }}</p>
        <div v-for="(sub, subIndex) in idx.subModules" :key="subIndex" class="ml-6 text-gray-700">
          <p class="font-sans">- {{ sub.name }}</p>
        </div>
      </div>

      <!-- Kelebihan -->
      <p class="text-xl text-gray-700 font-sans font-semibold mb-4">{{ project.kelebihan.text }}</p>

      <div v-for="(item, index) in project.kelebihan.list" :key="index" class="mb-4">
        <p class="text-black font-sans font-medium">{{ index + 1 }}. {{ item.name || item }}</p>
        <p v-if="item.description" class="text-black font-sans">{{ item.description }}</p>
        <div v-if="item.subModules" v-for="(sub, subIndex) in item.subModules" :key="subIndex" class="ml-6 text-gray-700">
          <p class="font-sans">- {{ sub.name }}</p>
        </div>
      </div>

      <!-- Teknologi yang Digunakan -->
      <div>
        <h3 class="text-md font-semibold mb-4 text-black">Teknologi yang Digunakan:</h3>
        <div class="grid grid-cols-2 gap-3">
          <div v-for="(tech, index) in project.technologies" :key="index" class="bg-gray-100 p-3 rounded-lg shadow-sm text-center text-black text-xs font-medium">
            {{ tech }}
          </div>
        </div>
      </div>
    </div>

    <!-- Jika Data Tidak Ditemukan -->
    <div v-else class="text-center text-red-500 mt-20">
      <h2 class="text-lg font-semibold">Proyek tidak ditemukan.</h2>
    </div>
  </div>
</template>


<script setup>
import { ref, computed , nextTick ,onMounted  } from 'vue';
import { useRoute } from 'vue-router';
import osbond from '../../../components/images/Osbond Gym.jpg';
import simpus from '../../../components/images/SIMPUS.jpg';
import simrs from '../../../components/images/simrs.jpg';
import livejapan from '../../../components/images/livejapan.jpg';
import simadu from '../../../components/images/simadu.jpg';
import stara from '../../../components/images/stara.jpg';
import wmsbaj from '../../../components/images/wmsbaj.jpg';
import mdclinic from '../../../components/images/mdclinic.jpg';


const scrollContainer = ref(null)
const imageRef = ref(null)

let isDragging = false
let startX, startY
let scrollLeft, scrollTop

const startDrag = (e) => {
  isDragging = true
  startX = e.pageX || e.touches[0].pageX
  startY = e.pageY || e.touches[0].pageY
  scrollLeft = scrollContainer.value.scrollLeft
  scrollTop = scrollContainer.value.scrollTop
}

const onDrag = (e) => {
  if (!isDragging) return
  e.preventDefault()
  const x = e.pageX || e.touches[0].pageX
  const y = e.pageY || e.touches[0].pageY
  const walkX = (x - startX)
  const walkY = (y - startY)
  scrollContainer.value.scrollLeft = scrollLeft - walkX
  scrollContainer.value.scrollTop = scrollTop - walkY
}

const stopDrag = () => {
  isDragging = false
}

// Scroll ke tengah saat pertama kali dimuat
onMounted(() => {
  nextTick(() => {
    const container = scrollContainer.value
    container.scrollLeft = (container.scrollWidth - container.clientWidth) / 2
    container.scrollTop = (container.scrollHeight - container.clientHeight) / 2
  })
})
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n();
const projects =computed(()=> [
{ id: 13, kategori_id: 1, portfolio: t('OSBOND.portfolio'), foto:osbond, technologies: ['Vue.js', 'PostgreSQL', 'Node.js'] ,description:t('OSBOND.description'),modul:{text:t('OSBOND.modul.text'),list:[]},integrasi:{text:'',list:[]},fitur:{text:'',list:[]},kelebihan:{text:t('OSBOND.kelebihan.text'),list:[]},},
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
        ]},kelebihan:{
        text:t('simpus.kelebihan.text'),
        list:[
        t('simpus.kelebihan.list[0].name'),
        t('simpus.kelebihan.list[1].name')]},},
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
,integrasi:{text:'',list:[]},fitur:{text:'',list:[]},kelebihan:{text:'',list:[]},},
    { id: 3, kategori_id: 2, portfolio:  t('BPSDM.portfolio'), foto: mdclinic , technologies: ['Vue.js', 'PostgreSQL', 'Node.js'] ,description:'',modul:{text:'',list:[]},integrasi:{text:'',list:[]},fitur:{text:'',list:[]},kelebihan:{text:'',list:[]},},
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
  ]},integrasi:{text:'',list:[]},fitur:{text:'',list:[]},kelebihan:{text:t('Simadu.kelebihan.text') ,list:[
    {
      name: t('Simadu.kelebihan.list[0].name'),
      description:t('Simadu.kelebihan.list[0].description')
    },{
      name: t('Simadu.kelebihan.list[1].name'),
      description:t('Simadu.kelebihan.list[1].description')
    },{
      name: t('Simadu.kelebihan.list[2].name'),
      description:t('Simadu.kelebihan.list[2].description')
    }]},},
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
    
  ]},integrasi:{text:'',list:[]},fitur:{text:'',list:[]},kelebihan:{text: t('live_japan.kelebihan.text'),list:[
     t('live_japan.kelebihan.list[0].name'),

     t('live_japan.kelebihan.list[1].name'),

     t('live_japan.kelebihan.list[2].name'),
   ]},},
    { id: 5, kategori_id: 3, portfolio:  t('Manfaat.portfolio'), foto: "https://fosan.id/images/fosanlogo.png" , technologies: ['Vue.js', 'PostgreSQL', 'Node.js'] ,description:'',modul:{text:'',list:[]},integrasi:{text:'',list:[]},fitur:{text:'',list:[]},kelebihan:{text:'',list:[]},},
    { id: 6, kategori_id: 3, portfolio:  t('wms.portfolio') ,foto: wmsbaj , technologies: ['Vue.js', 'PostgreSQL', 'Node.js'] ,description:'',modul:{text:'',list:[]},integrasi:{text:'',list:[]},fitur:{text:'',list:[]},kelebihan:{text:'',list:[]},},
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

    ]},integrasi:{text:'',list:[]},fitur:{text:'',list:[]},kelebihan:{text: t('STARA.kelebihan.text'),list:[{
      name:  t('STARA.kelebihan.list[0].name'),
      description: t('STARA.kelebihan.list[0].description')
    },{
      name:t('STARA.kelebihan.list[1].name'),
      description:t('STARA.kelebihan.list[1].description') },{
      name:t('STARA.kelebihan.list[2].name'),
      description:t('STARA.kelebihan.list[2].description') },{
      name: t('STARA.kelebihan.list[3].name'),
      description:t('STARA.kelebihan.list[3].description')}]},},
  ]);

// Data Kategori Dummy
const categories = computed(()=>[
      { id: 1, kategori: t('kategori.hospitality') },
      { id: 2, kategori: t('kategori.education')},
      { id: 3, kategori: t('kategori.WMS')},
      { id: 4, kategori: t('kategori.HR')}
]);
const back = computed(()=> t('kembali') );
// Ambil parameter dari URL
const route = useRoute();
const projectId = parseInt(route.params.id);

// Cari proyek berdasarkan ID
const project = computed(() => projects.value.find(p => p.id === projectId));
console.log(project.value.modul);

// Cari nama kategori berdasarkan kategori_id proyek
const categoryName = computed(() => {
  const category = categories.value.find(c => c.id === project.value?.kategori_id);
  return category ? category.kategori : 'Kategori Tidak Ditemukan';
});
</script>
