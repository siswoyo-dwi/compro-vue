<template>
  <div class="w-full min-h-screen bg-white">
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

		<div class="text-center py-16 bg-gray-300 dark:bg-gray-900">
			<h2 class="text-xl font-bold ">Hiring Partner</h2>
			<p class="max-w-xl mx-auto mt-2">
			Hiring partner merupakan bagian yang sangat penting untuk memajukan ekosistem IT di Indonesia. Berikut beberapa hiring partner yang telah bekerja sama dengan kami:
			</p>

			<!-- Grid Logo Partner -->
			<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 px-4 md:px-20 place-items-center">
			<img 
				v-for="(partner, index) in partners" 
				:key="index" 
				:src="partner.logo" 
				:alt="partner.name" 
				class="h-24 max-w-[300px] object-contain"/>
			</div> 
			<!-- Tombol CTA -->
			<div class="mt-8">
			<Button>
				Gabung Menjadi Partner Kami
			</Button>
			</div>
		</div>


		<!-- <div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-200 to-gray-300">

			<div class="relative max-w-4xl p-4 rounded-3xl bg-white shadow-2xl border border-gray-300">
				<div class="relative aspect-video overflow-hidden rounded-2xl shadow-lg">
					<div class="absolute -inset-1 rounded-2xl bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

					<img src="https://mmc.tirto.id/image/otf/970x0/2021/05/25/pelanggaran-tata-ruang-di-perkotaan-antarafoto_ratio-16x9.jpg" 
						alt="Demo Image" 
						class="relative z-10 object-cover w-full h-full rounded-2xl">
				</div>
			</div>

		</div> -->
		<!-- <div class="flex flex-col items-center justify-center min-h-screen bg-gray-300 p-6">
			<h2 class="text-lg font-semibold text-gray-700 mb-4">
				How do you want to use AI Agents?
			</h2>

			<div id="filterBar" class="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md border border-gray-200">
			
				<Button class="filter-btn px-4 py-1.5 text-sm font-medium rounded-full shadow bg-gray-900 text-white">
					All
				</Button>
				<Button class="filter-btn px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 transition">
					TypeScript
				</Button>
				<Button class="filter-btn px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 transition">
					Netlify
				</Button>
				<Button class="filter-btn px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 transition">
					Vercel
				</Button>
				<Button class="filter-btn px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 transition">
					AWS
				</Button>
				<Button class="filter-btn px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 transition">
					Cloudflare
				</Button>
				<Button class="filter-btn px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 transition">
					n8n
				</Button>
			</div>

		</div> -->
		<!-- <div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-200 to-gray-300">

			<div class="relative max-w-4xl p-4 rounded-3xl bg-white shadow-2xl border border-gray-300">
				<div class="relative aspect-video overflow-hidden rounded-2xl shadow-lg">
					<div class="absolute -inset-1 rounded-2xl bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
					<img src="https://mmc.tirto.id/image/otf/970x0/2021/05/25/pelanggaran-tata-ruang-di-perkotaan-antarafoto_ratio-16x9.jpg" 
						alt="Demo Image" 
						class="relative z-10 object-cover w-full h-full rounded-2xl">
				</div>
			</div>

		</div> -->
		<!-- <div class="bg-gray-300 flex items-center justify-center min-h-screen p-6">
			<div class="bg-white rounded-4xl shadow-xl overflow-hidden max-w-4xl w-full">
				<div class="relative">
					<img src="https://mmc.tirto.id/image/otf/970x0/2021/05/25/pelanggaran-tata-ruang-di-perkotaan-antarafoto_ratio-16x9.jpg" alt="Product Image" class="w-full object-cover">
				</div>
				<div class="p-6">
					<h3 class="text-xl font-semibold text-gray-800">Contract Form Agent</h3>
					<p class="text-sm text-gray-600 mt-2">Collect emails and message with a contact form agent</p>

					<div class="flex items-center space-x-4 mt-4 text-gray-500">
						<span>🔗</span>
						<span>💬</span>
						<span>⚡</span>
					</div>
					<div class="flex items-center justify-between mt-6">
						<span class="text-xl font-semibold">$19</span>
						<Button class="bg-gray-900 text-white px-5 py-2 text-sm rounded-md shadow">Buy Now</Button>
					</div>
				</div>
				<div class="border-t px-6 py-4 text-center">
					<p class="text-sm text-gray-600 font-medium">
						Not sure which one to buy? Get them all for $45.
					</p>
					<Button class="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 text-sm rounded-md shadow">
						Get Unlimited Access
					</Button>
				</div>
			</div>

		</div> -->
		<!-- <div class="bg-[#0D1B2A] text-white flex items-center justify-center min-h-screen p-6">

			<div class="max-w-5xl w-full text-center">
				<h2 class="text-3xl font-semibold">
					Effortlessly Enhance Your Projects with Our AI <br> <span class="text-blue-400">Agents</span>
				</h2>

				<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 border-t border-gray-600 pt-8">
					<div class="border border-gray-700 p-6 rounded-lg bg-[#132238]">
						<h3 class="flex items-center space-x-2 text-lg font-semibold">
							<span>📥</span> <span>Quick Integration</span>
						</h3>
						<p class="text-gray-400 mt-2 text-sm">
							Seamlessly integrate our AI agents into your workflows with minimal effort and maximum efficiency.
						</p>
					</div>

					<div class="border border-gray-700 p-6 rounded-lg bg-[#132238]">
						<h3 class="flex items-center space-x-2 text-lg font-semibold">
							<span>🔄</span> <span>Version Control</span>
						</h3>
						<p class="text-gray-400 mt-2 text-sm">
							Keep track of changes with built-in version control, complete with bug and feature tracking.
						</p>
					</div>

					<div class="border border-gray-700 p-6 rounded-lg bg-[#132238]">
						<h3 class="flex items-center space-x-2 text-lg font-semibold">
							<span>📊</span> <span>Analytics Ready</span>
						</h3>
						<p class="text-gray-400 mt-2 text-sm">
							Easily integrate analytics to monitor performance and gain insights with our AI agents.
						</p>
					</div>

					<div class="border border-gray-700 p-6 rounded-lg bg-[#132238]">
						<h3 class="flex items-center space-x-2 text-lg font-semibold">
							<span>🛠</span> <span>Comprehensive Testing</span>
						</h3>
						<p class="text-gray-400 mt-2 text-sm">
							Ensure reliability with built-in testing, making deployment smooth and error-free.
						</p>
					</div>

					<div class="border border-gray-700 p-6 rounded-lg bg-[#132238]">
						<h3 class="flex items-center space-x-2 text-lg font-semibold">
							<span>🔗</span> <span>Webhooks & API Endpoints</span>
						</h3>
						<p class="text-gray-400 mt-2 text-sm">
							Leverage webhooks and API endpoints for seamless integration and automation.
						</p>
					</div>

					<div class="border border-gray-700 p-6 rounded-lg bg-[#132238]">
						<h3 class="flex items-center space-x-2 text-lg font-semibold">
							<span>⚙️</span> <span>Full Customization</span>
						</h3>
						<p class="text-gray-400 mt-2 text-sm">
							Enjoy complete control with fully customizable code to suit your unique requirements.
						</p>
					</div>
				</div>
			</div>

		</div> -->
		<!-- <div class="bg-gradient-to-r from-gray-300 to-gray-50 flex items-center justify-center min-h-screen p-6">
			<div class="max-w-4xl w-full text-center">
				<h2 class="text-3xl font-semibold text-gray-800 mb-6">Wall of Love</h2>
				<SwiperTestimoni  :testimonials="testimonials"/>
			</div>
		</div> -->
		<!-- <div class="bg-gradient-to-b from-black to-gray-900 text-white text-center py-20 rounded-lg shadow-lg mt-16 mx-4">
			<h1 class="text-4xl font-bold">Add AI to your project in minutes</h1>
			<Button class="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-lg">
				Get Instant Access →
			</Button>
		</div> -->
	</div>
</template>

<script setup>
import { ref } from "vue";
	const images = ref([
  { image: 'https://media.istockphoto.com/id/1296867709/id/foto/profesional-insinyur-asia-laki-laki-berdiskusi-berdiri-di-dekat-mesin-di-pabrik-dua-rekan.jpg?s=1024x1024&w=is&k=20&c=x2_FjB9EQGNZCh2CTKa0QARjnDvtAGHSSzTU2DidiC0=', title: 'Selamat Datang di Fosan', subtitle: 'Coding Bootcamp terbaik di Semarang', link: '#promo' },
  { image: 'https://t3.ftcdn.net/jpg/02/14/87/96/360_F_214879686_R3HFJlk6WLr1kcdvy6Q9rtNASKN0BZBS.jpg', title: 'Belajar Full Stack Development', subtitle: 'Dari Nol Hingga Mahir dalam 16 Minggu', link: '#paket-web' },
  { image: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/web_developerskills.jpg', title: 'Gabung & Mulai Karirmu', subtitle: 'Jadilah Developer Profesional', link: '#order' }
])
 const testimonials = ref([
      {
        name: "Jane Doe",
        username: "@janedoe",
        image: "https://randomuser.me/api/portraits/women/45.jpg",
        feedback: "Aplikasi ini sangat membantu saya dalam bekerja, sangat mudah digunakan!",
        date: "Feb 10, 2027"
      },
      {
        name: "John Smith",
        username: "@johnsmith",
        feedback: "Website ini sangat profesional dan memudahkan bisnis saya berkembang.",
        date: "Feb 15, 2027"
      },
	  {
        name: "Jane Doe",
        username: "@janedoe",
        image: "https://randomuser.me/api/portraits/women/45.jpg",
        feedback: "Aplikasi ini sangat membantu saya dalam bekerja, sangat mudah digunakan!",
        date: "Feb 10, 2027"
      },
      {
        name: "John Smith",
        username: "@johnsmith",
        feedback: "Website ini sangat profesional dan memudahkan bisnis saya berkembang.",
        date: "Feb 15, 2027"
      },
	  {
        name: "Jane Doe",
        username: "@janedoe",
        image: "https://randomuser.me/api/portraits/women/45.jpg",
        feedback: "Aplikasi ini sangat membantu saya dalam bekerja, sangat mudah digunakan!",
        date: "Feb 10, 2027"
      },
      {
        name: "John Smith",
        username: "@johnsmith",
        feedback: "Website ini sangat profesional dan memudahkan bisnis saya berkembang.",
        date: "Feb 15, 2027"
      },
	  {
        name: "Jane Doe",
        username: "@janedoe",
        image: "https://randomuser.me/api/portraits/women/45.jpg",
        feedback: "Aplikasi ini sangat membantu saya dalam bekerja, sangat mudah digunakan!",
        date: "Feb 10, 2027"
      },
      {
        name: "John Smith",
        username: "@johnsmith",
        feedback: "Website ini sangat profesional dan memudahkan bisnis saya berkembang.",
        date: "Feb 15, 2027"
      }
    ]);

const partners = ref([
  { name: "GMEDIA", logo: "https://fosan.id/images/logo_gmedia.png" , desc:'  Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati nam facere nobis illum quidem iusto architecto animi, sunt temporibus ipsa accusantium quo voluptatem alias ex excepturi aliquid illo, corrupti commodi!' },
  { name: "VANTURA", logo: "https://fosan.id/foto/1598452897234-logo.png" , desc:`Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate nihil non praesentium obcaecati? Eveniet accusamus quas consequuntur aperiam porro consectetur optio. Non commodi earum sed minima? Cupiditate ratione nesciunt voluptate!`},
  { name: "Rapier", logo: "https://fosan.id/images/template/Rapier.jpeg"  , desc:`Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat qui quo, corrupti esse itaque in eos aspernatur nobis odit libero aliquid neque dolore voluptates illum a, inventore doloremque, dolorum totam.`},
  { name: "Points", logo: "https://fosan.id/foto/1588677719797-Logo%20poiNTS%20fix%20vertikal.png"  , desc:`Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda hic minus veritatis adipisci tempora ducimus rem enim, dolorem aspernatur vero? Itaque neque eos nulla nemo saepe harum sequi rem ab!`},
  { name: "Finix 76", logo: "https://fosan.id/images/finix76.jpeg"  , desc:`Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum provident itaque, ducimus ipsam soluta praesentium dolore dolorum molestiae omnis aut voluptates sit autem eveniet minima nihil quia consequuntur non voluptatibus.`},
  { name: "Azura Labs", logo: "https://fosan.id/foto/1597229192001-Logo%20(1).png"  , desc:`Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo voluptatum in labore ratione earum neque fugit? Ad excepturi ex nam laudantium quas iste? Suscipit qui laborum reiciendis vel quaerat sunt.`},
  { name: "Company X", logo: "https://fosan.id/foto/1596498047671-Group%201.png"  , desc:`Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, nobis molestiae tempore ratione inventore vitae voluptatum magni in odio perspiciatis a minima harum itaque veritatis quo quos nesciunt! Odit, magnam.`}, 

			
]);
</script>

<style scoped>
    .container{
        margin-top: 0px;
    }
	
</style>