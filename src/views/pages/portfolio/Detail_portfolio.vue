<template>
  <div class="flex justify-center items-start min-h-screen pt-20 px-4 ">
    <div v-if="project" class="w-full sm:w-4/5 lg:w-5/5 mx-auto bg-white shadow-lg rounded-lg p-6 mt-20">
      <!-- Gambar Proyek -->
      <img :src="project.foto" alt="Project Image" class="w-full h-48 object-cover rounded-md mb-6">

      <!-- Judul dan Kategori -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold mb-2 text-black font-sans">{{ project.portfolio }}</h1>
          <p class="text-sm text-gray-600 font-sans">Kategori: {{ categoryName }}</p>
        </div>
        <!-- Tombol Kembali -->
        <router-link :to="`/portfolio/kategori/${project.kategori_id}`" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm transition">
          {{ back }}
        </router-link>
      </div>

      <!-- Deskripsi Proyek -->
 
      <p class="text-sm text-gray-700 mb-6 leading-relaxed font-sans">{{ project.description }}</p>

 
      <!-- Modul dan Submodul -->
      <a href='https://api.whatsapp.com/send/?phone=6282227470745' class="px-4 py-2 mt-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm transition">
            Hubungi Kami
          </a>
          <p class="text-xl text-gray-700 mb-6 leading-relaxed font-sans mt-4">{{ project.modul.text }}</p>

      <div v-for="(idx, index) in project.modul.list" :key="idx" class="mb-4">
        <p class="text-black font-sans">{{ index + 1 }}. {{ idx.name }}</p>
        <p class="text-black font-sans">{{ idx.description }}</p>
        <div v-for="list in idx.subModules" :key="list" class="ml-6 text-gray-700">
          <p class="font-sans" >- {{ list.name }}</p>
        </div>
      </div>
      <p class="text-xl text-gray-700 mb-6 leading-relaxed font-sans mt-4">{{ project.kelebihan.text }}</p>

      <div v-for="(idx, index) in project.kelebihan.list" :key="idx" class="mb-4">
        <p class="text-black font-sans">{{ index + 1 }}. {{ idx.name }}</p>
        <p class="text-black font-sans">{{ idx.description }}</p>
        <div v-for="list in idx.subModules" :key="list" class="ml-6 text-gray-700">
          <p class="font-sans" >- {{ list.name }}</p>
        </div>
      </div>
      <!-- Teknologi yang Digunakan -->
      <div>
        <h3 class="text-md font-semibold mb-4 text-black">Teknologi yang Digunakan:</h3>
        <div class="grid grid-cols-2 gap-3">
          <div v-for="tech in project.technologies" :key="tech" class="bg-gray-100 p-3 rounded-lg shadow-sm text-center text-black text-xs font-medium">
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
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import osbond from '../../../components/images/Osbond Gym.jpg';
import simpus from '../../../components/images/SIMPUS.jpg';
import simrs from '../../../components/images/simrs.jpg';
import livejapan from '../../../components/images/livejapan.jpg';
import simadu from '../../../components/images/simadu.jpg';
import stara from '../../../components/images/stara.jpg';
import wmsbaj from '../../../components/images/wmsbaj.jpg';
import mdclinic from '../../../components/images/mdclinic.jpg';


import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n();
// Data Proyek Dummy
const projects = ref([
{ id: 13, kategori_id: 1, portfolio: "OSBOND GYM", foto:osbond, technologies: ['Vue.js', 'PostgreSQL', 'Node.js'] ,description:'',modul:{text:'',list:[]},integrasi:{text:'',list:[]},fitur:{text:'',list:[]},kelebihan:{text:'',list:[]},},
    { id: 1, kategori_id: 1, portfolio: "Sistem Informasi Manajemen Puskesmas (SIMPUS)", foto: simpus , technologies: ['Vue.js', 'PostgreSQL', 'Node.js'] ,description:'Merupakan SIMPUS yang dikembangkan oleh tim FOSAN dengan menggunakan teknologi terbaru yang bertujuan untuk meningkatkan efektivitas dan efisiensi pengelolaan data dan informasi di puskesmas.',modul:{text:'SIMPUS yang dikembangkan oleh FOSAN mengakomodasi Modul:',list:[{
    name:`EMR (Electronic Medical Record) Modul yang berisi seluruh data rekam medis pasien dan pelayanan yang telah diberikan selama di puskesmas.`},{
    name:`Pendaftaran (Manual/ APM)`},{
    name:`Layanan Instalasi Rawat Jalan`},{
    name:`Layanan Instalasi Rawat Inap`},{
    name:`Layanan Instalasi UGD`},{
    name:`Manajemen Bed`},{
    name:`Manajemen Obat`},{
    name:`Manajemen Pasien`},{
    name:`Manajemen Laboratorium`},{
    name:`Manajemen Gudang Obat`},{
    name:`Manajemen Keuangan`},{
    name:`Laporan Harian`},{
    name:`Laporan Bulanan`},{
    name:`Grafik Kesehatan`},{
    name:`Sistem Backdate`},{
    name:`Dashboard Puskesmas`},{
    name:`Control Manajemen Akses`},]},integrasi:{text:'FOSAN mengembangkan SIMPUS yang terintegrasi dengan:',list:[`1.PCare BPJS`,`2.ICare BPJS`,`3.Mobile JKN`,`4.SATU SEHAT Kemenkes`]},fitur:{text:'New Features:',list:[`1.Skrining Kesehatan - Integrasi Layanan Primer (ILP) Sesuai dengan Kepmenkes No.01.07/MENKES/2025/2023 Tentang Juknis Integrasi Pelayanan Kesehatan Primer.`,`2.Dashboard Integrasi Layanan Primer (ILP)`,`3.Verifikasi Profil  KYC (Know Your Customer) SATU SEHAT Mobile`,]},kelebihan:{text:'Kelebihan SIMPUS - FOSAN',list:[`1.Informasi Real -Time Data pasien secara real-time dapat diperbaharui dan dilihat secara langsung oleh dokter dan atau tenaga medis lain, sehingga keputusan perawatan lebih tepat waktu.`,`2.Dapat Dikirim Secara Periodik (Mengurangi Beban Network) Kunjungan khususnya homecare yang dilakukan oleh petugas kesehatan dapat dikirimkan datanya secara periodik dan kolektif sesuai format yang tersedia. Sehingga meningkatkan efisiensi pengiriman data ke server.`]},},
    { id: 2, kategori_id: 1, portfolio: "Sistem Informasi Rumah Sakit (SIMRS)", foto: simrs , technologies: ['Vue.js', 'PostgreSQL', 'Node.js'] ,description:'Merupakan SIMRS yang dikembangkan oleh tim FOSAN dengan menggunakan teknologi terbaru berbasis Enterprise Resources Planning (ERP) yang bertujuan untuk mengelola aktivitas dalam rumah sakit secara mudah, efektif, akurat, dan efisien.',modul:{text:'SIMRS yang dikembangkan oleh FOSAN mengakomodasi Modul:',list:[
  {
    name: "EMR (Electronic Medical Record)",
    description: "Modul yang berisi seluruh data rekam medis pasien dan pelayanan yang telah diberikan selama di rumah sakit."
  },
  {
    name: "Modul Front Office",
    description: "Modul dalam SIMRS yang mengakomodasi aktivitas manajemen operasional rumah sakit termasuk pengelolaan dan pelayanan pasien, penjadwalan poli dan dokter, serta administrasi keuangan.",
    subModules: [
      {
        name: "Pendaftaran pasien rawat jalan maupun rawat inap"
      },
      {
        name: "Manajemen dan monitoring bed"
      },
      {
        name: "Pengelolaan jadwal dokter"
      },
      {
        name: "Booking kunjungan"
      },
      {
        name: "Layanan Instalasi Rawat Jalan",
        description: "Memproses pendaftaran pasien rawat jalan, pelayanan IGD, pengaturan dokter jaga sampai pembuatan resep dan registrasi ke layanan instalasi lain seperti laboratorium dan radiologi."
      },
      {
        name: "Layanan Instalasi Gawat Darurat",
        description: "Memproses pendaftaran pasien gawat darurat, manajemen bed, dan layanan penunjang lainnya."
      },
      {
        name: "Layanan Instalasi Rawat Inap",
        description: "Memproses pelayanan instalasi rawat inap yang meliputi penginputan SOAP dan mempermudah manajemen bed secara real time hingga otomatisasi rekapitulasi biaya perawatan."
      },
      {
        name: "Layanan Instalasi Laboratorium",
        description: "Memproses pendaftaran dan memproses pelayanan pemeriksaan penunjang laboratorium sampai dengan cetak hasil."
      },
      {
        name: "Layanan Instalasi Radiologi",
        description: "Memproses pendaftaran dan memproses pelayanan pemeriksaan penunjang radiologi sampai dengan cetak hasil."
      },
      {
        name: "Layanan Instalasi Bedah Sentral",
        description: "Memproses pendaftaran dan memproses kamar operasi serta jadwalnya, hingga manajemen operasi."
      },
      {
        name: "Manajemen Farmasi",
        description: "Inventarisasi farmasi yang terdiri dari master farmasi, pengelolaan transaksi pengeluaran resep, inventory control, dan pelaporan penggunaan stock dalam farmasi."
      },
      {
        name: "Manajemen Rujukan"
      }
    ]
  },
  {
    name: "Modul Back Office",
    subModules: [
      {
        name: "Manajemen Kepegawaian",
        description: "Modul yang dikembangkan untuk mengelola manajemen data karyawan/ pegawai yang ada di rumah sakit (tenaga medis dan bukan tenaga medis) secara efisien."
      },
      {
        name: "Modul Warehouse",
        description: "Modul yang dikembangkan untuk mengelola stock obat dan peralatan medis, mengelola pengadaan barang, memonitor penggunaan stock, mengevaluasi proses pembayaran pada supplier, dan secara otomatis memberikan laporan ketersediaan stock secara real time."
      },
      {
        name: "Modul Penjualan",
        description: "Modul yang dikembangkan untuk mengelola transaksi pasien, memberikan informasi tagihan, memproses pembayaran, dan menghasilkan laporan keuangan dalam periode tertentu."
      },
      {
        name: "Modul Tagihan",
        description: "Modul yang berisi informasi tagihan dan status pembayaran dari pelayanan pasien."
      },
      {
        name: "Modul Akuntansi",
        description: "Modul yang dikembangkan untuk mengelola laporan keuangan rumah sakit dan mengawasi arus kas secara efektif."
      },
      {
        name: "Manajemen Asset",
        description: "Modul yang dikembangkan untuk mengelola aset rumah sakit, meliputi inventaris aset, memonitor perawatan/pemeliharaan, dan mengoptimalkan penggunaan sarana dan prasarana."
      }
    ]
  },
  {
    name: "Integrasi BPJS Kesehatan",
    description: "Modul yang dikembangkan ini berfungsi untuk mendukung pengelolaan rujukan pasien BPJS untuk mempermudah arus layanan kesehatan.",
    subModules: [
      { name: "V-Claim" },
      { name: "Aplicare" },
      { name: "Mobile JKN" },
      { name: "I-Care" }
    ]
  },
  {
    name: "Integrasi INACBG’s",
    description: "Modul ini digunakan untuk mempermudah rumah sakit dalam menyusun laporan klaim dan grup biaya secara cepat dan akurat."
  },
  {
    name: "Integrasi SATU SEHAT Kemenkes",
    description: "Modul ini memungkinkan arus pertukaran data secara real-time, meliputi data rekam medis pasien, dan informasi pasien antar SIM-RS dan SATU SEHAT Platform."
  }
]},integrasi:{text:'',list:[]},fitur:{text:'',list:[]},kelebihan:{text:'',list:[]},},
    { id: 3, kategori_id: 2, portfolio: "BPSDM", foto: mdclinic , technologies: ['Vue.js', 'PostgreSQL', 'Node.js'] ,description:'',modul:{text:'',list:[]},integrasi:{text:'',list:[]},fitur:{text:'',list:[]},kelebihan:{text:'',list:[]},},
    { id: 4, kategori_id: 2, portfolio: "Poltekkes Simadu V2", foto: simadu , technologies: ['Vue.js', 'PostgreSQL', 'Node.js'] ,description:'Merupakan platform sistem informasi akademik mahasiswa Poltekkes Kemenkes Semarang yang dapat mengelola kegiatan-kegiatan yang berhubungan dengan perkuliahan.',modul:{text:'Fitur yang ditawarkan:',list:[ {
      name: `Content Management`,
      description:`Fitur yang membuat user memiliki batasan akses dalam menggunakan sistem. User dapat ditentukan oleh pihak kampus, sehingga pengguna yang mengakses mendapatkan manfaat yang berbeda-beda sesuai dengan fungsinya.`
    },{
      name: `Kalender Akademik`,
      description:`Fitur ini memungkinkan admin dapat mengelola kalender akademik dan periode perkuliahan yang sesuai dengan semester saat ini. Selain itu, mahasiswa dapat secara langsung melihat kalender akademik dan periode perkuliahan yang telah di-update oleh admin.`
    },{
      name: `Her-Registrasi`,
      description:`Fitur yang memudahkan pengguna untuk mengelola data registrasi, registrasi cuti, data mahasiswa yang belum melakukan registrasi, data pengajuan cuti, status aktif perkuliahan, dan status pembayaran dari mahasiswa.`
    },{
      name: `Kegiatan Perkuliahan`,
      description:`fitur yang memudahkan pengguna mengelola dan menampilkan data mata kuliah, substansi kuliah, kurikulum, mata kuliah kurikulum, kelas kuliah, jadwal perkuliahan, jadwal UAT, jadwal UAS, dan paket KRS. `
    },{
      name: `Manajemen Nilai`,
      description:`Fitur yang memudahkan pengguna dalam melakukan setting manajemen nilai sesuai dengan mata kuliah yang diampu oleh dosen dan pengelolaan skala nilai masing-masing prodi yang ada di kampus.`
    },{
      name: `Nilai Mahasiswa`,
      description:`Fitur ini memudahkan pengajar dalam menyusun dan mendapatkan laporan perkembangan mahasiswa. Fitur ini akan memberikan laporan monitoring seperti tingkat kehadiran, seberapa sering mahasiswa mengakses materi pembelajaran, hingga rekap hasil penilaian mata kuliah, UTS, dan UAS yang telah dilakukan oleh mahasiswa. Selain pengajar, mahasiswa juga dapat melihat perkembangan kemampuannya dalam fitur tersebut.`
    },{
      name: `Manajemen Tugas Akhir`,
      description:`Fitur ini memudahkan pengguna dalam memonitori perkembangan tugas akhir yang sedang berlangsung. Manajemen tugas akhir yang meliputi pengajuan judul dan pengajuan ujian/ seminar hasil.`
    },{
      name: `Wisuda`,
      description:`Fitur yang memudahkan pengguna dalam memantau kegiatan wisuda yang meliputi daftar periode wisuda dan peserta wisuda yang tersedia.`
    },{
      name: `Penjaminan Mutu`,
      description:`Fitur penjaminan mutu, memudahkan pengguna dalam mendapatkan informasi terkait profil perguruan tinggi dan akreditasi setiap prodi yang yang dimiliki oleh kampus.`
    },{
      name: `Management Ruangan`,
      description:`Fitur ini memudahkan pengguna dalam memonitori ruangan/ kelas yang digunakan untuk perkuliahan dan melakukan booking ruangan untuk kegiatan perkuliahan berikutnya.`
    }
  ]},integrasi:{text:'',list:[]},fitur:{text:'',list:[]},kelebihan:{text:'Kelebihan:',list:[
    {
      name: `Tampilan mudah digunakan`,
      description:``
    },{
      name: `Efisiensi Sistem`,
      description:``
    },{
      name: `Memudahkan Evaluasi`,
      description:``
    }]},},
    { id: 14, kategori_id: 2, portfolio: "Live English Japan", foto: livejapan , technologies: ['Vue.js', 'PostgreSQL', 'Node.js'] ,description:`Merupakan platform yang dikembangkan untuk pembelajaran/ kursus digital yang membuat proses pembelajaran bahasa inggris, manajemen materi, evaluasi perkembangan siswa dan pembayaran kelas menjadi lebih mudah. Sehingga kegiatan kursus online menjadi lebih fleksibel, interaktif, dan efisien.`,modul:{text:'Fitur yang kami tawarkan:',list:[ 
    {
      name: `Content Management`,
      description:`Fitur yang membuat pengajar dan siswa memiliki batasan akses dalam menggunakan sistem. Pengajar dapat mengelola materi ajar berupa teks, video, maupun audio. Sedangkan siswa dapat menggunakan akunnya untuk mendapatkan kelas dan materi yang ada di sistem.`
    },
    {
      name: `Pendaftaran Online`,
      description:`Fitur ini memungkinkan siswa dapat melakukan pendaftaran secara online dengan mudah dan cepat. Selain itu, siswa dapat melakukan booking kelas kursus sesuai dengan jadwal dan guru yang ada pada sistem.`
    },
    {
      name: `Kelas Online`,
      description:`Fitur ini digunakan untuk melakukan pembelajaran online. Siswa dapat belajar melalui materi dalam bentuk teks, video, maupun audio yang telah disiapkan oleh pengajar.`
    },
    {
      name: `Forum Diskusi`,
      description:`Fitur ini memungkinkan siswa dan pengajar dapat berdiskusi membahas materi yang diberikan melalui forum. Fitur ini dapat dibuat dalam bentuk privat maupun publik (kelas besar).`
    },
    {
      name: `Video Conference`,
      description:`Fitur ini membuat pengajar dan siswa dapat berinteraksi secara langsung melalui panggilan video tanpa harus bertatap muka.`
    },
    {
      name: `Evaluations`,
      description:`Fitur evaluations berisi kuis dan ujian online. Kuis dan ujian online dalam sistem memudahkan siswa dalam melakukan kuis atau ujian online yang telah disiapkan oleh pengajar sebagai bagian dari evaluasi kegiatan kursus.`
    },
    {
      name: `Lesson Hystory`,
      description:`Fitur ini memudahkan pengajar dalam menyusun dan mendapatkan laporan perkembangan siswa. Fitur ini akan memberikan laporan monitoring seperti tingkat kehadiran siswa, seberapa sering siswa mengakses materi pembelajaran, hingga rekap hasil kuis dan ujian siswa. Selain pengajar, siswa juga dapat melihat perkembangan kemampuannya dalam fitur tersebut.`
    },
    {
      name: `Order and Payment System`,
      description:`Fitur ini memudahkan siswa dalam melihat kelas dan jadwal yang tersedia, melakukan booking kelas, serta pembayaran kelas yang dapat dilakukan dengan beberapa jenis pembayaran digital. Sehingga dari awal pendaftaran, pembayaran, dan kegiatan pembelajaran dapat dilakukan dalam satu sistem ini.`
    },
    
  ]},integrasi:{text:'',list:[]},fitur:{text:'',list:[]},kelebihan:{text:'Kelebihan:',list:[{
      name: `Tampilan mudah digunakan`,
    },
    {
      name: `Meningkatkan efektivitas pembelajaran`,
    },
    {
      name: `Memudahkan Evaluasi`,
    },
   ]},},
    { id: 5, kategori_id: 3, portfolio: "Manfaat [Penjualan Tepung]", foto: "https://fosan.id/images/fosanlogo.png" , technologies: ['Vue.js', 'PostgreSQL', 'Node.js'] ,description:'',modul:{text:'',list:[]},integrasi:{text:'',list:[]},fitur:{text:'',list:[]},kelebihan:{text:'',list:[]},},
    { id: 6, kategori_id: 3, portfolio: "Warehouse Management System Bahtera Adi Jaya", foto: wmsbaj , technologies: ['Vue.js', 'PostgreSQL', 'Node.js'] ,description:'',modul:{text:'',list:[]},integrasi:{text:'',list:[]},fitur:{text:'',list:[]},kelebihan:{text:'',list:[]},},
    // { id: 7, kategori_id: 4, portfolio: "ERP Solutions", foto: "https://fosan.id/images/fosanlogo.png" , technologies: ['Vue.js', 'PostgreSQL', 'Node.js'] ,description:'',modul:{text:'',list:[]},integrasi:{text:'',list:[]},fitur:{text:'',list:[]},kelebihan:{text:'',list:[]},},
    // { id: 8, kategori_id: 4, portfolio: "CRM Solutions", foto: "https://fosan.id/images/fosanlogo.png" , technologies: ['Vue.js', 'PostgreSQL', 'Node.js'] ,description:'',modul:{text:'',list:[]},integrasi:{text:'',list:[]},fitur:{text:'',list:[]},kelebihan:{text:'',list:[]},},
    // { id: 9, kategori_id: 4, portfolio: "Corporate Finance Solutions", foto: "https://fosan.id/images/fosanlogo.png" , technologies: ['Vue.js', 'PostgreSQL', 'Node.js'] ,description:'',modul:{text:'',list:[]},integrasi:{text:'',list:[]},fitur:{text:'',list:[]},kelebihan:{text:'',list:[]},},
    // { id: 10, kategori_id: 4, portfolio: "HR Management Solutions", foto: "https://fosan.id/images/fosanlogo.png" , technologies: ['Vue.js', 'PostgreSQL', 'Node.js'] ,description:'',modul:{text:'',list:[]},integrasi:{text:'',list:[]},fitur:{text:'',list:[]},kelebihan:{text:'',list:[]},},
    // { id: 11, kategori_id: 4, portfolio: "Project Management Solutions", foto: "https://fosan.id/images/fosanlogo.png" , technologies: ['Vue.js', 'PostgreSQL', 'Node.js'] ,description:'',modul:{text:'',list:[]},integrasi:{text:'',list:[]},fitur:{text:'',list:[]},kelebihan:{text:'',list:[]},},
    // { id: 12, kategori_id: 4, portfolio: "Document Management Solutions", foto: "https://fosan.id/images/fosanlogo.png" , technologies: ['Vue.js', 'PostgreSQL', 'Node.js'] ,description:'',modul:{text:'',list:[]},integrasi:{text:'',list:[]},fitur:{text:'',list:[]},kelebihan:{text:'',list:[]},},
    { id: 15, kategori_id: 4, portfolio: "STARA", foto: stara , technologies: ['Vue.js', 'PostgreSQL', 'Node.js'] ,description:'Merupakan platform Human Reosurces Information System yang dapat mengelola dan mengotomatisasi berbagai aspek sumber daya manusia dalam perusahaan, mulai dari manajemen data karyawan, rekrutmen, manajemen kinerja, manajemen gaji, pelaporan, dan lainnya. Sistem ini bukan sekedar alat teknologi, tetapi menjadi strategi yang memberikan banyak manfaat terhadap perusahaan.',modul:{text:'Fitur yang kami tawarkan:',list:[
    {
      name: `Content Management`,
      description:`Fitur yang membuat pengguna memiliki batasan akses dalam menggunakan sistem berdasarkan rolenya di perusahaan.`
    },{
      name: `Management Karyawan`,
      description:`Fitur ini memudahkan pengguna dalam mengelola data karyawan secara keseluruhan seperti  identitas lengkap karyawan, perjanjian kerja, perintah kerja, dan data mutasi.`
    },{
      name: `Lowongan Pekerjaan`,
      description:`Fitur ini memudahkan pengguna dalam mengelola daftar lowongan pekerjaan akan dilakukan oleh perusahaan. Fitur ini juga memungkinkan pengguna dapat memonitori dan mengevaluasi kegiatan perekrutan dari penyebaran lowongan pekerjaan sampai dengan hasil tahap seleksi pelamar.`
    },{

      name: `Laporan Kecelakaan Kerja`,
      description:`Fitur ini memudahkan pengguna dalam mengelola data kecelakaan kerja yang terjadi pada karyawan selama melakukan pekerjaan.`
    },{
      name: `Laporan Karyawan`,
      description:`Fitur ini memungkinkan pengguna dapat mengelola laporan terkait karyawan yang meliputi proyeksi gaji, rekap gaji, potongan gaji, THR, dan akumulasi lembur.`
    },{
      name: `Penilaian Karyawan`,
      description:`Fitur ini memudahkan pengguna dalam melakukan evaluasi kinerja masing-masing karyawan. Sehingga data tersebut dapat digunakan untuk peningkatan kualitas sumber daya manusia di perusahaan.`
    },

    ]},integrasi:{text:'',list:[]},fitur:{text:'',list:[]},kelebihan:{text:'Kelebihan:',list:[{
      name: `Efisiensi Administrasi`,
      description:`Sistem ini dapat mengotomatisasi tugas-tugas administrasi seperti pemrosesan gaji, manajemen cuti, dan pelaporan karyawan. Selain itu STARA mengurangi risiko kesalahan manusiawi seperti penghitungan gaji yang salah dan pelacakan cuti yang tidak akurat. Sehingga menciptakan lingkungan yang lebih efisien, produktif, dan terorganisir dalam manajemen sumber daya manusia.`
    },{
      name: `Akurasi Data`,
      description:`Platform ini  merupakan teknologi yang dapat menyimpan data karyawan yang lebih terstruktur dan akurat. Sehingga informasi tentang riwayat pekerjaan, dan evaluasi kinerja dapat diakses dengan mudah dan terkini.  `
    },{
      name: `Peningkatan Kepuasan Karyawan`,
      description:`STARA memungkinkan perusahaan dapat merencanakan, melacak, dan mengukur peningkatan kualitas karyawan dengan lebih baik. Sehingga karyawan merasa lebih diberdayakan dan memberikan dampak yang signifikan terhadap kinerja yang dihasilkan untuk meningkatkan produktivitas perusahaan.`
    },{
      name: `Kepatuhan Hukum `,
      description:`STARA membantu perusahaan untuk mematuhi peraturan dan undang-undang ketenagakerjaan dengan mengotomatisasi proses administrasi yang mengikuti standar hukum.`
   
    }]},},
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
