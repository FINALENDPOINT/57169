const express = require("express")
const router = express.Router()
const Youtube_Schema = require ('../models/Youtube_Models')

router.get('/seed', async (req, res) => {
    const sampleSeed = [
        {
            "kategori": "UnteyoPodcast",
            "judul": "DENNY CAKNAN FT. YENNY INKA, DANANG - RONDO KEMPLING (OFFICIAL LIVE MUSIC) - DC MUSIK",
            "video_id": "IMLJVoQnbZ8?si=hxRG3oK1FCxDmuY8",
            "teks": ["Denny Caknan terus menjadi ikon dangdut koplo yang paling dicintai di Indonesia. Lagu-lagunya yang bernuansa cinta dan kehidupan sehari-hari mampu menyentuh hati banyak pendengar, terutama generasi muda. Dengan gaya khasnya, Denny berhasil membawa warna baru ke dalam dunia dangdut modern", 
                "Grup-grup seperti Monata juga turut menghidupkan panggung dangdut koplo dengan kolaborasi spektakuler. Penampilan live mereka selalu penuh energi dan menarik ribuan penonton. Tak heran jika mereka menjadi langganan berbagai acara besar di Indonesia."],
            "tim_redaksi": "Tim Musik",
            "tagar": ["dangdut koplo", "denny caknan", "monata", "musik viral"]
          },
          {
            "kategori": "UnteyoPodcast",
            "judul": "Cak Sodiq - Gelandangan Om New Monata Supertrack Clothing Jogja",
            "video_id": "Ng3-efk0PUc?si=2m4zjCZbEoI3yZcu",
            "teks": ["Cak Sodiq, dengan suara khasnya, terus menjadi sorotan dalam genre dangdut koplo. Penampilan panggungnya yang penuh aksi dan lagu-lagu hit-nya selalu mendapatkan tempat di hati penggemar. Cak Sodiq juga dikenal sebagai ikon musik rakyat yang mampu menyatukan berbagai kalangan", "Fenomena ini turut membawa banyak talenta muda untuk mencoba genre dangdut koplo. Banyak di antaranya yang terinspirasi oleh kesuksesan artis-artis seperti Denny Caknan dan Monata. Media sosial pun kini dipenuhi dengan konten yang mengangkat tema dangdut koplo, menjadikannya semakin relevan di era digital."],
            "tim_redaksi": "Tim Musik",
            "tagar": ["dangdut koplo", "cak sodiq", "musik populer", "denny caknan"]
          },
          {
            "kategori": "UnteyoSeru",
            "judul": "TATU | RENA FT SODIQ | NEW MONATA | RAMAYANA AUDIO",
            "video_id": "M6Kxi5leWQM?si=Tag7tnXYwvGBUu6i",
            "teks": ["Fenomena dangdut koplo semakin marak dengan kehadiran artis-artis seperti Cak Sodiq dan Monata. Lagu-lagu mereka tidak hanya populer di daerah, tetapi juga mulai merambah ke acara-acara nasional. Penampilan mereka selalu menciptakan kehebohan di setiap pertunjukan", "Sementara itu, Denny Caknan terus membawa inovasi ke dalam genre ini. Ia tidak hanya menghadirkan lagu-lagu dengan lirik yang kuat, tetapi juga menciptakan gaya baru yang memadukan tradisi dan modernitas. Ini menjadi bukti bahwa dangdut koplo adalah genre yang terus berkembang."],
            "tim_redaksi": "Tim Musik",
            "tagar": ["cak sodiq", "denny caknan", "monata", "musik viral"]
          },
          {
            "kategori": "UnteyoSeru",
            "judul": "Ajeng Febria - Lontong Tahu Lontong Sate (Official Music Video) | OM. Nirwana",
            "video_id": "MWk1w_sL1Ok?si=xi0_1_DdqQx_QPX3",
            "teks": ["Ajeng Febria semakin dikenal sebagai salah satu bintang dangdut koplo yang sedang naik daun di Indonesia. Lagu-lagunya yang penuh makna berhasil menarik perhatian banyak penggemar dangdut koplo, terutama melalui penampilannya di berbagai panggung besar.", "Tidak hanya Ajeng, grup Adella Musik juga terus menunjukkan dominasi mereka di dunia dangdut koplo. Dengan aransemen musik yang unik dan vokalis berbakat, mereka menjadi ikon hiburan di berbagai acara musik lokal dan nasional."],
            "tim_redaksi": "Tim Musik",
            "tagar": ["ajeng febria", "adella musik", "dangdut koplo", "musik viral"]
          },
          {
            "kategori": "UnteyoTellingStories",
            "judul": "WULAN SUCI - Difarina Indra Adella Ft. Cantika Adella - OM ADELLA",
            "video_id": "ObcUCoJ_Iw4?si=2UoWi6Mn-TKLG6Mh",
            "teks": ["Cantika Nuswantoro semakin menunjukkan eksistensinya dalam genre dangdut koplo. Suara dan penampilannya yang elegan selalu berhasil mencuri perhatian di setiap panggung. Ia menjadi inspirasi bagi banyak penyanyi muda yang ingin masuk ke dunia dangdut koplo.", "Selain itu, Ajeng Febria dikenal sebagai penyanyi yang membawa unsur modern dalam lagu-lagunya. Dengan kemampuannya yang luar biasa, ia berhasil menggabungkan tradisi dangdut koplo dengan nuansa musik yang lebih segar."],
            "tim_redaksi": "Tim Musik",
            "tagar": ["cantika nuswantoro", "ajeng febria", "dangdut koplo", "musik viral"]
          },
          {
            "kategori": "UnteyoTellingStories",
            "judul": "SHINTA ARSINTA - TOMBO ATI | Feat. BINTANG FORTUNA ( Official Music Video )",
            "video_id": "zleUQ7pfrPw?si=UmuH_CzD0ilfsu3r",
            "teks": ["Penampilan Shinta Arsinta di berbagai panggung musik koplo selalu menjadi daya tarik utama. Ia mampu menghadirkan suasana yang penuh energi dengan lagu-lagunya yang memiliki beat khas dangdut koplo.", "Grup Adella Musik juga terus mendominasi industri dangdut koplo dengan musik-musik mereka yang berkualitas. Kehadiran mereka memberikan warna baru dalam genre ini, menjadikan setiap lagu mereka sebagai ikon hiburan rakyat."],
            "tim_redaksi": "Tim Musik",
            "tagar": ["shinta arsinta", "adella musik", "dangdut koplo", "musik populer"]
          },
          {
            "kategori": "UnteyoPerspektif",
            "judul": "KENANGAN TERINDAH - Cantika Adella - OM ADELLA",
            "video_id": "9bY837--CoU?si=CH63b4qUQbpaKnLT",
            "teks": ["Cantika Nuswantoro menjadi salah satu nama yang paling sering disebut dalam perbincangan tentang dangdut koplo. Suaranya yang unik membuatnya berbeda dari penyanyi lain di genre ini.", "Ajeng Febria juga terus memikat penggemar dengan lagu-lagunya yang penuh semangat. Ia tidak hanya menciptakan musik yang menyenangkan, tetapi juga membawa pesan yang dapat diterima oleh semua kalangan."],
            "tim_redaksi": "Tim Musik",
            "tagar": ["cantika nuswantoro", "ajeng febria", "dangdut koplo", "musik populer"]
          },
          {
            "kategori": "UnteyoPerspektif",
            "judul": "Diva Hani ft Ajeng Febria - Gema Takbir 2025 | Sagita Assololley | Dangdut (Official Music Video)",
            "video_id": "aytNfONpfIk?si=wKFeuZkprOC2DuVr",
            "teks": ["Ajeng Febria dan Shinta Arsinta membuktikan bahwa dangdut koplo adalah genre yang dapat terus berkembang. Lagu-lagu mereka penuh inovasi, menjadikan dangdut koplo lebih relevan bagi generasi muda.", "Grup Adella Musik juga terus menciptakan lagu-lagu yang menjadi favorit di media sosial. Dengan kombinasi musik yang energik dan lirik yang relatable, mereka selalu berhasil membuat lagu viral."],
            "tim_redaksi": "Tim Musik",
            "tagar": ["ajeng febria", "shinta arsinta", "adella musik", "lagu dangdut"]
          },
          {
            "kategori": "RuangUnteyo",
            "judul": "AJENG FEBRIA FT GERRY MAHESA - BISMILLAH CINTA I Mahesa Music",
            "video_id": "HUrbzQc6rcU?si=h6eK3l9J5ggfgfWp",
            "teks": ["Dangdut koplo kini semakin digemari, terutama berkat talenta-talenta seperti Ajeng Febria dan Shinta Arsinta. Mereka berdua mampu menyampaikan cerita melalui lagu yang terasa dekat dengan kehidupan masyarakat, menjadikannya sebagai bentuk hiburan yang sangat relatable.", "Grup Adella Musik juga terus membuktikan kekuatan mereka sebagai grup dangdut koplo papan atas. Kolaborasi mereka dengan artis-artis lokal sering kali menciptakan hits yang langsung viral di media sosial."],
            "tim_redaksi": "Tim Musik",
            "tagar": ["ajeng febria", "shinta arsinta", "adella musik", "lagu koplo"]
          },
          {
            "kategori": "RuangUnteyo",
            "judul": "RAMADHAN TIBA - OM ADELLA - Tasya Rosmala, Difarina Indra, Sherly KDI, Nurma Paejah, Lusyana Jelita",
            "video_id": "umTsyySvP9s?si=Bo9D6cxfVVYRDR4L",
            "teks": ["Cantika Nuswantoro telah menciptakan nama besar di dunia dangdut koplo. Lagu-lagunya tidak hanya menghibur, tetapi juga membawa nilai seni yang tinggi.", "Shinta Arsinta juga terus mendominasi panggung musik dangdut koplo. Penampilannya yang penuh energi selalu berhasil menarik perhatian banyak penggemar dangdut koplo di seluruh Indonesia."],
            "tim_redaksi": "Tim Musik",
            "tagar": ["cantika nuswantoro", "shinta arsinta", "dangdut koplo", "musik hits"]
          }
    ]

    try {
        const existingContent = await Youtube_Schema.findOne({judul: sampleSeed.judul})
        const newContent = await Youtube_Schema.insertMany(sampleSeed)

        if (existingContent) {
            return res.status(200).json({
                message: "Existing Content berhasil",
                data: existingContent
            })
        }
        else {
            return res.status(201).json({
                message: "New Content berhasil",
                data: newContent
            })
        }
    }
    catch(error) {
        res.status(500).json({
            message: "Error seeding content youtube gagal",
            data: error.message
        })
    }
})

module.exports = router