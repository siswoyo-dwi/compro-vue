<template>
  <div class="w-full min-h-screen bg-white">
	<Navbar/>
		<router-view></router-view>
		<Footer/>
	</div>
</template>

<script setup>
	import { ref, onMounted } from "vue";

	onMounted(() => {
	});
</script>

<style>
    .container{
        margin-top: 200px;
    }
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
