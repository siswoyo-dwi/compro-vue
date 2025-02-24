<template >
    
    <div class="container mx-auto mt-40  px-6 py-12">
        <!-- Judul -->
        <h2 class="text-center text-3xl md:text-4xl font-semibold text-blue-900 mb-12">
            Fosan in Numbers
        </h2>

        <!-- Kontainer utama -->
        <div class="flex flex-col md:flex-row items-center gap-8 md:gap-12 relative">
            <!-- Bagian Gambar -->
            <div class="w-full md:w-1/2 relative">
                <img src="https://www.scnsoft.com/slider-presentation/boris-and-nick.jpg" alt="Office Image" class="w-full rounded-lg shadow-lg">
                <!-- Kotak Tahun (Pojok kanan atas gambar, sebagian keluar) -->
                <div class="absolute -top-6 right-0 transform translate-x-1/4 bg-blue-600 text-white text-4xl md:text-5xl font-bold px-6 py-4 md:px-8 md:py-6 rounded-lg shadow-lg">
                    35
                </div>
            </div>

            <!-- Bagian Teks -->
            <div class="w-full md:w-1/2 flex flex-col justify-center">
                <h3 class="text-2xl md:text-3xl font-bold text-gray-900">
                    years in IT
                </h3>
                <p class="mt-4 text-gray-700 leading-relaxed">
                    We have seen the technology landscape change time and again 
                    over the three decades of our operation. We have learned 
                    to be flexible and to expand our expertise to meet the demands of tomorrow.
                </p>
                <button class="mt-6 border-2 border-blue-700 text-blue-700 font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 hover:text-white transition">
                    Fosan's highlights
                </button>
            </div>
        </div>
    </div>
</template> 