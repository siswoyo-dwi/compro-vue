<template>
    <div class="container mt-36 mx-auto px-6 py-10">
      <h2 class="text-2xl font-semibold text-blue-800 mb-6">Technologies and Platforms We Work With</h2>
  
      <div class="bg-blue-100 p-6 rounded-lg relative">
        <!-- Web Development -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-blue-900">Web</h3>
  
          <!-- Backend -->
          <h4 class="text-sm text-gray-600 mt-2">BACK END</h4>
          <div class="flex flex-wrap gap-4 mt-2">
            <TechCard name="Node.js" img="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" desc="Runtime JavaScript untuk backend." experience="10 years" workforce="100" />
            <TechCard name="Go" img="https://upload.wikimedia.org/wikipedia/commons/0/05/Go_Logo_Blue.svg" desc="Bahasa dari Google untuk performa tinggi." experience="7 years" workforce="80" />
            <TechCard name="PHP" img="https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg" desc="Digunakan untuk web development." experience="12 years" workforce="120" />
          </div>
  
          <!-- Frontend -->
          <h4 class="text-sm text-gray-600 mt-4">FRONT END</h4>
          <div class="flex flex-wrap gap-4 mt-2">
            <TechCard name="JavaScript" img="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" desc="Bahasa scripting untuk web." experience="15 years" workforce="150" />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  </script>
  