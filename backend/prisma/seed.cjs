const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const courses = [
  {
    title: "Bahasa Indonesia: Mengenal Huruf & Kata",
    description: "Belajar mengenal huruf vokal A-I-U-E-O, membaca suku kata sederhana, dan nama benda di sekolah.",
    category: "Bahasa",
    difficulty: "Mudah",
    lessons: [
      {
        title: "Mengenal Huruf Vokal A-I-U-E-O",
        description: "Mengenal bentuk dan bunyi lima huruf vokal utama.",
        content: "Huruf vokal ada lima: A, I, U, E, dan O. Huruf A seperti atap rumah (A untuk Apel). Huruf I tegak lurus dengan titik di atas (I untuk Ikan). Huruf U melengkung seperti mangkuk (U untuk Udang). Huruf E seperti sisir (E untuk Elang). Huruf O bulat seperti bola (O untuk Obor). Ayo ucapkan bersama: A, I, U, E, O!",
        visual: "Gambar lima huruf vokal A-I-U-E-O dengan warna ceria dan ilustrasi apel, ikan, udang, elang, serta obor.",
        videoUrl: "https://www.youtube.com/embed/xLGiR59fD2k",
        activityPrompt: "Sebutkan huruf A, I, U, E, O dengan suara riang sambil mengangkat jarimu satu per satu!",
        activityAnswer: "Anak dapat melafalkan kelima huruf vokal dengan jelas dan tersenyum.",
        duration: 8,
        quiz: [
          {
            question: "Huruf vokal yang berbentuk bulat seperti bola adalah huruf apa?",
            options: ["Huruf O", "Huruf I", "Huruf U"],
            correctAnswer: "Huruf O",
            explanation: "Tepat sekali! Huruf O bentuknya bulat bundar seperti bola."
          },
          {
            question: "Kata 'Apel' dimulai dengan huruf apa?",
            options: ["Huruf A", "Huruf E", "Huruf O"],
            correctAnswer: "Huruf A",
            explanation: "Hebat! Huruf A adalah huruf pertama pada kata Apel."
          },
          {
            question: "Berapa jumlah huruf vokal yang kita pelajari?",
            options: ["5 huruf", "10 huruf", "1 huruf"],
            correctAnswer: "5 huruf",
            explanation: "Benar! Ada lima huruf vokal: A, I, U, E, dan O."
          }
        ]
      },
      {
        title: "Membaca Suku Kata BA-BI-BU-BE-BO",
        description: "Menggabungkan huruf B dengan huruf vokal menjadi kata ceria.",
        content: "Saat huruf B digabung dengan huruf vokal, bunyinya sangat seru! B bertemu A dibaca BA seperti Balon. B bertemu I dibaca BI seperti Bintang. B bertemu U dibaca BU seperti Buku. B bertemu E dibaca BE seperti Bebek. B bertemu O dibaca BO seperti Bola. Mari kita baca bersama: BA, BI, BU, BE, BO!",
        visual: "Kartu kata bergambar balon warna-warni, bintang bercahaya, buku cerita, bebek berenang, dan bola tendang.",
        videoUrl: "https://www.youtube.com/embed/RvsyDOhTFAk",
        activityPrompt: "Tunjuk satu benda di sekitarmu yang berawalan dari suku kata 'BU', misalnya Buku belajarmu!",
        activityAnswer: "Anak berhasil menunjukkan buku atau benda berawalan suku kata bu.",
        duration: 8,
        quiz: [
          {
            question: "Huruf B jika digabung dengan U dibaca apa?",
            options: ["BU", "BA", "BO"],
            correctAnswer: "BU",
            explanation: "Pintar! Huruf B ditambah U dibaca BU, seperti pada kata Buku."
          },
          {
            question: "Kata 'Bola' dimulai dengan suku kata apa?",
            options: ["BO", "BE", "BI"],
            correctAnswer: "BO",
            explanation: "Bagus sekali! Bola diawali dengan suku kata BO."
          },
          {
            question: "Hewan apa yang bunyinya kwek-kwek dan diawali suku kata BE?",
            options: ["Bebek", "Kucing", "Ikan"],
            correctAnswer: "Bebek",
            explanation: "Benar! Bebek diawali dengan suku kata BE."
          }
        ]
      },
      {
        title: "Mengenal Benda di Ruang Kelas",
        description: "Mengenal nama dan kegunaan perlengkapan belajar di kelas 1.",
        content: "Di ruang kelas 1, kita punya banyak sahabat belajar. Buku untuk membaca dan menulis cerita seru. Pensil untuk menggambar dan mencatat ilmu. Penghapus untuk membersihkan coretan yang salah. Tas sekolah untuk menyimpan semua perlengkapan agar aman dan rapi. Kita rawat semua alat belajar kita dengan baik ya!",
        visual: "Meja sekolah yang tertata rapi dengan tas punggung, buku tulis bergambar, pensil warna, dan penghapus karet.",
        videoUrl: "https://www.youtube.com/embed/EpyvF8GL72I",
        activityPrompt: "Buka tas sekolahmu, lalu sebutkan 2 alat tulis yang ada di dalamnya!",
        activityAnswer: "Anak dapat menyebutkan pensil, penghapus, atau buku dengan bangga.",
        duration: 8,
        quiz: [
          {
            question: "Alat tulis apa yang kita gunakan untuk menulis dan menggambar?",
            options: ["Pensil", "Sendok", "Sepatu"],
            correctAnswer: "Pensil",
            explanation: "Tepat! Kita menulis tugas dan menggambar menggunakan pensil."
          },
          {
            question: "Jika tulisan pensil kita keliru, kita merapikannya memakai apa?",
            options: ["Penghapus", "Penggaris", "Gunting"],
            correctAnswer: "Penghapus",
            explanation: "Betul! Penghapus membantu menghapus bekas pensil dengan bersih."
          },
          {
            question: "Setelah selesai belajar, ke mana kita menyimpan buku dan pensil?",
            options: ["Ke dalam tas sekolah", "Dibuang ke lantai", "Ditinggal sembarangan"],
            correctAnswer: "Ke dalam tas sekolah",
            explanation: "Hebat! Menyimpan alat belajar ke tas membuat peralatan tidak hilang."
          }
        ]
      },
      {
        title: "Mengenal Anggota Tubuh Kita",
        description: "Mengenal nama dan fungsi mata, telinga, hidung, mulut, dan tangan.",
        content: "Tubuh kita sangat istimewa dan luar biasa. Dua mata untuk melihat bunga dan pelangi. Dua telinga untuk mendengar suara merdu dan nasihat guru. Satu hidung untuk bernapas segar dan mencium wangi buah. Satu mulut untuk makan sehat, berbicara sopan, dan tersenyum. Dua tangan untuk belajar menulis dan bertepuk tangan gembira!",
        visual: "Gambar ceria anak laki-laki dan perempuan tersenyum dengan petunjuk panah pada mata, telinga, hidung, dan tangan.",
        videoUrl: "https://www.youtube.com/embed/YpkwvvCpr_E",
        activityPrompt: "Pegang kedua telingamu dengan lembut, lalu dengarkan bunyi detak jarum jam atau suara di sekitarmu!",
        activityAnswer: "Anak menyentuh telinga dan mendengarkan dengan penuh perhatian.",
        duration: 8,
        quiz: [
          {
            question: "Anggota tubuh yang kita gunakan untuk melihat adalah...",
            options: ["Mata", "Kaki", "Lidah"],
            correctAnswer: "Mata",
            explanation: "Benar! Mata berguna untuk melihat benda-benda di sekeliling kita."
          },
          {
            question: "Ada berapa jumlah tangan yang kita miliki?",
            options: ["Dua tangan (kanan dan kiri)", "Empat tangan", "Satu tangan"],
            correctAnswer: "Dua tangan (kanan dan kiri)",
            explanation: "Tepat sekali! Kita memiliki dua tangan untuk beraktivitas."
          },
          {
            question: "Mulut kita gunakan untuk berbicara yang...",
            options: ["Sopan dan baik", "Kasar dan teriak-teriak", "Marah-marah"],
            correctAnswer: "Sopan dan baik",
            explanation: "Pintar! Selalu gunakan mulut untuk berbicara santun dan ramah."
          }
        ]
      },
      {
        title: "Membaca Kalimat Pendek",
        description: "Latihan membaca kalimat sederhana 3 kata dengan percaya diri.",
        content: "Hore! Sekarang kita bisa membaca kalimat pendek. Contoh kalimat yang mudah: 'Budi suka apel.' atau 'Ini buku saya.' Kita membaca perlahan dari arah kiri ke kanan. Jika bertemu kata yang belum dikenal, kita eja suku katanya pelan-pelan. Kamu pasti bisa!",
        visual: "Ilustrasi anak membaca buku cerita dongeng yang berwarna cerah bersama maskot DisaEdu.",
        videoUrl: "https://www.youtube.com/embed/IsytP-JNjSY",
        activityPrompt: "Ayo baca kalimat ini dengan senyum lebar: 'Aku anak hebat!'",
        activityAnswer: "Anak mengucapkan kalimat pendek dengan antusias dan percaya diri.",
        duration: 8,
        quiz: [
          {
            question: "Arah membaca tulisan yang benar adalah dari arah...",
            options: ["Kiri ke kanan", "Kanan ke kiri", "Bawah ke atas"],
            correctAnswer: "Kiri ke kanan",
            explanation: "Benar! Dalam bahasa Indonesia, kita membaca teks dari kiri ke kanan."
          },
          {
            question: "Pada kalimat 'Ani membaca buku', apa yang sedang dibaca Ani?",
            options: ["Buku", "Sepeda", "Kue"],
            correctAnswer: "Buku",
            explanation: "Tepat! Ani sedang membaca buku."
          },
          {
            question: "Jika kita masih kesulitan membaca satu kata, sikap yang baik adalah...",
            options: ["Tenang dan terus mencoba berlatih", "Menangis dan merobek buku", "Marah-marah"],
            correctAnswer: "Tenang dan terus mencoba berlatih",
            explanation: "Luar biasa! Tetap tenang dan terus berlatih membuat kita semakin mahir."
          }
        ]
      }
    ]
  },
  {
    title: "Matematika Ceria: Angka & Berhitung",
    description: "Belajar mengenal lambang bilangan 1-10, menghitung benda konkret, dan penjumlahan dasar.",
    category: "Matematika",
    difficulty: "Mudah",
    lessons: [
      {
        title: "Mengenal Angka 1 sampai 5",
        description: "Menghitung dengan jari tangan dan mengenal lambang angka 1, 2, 3, 4, 5.",
        content: "Ayo kita berhitung angka satu sampai lima dengan jari tangan kita! Angka 1 seperti pensil lurus berdiri. Angka 2 seperti bebek yang berenang di danau. Angka 3 seperti sayap kupu-kupu yang terbuka. Angka 4 seperti kursi yang terbalik. Angka 5 seperti badut memakai topi ceria. Mari kita sebut bersama: satu, dua, tiga, empat, lima!",
        visual: "Kartu angka bergambar 1 buah apel merah, 2 buah bintang kuning, 3 buah jeruk oranye, 4 buah krayon, dan 5 kupu-kupu.",
        videoUrl: "https://www.youtube.com/embed/xCeQjF1woeM",
        activityPrompt: "Buka jari tangan kananmu, lalu tunjukkan 3 jari ke atas sambil berhitung: satu, dua, tiga!",
        activityAnswer: "Anak berhasil menunjukkan tiga jari tangan secara tepat.",
        duration: 8,
        quiz: [
          {
            question: "Angka berapakah yang datang setelah angka 2?",
            options: ["Angka 3", "Angka 1", "Angka 5"],
            correctAnswer: "Angka 3",
            explanation: "Benar! Urutan hitungnya adalah 1, 2, lalu 3."
          },
          {
            question: "Angka berapa yang bentuknya melengkung lucu seperti bebek berenang?",
            options: ["Angka 2", "Angka 1", "Angka 4"],
            correctAnswer: "Angka 2",
            explanation: "Tepat sekali! Angka 2 meliuk seperti bebek di air."
          },
          {
            question: "Jika kamu punya 1 jari diangkat, lalu angkat 1 jari lagi, berapa jari yang terangkat?",
            options: ["2 jari", "5 jari", "1 jari"],
            correctAnswer: "2 jari",
            explanation: "Pintar! 1 ditambah 1 adalah 2."
          }
        ]
      },
      {
        title: "Mengenal Angka 6 sampai 10",
        description: "Melanjutkan berhitung angka 6 hingga 10 menggunakan kedua telapak tangan.",
        content: "Buka kedua telapak tanganmu! Sekarang kita berhitung lengkap sepuluh jari: 6, 7, 8, 9, dan 10. Angka 6 punya lingkaran kecil di bawah. Angka 7 seperti tongkat kakek berjalan. Angka 8 seperti dua buah donat bertumpuk. Angka 9 punya lingkaran di atas dan kaki melengkung. Angka 10 terdiri dari angka 1 yang berdiri di samping angka 0. Lengkap sepuluh jarimu yang hebat!",
        visual: "Dua tangan terbuka dengan sepuluh jari berhias nomor 1 sampai 10 dengan warna-warni pelangi.",
        videoUrl: "https://www.youtube.com/embed/2txkkcjMvPA",
        activityPrompt: "Sentuh ujung sepuluh jarimu satu demi satu sambil berhitung dari satu sampai sepuluh!",
        activityAnswer: "Anak dapat menghitung sepuluh jarinya secara teratur.",
        duration: 8,
        quiz: [
          {
            question: "Berapa jumlah seluruh jari di kedua tangan kita?",
            options: ["10 jari", "5 jari", "8 jari"],
            correctAnswer: "10 jari",
            explanation: "Hebat! Tangan kanan punya 5 jari dan tangan kiri punya 5 jari, totalnya 10 jari."
          },
          {
            question: "Angka berapakah setelah angka 7?",
            options: ["Angka 8", "Angka 6", "Angka 9"],
            correctAnswer: "Angka 8",
            explanation: "Betul! Setelah angka 7 adalah angka 8."
          },
          {
            question: "Angka 10 terdiri dari gabungan angka...",
            options: ["Angka 1 dan angka 0", "Angka 1 dan angka 1", "Angka 2 dan angka 0"],
            correctAnswer: "Angka 1 dan angka 0",
            explanation: "Benar! Angka 10 ditulis dengan angka 1 diikuti angka 0."
          }
        ]
      },
      {
        title: "Menghitung Benda di Sekitar",
        description: "Belajar menyentuh dan menghitung objek konkret satu per satu secara tenang.",
        content: "Menghitung benda itu sangat mudah jika kita lakukan dengan tenang. Sentuh satu benda, katakan 'satu'. Sentuh benda kedua, katakan 'dua'. Sentuh benda ketiga, katakan 'tiga'. Jangan terburu-buru ya! Menghitung satu per satu membantu kita mengetahui jumlah mainan, pensil, atau buah dengan tepat.",
        visual: "Gambar 4 buah jeruk segar di atas piring biru cerah dengan angka 4 besar di sampingnya.",
        videoUrl: "https://www.youtube.com/embed/Y2brANut_NM",
        activityPrompt: "Ambil 4 buah pensil warna atau krayon di mejamu, lalu hitung bersama pendampingmu!",
        activityAnswer: "Anak menyentuh dan menghitung empat benda dengan berurutan.",
        duration: 8,
        quiz: [
          {
            question: "Ada 3 bola di keranjang. Lambang angka yang tepat adalah...",
            options: ["3", "1", "5"],
            correctAnswer: "3",
            explanation: "Tepat! Tiga bola dilambangkan dengan angka 3."
          },
          {
            question: "Bagaimana cara menghitung benda yang paling tepat?",
            options: ["Menyentuh satu per satu benda sambil berhitung", "Menebak asal-asalan", "Melempar bendanya"],
            correctAnswer: "Menyentuh satu per satu benda sambil berhitung",
            explanation: "Pintar! Menyentuh satu per satu membuat hitungan kita tidak keliru."
          },
          {
            question: "Di atas meja ada 2 buku dongeng dan 2 buku mewarnai. Berapa total bukunya?",
            options: ["4 buku", "2 buku", "6 buku"],
            correctAnswer: "4 buku",
            explanation: "Hebat! 2 ditambah 2 adalah 4 buku."
          }
        ]
      },
      {
        title: "Lebih Banyak & Lebih Sedikit",
        description: "Membandingkan dua kumpulan benda sederhana secara visual.",
        content: "Mari kita bandingkan dua kelompok benda! Kotak A berisi 5 buah permen manis. Kotak B hanya berisi 2 buah permen manis. Kotak A isinya LEBIH BANYAK. Kotak B isinya LEBIH SEDIKIT. Jika kedua kotak memiliki jumlah yang sama, kita sebut SAMA BANYAK!",
        visual: "Ilustrasi komparasi visual: piring kiri berisi 5 stroberi merah dan piring kanan berisi 2 stroberi.",
        videoUrl: "https://www.youtube.com/embed/YzaKpr4GVE4",
        activityPrompt: "Lihat dua tanganmu: jika tangan kanan memegang 3 koin dan tangan kiri memegang 1 koin, mana yang lebih banyak?",
        activityAnswer: "Anak dapat menunjukkan tangan kanan yang berisi 3 koin sebagai jumlah yang lebih banyak.",
        duration: 8,
        quiz: [
          {
            question: "Manakah yang jumlahnya LEBIH BANYAK: 5 permen atau 2 permen?",
            options: ["5 permen", "2 permen", "Keduanya sama sedikit"],
            correctAnswer: "5 permen",
            explanation: "Benar! 5 buah permen lebih banyak daripada 2 buah permen."
          },
          {
            question: "Jika di piring A ada 3 jeruk dan di piring B ada 3 jeruk, artinya...",
            options: ["Sama banyak", "Piring A lebih banyak", "Piring B lebih banyak"],
            correctAnswer: "Sama banyak",
            explanation: "Tepat! Karena jumlahnya sama-sama 3, maka jumlahnya sama banyak."
          },
          {
            question: "Antara 1 pensil dengan 4 pensil, manakah yang LEBIH SEDIKIT?",
            options: ["1 pensil", "4 pensil", "Keduanya banyak"],
            correctAnswer: "1 pensil",
            explanation: "Hebat! 1 pensil jumlahnya lebih sedikit daripada 4 pensil."
          }
        ]
      },
      {
        title: "Penjumlahan Sederhana (Gabungkan Benda)",
        description: "Belajar menggabungkan dua kelompok objek menjadi satu jumlah.",
        content: "Penjumlahan artinya menyatukan benda-benda menjadi bertambah banyak! Bayangkan kamu punya 2 buah kue di piringmu. Lalu Ibu memberimu 1 buah kue lagi. Ayo kita hitung semuanya: 2 ditambah 1 menjadi 3 kue! Menggunakan jari tangan untuk menghitung penjumlahan sangat mudah dan menyenangkan.",
        visual: "Gambar 2 buah donat cokelat ditambah 1 donat stroberi sama dengan 3 donat lezat.",
        videoUrl: "https://www.youtube.com/embed/7qGiYubyxxg",
        activityPrompt: "Gunakan jarimu: angkat 2 jari di tangan kiri dan 2 jari di tangan kanan. Hitung semua jarimu yang berdiri!",
        activityAnswer: "Anak menghitung total 4 jari tangan yang terangkat.",
        duration: 8,
        quiz: [
          {
            question: "Berapakah hasil dari 2 + 1?",
            options: ["3", "4", "1"],
            correctAnswer: "3",
            explanation: "Pintar! 2 ditambah 1 menghasilkan 3."
          },
          {
            question: "Kamu punya 3 balon, lalu paman memberi 1 balon lagi. Berapa jumlah balonmu?",
            options: ["4 balon", "2 balon", "5 balon"],
            correctAnswer: "4 balon",
            explanation: "Benar sekali! 3 ditambah 1 sama dengan 4 balon."
          },
          {
            question: "Berapakah hasil dari 1 + 1?",
            options: ["2", "3", "0"],
            correctAnswer: "2",
            explanation: "Hebat! 1 ditambah 1 sama dengan 2."
          }
        ]
      }
    ]
  },
  {
    title: "Pendidikan Karakter & Kebiasaanku di Sekolah",
    description: "Belajar berteman baik di kelas 1, tata tertib sekolah, menjaga kebersihan, dan 4 kata ajaib.",
    category: "Karakter",
    difficulty: "Sedang",
    lessons: [
      {
        title: "Berkenalan dengan Guru & Teman Baru",
        description: "Cara percaya diri dan ramah saat menyapa teman serta guru di sekolah dasar.",
        content: "Masuk kelas 1 SD sangat menyenangkan! Saat bertemu teman baru di kelas, pandang wajahnya dan tersenyumlah. Katakan dengan ceria: 'Halo, namaku Budi. Salam kenal ya!' Kepada Bapak dan Ibu Guru, kita bersalaman atau menundukkan kepala dengan santun sambil mengucapkan: 'Selamat pagi, Bu Guru.' Anak yang ramah disukai semua teman!",
        visual: "Dua anak berseragam sekolah dasar merah putih saling melambaikan tangan dengan wajah gembira di depan gerbang sekolah.",
        videoUrl: "https://www.youtube.com/embed/uaOP-Fk3EXo",
        activityPrompt: "Berlatihlah menyebutkan namamu di depan cermin dengan senyum ramah dan suara ceria!",
        activityAnswer: "Anak mampu memperkenalkan namanya sendiri dengan tersenyum percaya diri.",
        duration: 8,
        quiz: [
          {
            question: "Apa kalimat yang kita ucapkan saat berkenalan dengan teman baru?",
            options: ["Halo, siapa namamu? Senang berteman denganmu", "Pergi sana, jangan ganggu", "Aku tidak mau bicara"],
            correctAnswer: "Halo, siapa namamu? Senang berteman denganmu",
            explanation: "Tepat! Berkenalan dengan ramah membuat kita punya banyak teman baik."
          },
          {
            question: "Bagaimana ekspresi wajah kita saat menyapa guru dan teman?",
            options: ["Tersenyum ramah dan bersahabat", "Cemberut cemberut", "Memalingkan wajah"],
            correctAnswer: "Tersenyum ramah dan bersahabat",
            explanation: "Benar! Senyuman ramah membuat suasana sekolah jadi menyenangkan."
          },
          {
            question: "Saat bertemu Bapak atau Ibu Guru di pagi hari, kita mengucapkan...",
            options: ["Selamat pagi, Guru", "Selamat tidur", "Lari menjauh"],
            correctAnswer: "Selamat pagi, Guru",
            explanation: "Pintar! Mengucapkan salam di pagi hari adalah tanda anak yang berbakti dan sopan."
          }
        ]
      },
      {
        title: "Tertib di Dalam Ruang Kelas",
        description: "Mengenal kebiasaan baik saat mengikuti pelajaran di ruang kelas.",
        content: "Di kelas 1, kita belajar bersama dengan tertib dan nyaman. Bila ingin bertanya kepada guru, angkat tangan kananmu terlebih dahulu dengan tenang. Dengarkan saat guru sedang menjelaskan materi. Duduklah dengan posisi punggung yang tegak. Jika ingin ke toilet, minta izin terlebih dahulu dengan sopan kepada guru.",
        visual: "Suasana ruang kelas yang damai dengan seorang murid yang mengangkat tangan dengan tenang untuk bertanya.",
        videoUrl: "https://www.youtube.com/embed/tvuM-aw3J5s",
        activityPrompt: "Praktikkan cara mengangkat tangan kananmu dengan santun untuk meminta izin!",
        activityAnswer: "Anak dapat mempraktikkan gestur mengangkat tangan secara tenang dan teratur.",
        duration: 8,
        quiz: [
          {
            question: "Apa yang harus kita lakukan sebelum bertanya atau berbicara di kelas?",
            options: ["Mengangkat tangan terlebih dahulu dengan tenang", "Berteriak sekencang-kencangnya", "Memukul meja"],
            correctAnswer: "Mengangkat tangan terlebih dahulu dengan tenang",
            explanation: "Benar! Mengangkat tangan adalah tanda kesopanan dalam tata tertib kelas."
          },
          {
            question: "Saat guru sedang menerangkan pelajaran di depan kelas, sikap kita adalah...",
            options: ["Mendengarkan dengan sungguh-sungguh", "Tidur di atas meja", "Bermain sendiri"],
            correctAnswer: "Mendengarkan dengan sungguh-sungguh",
            explanation: "Tepat! Mendengarkan guru membuat kita cepat mengerti pelajaran."
          },
          {
            question: "Jika ingin pergi ke toilet saat jam pelajaran berlangsung, kita harus...",
            options: ["Meminta izin dengan sopan kepada guru", "Langsung lari keluar kelas", "Menangis"],
            correctAnswer: "Meminta izin dengan sopan kepada guru",
            explanation: "Pintar! Selalu minta izin kepada guru agar guru mengetahui keberadaanmu."
          }
        ]
      },
      {
        title: "Menjaga Kebersihan Diri & Cuci Tangan",
        description: "Langkah mudah menjaga badan tetap bersih, sehat, dan bebas kuman.",
        content: "Anak sehat adalah anak yang rajin menjaga kebersihan tubuhnya. Selalu cuci tanganmu dengan sabun dan air bersih yang mengalir sebelum makan dan sesudah bermain. Mandi teratur dua kali sehari dan menyikat gigi setelah sarapan serta sebelum tidur. Badan yang bersih membuat kita segar, wangi, dan tidak mudah sakit!",
        visual: "Ilustrasi ceria langkah-langkah mencuci tangan memakai sabun berbusa dengan air mengalir.",
        videoUrl: "https://www.youtube.com/embed/L08to1kT39U",
        activityPrompt: "Ayo cuci tanganmu dengan sabun dan air bersih sekarang, lalu lap hingga kering dan harum!",
        activityAnswer: "Anak mempraktikkan kebiasaan mencuci tangan dengan sabun secara mandiri.",
        duration: 8,
        quiz: [
          {
            question: "Kapan waktu yang paling penting untuk mencuci tangan?",
            options: ["Sebelum makan dan sesudah bermain", "Hanya saat mau tidur", "Tidak perlu cuci tangan"],
            correctAnswer: "Sebelum makan dan sesudah bermain",
            explanation: "Benar! Cuci tangan sebelum makan melindungi kita dari kuman yang terbawa makanan."
          },
          {
            question: "Mencuci tangan agar kuman mati paling efektif menggunakan...",
            options: ["Air mengalir dan sabun", "Kain kotor", "Debu"],
            correctAnswer: "Air mengalir dan sabun",
            explanation: "Tepat sekali! Sabun dan air mengalir mengangkat kuman hingga bersih tuntas."
          },
          {
            question: "Apa manfaat mandi dan merawat kebersihan tubuh?",
            options: ["Tubuh sehat, segar, dan terhindar dari penyakit", "Tubuh cepat lelah", "Baju jadi rusak"],
            correctAnswer: "Tubuh sehat, segar, dan terhindar dari penyakit",
            explanation: "Pintar! Menjaga kebersihan menjaga kesehatan seluruh tubuh kita."
          }
        ]
      },
      {
        title: "Empat Kata Ajaib: Tolong, Maaf, Terima Kasih, Permisi",
        description: "Membiasakan penggunaan kata-kata santun dalam kehidupan sehari-hari.",
        content: "Ada empat kata ajaib yang bisa membuat semua orang tersenyum gembira! 1. Ucapkan 'TOLONG' saat kamu memerlukan bantuan orang lain. 2. Ucapkan 'TERIMA KASIH' setiap kali selesai menerima bantuan atau hadiah. 3. Ucapkan 'MAAF' bila kamu tidak sengaja berbuat salah atau menabrak orang lain. 4. Ucapkan 'PERMISI' saat hendak lewat di depan orang. Anak hebat selalu ingat empat kata ajaib ini!",
        visual: "Empat bintang emas warna-warni bertuliskan kata Tolong, Maaf, Terima Kasih, dan Permisi dengan senyum bahagia.",
        videoUrl: "https://www.youtube.com/embed/QTChKKL-HDU",
        activityPrompt: "Ucapkan kata 'Terima kasih' kepada ayah, ibu, atau pendampingmu yang menemanimu belajar hari ini!",
        activityAnswer: "Anak mengucapkan terima kasih dengan tulus kepada pendamping belajarnya.",
        duration: 8,
        quiz: [
          {
            question: "Kata apa yang kita ucapkan saat tidak sengaja menjatuhkan pensil teman?",
            options: ["Maafkan aku ya", "Biar saja", "Tertawa keras"],
            correctAnswer: "Maafkan aku ya",
            explanation: "Tepat! Mengucapkan maaf menunjukkan bahwa kita anak yang bertanggung jawab."
          },
          {
            question: "Setelah diberi kue lezat oleh teman atau guru, kita mengucapkan...",
            options: ["Terima kasih", "Diam saja", "Minta lagi lebih banyak"],
            correctAnswer: "Terima kasih",
            explanation: "Benar! Terima kasih adalah tanda bersyukur dan menghargai kebaikan orang lain."
          },
          {
            question: "Bila kita membutuhkan bantuan mengambil buku di rak tinggi, kita mengucapkan kata...",
            options: ["Tolong bantu aku ya", "Cepat ambilkan", "Hei kamu"],
            correctAnswer: "Tolong bantu aku ya",
            explanation: "Hebat! Kata 'tolong' membuat permintaan kita terdengar santun dan dihargai."
          }
        ]
      },
      {
        title: "Merapikan Alat Belajar Sendiri",
        description: "Belajar mandiri mengembalikan pensil, buku, dan tas ke tempatnya.",
        content: "Setelah selesai belajar, kita adalah anak kelas 1 yang mandiri! Tutup buku tulismu dengan hati-hati agar tidak terlipat. Masukkan pensil dan penghapus ke dalam tempat pensil. Masukkan buku ke dalam tas sekolahmu dan tutup ritsletingnya. Meja belajarmu sekarang rapi dan bersih. Kamu anak yang sangat hebat!",
        visual: "Gambar meja belajar yang bersih dan rapi dengan tas punggung yang siap untuk sekolah besok pagi.",
        videoUrl: "https://www.youtube.com/embed/7M0EX01WLL8",
        activityPrompt: "Ayo bereskan mejamu sekarang: masukkan pensil dan bukumu ke dalam tas secara rapi!",
        activityAnswer: "Anak merapikan alat tulis dan bukunya ke dalam tas secara mandiri.",
        duration: 8,
        quiz: [
          {
            question: "Siapa yang bertanggung jawab merapikan alat belajar kita sendiri?",
            options: ["Kita sendiri secara mandiri", "Menyuruh orang lain", "Dibiarkan berserakan"],
            correctAnswer: "Kita sendiri secara mandiri",
            explanation: "Pintar! Menjadi anak mandiri berarti kita merawat barang-barang milik kita sendiri."
          },
          {
            question: "Di mana tempat yang paling tepat untuk menyimpan pensil agar tidak hilang?",
            options: ["Kotak pensil", "Di lantai", "Di tempat sampah"],
            correctAnswer: "Kotak pensil",
            explanation: "Benar! Kotak pensil menjaga alat tulis tetap aman dan mudah dicari saat dibutuhkan."
          },
          {
            question: "Bagaimana perasaan kita saat melihat meja belajar kita rapi dan bersih?",
            options: ["Senang, nyaman, dan bangga", "Sedih", "Marah"],
            correctAnswer: "Senang, nyaman, dan bangga",
            explanation: "Luar biasa! Meja yang rapi membuat kita selalu bersemangat untuk belajar."
          }
        ]
      }
    ]
  }
];

async function main() {
  const experts = [
    // --- GURU PRIVAT (DisaPrivate) ---
    {
      id: "tutor-budi",
      name: "Budi Santoso, S.Pd., M.Pd",
      role: "Guru Privat Pendidikan Luar Biasa (PLB)",
      specialty: "Disabilitas Intelektual, Tunagrahita Ringan-Sedang, Calistung Dasar SD",
      rating: 4.9,
      reviews: 142,
      price: 175000,
      duration: 60,
      image: "https://api.dicebear.com/9.x/notionists/svg?seed=Budi&backgroundColor=e6f0ff",
      slots: ["Hari ini 15:00", "Besok 10:00", "Lusa 14:00"]
    },
    {
      id: "tutor-nurul",
      name: "Nurul Hidayah, S.Pd",
      role: "Guru Privat Inklusi & Slow Learner",
      specialty: "Pendampingan Siswa Lambat Belajar (Slow Learner), Stimulasi Kognitif, Membaca Ceria",
      rating: 4.9,
      reviews: 118,
      price: 150000,
      duration: 60,
      image: "https://api.dicebear.com/9.x/notionists/svg?seed=Nurul&backgroundColor=fff2e8",
      slots: ["Hari ini 16:30", "Besok 13:00", "Lusa 10:00"]
    },
    {
      id: "tutor-dewi",
      name: "Dewi Lestari, S.Pd",
      role: "Tutor Calistung & Tematik SD Khusus",
      specialty: "Mengenal Huruf & Suku Kata, Berhitung Benda Konkret, Belajar dengan Alat Peraga",
      rating: 4.8,
      reviews: 95,
      price: 160000,
      duration: 60,
      image: "https://api.dicebear.com/9.x/notionists/svg?seed=Dewi&backgroundColor=eaf8f1",
      slots: ["Besok 09:00", "Besok 15:00", "Lusa 16:00"]
    },
    {
      id: "tutor-fajar",
      name: "Fajar Pratama, S.Pd",
      role: "Guru Privat Motorik & Kemandirian",
      specialty: "Terapi Motorik Halus Menulis, Kemandirian Belajar, Regulasi Emosi di Sekolah",
      rating: 4.8,
      reviews: 76,
      price: 155000,
      duration: 60,
      image: "https://api.dicebear.com/9.x/notionists/svg?seed=Fajar&backgroundColor=d1d4f9",
      slots: ["Besok 14:00", "Lusa 09:30"]
    },

    // --- DOKTER & SPESIALIS MEDIS (DisaConsult) ---
    {
      id: "doctor-tiara",
      name: "dr. Tiara Kusuma, Sp.A(K)",
      role: "Dokter Spesialis Anak (Konsultan Tumbuh Kembang)",
      specialty: "Skrining Tumbuh Kembang, Disabilitas Intelektual, Evaluasi Keterlambatan Perkembangan Global",
      rating: 5.0,
      reviews: 264,
      price: 320000,
      duration: 45,
      image: "https://api.dicebear.com/9.x/notionists/svg?seed=Tiara&backgroundColor=e0f2fe",
      slots: ["Hari ini 16:00", "Besok 10:00", "Lusa 14:30"]
    },
    {
      id: "doctor-hendra",
      name: "dr. Hendra Wijaya, Sp.KJ(K)",
      role: "Psikiater Anak & Remaja (Konsultan)",
      specialty: "Regulasi Emosi & Perilaku Adaptif, Konseling Orang Tua, Penanganan Tantrum & Cemas",
      rating: 4.9,
      reviews: 198,
      price: 350000,
      duration: 50,
      image: "https://api.dicebear.com/9.x/notionists/svg?seed=Hendra&backgroundColor=fef3c7",
      slots: ["Hari ini 19:00", "Besok 14:00", "Lusa 16:00"]
    },
    {
      id: "doctor-ratna",
      name: "dr. Ratna Wulandari, Sp.KFR",
      role: "Dokter Spesialis Kedokteran Fisik & Rehabilitasi Medik",
      specialty: "Fungsi Motorik Kasar & Halus, Koordinasi Postur, Terapi Okupasi & Kemandirian Fisik",
      rating: 4.9,
      reviews: 145,
      price: 280000,
      duration: 45,
      image: "https://api.dicebear.com/9.x/notionists/svg?seed=Ratna&backgroundColor=fce7f3",
      slots: ["Besok 13:00", "Lusa 11:00"]
    },
    {
      id: "doctor-amanda",
      name: "Dr. Amanda Sari, M.Psi., Psikolog",
      role: "Psikolog Klinis Anak Berkebutuhan Khusus",
      specialty: "Asesmen Kognitif Formal IQ & Perilaku Adaptif, Program Pembelajaran Individual (IEP)",
      rating: 4.9,
      reviews: 210,
      price: 260000,
      duration: 50,
      image: "https://api.dicebear.com/9.x/notionists/svg?seed=Amanda&backgroundColor=ffd5dc",
      slots: ["Hari ini 14:00", "Besok 11:00", "Lusa 09:00"]
    }
  ];
  for (const expert of experts) {
    await prisma.consultationExpert.upsert({ where: { id: expert.id }, update: expert, create: expert });
  }

  await prisma.simulationMessage.deleteMany();
  await prisma.simulationSession.deleteMany();
  await prisma.learningSession.deleteMany();
  await prisma.lessonProgress.deleteMany();
  await prisma.quizAttempt.deleteMany();
  await prisma.quizQuestion.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.course.deleteMany();
  await prisma.simulation.deleteMany();

  for (const course of courses) {
    await prisma.course.create({
      data: {
        title: course.title,
        description: course.description,
        category: course.category,
        difficulty: course.difficulty,
        thumbnail: `/images/${course.category.toLowerCase()}.png`,
        lessons: {
          create: course.lessons.map((lesson, index) => ({
            title: lesson.title,
            description: lesson.description,
            content: lesson.content,
            visual: lesson.visual,
            videoUrl: lesson.videoUrl,
            activityPrompt: lesson.activityPrompt,
            activityAnswer: lesson.activityAnswer,
            order: index + 1,
            duration: lesson.duration || 8,
            quizQuestions: {
              create: lesson.quiz.map((q) => ({
                question: q.question,
                options: q.options,
                correctAnswer: q.correctAnswer,
                explanation: q.explanation
              }))
            }
          }))
        }
      }
    });
  }

  await prisma.simulation.createMany({
    data: [
      {
        title: "Berkenalan dengan Teman Baru di Kelas 1",
        description: "Latihan menyapa teman sebangku dan menanyakan nama dengan ramah.",
        scenario: "Hari pertama masuk sekolah dasar kelas 1, anak duduk di samping teman baru.",
        difficulty: "Mudah",
        systemPrompt: "Berperan sebagai teman sebangku kelas 1 SD yang ramah bernama Dodi. Gunakan bahasa Indonesia sederhana, kalimat pendek, hangat, dan ajukan satu pertanyaan ringan setiap giliran."
      },
      {
        title: "Meminjam Pensil Warna dengan Sopan",
        description: "Latihan menggunakan kata 'tolong' dan 'terima kasih' saat meminjam perlengkapan.",
        scenario: "Anak ingin mewarnai gambar tetapi pensil warnanya tertinggal di rumah.",
        difficulty: "Mudah",
        systemPrompt: "Berperan sebagai teman kelas yang memiliki kotak pensil warna lengkap. Dorong anak menggunakan kata 'tolong' saat meminjam dan 'terima kasih' saat menerima."
      },
      {
        title: "Bertanya kepada Ibu Guru di Kelas",
        description: "Latihan mengangkat tangan dan bertanya materi pelajaran dengan santun.",
        scenario: "Anak belum memahami cara menulis angka dan ingin bertanya kepada guru.",
        difficulty: "Sedang",
        systemPrompt: "Berperan sebagai Ibu Guru kelas 1 SD yang sangat sabar, penuh kasih sayang, dan mengapresiasi keberanian anak untuk bertanya."
      },
      {
        title: "Membeli Roti Sehat di Kantin Sekolah",
        description: "Latihan percakapan memilih roti dan membayar uang jajan sederhana.",
        scenario: "Waktu istirahat sekolah tiba, anak membeli roti di kantin sekolah.",
        difficulty: "Sedang",
        systemPrompt: "Berperan sebagai penjual kantin sekolah yang ramah. Bantu anak menyebutkan pilihan roti dan mengucapkan terima kasih."
      }
    ]
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
