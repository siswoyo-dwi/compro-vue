<template>
  <div class="w-full min-h-screen ">
		<!-- Swiper Slider Container -->
		<div class="bg-gradient-to-r  from-gray-300 to-yellow-500 dark:from-slate-900 dark:to-blue-800  flex justify-center items-center min-h-screen">
			<SwiperHero  :images="images"/>
			<!-- <div class="text-center max-w-3xl px-4">
				<h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mt-4">
					Pre-built AI Agents you can deploy <br> and use in minutes
				</h1>

				<p class="text-gray-600 dark:text-gray-200 text-lg mt-2">AI Agents that are ready to add to your project</p>
			</div> -->
		</div>
		<SwiperPartner  :partners="partners" />
		<div class="container mt-32 mx-auto px-6 py-12">
           <!-- Judul -->
           <h2 class="text-center text-3xl  md:text-4xl font-semibold mb-12">{{ tentang[0].tentang }}</h2>
        <!-- Kontainer utama -->
        <div class="flex flex-col  md:flex-row  gap-12">
            <!-- Bagian Teks -->
            <div class="w-full md:w-1/2  mt-[-20px]">
                <h2 class="text-3xl md:text-4xl font-bold  mb-4">{{ tentang[0].company }}</h2>
                <p class=" leading-relaxed mb-6">{{ tentang[0].deskripsi }}</p>
                <router-link :to="'/about_us'" class="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition">
                    Learn More
                </router-link >
            </div>

            <!-- Bagian Gambar -->
            <div class="w-full md:w-1/2">
                <img src="https://www.scnsoft.com/slider-presentation/boris-and-nick.jpg" alt="About Fosan" class="w-full rounded-lg shadow-lg">
            </div>
        </div>
     </div>
  <div class="container mx-auto mt-32 px-6 py-12">
    <!-- Judul -->
    <h2 class="text-center text-3xl md:text-4xl font-semibold mb-12">{{ lokasi[0].lokasi }}</h2>

    <!-- Kontainer Utama -->
    <div class="flex flex-col md:flex-row items-start gap-8 md:gap-12">
      <!-- Bagian Teks -->
      <div class="w-full md:w-1/2">
        <h3 class="text-2xl md:text-3xl font-bold">
          {{ lokasi[0].visit }}
        </h3>
        <p class="mt-4 leading-relaxed">
        </p>
        <div class="mt-6">
          <p class="font-semibold text-lg">{{ lokasi[0].alamat }}:</p>
          <p>Jl. Grafika Raya No. 9, Semarang, Indonesia</p>
        </div>
        <div class="mt-4">
 
        </div>
      </div>

      <!-- Bagian Google Maps -->
      <div class="w-full md:w-1/2">
        <iframe
          class="w-full h-64 md:h-80 rounded-lg shadow-lg"
		  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.9935891989823!2d110.419229!3d-7.0778347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708935edc32b7f%3A0x964b8d21d9444107!2sJl.%20Grafika%20Raya%20No.9%2C%20Gedawang%2C%20Kec.%20Banyumanik%2C%20Kota%20Semarang%2C%20Jawa%20Tengah%2050264!5e0!3m2!1sen!2sid!4v1708754827319!5m2!1sen!2sid" 
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  </div>

	</div>
</template>

<script setup>
import { ref,computed  } from "vue";
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n();
	const images = computed(()=>[
  { image: 'https://media.istockphoto.com/id/1296867709/id/foto/profesional-insinyur-asia-laki-laki-berdiskusi-berdiri-di-dekat-mesin-di-pabrik-dua-rekan.jpg?s=1024x1024&w=is&k=20&c=x2_FjB9EQGNZCh2CTKa0QARjnDvtAGHSSzTU2DidiC0=', title: t('running_text'), subtitle: 'Coding Bootcamp terbaik di Semarang', link: '#promo' },
  { image: 'https://t3.ftcdn.net/jpg/02/14/87/96/360_F_214879686_R3HFJlk6WLr1kcdvy6Q9rtNASKN0BZBS.jpg', title: t('running_text'), subtitle: 'Dari Nol Hingga Mahir dalam 16 Minggu', link: '#paket-web' },
  { image: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/web_developerskills.jpg', title: t('running_text'), subtitle: 'Jadilah Developer Profesional', link: '#order' }
])
//  const testimonials = ref([
//       {
//         name: "Jane Doe",
//         username: "@janedoe",
//         image: "https://randomuser.me/api/portraits/women/45.jpg",
//         feedback: "Aplikasi ini sangat membantu saya dalam bekerja, sangat mudah digunakan!",
//         date: "Feb 10, 2027"
//       },
//       {
//         name: "John Smith",
//         username: "@johnsmith",
//         feedback: "Website ini sangat profesional dan memudahkan bisnis saya berkembang.",
//         date: "Feb 15, 2027"
//       },
// 	  {
//         name: "Jane Doe",
//         username: "@janedoe",
//         image: "https://randomuser.me/api/portraits/women/45.jpg",
//         feedback: "Aplikasi ini sangat membantu saya dalam bekerja, sangat mudah digunakan!",
//         date: "Feb 10, 2027"
//       },
//       {
//         name: "John Smith",
//         username: "@johnsmith",
//         feedback: "Website ini sangat profesional dan memudahkan bisnis saya berkembang.",
//         date: "Feb 15, 2027"
//       },
// 	  {
//         name: "Jane Doe",
//         username: "@janedoe",
//         image: "https://randomuser.me/api/portraits/women/45.jpg",
//         feedback: "Aplikasi ini sangat membantu saya dalam bekerja, sangat mudah digunakan!",
//         date: "Feb 10, 2027"
//       },
//       {
//         name: "John Smith",
//         username: "@johnsmith",
//         feedback: "Website ini sangat profesional dan memudahkan bisnis saya berkembang.",
//         date: "Feb 15, 2027"
//       },
// 	  {
//         name: "Jane Doe",
//         username: "@janedoe",
//         image: "https://randomuser.me/api/portraits/women/45.jpg",
//         feedback: "Aplikasi ini sangat membantu saya dalam bekerja, sangat mudah digunakan!",
//         date: "Feb 10, 2027"
//       },
//       {
//         name: "John Smith",
//         username: "@johnsmith",
//         feedback: "Website ini sangat profesional dan memudahkan bisnis saya berkembang.",
//         date: "Feb 15, 2027"
//       }
//     ]);
const partners = ref([
  { name: "GMEDIA", logo: "https://fosan.id/images/logo_gmedia.png" , desc:'  Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati nam facere nobis illum quidem iusto architecto animi, sunt temporibus ipsa accusantium quo voluptatem alias ex excepturi aliquid illo, corrupti commodi!' },
  { name: "VANTURA", logo: "https://fosan.id/foto/1598452897234-logo.png" , desc:`Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate nihil non praesentium obcaecati? Eveniet accusamus quas consequuntur aperiam porro consectetur optio. Non commodi earum sed minima? Cupiditate ratione nesciunt voluptate!`},
  { name: "Rapier", logo: "https://fosan.id/images/template/Rapier.jpeg"  , desc:`Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat qui quo, corrupti esse itaque in eos aspernatur nobis odit libero aliquid neque dolore voluptates illum a, inventore doloremque, dolorum totam.`},
  { name: "Points", logo: "https://fosan.id/foto/1588677719797-Logo%20poiNTS%20fix%20vertikal.png"  , desc:`Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda hic minus veritatis adipisci tempora ducimus rem enim, dolorem aspernatur vero? Itaque neque eos nulla nemo saepe harum sequi rem ab!`},
  { name: "Finix 76", logo: "https://fosan.id/images/finix76.jpeg"  , desc:`Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum provident itaque, ducimus ipsam soluta praesentium dolore dolorum molestiae omnis aut voluptates sit autem eveniet minima nihil quia consequuntur non voluptatibus.`},
  { name: "Azura Labs", logo: "https://fosan.id/foto/1597229192001-Logo%20(1).png"  , desc:`Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo voluptatum in labore ratione earum neque fugit? Ad excepturi ex nam laudantium quas iste? Suscipit qui laborum reiciendis vel quaerat sunt.`},
  { name: "Company X", logo: "https://fosan.id/foto/1596498047671-Group%201.png"  , desc:`Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, nobis molestiae tempore ratione inventore vitae voluptatum magni in odio perspiciatis a minima harum itaque veritatis quo quos nesciunt! Odit, magnam.`}, 
]);
const tentang = computed(()=> [{tentang:t('company.tentang'),company:t('company.company'),deskripsi:t('company.deskripsi')}])
const lokasi =  computed(()=> [{lokasi:t('lokasi.lokasi'),visit:t('lokasi.visit'),alamat:t('lokasi.alamat')}])

</script>

<style scoped>
    .container{
        margin-top: 0px;
    }
	
</style>