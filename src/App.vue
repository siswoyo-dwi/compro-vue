<template>
	<div>
		<Navbar/>
		<router-view></router-view>
		<Footer/>
	</div>
</template>

<script setup>
	import { ref, onMounted } from "vue";
	import Navbar from "./components/navbar/Navbar.vue";
	import Footer from "./components/footer/Footer.vue";

	onMounted(() => {
	});
</script>

<style>
	::-webkit-scrollbar {
		width: 5px;
		height: 5px;
	}

	::-webkit-scrollbar-thumb {
		background: rgba(0, 0, 0, 0.2);
	}

	::-webkit-scrollbar-track {
		background: rgba(0, 0, 0, 0.1);
	}
</style>
