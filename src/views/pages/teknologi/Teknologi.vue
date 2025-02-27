<template>
    <div class="container mt-36 mx-auto px-6 py-10 bg-gradient-to-r from-gray-300 to-yellow-500 dark:from-slate-900 dark:to-blue-800 ">
      <h2 class="text-2xl font-semibold text-blue-800 mb-6">Technologies and Platforms We Work With</h2>
  
      <div class="bg-blue-100 p-6 rounded-lg relative">
        <!-- Web Development -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-blue-900">Web</h3>
  
          <!-- Backend -->
          <h4 class="text-sm text-gray-600 mt-2">BACK END</h4>
          <div class="flex flex-wrap gap-4 mt-2">
            <TechCard v-for="(backend, index) in backend" :key="index"  :name="backend.name"
              :img="backend.img"  :desc="backend.desc" :experience="backend.experience"  :workforce="backend.workforce" />
          </div>
  
          <!-- Frontend -->
          <h4 class="text-sm text-gray-600 mt-4">FRONT END</h4>
          <div class="flex flex-wrap gap-4 mt-2" >
              <TechCard v-for="(frontend, index) in frontend" :key="index"  :name="frontend.name"
              :img="frontend.img"  :desc="frontend.desc" :experience="frontend.experience"  :workforce="frontend.workforce" />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";

    const frontend = ref([
  { name: "HTML5", img: "https://www.scnsoft.com/technologies-logos/front-end/html.svg" , desc:'  Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati nam facere nobis illum quidem iusto architecto animi, sunt temporibus ipsa accusantium quo voluptatem alias ex excepturi aliquid illo, corrupti commodi!' },
  { name: "CSS", img: "https://www.scnsoft.com/technologies-logos/front-end/css.svg"  , desc:`Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat qui quo, corrupti esse itaque in eos aspernatur nobis odit libero aliquid neque dolore voluptates illum a, inventore doloremque, dolorum totam.`},
  { name: "Vue.js", img: "https://www.scnsoft.com/technologies-logos/front-end/vuejs-logo.svg" , desc:`Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate nihil non praesentium obcaecati? Eveniet accusamus quas consequuntur aperiam porro consectetur optio. Non commodi earum sed minima? Cupiditate ratione nesciunt voluptate!`},	
]);
const backend =ref([
  {name:"Node js",img:"https://www.scnsoft.com/technologies-logos/back-end/node-js-logo-small.svg",desc:"",experience:"",workforce:""},
  {name:"JavaScript",img:"	https://www.scnsoft.com/technologies-logos/front-end/javascript-logo.svg",desc:"",experience:"",workforce:""},
  {name:"AI",img:"	https://www.scnsoft.com/blue-outline-icons/ai.svg",desc:"",experience:"",workforce:""}

])
  </script>
  