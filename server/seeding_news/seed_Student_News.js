const express = require('express');
const router = express.Router();
const slugify = require("slugify")
const db = require("../config/database")
const Student_News_Schema = require("../models/StudentNews_Models");

router.get('/seed', async (req, res) => {
    const sampleSeed = [
        {
          "kategori": "sosial",
          "judul": "Aksi Sosial Membawa Harapan Baru",
          "gambar": "https://raw.githubusercontent.com/UnteyoNews/News/0c79e90fe765d9a004e0bb7122b813d3824ec842/35%20Kata%20Kata%20Fajar%20Sadboy%20yang%20Galau%20Abis_%20Bikin%20Mewek%20dan%20Mengiris%20Hati!.jpg",
          "teks": "Sejumlah relawan berkumpul untuk membantu korban banjir yang melanda beberapa wilayah. Mereka berhasil mendistribusikan bantuan berupa makanan, pakaian, dan obat-obatan.\nGerakan sosial ini tidak hanya meringankan beban korban, tetapi juga menginspirasi banyak pihak untuk bergabung dan berkontribusi.",
          "tim_redaksi": "Redaksi Sosial Times",
          "tagar": ["#AksiSosial", "#Relawan"],
          "sumber": "Sosial Times"
        },
        {
          "kategori": "hiburan",
          "judul": "Film Blockbuster Baru Raih Rekor Penonton",
          "gambar": "https://raw.githubusercontent.com/UnteyoNews/News/0c79e90fe765d9a004e0bb7122b813d3824ec842/35%20Kata%20Kata%20Fajar%20Sadboy%20yang%20Galau%20Abis_%20Bikin%20Mewek%20dan%20Mengiris%20Hati!.jpg",
          "teks": "Film terbaru dari sutradara ternama berhasil memecahkan rekor penonton di seluruh bioskop nasional. Film ini dipuji karena alur cerita yang menarik dan efek visual yang luar biasa.\nPara pemain juga mendapatkan banyak apresiasi atas akting mereka yang memukau, membuat film ini menjadi favorit sepanjang tahun.",
          "tim_redaksi": "Redaksi Hiburan Now",
          "tagar": ["#FilmBaru", "#Blockbuster"],
          "sumber": "Hiburan Now"
        },
        {
          "kategori": "bisnis",
          "judul": "Startup Teknologi Lokal Dapat Pendanaan Baru",
          "gambar": "https://raw.githubusercontent.com/UnteyoNews/News/0c79e90fe765d9a004e0bb7122b813d3824ec842/35%20Kata%20Kata%20Fajar%20Sadboy%20yang%20Galau%20Abis_%20Bikin%20Mewek%20dan%20Mengiris%20Hati!.jpg",
          "teks": "Sebuah startup teknologi asal Indonesia berhasil mendapatkan pendanaan dari investor internasional. Hal ini membuka peluang untuk ekspansi bisnis ke pasar global.\nLangkah ini menjadi bukti bahwa inovasi lokal mampu bersaing di dunia internasional dan meningkatkan ekonomi digital di tanah air.",
          "tim_redaksi": "Redaksi Bisnis Pro",
          "tagar": ["#StartupTeknologi", "#Pendanaan"],
          "sumber": "Bisnis Pro"
        },
        {
          "kategori": "lifestyle",
          "judul": "Tips Hidup Sehat di Era Modern",
          "gambar": "https://raw.githubusercontent.com/UnteyoNews/News/0c79e90fe765d9a004e0bb7122b813d3824ec842/35%20Kata%20Kata%20Fajar%20Sadboy%20yang%20Galau%20Abis_%20Bikin%20Mewek%20dan%20Mengiris%20Hati!.jpg",
          "teks": "Hidup sehat menjadi perhatian utama di tengah gaya hidup modern yang serba cepat. Salah satu cara untuk tetap sehat adalah dengan mengatur pola makan dan rutin berolahraga.\nSelain itu, penting untuk meluangkan waktu untuk relaksasi demi menjaga kesehatan mental agar tetap optimal.",
          "tim_redaksi": "Redaksi Lifestyle Today",
          "tagar": ["#HidupSehat", "#TipsKesehatan"],
          "sumber": "Lifestyle Today"
        },
        {
          "kategori": "olahraga",
          "judul": "Tim Nasional Menangkan Turnamen Internasional",
          "gambar": "https://raw.githubusercontent.com/UnteyoNews/News/0c79e90fe765d9a004e0bb7122b813d3824ec842/35%20Kata%20Kata%20Fajar%20Sadboy%20yang%20Galau%20Abis_%20Bikin%20Mewek%20dan%20Mengiris%20Hati!.jpg",
          "teks": "Tim nasional berhasil membawa pulang trofi dari turnamen internasional bergengsi. Kemenangan ini diraih berkat kerja keras para pemain dan dukungan dari masyarakat.\nKeberhasilan ini menjadi kebanggaan bagi negara dan meningkatkan semangat olahraga di kalangan generasi muda.",
          "tim_redaksi": "Redaksi Sport Center",
          "tagar": ["#KemenanganTimnas", "#TurnamenInternasional"],
          "sumber": "Sport Center"
        },
        {
            "kategori": "sosial",
            "judul": "Komunitas Lokal Luncurkan Program Edukasi Gratis",
            "gambar": "https://raw.githubusercontent.com/UnteyoNews/News/0c79e90fe765d9a004e0bb7122b813d3824ec842/35%20Kata%20Kata%20Fajar%20Sadboy%20yang%20Galau%20Abis_%20Bikin%20Mewek%20dan%20Mengiris%20Hati!.jpg",
            "teks": "Komunitas lokal meluncurkan program edukasi gratis bagi anak-anak kurang mampu. Program ini meliputi kursus teknologi, seni, dan keterampilan dasar.\nInisiatif ini bertujuan untuk memberikan peluang pendidikan yang lebih merata dan memperbaiki kualitas hidup masyarakat.",
            "tim_redaksi": "Redaksi Sosial Community",
            "tagar": ["#PendidikanGratis", "#KomunitasLokal"],
            "sumber": "Sosial Community"
          },
          {
            "kategori": "hiburan",
            "judul": "Festival Musik Meriahkan Kota Besar",
            "gambar": "https://raw.githubusercontent.com/UnteyoNews/News/0c79e90fe765d9a004e0bb7122b813d3824ec842/35%20Kata%20Kata%20Fajar%20Sadboy%20yang%20Galau%20Abis_%20Bikin%20Mewek%20dan%20Mengiris%20Hati!.jpg",
            "teks": "Festival musik tahunan menghadirkan berbagai artis terkenal untuk menghibur ribuan penonton. Acara ini dilengkapi dengan berbagai kegiatan seni dan kuliner.\nAntusiasme masyarakat terhadap festival ini menunjukkan tingginya minat akan budaya hiburan yang dinamis.",
            "tim_redaksi": "Redaksi Hiburan Blast",
            "tagar": ["#FestivalMusik", "#HiburanKota"],
            "sumber": "Hiburan Blast"
          },
          {
            "kategori": "bisnis",
            "judul": "Perusahaan Lokal Ekspansi ke Pasar Asia Tenggara",
            "gambar": "https://raw.githubusercontent.com/UnteyoNews/News/0c79e90fe765d9a004e0bb7122b813d3824ec842/35%20Kata%20Kata%20Fajar%20Sadboy%20yang%20Galau%20Abis_%20Bikin%20Mewek%20dan%20Mengiris%20Hati!.jpg",
            "teks": "Perusahaan teknologi lokal mengumumkan rencana ekspansi ke pasar Asia Tenggara. Langkah ini dilakukan untuk meningkatkan pangsa pasar dan memperluas jaringan internasional.\nEkspansi ini diharapkan membawa dampak positif bagi ekonomi lokal sekaligus membuka peluang kerja baru.",
            "tim_redaksi": "Redaksi Bisnis Asia",
            "tagar": ["#EkspansiBisnis", "#PasarGlobal"],
            "sumber": "Bisnis Asia"
          },
          {
            "kategori": "lifestyle",
            "judul": "Menciptakan Ruang Kerja Nyaman di Rumah",
            "gambar": "https://raw.githubusercontent.com/UnteyoNews/News/0c79e90fe765d9a004e0bb7122b813d3824ec842/35%20Kata%20Kata%20Fajar%20Sadboy%20yang%20Galau%20Abis_%20Bikin%20Mewek%20dan%20Mengiris%20Hati!.jpg",
            "teks": "Ruang kerja di rumah menjadi semakin penting di era kerja jarak jauh. Desain yang nyaman dan fungsional dapat meningkatkan produktivitas.\nTips seperti memilih furnitur ergonomis dan pencahayaan yang baik menjadi solusi bagi para pekerja modern.",
            "tim_redaksi": "Redaksi Lifestyle Interiors",
            "tagar": ["#WorkFromHome", "#DesainInterior"],
            "sumber": "Lifestyle Interiors"
          },
          {
            "kategori": "olahraga",
            "judul": "Atlet Muda Raih Medali di Kejuaraan Dunia",
            "gambar": "https://raw.githubusercontent.com/UnteyoNews/News/0c79e90fe765d9a004e0bb7122b813d3824ec842/35%20Kata%20Kata%20Fajar%20Sadboy%20yang%20Galau%20Abis_%20Bikin%20Mewek%20dan%20Mengiris%20Hati!.jpg",
            "teks": "Seorang atlet muda Indonesia berhasil memenangkan medali di ajang kejuaraan dunia. Prestasi ini diraih berkat dedikasi dan latihan keras selama bertahun-tahun.\nKeberhasilan ini menjadi inspirasi bagi generasi muda untuk terus mengejar impian di bidang olahraga.",
            "tim_redaksi": "Redaksi Sport Heroes",
            "tagar": ["#PrestasiOlahraga", "#AtletMuda"],
            "sumber": "Sport Heroes"
          }
      ]
      

async function generateUniqueSlug(baseSlug) {
  let slug = baseSlug;
  let counter = 1;
  while (true) {
    const existingNews = await Student_News_Schema.findOne({ slug });
    if (!existingNews) {
      return slug;
    }
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}

async function seedDatabase() {
  try {
    for (const data of sampleSeed) {
      const baseSlug = slugify(data.judul, { lower: true });
      const uniqueSlug = await generateUniqueSlug(baseSlug);

      const article = new Student_News_Schema({ ...data, slug: uniqueSlug });
      await article.save();
      console.log(`Artikel dengan judul "${data.judul}" berhasil disimpan dengan slug: ${uniqueSlug}`);
    
      db.execute(`
          INSERT INTO popularity_StudentNews (article_slug) VALUES (?)
        `, [uniqueSlug])
      console.log(`Data popularitas untuk slug "${uniqueSlug}" berhasil ditambahkan.`);
    }
    console.log('Proses seeding data berita selesai.');
  } catch (error) {
    console.error('Gagal melakukan seeding data:', error);
  } 
}

seedDatabase();
})

module.exports = router