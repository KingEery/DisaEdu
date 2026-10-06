# Catatan Evaluasi Juri DisaEdu

## Penilaian Awal

| Aspek | Nilai Perkiraan | Catatan |
| --- | ---: | --- |
| Ide dan relevansi masalah | 9/10 | Masalah pendidikan inklusif jelas dan relevan. |
| Tampilan dan pengalaman pengguna | 8/10 | Visual hangat, ramah, dan memiliki identitas. |
| Kelengkapan fitur | 7/10 | Fitur utama tersedia, tetapi beberapa masih simulasi. |
| Kematangan teknis | 6/10 | Masih ada risiko pada keamanan, data, dan reliabilitas. |
| Bukti dampak | 4/10 | Belum ada validasi pengguna atau metrik penggunaan nyata. |
| Kesiapan demo | 7/10 | Alur kuat, tetapi perlu demo yang terkontrol. |

## Kekuatan Produk

- Fokus pada kebutuhan anak dengan disabilitas intelektual.
- Memiliki alur belajar, profil anak, kursus, kuis, progress, DisaAI, dan DisaTalk.
- Pendamping memiliki dashboard untuk memantau perkembangan.
- Desain visual terasa tenang, ramah, dan berbeda dari dashboard edukasi biasa.
- Ada panel admin untuk mengelola kursus dan materi.

## Kekurangan Utama

### 1. Konsultasi belum benar-benar fungsional

Halaman konsultasi masih menggunakan data ahli, jadwal, rating, dan harga yang ditulis langsung di frontend. Tombol booking hanya mengubah tampilan dan belum menyimpan data ke database.

Yang perlu ditambahkan:

- Simpan booking ke database.
- Status booking: pending, confirmed, dan cancelled.
- Halaman riwayat konsultasi.
- Detail jadwal tetap tersedia setelah refresh.
- Label yang jelas jika pembayaran dan video call masih simulasi.

### 2. Grafik progress masih memakai data statis

Grafik aktivitas mingguan belum sepenuhnya dihitung dari aktivitas belajar anak. Juri dapat mempertanyakan apakah data tersebut benar-benar berasal dari penggunaan aplikasi.

Yang perlu ditambahkan:

- Catat waktu mulai dan selesai setiap sesi belajar.
- Hitung durasi dari aktivitas nyata.
- Tampilkan waktu pembaruan data.
- Beri label `Data contoh` jika data masih dummy.

### 3. AI masih menggunakan mock provider

DisaAI dan DisaTalk sudah memiliki alur yang baik, tetapi konfigurasi default menggunakan respons mock berbasis aturan. Hal ini perlu disampaikan secara transparan saat presentasi.

Yang perlu ditambahkan:

- Label `Mode demo` saat mock provider aktif.
- Penjelasan provider AI yang digunakan.
- Contoh personalisasi berdasarkan usia, minat, dan preferensi anak.
- Perbandingan respons untuk dua profil anak yang berbeda.

### 4. Keamanan autentikasi perlu diperkuat

Temuan teknis yang perlu diperbaiki:

- Kredensial admin masih ditulis langsung di backend.
- Token pengguna masih berupa `user.id`.
- Belum ada expiry token.
- Belum ada rate limit khusus login.
- Data anak membutuhkan perlindungan yang lebih jelas.

Prioritas perbaikan:

- Gunakan session token acak atau JWT dengan expiry.
- Simpan password admin dalam bentuk hash di database.
- Pindahkan secret ke environment variable.
- Tambahkan rate limit untuk login.
- Jelaskan perlindungan data anak saat presentasi.

### 5. Aksesibilitas belum cukup terbukti

Bahasa sederhana dan visual ramah sudah menjadi awal yang baik, tetapi perlu fitur yang dapat langsung diuji oleh juri.

Prioritas fitur:

- Ukuran teks yang dapat diperbesar.
- Kontras warna yang memenuhi standar.
- Navigasi keyboard dan focus state yang jelas.
- Dukungan screen reader.
- Tombol animasi dan reduced motion.
- Text-to-speech atau voice input.
- Konfirmasi sebelum aksi penting.
- Mode belajar tenang dengan tampilan sederhana dan satu instruksi per langkah.

### 6. Belum ada bukti dampak

Juri kemungkinan akan menanyakan apakah produk sudah diuji dan memberi manfaat nyata.

Data validasi sederhana yang bisa dikumpulkan:

- Uji coba dengan 3–5 anak atau pendamping.
- Waktu menyelesaikan satu materi sebelum dan sesudah memakai DisaEdu.
- Jumlah bantuan pendamping yang dibutuhkan.
- Tingkat penyelesaian latihan.
- Hasil kuis.
- Kutipan singkat dari pendamping.

## Prioritas Pengembangan

### Prioritas 1: Aksesibilitas anak

- Tombol besar.
- Bahasa sederhana.
- Animasi dapat dimatikan.
- Text-to-speech.
- Satu tugas per langkah.

### Prioritas 2: Progress nyata

- Aktivitas diambil dari database.
- Grafik tidak lagi hardcoded.
- Rekomendasi langkah berikutnya berdasarkan aktivitas anak.

### Prioritas 3: Kuis yang lebih bermakna

- Feedback langsung.
- Penjelasan jawaban.
- Kesempatan mencoba ulang.
- Riwayat nilai.

### Prioritas 4: Booking konsultasi persisten

- Simpan data ke database.
- Riwayat booking.
- Status konsultasi.

### Prioritas 5: Transparansi mode demo

- Banner atau label `Demo mode`.
- Data dummy diberi label.
- Jelaskan fitur yang sudah live dan yang masih prototipe.

## Alur Demo yang Disarankan

1. Pendamping membuat profil anak bernama Alya.
2. Pendamping memilih minat Alya: menggambar dan musik.
3. Dashboard memberi rekomendasi materi berdasarkan profil.
4. Alya membuka materi `Mengenal Emosi`.
5. Alya meminta bantuan DisaAI ketika menemukan bagian yang sulit.
6. Alya mengerjakan aktivitas sederhana.
7. Alya berlatih meminta bantuan melalui DisaTalk.
8. Pendamping membuka progress dan melihat perkembangan.
9. Sistem menampilkan langkah belajar berikutnya.
10. Presentasi ditutup dengan aksesibilitas, keamanan, dan hasil validasi pengguna.

## Pesan Utama Presentasi

> DisaEdu tidak hanya mengajarkan materi. DisaEdu membantu anak belajar dengan ritme yang lebih tenang, membantu pendamping memahami prosesnya, dan melatih keterampilan yang dapat dipakai dalam kehidupan sehari-hari.

## Kesimpulan

DisaEdu sudah kuat pada ide, tampilan, dan cakupan fitur. Agar naik dari MVP menarik menjadi produk lomba yang unggul, fokus utama harus diarahkan pada:

1. Bukti dampak dari pengguna nyata.
2. Aksesibilitas yang dapat diuji langsung.
3. Keamanan data anak.
4. Pemisahan yang jelas antara fitur live dan fitur simulasi.

