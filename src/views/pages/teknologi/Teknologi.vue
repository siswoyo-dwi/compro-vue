<template>
    <div class="container mt-36 mx-auto px-6 py-10 bg-gradient-to-r from-gray-300 to-yellow-500 dark:from-slate-900 dark:to-blue-800 ">
      <h2 class="text-2xl font-semibold  mb-6">{{ penggunaan_teknologi }}</h2>
  
      <div class="bg-blue-100 p-6 rounded-lg relative">
        <!-- Web Development -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-blue-800">WEB</h3>
  
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
          <!-- Mobile -->
          <h4 class="text-sm text-gray-600 mt-4">MOBILE</h4>
          <div class="flex flex-wrap gap-4 mt-2" >
              <TechCard v-for="(mobile, index) in mobile" :key="index"  :name="mobile.name"
              :img="mobile.img"  :desc="mobile.desc" :experience="mobile.experience"  :workforce="mobile.workforce" />
          </div>
          <!-- Platforms -->
          <h4 class="text-sm text-gray-600 mt-4">PLATFORMS</h4>
          <div class="flex flex-wrap gap-4 mt-2" >
              <TechCard v-for="(platforms, index) in platforms" :key="index"  :name="platforms.name"
              :img="platforms.img"  :desc="platforms.desc" :experience="platforms.experience"  :workforce="platforms.workforce" />
          </div>
          
          <!-- Clouds -->
          <h4 class="text-sm text-gray-600 mt-4">CLOUDS</h4>
          <div class="flex flex-wrap gap-4 mt-2" >
              <TechCard v-for="(cloud, index) in cloud" :key="index"  :name="cloud.name"
              :img="cloud.img"  :desc="cloud.desc" :experience="cloud.experience"  :workforce="cloud.workforce" />
          </div>
           <!-- Relational databases / data storages -->
           <h4 class="text-sm text-gray-600 mt-4">RELATIONAL DATABASE / DATA STORAGES</h4>
          <div class="flex flex-wrap gap-4 mt-2" >
              <TechCard v-for="(database, index) in database" :key="index"  :name="database.name"
              :img="database.img"  :desc="database.desc" :experience="database.experience"  :workforce="database.workforce" />
          </div>
          <h3 class="text-lg font-semibold mt-9 text-blue-800">Machine learning</h3>

          <!-- Frameworks -->
          <h4 class="text-sm text-gray-600 mt-4">FRAMEWORKS</h4>
          <div class="flex flex-wrap gap-4 mt-2" >
              <TechCard v-for="(frameworks, index) in frameworks" :key="index"  :name="frameworks.name"
              :img="frameworks.img"  :desc="frameworks.desc" :experience="frameworks.experience"  :workforce="frameworks.workforce" />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref,computed } from "vue";
  import { useI18n } from 'vue-i18n';
  const { t, locale } = useI18n();
  const penggunaan_teknologi = computed(()=>t('penggunaan_teknologi'))

    const frontend = ref([
  { name: "", img: "https://www.scnsoft.com/technologies-logos/front-end/html.svg" , desc:'  Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati nam facere nobis illum quidem iusto architecto animi, sunt temporibus ipsa accusantium quo voluptatem alias ex excepturi aliquid illo, corrupti commodi!' },
  { name: "", img: "https://www.scnsoft.com/technologies-logos/front-end/css.svg"  , desc:`Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat qui quo, corrupti esse itaque in eos aspernatur nobis odit libero aliquid neque dolore voluptates illum a, inventore doloremque, dolorum totam.`},
  { name: "", img: "https://www.scnsoft.com/technologies-logos/front-end/vuejs-logo.svg" , desc:`Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate nihil non praesentium obcaecati? Eveniet accusamus quas consequuntur aperiam porro consectetur optio. Non commodi earum sed minima? Cupiditate ratione nesciunt voluptate!`},	
  { name: "", img: "https://www.scnsoft.com/technologies-logos/front-end/angular-logo.svg" , desc:'' },
  { name: "", img: "https://www.scnsoft.com/technologies-logos/front-end/meteor.svg" , desc:'' },
  { name: "", img: "https://www.scnsoft.com/technologies-logos/front-end/react-js-logo.svg" , desc:'' },
  { name: "", img: "https://www.scnsoft.com/technologies-logos/front-end/ember-logo.svg" , desc:'' },

]);
const backend =ref([
  {name:"",img:"https://www.scnsoft.com/technologies-logos/back-end/node-js-logo-small.svg",desc:"",experience:"",workforce:""},
  {name:"",img:"https://www.scnsoft.com/technologies-logos/front-end/javascript-logo.svg",desc:"",experience:"",workforce:""},
  {name:"",img:"https://www.scnsoft.com/blue-outline-icons/ai.svg",desc:"",experience:"",workforce:""},
  { name: "", img: "https://www.scnsoft.com/technologies-logos/back-end/dot-net-logo.svg" , desc:'' },
  { name: "", img: "https://www.scnsoft.com/technologies-logos/back-end/java-logo.svg" , desc:'' },
  { name: "", img: "https://www.scnsoft.com/technologies-logos/back-end/python_1.svg" , desc:'' },
  { name: "", img: "https://www.scnsoft.com/technologies-logos/back-end/go-logo-blue.svg" , desc:'' },
  { name: "", img: "https://www.scnsoft.com/technologies-logos/back-end/php-logo.svg" , desc:'' },
  { name: "", img: "https://www.scnsoft.com/technologies-logos/back-end/c-plus-plus.svg" , desc:'' },

])
// const mobile =ref([

// { name: "", img: "https://www.scnsoft.com , desc:'' },
// { name: "", img: "https://www.scnsoft.com , desc:'' },
// { name: "", img: "https://www.scnsoft.com , desc:'' },
// { name: "", img: "https://www.scnsoft.com , desc:'' },
// { name: "", img: "https://www.scnsoft.com , desc:'' },
// { name: "", img: "https://www.scnsoft.com , desc:'' },
// { name: "", img: "https://www.scnsoft.com , desc:'' },
// { name: "", img: "https://www.scnsoft.com , desc:'' },
// ])
const mobile =ref([

{ name: "", img: "https://www.scnsoft.com/technologies-logos/mobile/ios-logo.svg" , desc:'' },
{ name: "", img: "https://www.scnsoft.com/technologies-logos/mobile/android-logo.svg" , desc:'' },
{ name: "", img: "https://www.scnsoft.com/technologies-logos/mobile/xamarin-logo-vertical.svg" , desc:'' },
{ name: "", img: "https://www.scnsoft.com/technologies-logos/mobile/cordova-logo.svg" , desc:'' },
{ name: "", img: "https://www.scnsoft.com/technologies-logos/mobile/pwa-logo.svg" , desc:'' },
{ name: "", img: "https://www.scnsoft.com/technologies-logos/mobile/react-native-logo.svg" , desc:'' },
{ name: "", img: "https://www.scnsoft.com/technologies-logos/mobile/flutter-logo.svg" , desc:'' },
])
const platforms =ref([

{ name: "", img: "https://www.scnsoft.com/technologies-logos/crm/ms-dynamics-365.svg" , desc:'' },
{ name: "", img: "https://www.scnsoft.com/technologies-logos/crm/salesforce.svg" , desc:'' },
{ name: "", img: "https://www.scnsoft.com/technologies-logos/magento-products/adobe-commerce.svg" , desc:'' },
{ name: "", img: "https://www.scnsoft.com/technologies-logos/platforms/sharepoint-logo-vertical.svg" , desc:'' },
{ name: "", img: "https://www.scnsoft.com/technologies-logos/data-visualization/power-bi-2020.svg" , desc:'' },
{ name: "", img: "https://www.scnsoft.com/technologies-logos/erp/sap.svg" , desc:'' },
{ name: "", img: "https://www.scnsoft.com/technologies-logos/information-security/qradar.svg" , desc:'' },
])
const cloud =ref([

{ name: "", img: "https://www.scnsoft.com/technologies-logos/cloud/aws.svg" , desc:'' },
{ name: "", img: "https://www.scnsoft.com/technologies-logos/cloud/azure-full.svg" , desc:'' },
{ name: "", img: "https://www.scnsoft.com/technologies-logos/cloud/google-cloud-logo.svg" , desc:'' },
{ name: "", img: "https://www.scnsoft.com/technologies-logos/cloud/digital-ocean.svg" , desc:'' },
{ name: "", img: "https://www.scnsoft.com/technologies-logos/cloud/rackspace-horizontal.svg" , desc:'' },

])
const database =ref([

{ name: "", img: "https://www.scnsoft.com/technologies-logos/databases/ms-sql.svg" , desc:'' },
{ name: "", img: "https://www.scnsoft.com/technologies-logos/databases/mysql.svg" , desc:'' },
{ name: "", img: "https://www.scnsoft.com/technologies-logos/databases/oracle.svg" , desc:'' },
{ name: "", img: "https://www.scnsoft.com/technologies-logos/databases/postgresql-vertical-logo.svg" , desc:'' },
{ name: "", img: "https://www.scnsoft.com/technologies-logos/databases/azure-synapse-analytics-logo.svg" , desc:'' },
{ name: "", img: "https://www.scnsoft.com/technologies-logos/databases/azure-sql-database-logo.svg" , desc:'' },
{ name: "", img: "https://www.scnsoft.com/technologies-logos/aws/amazon-rds.svg" , desc:'' },
])

const frameworks =ref([

{ name: "", img: "https://www.scnsoft.com/technologies-logos/frameworks/mahout-logo.svg" , desc:'' },
{ name: "", img: "https://www.scnsoft.com/technologies-logos/frameworks/caffe-logo.svg" , desc:'' },
{ name: "", img: "https://www.scnsoft.com/technologies-logos/frameworks/mxnet-logo.svg" , desc:'' },
{ name: "", img: "https://www.scnsoft.com/technologies-logos/frameworks/tensorflow-logo-vertical.svg" , desc:'' },
{ name: "", img: "https://www.scnsoft.com/technologies-logos/frameworks/keras.svg" , desc:'' },
{ name: "", img: "https://www.scnsoft.com/technologies-logos/frameworks/torch.svg" , desc:'' },
{ name: "", img: "https://www.scnsoft.com/technologies-logos/frameworks/opencv-logo.svg" , desc:'' },
{ name: "", img: "https://www.scnsoft.com/technologies-logos/libraries/theano.svg" , desc:'' },
])
</script>
  