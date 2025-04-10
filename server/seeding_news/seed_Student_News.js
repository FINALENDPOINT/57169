const express = require('express');
const router = express.Router();
const Student_News = require("../models/news");

router.get('/seed', async (req, res) => {
    const sampleSeed = [{
        kategori: "Coli",
        judul: "Colikiawan Mendunia",
        gambar: "https://github.com/farhandwk/UnteyoNews/blob/12f376ef2112ca0d21086690c2f79f1d910b2659/Post1.png",
        teks: [
            "Komunitas pecinta kolibri, yang dikenal dengan sebutan Colikiawan, semakin mendunia berkat keindahan dan keunikan burung kolibri yang menjadi objek perhatian banyak orang. Dalam beberapa tahun terakhir, Colikiawan telah berhasil mengorganisir berbagai acara internasional, termasuk festival burung kolibri di beberapa negara. Acara ini tidak hanya menarik para penggemar dari dalam negeri tetapi juga peserta dari luar negeri yang ingin berbagi pengetahuan dan pengalaman tentang perawatan serta pelestarian spesies ini.",
            "Selain itu, Colikiawan juga aktif dalam kampanye konservasi untuk melindungi habitat alami kolibri yang semakin terancam oleh perubahan iklim dan urbanisasi. Melalui program edukasi dan kerja sama dengan lembaga lingkungan hidup, komunitas ini berupaya meningkatkan kesadaran masyarakat akan pentingnya menjaga keberadaan burung kolibri di alam liar. Dengan semangat kolektif dan dedikasi tinggi, Colikiawan terus memperluas jangkauan mereka di kancah internasional sambil tetap menjaga nilai-nilai lokal dalam pelestarian satwa langka ini."
        ],
        tim_redaksi: "AtunNews",
        tagar: [
            "colikiawan",
            "coliin2025"
        ]
        ,sumber: "bandar bokep"
    },
    {
        kategori: "Bokep Jepang",
        judul: "Bokep Jepang Mendunia",
        gambar: "https://github.com/farhandwk/UnteyoNews/blob/12f376ef2112ca0d21086690c2f79f1d910b2659/Post2.png", 
        teks: [
            "Industri film dewasa Jepang, atau yang lebih dikenal dengan sebutan bokep, telah menjadi fenomena global dalam beberapa tahun terakhir. Dengan berbagai genre dan gaya produksi yang unik, bokep Jepang menarik perhatian banyak penonton di seluruh dunia. Platform streaming internasional kini mulai menampilkan konten-konten dari industri ini, menjadikannya salah satu produk budaya pop yang paling banyak dicari. Meskipun kontroversial, popularitasnya menunjukkan bahwa ada permintaan besar untuk variasi dalam hiburan dewasa.",
            "Namun, keberadaan bokep Jepang juga memicu perdebatan mengenai etika dan dampaknya terhadap masyarakat. Banyak kritikus berargumen bahwa representasi perempuan dalam film-film tersebut sering kali tidak realistis dan dapat memperkuat stereotip negatif. Di sisi lain, pendukungnya berpendapat bahwa industri ini memberikan kebebasan berekspresi bagi para artis dan produsernya. Dengan meningkatnya kesadaran akan isu-isu sosial terkait pornografi, diskusi tentang bokep Jepang terus berkembang di kalangan akademisi dan aktivis di seluruh dunia."
        ],
        tim_redaksi: "AtunNews",
        tagar: [
            "bokep jepang",
            "jav"
        ],
        sumber: "bandar bokep"
    }
]

try {
    const existingNews = await Student_News.findOne({judul: sampleSeed.judul})
    const newNews = await Student_News.insertMany(sampleSeed)

    if (existingNews) {
        return res.status(200).json({
            message: "Existing Student News Berhasil",
            data: existingNews
        })
    }
    else {
        return res.status(201).json({
            message: "New Student News Berhasil",
            data: newNews
        })
    }
}
catch (error) {
    res.status(500).json({
        message: "Error seeding student news gagal",
        data: error.message
    })
}
})

module.exports = router